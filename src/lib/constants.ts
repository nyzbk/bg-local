export const APP_NAME = "Peel";
export const APP_TAGLINE = "Free Background Remover";
export const APP_DESCRIPTION =
  "Remove image backgrounds in your browser. Transparent PNG or a white backdrop. No signup, no watermark, the photo never leaves this device.";

export const ADSENSE_CLIENT = "ca-pub-7636435144500691";
export const AGENCY_NAME = "Ultimatum";
export const AGENCY_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_AGENCY_URL) ||
  "https://ultimatum.studio";

export const MODEL_URL = "/models/u2netp.onnx";
export const MODEL_CACHE = "peel-model-v1";
export const MODEL_BYTES = 4.7 * 1024 * 1024;
export const ORT_WASM_PATHS = "/ort/";
export const INFER_SIZE = 320;

export const DEFAULT_BG_MODE = "transparent" as const;
export const DEFAULT_SOLID = "#FFFFFF";
export const DEFAULT_FEATHER = 1 as const;
export const DEFAULT_THRESHOLD = 50;
export const DEFAULT_STEM = "peel-cutout";

export const MAX_FILE_BYTES = 15 * 1024 * 1024;
export const DISPLAY_MAX_DESKTOP = 4096;
export const DISPLAY_MAX_IOS = 2048;

export const ACCEPT_TYPES = "image/jpeg,image/png,image/webp";
export const ACCEPT_EXT = [".jpg", ".jpeg", ".png", ".webp"] as const;

export const IMAGENET_MEAN = [0.485, 0.456, 0.406] as const;
export const IMAGENET_STD = [0.229, 0.224, 0.225] as const;

export const FAQ = [
  {
    q: "Is Peel really private?",
    a: "Yes. Your photo is processed in this browser tab. It is not uploaded to Peel or to a third-party API.",
  },
  {
    q: "Do I need an account?",
    a: "No. There is no signup, no email wall, and no watermark on the cutout.",
  },
  {
    q: "Why is the first run slow?",
    a: "Peel downloads a ~4.7 MB on-device model once, then caches it. Later peels are faster.",
  },
  {
    q: "Does it work on iPhone?",
    a: "Yes. iOS Safari is a critical path. HEIC from Camera Roll should be converted first in HEIC Local if the browser doesn’t already convert it.",
  },
  {
    q: "PNG or JPG?",
    a: "Transparent cutouts need PNG. JPEG cannot store alpha.",
  },
  {
    q: "Can I put a white background behind a product?",
    a: "Yes. Choose Solid and pick white, then download.",
  },
  {
    q: "Is there a watermark or credit limit?",
    a: "No watermark. No artificial quota.",
  },
  {
    q: "Will hair / glass look perfect?",
    a: "Not always. Peel is a fast private utility, not a desktop studio. Refine sliders help; hard cases need a dedicated editor.",
  },
  {
    q: "Do you use remove.bg?",
    a: "No. Nothing is sent there.",
  },
  {
    q: "Why did my photo fail?",
    a: "Very large files can exhaust mobile memory. Try a smaller image.",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    title: "Drop a photo",
    body: "JPG, PNG or WebP. It stays in this tab.",
  },
  {
    title: "Peel",
    body: "An on-device model isolates the subject. First time, we load 4.7 MB.",
  },
  {
    title: "Download",
    body: "Transparent PNG, or a solid backdrop. Nothing was uploaded.",
  },
] as const;
