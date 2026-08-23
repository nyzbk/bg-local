#!/usr/bin/env node
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "node_modules/onnxruntime-web/dist");
const dest = join(root, "public/ort");
mkdirSync(dest, { recursive: true });

for (const file of ["ort-wasm-simd-threaded.wasm", "ort-wasm-simd-threaded.mjs"]) {
  copyFileSync(join(dist, file), join(dest, file));
}

console.log("copied onnxruntime wasm → public/ort/");
