#!/usr/bin/env node
/**
 * Peel three-checks:
 * 1. Security — no POST/PUT of image bytes; no remove.bg / Photoroom / etc.
 * 2. Functional peel — red circle on green → alpha corners ~0, center ~255, stays red
 * 3. Errors + chrome — empty CTA, HEIC, solid white opaque, legal, ads.txt, 44px
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";
import { PNG } from "pngjs";

const BASE = process.env.PEEL_CHECK_URL || "http://127.0.0.1:8080";
const OUT = "/workspace/screenshots";
mkdirSync(OUT, { recursive: true });
mkdirSync("/workspace/tmp", { recursive: true });

const FORBIDDEN =
  /remove\.bg|photoroom|clipdrop|slazzer|pixelcut|replicate\.com|huggingface\.co|api\.remove\.bg/i;

const posts = [];
const forbiddenHits = [];
const modelHits = [];

const result = {
  security: { pass: false, posts: [], forbidden: [], modelHits: [] },
  functional: { pass: false, cornerA: [], centerA: 0, centerRgb: [] },
  solidWhite: { pass: false, minA: 0 },
  empty: { pass: false, disabled: false },
  heic: { pass: false, message: "" },
  legal: {},
  adsTxt: {},
  ctaHeight: 0,
  adsAdjacent: { pass: false },
};

function makeCirclePng() {
  const png = new PNG({ width: 256, height: 256 });
  const cx = 128;
  const cy = 128;
  const r = 80;
  for (let y = 0; y < 256; y++) {
    for (let x = 0; x < 256; x++) {
      const i = (y * 256 + x) << 2;
      const inside = (x - cx) * (x - cx) + (y - cy) * (y - cy) <= r * r;
      if (inside) {
        png.data[i] = 255;
        png.data[i + 1] = 0;
        png.data[i + 2] = 0;
        png.data[i + 3] = 255;
      } else {
        png.data[i] = 0;
        png.data[i + 1] = 255;
        png.data[i + 2] = 0;
        png.data[i + 3] = 255;
      }
    }
  }
  return PNG.sync.write(png);
}

function pixel(png, x, y) {
  const i = (y * png.width + x) << 2;
  return {
    r: png.data[i],
    g: png.data[i + 1],
    b: png.data[i + 2],
    a: png.data[i + 3],
  };
}

const circleBuf = makeCirclePng();
writeFileSync("/workspace/tmp/peel-circle.png", circleBuf);
writeFileSync("/workspace/tmp/photo.heic", Buffer.from("ftypheic dummy"));

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ acceptDownloads: true, viewport: { width: 1280, height: 900 } });
page.setDefaultTimeout(90000);

page.on("request", (req) => {
  const method = req.method();
  const url = req.url();
  if (FORBIDDEN.test(url)) forbiddenHits.push({ method, url });
  if (/\/models\/u2netp\.onnx(\?|$)/.test(url) || /\/ort\//.test(url)) {
    modelHits.push({ method, url });
  }
  if (["POST", "PUT"].includes(method)) {
    const postData = req.postData() || "";
    const type = req.headers()["content-type"] || "";
    const interesting =
      /image\/|application\/octet-stream|multipart\/form-data/.test(type) || postData.length > 200;
    if (interesting) posts.push({ method, url, note: type || "large body" });
  }
});

try {
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.getByTestId("choose-image").waitFor();

  const peelBtn = page.getByTestId("peel-button");
  const downloadBtn = page.getByTestId("download-png");
  result.empty.disabled = (await peelBtn.isDisabled()) && (await downloadBtn.isDisabled());
  result.empty.pass = result.empty.disabled === true;

  const box = await peelBtn.boundingBox();
  result.ctaHeight = box?.height ?? 0;

  const adsInBar = await page.locator("[data-testid=peel-bar] [data-ad-slot]").count();
  result.adsAdjacent.pass = adsInBar === 0;

  await page.getByTestId("file-input").setInputFiles({
    name: "peel-circle.png",
    mimeType: "image/png",
    buffer: circleBuf,
  });
  await page.getByText("Replace photo").waitFor({ timeout: 15000 });

  await page.waitForFunction(() => {
    const btn = document.querySelector("[data-testid=peel-button]");
    return btn instanceof HTMLButtonElement && !btn.disabled;
  });

  await peelBtn.click();
  await page.waitForFunction(() => {
    const btn = document.querySelector("[data-testid=download-png]");
    return btn instanceof HTMLButtonElement && !btn.disabled;
  });

  await page.screenshot({ path: `${OUT}/peel-cutout.png`, fullPage: true });

  const [pngDownload] = await Promise.all([
    page.waitForEvent("download", { timeout: 20000 }),
    downloadBtn.click(),
  ]);
  const pngPath = `${OUT}/peel-functional.png`;
  await pngDownload.saveAs(pngPath);
  const decoded = PNG.sync.read(readFileSync(pngPath));
  const corners = [
    pixel(decoded, 2, 2),
    pixel(decoded, decoded.width - 3, 2),
    pixel(decoded, 2, decoded.height - 3),
    pixel(decoded, decoded.width - 3, decoded.height - 3),
  ];
  const center = pixel(decoded, Math.floor(decoded.width / 2), Math.floor(decoded.height / 2));
  result.functional.cornerA = corners.map((p) => p.a);
  result.functional.centerA = center.a;
  result.functional.centerRgb = [center.r, center.g, center.b];
  const cornersClear = corners.every((p) => p.a <= 40);
  const centerSolid = center.a >= 200;
  const staysRed = center.r >= 180 && center.g <= 80 && center.b <= 80;
  result.functional.pass = cornersClear && centerSolid && staysRed;

  await page.getByTestId("bg-solid").click();
  await page.waitForTimeout(500);
  const [whiteDownload] = await Promise.all([
    page.waitForEvent("download", { timeout: 20000 }),
    downloadBtn.click(),
  ]);
  const whitePath = `${OUT}/peel-white.png`;
  await whiteDownload.saveAs(whitePath);
  const white = PNG.sync.read(readFileSync(whitePath));
  let minA = 255;
  for (let i = 3; i < white.data.length; i += 4) minA = Math.min(minA, white.data[i]);
  result.solidWhite.minA = minA;
  result.solidWhite.pass = minA >= 250;

  await page.getByTestId("file-input").setInputFiles({
    name: "photo.heic",
    mimeType: "image/heic",
    buffer: Buffer.from("ftypheic dummy"),
  });
  const heicAlert = page.getByTestId("peel-error");
  await heicAlert.waitFor({ timeout: 8000 });
  result.heic.message = (await heicAlert.innerText()).trim();
  result.heic.pass = /HEIC Local/i.test(result.heic.message);

  for (const path of ["/privacy", "/terms", "/about", "/ads.txt", "/transparent-png", "/white-background"]) {
    const res = await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
    result.legal[path] = res?.status() ?? 0;
  }
  const adsRes = await page.goto(BASE + "/ads.txt");
  const ads = (await adsRes.text()).trim();
  result.adsTxt.body = ads;
  result.adsTxt.pass = ads.includes("google.com, pub-7636435144500691, DIRECT, f08c47fec0942fa0");

  result.security.posts = posts;
  result.security.forbidden = forbiddenHits;
  result.security.modelHits = modelHits;
  const origin = new URL(BASE).origin;
  const modelOk = modelHits.every((h) => {
    try {
      const u = new URL(h.url);
      return u.origin === origin && (/\/models\/u2netp\.onnx/.test(u.pathname) || u.pathname.startsWith("/ort/"));
    } catch {
      return false;
    }
  });
  result.security.pass = posts.length === 0 && forbiddenHits.length === 0 && modelOk;
} finally {
  await browser.close();
}

const allPass =
  result.security.pass &&
  result.functional.pass &&
  result.solidWhite.pass &&
  result.empty.pass &&
  result.heic.pass &&
  result.adsTxt.pass &&
  result.adsAdjacent.pass &&
  result.ctaHeight >= 44 &&
  ["/privacy", "/terms", "/about"].every((p) => result.legal[p] === 200);

writeFileSync(`${OUT}/peel-three-checks.json`, JSON.stringify({ allPass, result }, null, 2));
console.log(JSON.stringify({ allPass, result }, null, 2));
process.exit(allPass ? 0 : 1);
