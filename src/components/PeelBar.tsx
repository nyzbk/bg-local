import { Copy, Download, Scissors, Share } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  canPeel: boolean;
  canDownload: boolean;
  peeling: boolean;
  modelReady: boolean;
  canShare: boolean;
  onPeel: () => void;
  onDownload: () => void;
  onCopy: () => void;
  onShare: () => void;
  copyState: "idle" | "copied" | "failed";
};

export function PeelBar({
  canPeel,
  canDownload,
  peeling,
  modelReady,
  canShare,
  onPeel,
  onDownload,
  onCopy,
  onShare,
  copyState,
}: Props) {
  return (
    <div
      data-testid="peel-bar"
      className="flex flex-col gap-2 sm:flex-row sm:flex-wrap"
    >
      <button
        type="button"
        data-testid="peel-button"
        disabled={!canPeel || peeling || !modelReady}
        onClick={onPeel}
        className={cn(
          "inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-control bg-accent px-4 text-sm font-medium text-accent-ink transition-opacity duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40",
        )}
      >
        <Scissors className="size-4" strokeWidth={2} aria-hidden="true" />
        {peeling ? "Peeling…" : "Peel"}
      </button>
      <button
        type="button"
        data-testid="download-png"
        disabled={!canDownload}
        onClick={onDownload}
        className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-control bg-ink px-4 text-sm font-medium text-surface transition-opacity duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Download className="size-4" strokeWidth={2} aria-hidden="true" />
        Download PNG
      </button>
      <button
        type="button"
        data-testid="copy-png"
        disabled={!canDownload}
        onClick={onCopy}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control border border-border bg-surface px-4 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Copy className="size-4" strokeWidth={2} aria-hidden="true" />
        {copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : "Copy PNG"}
      </button>
      {canShare && (
        <button
          type="button"
          data-testid="share-png"
          disabled={!canDownload}
          onClick={onShare}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control border border-border bg-surface px-4 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Share className="size-4" strokeWidth={2} aria-hidden="true" />
          Share
        </button>
      )}
    </div>
  );
}
