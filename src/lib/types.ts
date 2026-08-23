export type BackgroundMode = "transparent" | "solid";

export type PreviewView = "original" | "cutout" | "split";

export type FeatherPx = 0 | 1 | 2;

export type PeelPreset = {
  bgMode?: BackgroundMode;
  solidColor?: string;
};

export type ModelPhase = "idle" | "loading" | "ready" | "error";

export type ModelProgress = {
  phase: ModelPhase;
  loaded: number;
  total: number;
  message?: string;
};

export type WorkerIn =
  | { type: "init"; model: ArrayBuffer }
  | { type: "run"; id: number; width: number; height: number; rgba: ArrayBuffer };

export type WorkerOut =
  | { type: "progress"; loaded: number; total: number }
  | { type: "ready" }
  | { type: "done"; id: number; mask: ArrayBuffer; w: number; h: number }
  | { type: "error"; id?: number; message: string };
