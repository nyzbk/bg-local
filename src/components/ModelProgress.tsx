import { formatMb } from "@/lib/utils";
import type { ModelProgress as Progress } from "@/lib/types";

export function ModelProgress({ progress }: { progress: Progress }) {
  if (progress.phase !== "loading") return null;
  const total = progress.total || 1;
  const pct = Math.min(100, Math.round((progress.loaded / total) * 100));

  return (
    <div
      data-testid="model-progress"
      className="rounded-control border border-border bg-surface px-3 py-3"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-medium">Loading Peel model…</p>
        <p className="font-mono text-xs tabular-nums text-muted">
          {formatMb(progress.loaded)} / {formatMb(total)} MB
        </p>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-well">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-150 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
