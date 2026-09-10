import { useCallback, useEffect, useRef, useState } from "react";
import { AdUnit } from "./AdUnit";
import { DropZone } from "./DropZone";
import { ModelProgress } from "./ModelProgress";
import { SoftAgencyCta } from "./SoftAgencyCta";
import { composeOntoBackdrop } from "@/lib/backdrop";
import { DEFAULT_FEATHER, DEFAULT_THRESHOLD, INFER_SIZE } from "@/lib/constants";
import { canvasToPngBlob, downloadBlob, sanitizeStem } from "@/lib/download";
import { decodeAndFit, rejectReason } from "@/lib/image-file";
import { bitmapToImageData, compositeCutout } from "@/lib/mask";
import { fetchModel, getPeelEngine } from "@/lib/peel";
import type { FeatherPx, ModelProgress as Progress } from "@/lib/types";

export function BackdropApp() {
  const [subject, setSubject] = useState<ImageBitmap | null>(null);
  const [backdrop, setBackdrop] = useState<ImageBitmap | null>(null);
  const [subjectName, setSubjectName] = useState<string | null>(null);
  const [backdropName, setBackdropName] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [helper, setHelper] = useState<string | null>(null);
  const [working, setWorking] = useState(false);
  const [feather, setFeather] = useState<FeatherPx>(DEFAULT_FEATHER);
  const [threshold, setThreshold] = useState(DEFAULT_THRESHOLD);
  const [progress, setProgress] = useState<Progress>({ phase: "idle", loaded: 0, total: 0 });

  const subjectRef = useRef<ImageBitmap | null>(null);
  const backdropRef = useRef<ImageBitmap | null>(null);
  const resultUrlRef = useRef<string | null>(null);
  const tokenRef = useRef(0);

  const modelReady = progress.phase === "ready";
  const canRun = !!subject && !!backdrop && !working && modelReady;

  const revokeResult = () => {
    if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    resultUrlRef.current = null;
  };

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

  useEffect(() => {
    return () => {
      revokeResult();
      subjectRef.current?.close();
      backdropRef.current?.close();
    };
  }, []);

  const accept = useCallback(async (file: File, slot: "subject" | "backdrop") => {
    const reason = rejectReason(file);
    if (reason) {
      setError(reason);
      return;
    }
    setError(null);
    try {
      const next = await decodeAndFit(file);
      if (slot === "subject") {
        subjectRef.current?.close();
        subjectRef.current = next;
        setSubject(next);
        setSubjectName(file.name);
      } else {
        backdropRef.current?.close();
        backdropRef.current = next;
        setBackdrop(next);
        setBackdropName(file.name);
      }
      revokeResult();
      setResultUrl(null);
      setResultBlob(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn’t read this image.");
    }
  }, []);

  async function handleRun() {
    if (!subject || !backdrop) return;
    if (progress.phase === "error") {
      setError(progress.message || "Couldn’t load the on-device model.");
      return;
    }
    if (!modelReady) {
      setError("The on-device model is still loading.");
      return;
    }
    setError(null);
    setHelper(null);
    setWorking(true);
    const token = ++tokenRef.current;
    try {
      const engine = getPeelEngine();
      const result = await engine.run(subject);
      if (token !== tokenRef.current) return;
      const source = bitmapToImageData(subject);
      const { canvas: cutout, vanished } = compositeCutout({
        source,
        mask320: result.mask,
        inferSize: INFER_SIZE,
        threshold,
        feather,
        bgMode: "transparent",
        solidColor: "#FFFFFF",
      });
      const composed = composeOntoBackdrop({ cutout, backdrop });
      const blob = await canvasToPngBlob(composed);
      if (token !== tokenRef.current) return;
      revokeResult();
      const url = URL.createObjectURL(blob);
      resultUrlRef.current = url;
      setResultUrl(url);
      setResultBlob(blob);
      setHelper(vanished ? "If the subject vanished, try a photo with a clearer subject." : null);
    } catch (err) {
      if (token !== tokenRef.current) return;
      setError(err instanceof Error ? err.message : "Couldn’t place this cutout. Try another pair of photos.");
    } finally {
      if (token === tokenRef.current) setWorking(false);
    }
  }

  function handleDownload() {
    if (!resultBlob) return;
    downloadBlob(resultBlob, `${sanitizeStem("peel-backdrop")}.png`);
  }

  return (
    <div className="pb-24 lg:pb-0">
      <div className="max-w-2xl">
        <p className="font-mono text-xs tracking-wide text-muted uppercase">Two files · on-device</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Put the cutout on a real backdrop
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
          Subject photo plus a backdrop photo. The mask is the same U²-NetP cutout; the plate is a photograph
          (cover), not a hex. Neither file leaves this tab.
        </p>
      </div>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <div className="flex flex-col gap-4">
          <DropZone
            testId="drop-subject"
            onFile={(f) => void accept(f, "subject")}
            hasImage={!!subject}
            title={subject ? "Replace subject" : "Drop the subject"}
            hint="The person or product to peel. JPG, PNG or WebP."
          />
          {subjectName && <p className="font-mono text-xs text-muted">{subjectName}</p>}
          <DropZone
            testId="drop-backdrop"
            onFile={(f) => void accept(f, "backdrop")}
            hasImage={!!backdrop}
            title={backdrop ? "Replace backdrop" : "Drop the backdrop photo"}
            hint="A scene, wall or lifestyle still. Cover-cropped to the subject."
          />
          {backdropName && <p className="font-mono text-xs text-muted">{backdropName}</p>}
          <ModelProgress progress={progress} />
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">Threshold {threshold}</span>
            <input
              type="range"
              min={0}
              max={100}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">Feather</span>
            <select
              className="min-h-11 rounded-control border border-border bg-surface px-3"
              value={feather}
              onChange={(e) => setFeather(Number(e.target.value) as FeatherPx)}
            >
              <option value={0}>0 px</option>
              <option value={1}>1 px</option>
              <option value={2}>2 px</option>
            </select>
          </label>
          <div
            className="fixed inset-x-0 bottom-0 z-20 flex gap-2 border-t border-border bg-surface/95 p-3 backdrop-blur-sm lg:static lg:z-auto lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none"
            style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          >
            <button
              type="button"
              data-testid="peel-backdrop"
              disabled={!canRun}
              onClick={() => void handleRun()}
              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-control bg-ink px-4 text-sm font-medium text-surface disabled:cursor-not-allowed disabled:opacity-40"
            >
              {working ? "Placing…" : "Peel onto backdrop"}
            </button>
            <button
              type="button"
              data-testid="download-backdrop"
              disabled={!resultBlob || working}
              onClick={handleDownload}
              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-control border border-border bg-surface px-4 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
            >
              Download PNG
            </button>
          </div>
          {error && (
            <p data-testid="backdrop-error" className="text-sm text-danger">
              {error}
            </p>
          )}
          {helper && <p className="text-sm text-muted">{helper}</p>}
        </div>

        <div className="lg:sticky lg:top-6">
          <div className="overflow-hidden rounded-card border border-border bg-surface p-3 shadow-card sm:p-4">
            {resultUrl ? (
              <img src={resultUrl} alt="Cutout on photo backdrop" className="mx-auto max-h-[32rem] w-auto max-w-full" />
            ) : (
              <p className="px-2 py-16 text-center text-sm text-muted">
                Drop both photos, then Peel onto backdrop. Preview appears here.
              </p>
            )}
          </div>
          {resultBlob && (
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
