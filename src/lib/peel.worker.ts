import { InferenceSession, Tensor, env } from "onnxruntime-web/wasm";
import { IMAGENET_MEAN, IMAGENET_STD, INFER_SIZE, ORT_WASM_PATHS } from "./constants";
import type { WorkerIn, WorkerOut } from "./types";

type WorkerScope = {
  postMessage: (message: WorkerOut, transfer?: Transferable[]) => void;
  onmessage: ((ev: MessageEvent<WorkerIn>) => void) | null;
};

const scope = globalThis as unknown as WorkerScope;

function post(msg: WorkerOut, transfer?: Transferable[]) {
  if (transfer && transfer.length) scope.postMessage(msg, transfer);
  else scope.postMessage(msg);
}

function configureOrt() {
  env.wasm.wasmPaths = ORT_WASM_PATHS;
  env.wasm.numThreads = 1;
  env.wasm.simd = true;
  env.wasm.proxy = false;
}

function maybeSigmoid(data: Float32Array): Float32Array {
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < data.length; i++) {
    const v = data[i] ?? 0;
    if (v < min) min = v;
    if (v > max) max = v;
  }
  if (min >= 0 && max <= 1.0001) return data;
  const out = new Float32Array(data.length);
  for (let i = 0; i < data.length; i++) {
    out[i] = 1 / (1 + Math.exp(-(data[i] ?? 0)));
  }
  return out;
}

function rgbaToNchw(rgba: Uint8Array, size: number): Float32Array {
  const plane = size * size;
  const nchw = new Float32Array(3 * plane);
  for (let i = 0; i < plane; i++) {
    const r = (rgba[i * 4] ?? 0) / 255;
    const g = (rgba[i * 4 + 1] ?? 0) / 255;
    const b = (rgba[i * 4 + 2] ?? 0) / 255;
    nchw[i] = (r - IMAGENET_MEAN[0]) / IMAGENET_STD[0];
    nchw[plane + i] = (g - IMAGENET_MEAN[1]) / IMAGENET_STD[1];
    nchw[2 * plane + i] = (b - IMAGENET_MEAN[2]) / IMAGENET_STD[2];
  }
  return nchw;
}

let session: InferenceSession | null = null;
let inputName = "input.1";
let outputName = "output";

async function init(model: ArrayBuffer) {
  configureOrt();
  try {
    session = await InferenceSession.create(new Uint8Array(model), {
      executionProviders: ["wasm"],
      graphOptimizationLevel: "all",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(
      /wasm|WebAssembly|simd/i.test(message)
        ? "This browser can’t run Peel. Try current Chrome, Edge or Safari."
        : "Couldn’t load the on-device model. Check your connection and retry.",
    );
  }
  inputName = session.inputNames[0] ?? inputName;
  outputName = session.outputNames[0] ?? outputName;
  post({ type: "ready" });
}

async function run(id: number, width: number, height: number, rgba: ArrayBuffer) {
  if (!session) throw new Error("Model is not ready yet.");
  const size = width || INFER_SIZE;
  const nchw = rgbaToNchw(new Uint8Array(rgba), size);
  const tensor = new Tensor("float32", nchw, [1, 3, height || size, width || size]);
  const feeds: Record<string, Tensor> = { [inputName]: tensor };
  let result: Awaited<ReturnType<InferenceSession["run"]>>;
  try {
    result = await session.run(feeds);
  } catch {
    throw new Error("This photo is too heavy for this device. Try a smaller one.");
  }
  const out = result[outputName];
  if (!out) throw new Error("Couldn’t peel this photo. Try another, or a smaller file.");
  const raw =
    out.data instanceof Float32Array ? out.data : Float32Array.from(out.data as ArrayLike<number>);
  const prob = maybeSigmoid(raw);
  const mask = new Uint8Array(prob.length);
  for (let i = 0; i < prob.length; i++) {
    const v = Math.max(0, Math.min(1, prob[i] ?? 0));
    mask[i] = Math.round(v * 255);
  }
  post({ type: "done", id, mask: mask.buffer, w: size, h: size }, [mask.buffer]);
}

scope.onmessage = (ev: MessageEvent<WorkerIn>) => {
  const msg = ev.data;
  void (async () => {
    try {
      if (msg.type === "init") {
        await init(msg.model);
        return;
      }
      if (msg.type === "run") {
        await run(msg.id, msg.width, msg.height, msg.rgba);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Couldn’t peel this photo. Try another, or a smaller file.";
      post({ type: "error", id: msg.type === "run" ? msg.id : undefined, message });
    }
  })();
};
