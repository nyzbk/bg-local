import { INFER_SIZE, MODEL_BYTES, MODEL_CACHE, MODEL_URL } from "./constants";
import { rasterizeSquare } from "./mask";
import type { ModelProgress, WorkerIn, WorkerOut } from "./types";

export type PeelMask = {
  mask: Uint8Array;
  w: number;
  h: number;
};

type ProgressFn = (p: ModelProgress) => void;

function humanFetchError(): string {
  return "Couldn’t load the on-device model. Check your connection and retry.";
}

async function readBodyWithProgress(
  res: Response,
  onProgress: ProgressFn,
): Promise<ArrayBuffer> {
  const total = Number(res.headers.get("content-length")) || MODEL_BYTES;
  if (!res.body) {
    const buf = await res.arrayBuffer();
    onProgress({ phase: "loading", loaded: buf.byteLength, total: buf.byteLength });
    return buf;
  }
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let loaded = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
      loaded += value.byteLength;
      onProgress({ phase: "loading", loaded, total });
    }
  }
  const out = new Uint8Array(loaded);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.byteLength;
  }
  onProgress({ phase: "loading", loaded, total: Math.max(total, loaded) });
  return out.buffer;
}

export async function fetchModel(onProgress: ProgressFn): Promise<ArrayBuffer> {
  onProgress({ phase: "loading", loaded: 0, total: MODEL_BYTES });
  try {
    const cache = await caches.open(MODEL_CACHE);
    const hit = await cache.match(MODEL_URL);
    if (hit) {
      const buf = await hit.arrayBuffer();
      onProgress({ phase: "loading", loaded: buf.byteLength, total: buf.byteLength });
      return buf;
    }
    const res = await fetch(MODEL_URL, { cache: "force-cache" });
    if (!res.ok) throw new Error(humanFetchError());
    const buf = await readBodyWithProgress(res, onProgress);
    try {
      await cache.put(
        MODEL_URL,
        new Response(buf.slice(0), {
          headers: { "Content-Type": "application/octet-stream" },
        }),
      );
    } catch {
      // Cache Storage may be unavailable (private mode) — inference still works.
    }
    return buf;
  } catch (err) {
    if (err instanceof Error && /browser can’t run Peel/i.test(err.message)) throw err;
    throw new Error(humanFetchError());
  }
}

export class PeelEngine {
  private worker: Worker | null = null;
  private ready = false;
  private readyWaiters: Array<(ok: boolean) => void> = [];
  private peelId = 0;
  private inflight = new Map<
    number,
    { resolve: (v: PeelMask) => void; reject: (e: Error) => void }
  >();
  private lastError: string | null = null;

  constructor() {
    if (typeof window === "undefined") {
      throw new Error("Peel engine is browser-only");
    }
    this.worker = new Worker(new URL("./peel.worker.ts", import.meta.url), { type: "module" });
    this.worker.onmessage = (ev: MessageEvent<WorkerOut>) => this.onMessage(ev.data);
    this.worker.onerror = () => {
      this.failReady("This browser can’t run Peel. Try current Chrome, Edge or Safari.");
    };
  }

  private onMessage(msg: WorkerOut) {
    if (msg.type === "ready") {
      this.ready = true;
      this.flushReady(true);
      return;
    }
    if (msg.type === "error") {
      if (typeof msg.id === "number") {
        const pending = this.inflight.get(msg.id);
        this.inflight.delete(msg.id);
        pending?.reject(new Error(msg.message));
      } else {
        this.failReady(msg.message);
      }
      return;
    }
    if (msg.type === "done") {
      const pending = this.inflight.get(msg.id);
      this.inflight.delete(msg.id);
      pending?.resolve({ mask: new Uint8Array(msg.mask), w: msg.w, h: msg.h });
    }
  }

  private failReady(message: string) {
    this.lastError = message;
    this.flushReady(false);
  }

  private flushReady(ok: boolean) {
    const waiters = this.readyWaiters;
    this.readyWaiters = [];
    for (const w of waiters) w(ok);
  }

  async init(model: ArrayBuffer): Promise<void> {
    if (this.ready) return;
    if (this.lastError) throw new Error(this.lastError);
    const worker = this.worker;
    if (!worker) throw new Error("This browser can’t run Peel. Try current Chrome, Edge or Safari.");
    const wait = new Promise<void>((resolve, reject) => {
      this.readyWaiters.push((ok) => {
        if (ok) resolve();
        else reject(new Error(this.lastError || "Couldn’t load the on-device model. Check your connection and retry."));
      });
    });
    const copy = model.slice(0);
    const msg: WorkerIn = { type: "init", model: copy };
    worker.postMessage(msg, [copy]);
    await wait;
  }

  async run(bitmap: ImageBitmap): Promise<PeelMask> {
    if (!this.ready || !this.worker) {
      throw new Error("The on-device model is still loading.");
    }
    const square = rasterizeSquare(bitmap, INFER_SIZE);
    const rgba = square.data.buffer.slice(0);
    const id = ++this.peelId;
    const result = new Promise<PeelMask>((resolve, reject) => {
      this.inflight.set(id, { resolve, reject });
    });
    const msg: WorkerIn = { type: "run", id, width: INFER_SIZE, height: INFER_SIZE, rgba };
    this.worker.postMessage(msg, [rgba]);
    try {
      return await result;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Couldn’t peel this photo. Try another, or a smaller file.");
    }
  }

  isStale(id: number): boolean {
    return id !== this.peelId;
  }

  currentId(): number {
    return this.peelId;
  }

  dispose() {
    this.worker?.terminate();
    this.worker = null;
    this.ready = false;
    for (const pending of this.inflight.values()) {
      pending.reject(new Error("Peel engine stopped."));
    }
    this.inflight.clear();
  }
}

let singleton: PeelEngine | null = null;

export function getPeelEngine(): PeelEngine {
  if (typeof window === "undefined") {
    throw new Error("Peel engine is browser-only");
  }
  if (!singleton) singleton = new PeelEngine();
  return singleton;
}
