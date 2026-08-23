import { useCallback, useEffect, useRef, useState } from "react";
import { AdUnit } from "./AdUnit";
import { CutoutPreview } from "./CutoutPreview";
import { DropZone } from "./DropZone";
import { ModelProgress } from "./ModelProgress";
import { PeelBar } from "./PeelBar";
import { RefineControls } from "./RefineControls";
import { SoftAgencyCta } from "./SoftAgencyCta";
import {
  DEFAULT_BG_MODE,
  DEFAULT_FEATHER,
  DEFAULT_SOLID,
  DEFAULT_STEM,
  DEFAULT_THRESHOLD,
  INFER_SIZE,
} from "@/lib/constants";
import { canShareFiles, canvasToPngBlob, copyPng, downloadBlob, sanitizeStem, shareOrDownload } from "@/lib/download";
import { decodeAndFit, rejectReason } from "@/lib/image-file";
import { bitmapToImageData, compositeCutout } from "@/lib/mask";
import { fetchModel, getPeelEngine } from "@/lib/peel";
import type { BackgroundMode, FeatherPx, ModelProgress as Progress, PeelPreset, PreviewView } from "@/lib/types";

type Props = {
  preset?: PeelPreset;
};

export function PeelApp({ preset }: Props) {
  const [bitmap, setBitmap] = useState<ImageBitmap | null>(null);
  const [source, setSource] = useState<ImageData | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [cutoutUrl, setCutoutUrl] = useState<string | null>(null);
  const [cutoutBlob, setCutoutBlob] = useState<Blob | null>(null);
  const [mask, setMask] = useState<Uint8Array | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [helper, setHelper] = useState<string | null>(null);
  const [peeling, setPeeling] = useState(false);
  const [view, setView] = useState<PreviewView>("original");
  const [bgMode, setBgMode] = useState<BackgroundMode>(preset?.bgMode ?? DEFAULT_BG_MODE);
  const [solidColor, setSolidColor] = useState(preset?.solidColor ?? DEFAULT_SOLID);
  const [feather, setFeather] = useState<FeatherPx>(DEFAULT_FEATHER);
  const [threshold, setThreshold] = useState(DEFAULT_THRESHOLD);
  const [stem, setStem] = useState(DEFAULT_STEM);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const [shareOk, setShareOk] = useState(false);
  const [progress, setProgress] = useState<Progress>({ phase: "idle", loaded: 0, total: 0 });
  const [filename, setFilename] = useState("photo");

  const originalUrlRef = useRef<string | null>(null);
  const cutoutUrlRef = useRef<string | null>(null);
  const bitmapRef = useRef<ImageBitmap | null>(null);
  const peelToken = useRef(0);
  const compositing = useRef(false);

  const modelReady = progress.phase === "ready";
  const canPeel = !!bitmap && !peeling;
  const canDownload = !!cutoutBlob && !peeling;

  const revokeOriginal = () => {
    if (originalUrlRef.current) URL.revokeObjectURL(originalUrlRef.current);
    originalUrlRef.current = null;
  };
  const revokeCutout = () => {
    if (cutoutUrlRef.current) URL.revokeObjectURL(cutoutUrlRef.current);
    cutoutUrlRef.current = null;
  };

  useEffect(() => {
    setShareOk(canShareFiles());
  }, []);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const buf = await fetchModel((p) => {
          if (!cancelled) setProgress(p);
        });
        const engine = getPeelEngine();
        await engine.init(buf);
        if (!cancelled) setProgress({ phase: "ready", loaded: buf.byteLength, total: buf.byteLength });
      } catch (err) {
        if (cancelled) return;
        const message =
          err instanceof Error
            ? err.message
            : "This browser can’t run Peel. Try current Chrome, Edge or Safari.";
        setProgress({ phase: "error", loaded: 0, total: 0, message });
        setError(message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const acceptFile = useCallback(async (file: File) => {
    const reason = rejectReason(file);
    if (reason) {
      setError(reason);
      return;
    }
    setError(null);
    setHelper(null);
    setMask(null);
    setCutoutBlob(null);
    revokeCutout();
    setCutoutUrl(null);
    setView("original");
    setFilename(file.name.replace(/\.[^.]+$/, "") || "photo");
    try {
      const next = await decodeAndFit(file);
      bitmapRef.current?.close();
      bitmapRef.current = next;
      setBitmap(next);
      setSource(bitmapToImageData(next));
      revokeOriginal();
      const url = URL.createObjectURL(file);
      originalUrlRef.current = url;
      setOriginalUrl(url);
    } catch (err) {
      setBitmap(null);
      setSource(null);
      setError(err instanceof Error ? err.message : "Couldn’t read this image.");
    }
  }, []);

  useEffect(() => {
    const onPaste = (ev: ClipboardEvent) => {
      const items = ev.clipboardData?.files;
      const file = items?.[0];
      if (file) {
        ev.preventDefault();
        void acceptFile(file);
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [acceptFile]);

  useEffect(() => {
    return () => {
      revokeOriginal();
      revokeCutout();
      bitmapRef.current?.close();
    };
  }, []);

  const rebuild = useCallback(async () => {
    if (!source || !mask || compositing.current) return;
    compositing.current = true;
    try {
      const { canvas, vanished } = compositeCutout({
        source,
        mask320: mask,
        inferSize: INFER_SIZE,
        threshold,
        feather,
        bgMode,
        solidColor,
      });
      const blob = await canvasToPngBlob(canvas);
      revokeCutout();
      const url = URL.createObjectURL(blob);
      cutoutUrlRef.current = url;
      setCutoutUrl(url);
      setCutoutBlob(blob);
      setHelper(vanished ? "If the subject vanished, try a photo with a clearer subject." : null);
    } catch {
      setError("Couldn’t peel this photo. Try another, or a smaller file.");
    } finally {
      compositing.current = false;
    }
  }, [source, mask, threshold, feather, bgMode, solidColor]);

  useEffect(() => {
    void rebuild();
  }, [rebuild]);

  async function handlePeel() {
    if (!bitmap) return;
    if (progress.phase === "error") {
      setError(progress.message || "Couldn’t load the on-device model. Check your connection and retry.");
      return;
    }
    if (!modelReady) {
      setError("The on-device model is still loading.");
      return;
    }
    setError(null);
    setPeeling(true);
    const token = ++peelToken.current;
    try {
      const engine = getPeelEngine();
      const result = await engine.run(bitmap);
      if (token !== peelToken.current) return;
      setMask(result.mask);
      setView("cutout");
    } catch (err) {
      if (token !== peelToken.current) return;
      setError(err instanceof Error ? err.message : "Couldn’t peel this photo. Try another, or a smaller file.");
    } finally {
      if (token === peelToken.current) setPeeling(false);
    }
  }

  const filenamePng = `${sanitizeStem(stem)}.png`;

  function handleDownload() {
    if (!cutoutBlob) return;
    downloadBlob(cutoutBlob, filenamePng);
  }

  async function handleCopy() {
    if (!cutoutBlob) return;
    const ok = await copyPng(cutoutBlob);
    setCopyState(ok ? "copied" : "failed");
    window.setTimeout(() => setCopyState("idle"), 1800);
  }

  async function handleShare() {
    if (!cutoutBlob) return;
    await shareOrDownload(cutoutBlob, filenamePng, "Peel cutout");
  }

  return (
    <div className="pb-24 lg:pb-0">
      <div className="max-w-2xl">
        <p className="font-mono text-xs tracking-wide text-muted uppercase">Private · on-device</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Peel the background off a photo — in this tab, nothing uploaded
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
          Transparent PNG, or a solid color behind the subject. Works on people and products. Fine hair and
          glass may need a desktop editor.
        </p>
      </div>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <div className="flex flex-col gap-4">
          <DropZone onFile={(f) => void acceptFile(f)} hasImage={!!bitmap} />
          <ModelProgress progress={progress} />
          {progress.phase === "error" && (
            <p data-testid="model-error" className="text-sm text-danger">
              {progress.message}
            </p>
          )}
          <RefineControls
            bgMode={bgMode}
            solidColor={solidColor}
            feather={feather}
            threshold={threshold}
            stem={stem}
            onBgMode={setBgMode}
            onSolidColor={setSolidColor}
            onFeather={setFeather}
            onThreshold={setThreshold}
            onStem={setStem}
          />
          <div
            className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-surface/95 p-3 backdrop-blur-sm lg:static lg:z-auto lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none"
            style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          >
            <PeelBar
              canPeel={canPeel}
              canDownload={canDownload}
              peeling={peeling}
              modelReady={modelReady}
              canShare={shareOk}
              onPeel={() => void handlePeel()}
              onDownload={handleDownload}
              onCopy={() => void handleCopy()}
              onShare={() => void handleShare()}
              copyState={copyState}
            />
          </div>
          {error && (
            <p data-testid="peel-error" className="text-sm text-danger">
              {error}
            </p>
          )}
          {helper && (
            <p data-testid="peel-helper" className="text-sm text-muted">
              {helper}
            </p>
          )}
        </div>

        <div className="lg:sticky lg:top-6">
          <div className="rounded-card border border-border bg-surface p-3 shadow-card sm:p-4">
            <CutoutPreview
              originalUrl={originalUrl}
              cutoutUrl={cutoutUrl}
              view={view}
              onView={setView}
              peeling={peeling}
              filename={filename}
            />
          </div>
          {canDownload && (
            <div className="mt-4">
              <AdUnit slot="after-success" />
              <SoftAgencyCta variant="after-success" className="mt-3" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
