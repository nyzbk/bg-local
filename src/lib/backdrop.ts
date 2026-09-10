/** Cover-crop a photo behind a cutout. Does not touch peel.ts / the U²-NetP mask. */

function get2d(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas is not available in this browser.");
  return ctx;
}

export function composeOntoBackdrop(opts: {
  cutout: HTMLCanvasElement;
  backdrop: ImageBitmap;
}): HTMLCanvasElement {
  const { cutout, backdrop } = opts;
  const w = cutout.width;
  const h = cutout.height;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = get2d(canvas);
  const bw = backdrop.width || 1;
  const bh = backdrop.height || 1;
  const scale = Math.max(w / bw, h / bh);
  const dw = bw * scale;
  const dh = bh * scale;
  ctx.drawImage(backdrop, (w - dw) / 2, (h - dh) / 2, dw, dh);
  ctx.drawImage(cutout, 0, 0);
  return canvas;
}
