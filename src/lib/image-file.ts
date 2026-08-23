import { DISPLAY_MAX_DESKTOP, DISPLAY_MAX_IOS, MAX_FILE_BYTES } from "./constants";
import { isIosDevice } from "./utils";

const HEIC_RE = /\.(heic|heif|heics)$/i;
const OK_EXT_RE = /\.(jpe?g|png|webp)$/i;

export function isHeicFile(file: File): boolean {
  const type = (file.type || "").toLowerCase();
  if (type.includes("heic") || type.includes("heif")) return true;
  return HEIC_RE.test(file.name);
}

export function rejectReason(file: File): string | null {
  if (isHeicFile(file)) {
    return "HEIC photos are not supported here. Convert in HEIC Local first.";
  }
  const type = (file.type || "").toLowerCase();
  if (type === "application/pdf" || type.startsWith("video/") || type === "image/gif" || type === "image/svg+xml") {
    return "Use a JPG, PNG or WebP photo.";
  }
  if (type && !type.startsWith("image/")) {
    return "Use a JPG, PNG or WebP photo.";
  }
  if (!type && !OK_EXT_RE.test(file.name) && file.name.includes(".")) {
    return "Use a JPG, PNG or WebP photo.";
  }
  return null;
}

export function displayMax(): number {
  return isIosDevice() ? DISPLAY_MAX_IOS : DISPLAY_MAX_DESKTOP;
}

function fitSize(w: number, h: number, max: number): { w: number; h: number } {
  const edge = Math.max(w, h);
  if (edge <= max) return { w, h };
  const s = max / edge;
  return { w: Math.max(1, Math.round(w * s)), h: Math.max(1, Math.round(h * s)) };
}

export async function decodeAndFit(file: File): Promise<ImageBitmap> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new Error("Couldn’t read this image.");
  }
  const max = displayMax();
  const tooHeavy = file.size > MAX_FILE_BYTES || Math.max(bitmap.width, bitmap.height) > max;
  const { w, h } = fitSize(bitmap.width, bitmap.height, max);
  if (w === bitmap.width && h === bitmap.height) {
    if (tooHeavy && Math.max(w, h) > max) {
      bitmap.close();
      throw new Error("This photo is too large for this device. Try a smaller one.");
    }
    return bitmap;
  }
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("This browser can’t run Peel. Try current Chrome, Edge or Safari.");
  }
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  try {
    return await createImageBitmap(canvas);
  } catch {
    throw new Error("This photo is too large for this device. Try a smaller one.");
  }
}
