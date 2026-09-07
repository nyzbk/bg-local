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

export type FaqItem = { q: string; a: string };

export const HOME_FAQ: readonly FaqItem[] = [
  {
    q: "Does Peel upload my photo?",
    a: "No. Decoding, inference and PNG encoding all run in this tab. The only network request Peel makes for the tool is the one-time download of the 4.7 MB U²-NetP model from this same site — that file is the model, not your picture.",
  },
  {
    q: "Why is the first peel slower?",
    a: "The first visit fetches u2netp.onnx (~4.7 MB) and the ONNX Runtime WebAssembly engine, then stores them in Cache Storage. Later peels reuse that cache and usually start in a second or two on a laptop.",
  },
  {
    q: "Can I export a transparent PNG?",
    a: "Yes. Transparent is the default. JPEG cannot store an alpha channel, so Peel always writes PNG when you want see-through pixels.",
  },
  {
    q: "What about a white studio backdrop?",
    a: "Switch to Solid, keep #FFFFFF, then download. Marketplace listings that reject transparent files want this path, not a checkerboard screenshot.",
  },
  {
    q: "Does it work on iPhone Safari?",
    a: "Yes. iOS is a first-class path. Camera-roll HEIC is the common miss: Safari sometimes hands the tool a HEIC blob Peel cannot decode. Convert to JPG first, then drop the JPG here.",
  },
  {
    q: "Is there a watermark or daily quota?",
    a: "No watermark, no account, no credit counter. The only ceiling is device memory. Very large phone panoramas can fail; resize and retry.",
  },
];

export const FAQ: readonly FaqItem[] = [
  {
    q: "Is Peel really private?",
    a: "Yes. Your photo is decoded with the browser Canvas APIs, sent to a Web Worker as raw pixels, and never posted to Peel, remove.bg, Photoroom, Clipdrop or any other host. If you open the Network panel during a peel you will not see a multipart upload of the image.",
  },
  {
    q: "Do I need an account?",
    a: "No. There is no signup, no email wall, and no watermark on the cutout. Close the tab and the pixels are gone from memory.",
  },
  {
    q: "Why is the first run slow?",
    a: "Peel downloads a ~4.7 MB on-device model (U²-NetP, Apache-2.0) once, plus the onnxruntime-web WASM glue, then caches both. The delay is a file download, not a queue on a GPU farm. Later visits skip that step.",
  },
  {
    q: "Does it work on iPhone?",
    a: "Yes. iOS Safari is a critical path. Images larger than 2048 px on the long edge are downscaled before inference so WebKit does not run out of canvas memory. HEIC from Camera Roll should be converted first if the browser does not already turn it into JPEG.",
  },
  {
    q: "PNG or JPG?",
    a: "Transparent cutouts need PNG. JPEG has no alpha channel; a “transparent JPEG” you see online is a white rectangle. Solid-fill exports are still PNG so edges stay clean.",
  },
  {
    q: "Can I put a white background behind a product?",
    a: "Yes. Choose Solid and pick white (#FFFFFF), then download. That is the usual Amazon / Etsy / Shopify still. You can also pick any other hex if a brand kit wants a colour plate.",
  },
  {
    q: "Is there a watermark or credit limit?",
    a: "No watermark. No artificial quota. If a peel fails it is almost always a HEIC blob, an empty drop, or a file so large the phone GPU gave up — not a paywall.",
  },
  {
    q: "Will hair, glass or a bike wheel look perfect?",
    a: "Not always. U²-NetP is a 320×320 saliency net, then we upsample and feather. Fine hair, smoke, chain-link, wine glasses and low-contrast white-on-white stills are the hard cases. The threshold and feather sliders recover some edges; a desktop editor still wins on hero shots.",
  },
  {
    q: "Do you use remove.bg?",
    a: "No. Nothing is sent there. Peel is not a wrapper around a cloud API. The model file is self-hosted at /models/u2netp.onnx on this origin.",
  },
  {
    q: "Why did my photo fail?",
    a: "Typical causes: HEIC/HEIF from iPhone Camera Roll, an empty file, a GIF or SVG, or a panorama well above 15 MB. Convert HEIC to JPG, keep still photos under that size, and try again. Animated GIFs and video are out of scope.",
  },
  {
    q: "Can Peel remove a watermark or a logo?",
    a: "No. Peel only estimates a subject-versus-background mask. It does not inpaint, clone-stamp or strip rights-management marks. Using it that way is outside the terms and against AdSense policy for this site.",
  },
  {
    q: "What model is this, and is it legal to run in a browser?",
    a: "The weights are U²-NetP (the portable 4.7 MB variant of U²-Net), Apache-2.0. Inference uses onnxruntime-web. We do not ship AGPL background-removal packages and we do not use BRIA RMBG weights, which are non-commercial without a paid licence.",
  },
  {
    q: "Does advertising see my photo?",
    a: "No. Google AdSense, when the site is approved and ads go live, measures page views — not the pixels inside the canvas. The photo never leaves the tab for ad targeting.",
  },
  {
    q: "Can I peel a batch of 200 SKUs?",
    a: "Not in this version. Peel is one photo at a time on purpose: a batch uploader would look like a cloud job and invite people to dump a whole catalogue into a browser tab until it crashes. For a private batch pipeline, talk to Ultimatum.",
  },
  {
    q: "Where should I save the PNG on iPhone?",
    a: "Save to Files. Photos is a camera roll and often flattens alpha to JPEG or HEIC. Recents is a mixed view, not an archive. Details: /iphone.",
  },
  {
    q: "Why did WhatsApp ruin the transparent background?",
    a: "A photo-send is their JPEG. JPEG has no alpha, so the chat picks a plate. Attach the PNG as a document if you need the holes, or export Solid white first. Details: /whatsapp.",
  },
  {
    q: "Will Amazon or Etsy accept a transparent PNG?",
    a: "Often no. Listing photo wells recode or reject alpha. Export a solid white plate for those forms. Your own theme that composites colour may still want alpha — that is a different file. Details: /marketplace.",
  },
  {
    q: "Is the checkerboard in the downloaded file?",
    a: "No. The board is CSS in the preview. If you see it in the file, you screenshotted the tab. Download the PNG from the button, then open it in Files or Preview.",
  },
];

export const iphoneFaq: readonly FaqItem[] = [
  {
    q: "Safari never showed a Downloads list.",
    a: "iOS Safari often ignores the download attribute. Use Share → Save to Files, then open the Files app and look for peel-cutout.png.",
  },
  {
    q: "Photos still shows a white box around the subject.",
    a: "Save Image put a recode on the camera roll. JPEG and many HEIC paths have no alpha. The PNG with holes lives in Files.",
  },
  {
    q: "Can I keep the master only in iCloud Photos?",
    a: "Optimise iPhone Storage can replace a PNG with a smaller derivative. Keep the master in Files even if you also drop a preview on the roll.",
  },
  {
    q: "Is this a HEIC converter?",
    a: "No. Convert Camera Roll HEIC to JPEG before you peel. That input issue is on /how-to and /limits, not this page.",
  },
];

export const whatsappFaq: readonly FaqItem[] = [
  {
    q: "Should I send the cutout as a photo?",
    a: "Only if you already exported a solid plate and the other person just needs a look. If they need alpha, attach a document.",
  },
  {
    q: "Does the HD photo toggle keep transparency?",
    a: "No. HD is still their JPEG. JPEG has no alpha channel.",
  },
  {
    q: "Status or View once as a backup?",
    a: "Those are previews, not archives. Keep the PNG in Files.",
  },
  {
    q: "Can Peel turn off WhatsApp compression?",
    a: "No. We do not sit inside the chat and we do not guess their encoder.",
  },
];

export const marketplaceFaq: readonly FaqItem[] = [
  {
    q: "Is this the same as /product-photos?",
    a: "No. Product photos is how to shoot one SKU. This page is what the listing form does to the file after upload.",
  },
  {
    q: "Is this the same as /white-background?",
    a: "No. White background is Peel’s Solid control in this tab. Marketplace is their ingest and CDN recode.",
  },
  {
    q: "The public card looks dirtier than Peel.",
    a: "Open the public CDN URL. If it is JPEG, the form recoded you. Re-export Solid, less feather, larger long edge, try once.",
  },
  {
    q: "Will Peel certify my listing?",
    a: "No. Rules move. We do not scrape shop help into this site. Test the public card.",
  },
];


export const HOW_IT_WORKS = [
  {
    title: "Drop a photo",
    body: "JPG, PNG or WebP. It stays in this tab. HEIC from Camera Roll needs a convert-first step.",
  },
  {
    title: "Peel",
    body: "U²-NetP isolates the subject at 320 px, then we upsample the mask. First visit loads 4.7 MB.",
  },
  {
    title: "Download",
    body: "Transparent PNG, or a solid backdrop. Nothing was uploaded. Check the checkerboard before you ship it.",
  },
] as const;
