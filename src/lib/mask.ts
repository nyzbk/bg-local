import type { BackgroundMode, FeatherPx } from "./types";

function makeCanvas(w: number, h: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  return canvas;
}

function get2d(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas is not available in this browser.");
  return ctx;
}

/** Stretch a 320×320 grayscale mask (0–255) to source size with smoothing. */
export function upsampleMask(mask: Uint8Array, srcW: number, srcH: number, inferSize: number): ImageData {
  const src = makeCanvas(inferSize, inferSize);
  const sctx = get2d(src);
  const srcData = sctx.createImageData(inferSize, inferSize);
  for (let i = 0; i < inferSize * inferSize; i++) {
    const v = mask[i] ?? 0;
    const o = i * 4;
    srcData.data[o] = v;
    srcData.data[o + 1] = v;
    srcData.data[o + 2] = v;
    srcData.data[o + 3] = 255;
  }
  sctx.putImageData(srcData, 0, 0);

  const dst = makeCanvas(srcW, srcH);
  const dctx = get2d(dst);
  dctx.imageSmoothingEnabled = true;
  dctx.imageSmoothingQuality = "high";
  dctx.drawImage(src, 0, 0, srcW, srcH);
  return dctx.getImageData(0, 0, srcW, srcH);
}

/** Harden: values below t (0–100) become 0, others snap toward 255. */
export function thresholdMask(mask: ImageData, threshold: number): void {
  const t = Math.max(0, Math.min(100, threshold)) / 100;
  const cut = t * 255;
  const data = mask.data;
  for (let i = 0; i < data.length; i += 4) {
    const v = data[i] ?? 0;
    const hard = v < cut ? 0 : 255;
    data[i] = hard;
    data[i + 1] = hard;
    data[i + 2] = hard;
  }
}

export function featherMask(mask: ImageData, px: FeatherPx): ImageData {
  if (px <= 0) return mask;
  const src = makeCanvas(mask.width, mask.height);
  const sctx = get2d(src);
  sctx.putImageData(mask, 0, 0);
  const dst = makeCanvas(mask.width, mask.height);
  const dctx = get2d(dst);
  dctx.filter = `blur(${px}px)`;
  dctx.drawImage(src, 0, 0);
  dctx.filter = "none";
  return dctx.getImageData(0, 0, mask.width, mask.height);
}

export function applyAlpha(source: ImageData, mask: ImageData): ImageData {
  const out = new ImageData(source.width, source.height);
  const s = source.data;
  const m = mask.data;
  const o = out.data;
  for (let i = 0; i < s.length; i += 4) {
    o[i] = s[i] ?? 0;
    o[i + 1] = s[i + 1] ?? 0;
    o[i + 2] = s[i + 2] ?? 0;
    o[i + 3] = m[i] ?? 0;
  }
  return out;
}

export function meanAlpha(image: ImageData): number {
  const d = image.data;
  let sum = 0;
  const n = image.width * image.height;
  for (let i = 3; i < d.length; i += 4) sum += d[i] ?? 0;
  return n === 0 ? 0 : sum / n / 255;
}

export function bitmapToImageData(bitmap: ImageBitmap): ImageData {
  const canvas = makeCanvas(bitmap.width, bitmap.height);
  const ctx = get2d(canvas);
  ctx.drawImage(bitmap, 0, 0);
  return ctx.getImageData(0, 0, bitmap.width, bitmap.height);
}

export function rasterizeSquare(bitmap: ImageBitmap, size: number): ImageData {
  const canvas = makeCanvas(size, size);
  const ctx = get2d(canvas);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bitmap, 0, 0, size, size);
  return ctx.getImageData(0, 0, size, size);
}

export function compositeCutout(opts: {
  source: ImageData;
  mask320: Uint8Array;
  inferSize: number;
  threshold: number;
  feather: FeatherPx;
  bgMode: BackgroundMode;
  solidColor: string;
}): { canvas: HTMLCanvasElement; alpha: ImageData; vanished: boolean } {
  const { source, mask320, inferSize, threshold, feather, bgMode, solidColor } = opts;
  let mask = upsampleMask(mask320, source.width, source.height, inferSize);
  thresholdMask(mask, threshold);
  mask = featherMask(mask, feather);
  const withAlpha = applyAlpha(source, mask);
  const canvas = makeCanvas(source.width, source.height);
  const ctx = get2d(canvas);
  ctx.putImageData(withAlpha, 0, 0);
  if (bgMode === "solid") {
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = solidColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";
  }
  return { canvas, alpha: withAlpha, vanished: meanAlpha(withAlpha) < 0.02 };
}
