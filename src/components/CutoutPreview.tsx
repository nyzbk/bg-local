import { cn } from "@/lib/utils";
import type { PreviewView } from "@/lib/types";

type Props = {
  originalUrl: string | null;
  cutoutUrl: string | null;
  view: PreviewView;
  onView: (v: PreviewView) => void;
  peeling: boolean;
  filename: string;
};

const VIEWS: { value: PreviewView; label: string }[] = [
  { value: "original", label: "Original" },
  { value: "cutout", label: "Cutout" },
  { value: "split", label: "Split" },
];

export function CutoutPreview({ originalUrl, cutoutUrl, view, onView, peeling, filename }: Props) {
  const showCutout = view !== "original" && !!cutoutUrl;
  const showOriginal = view !== "cutout" || !cutoutUrl;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium">Preview</p>
        <div className="flex rounded-control bg-well p-0.5" role="tablist" aria-label="Preview view">
          {VIEWS.map((item) => (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={view === item.value}
              data-testid={`view-${item.value}`}
              onClick={() => onView(item.value)}
              className={cn(
                "min-h-9 rounded-[6px] px-3 text-xs font-medium transition-colors duration-150",
                view === item.value ? "bg-surface text-ink shadow-card" : "text-muted hover:text-ink",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div
        data-testid="preview-well"
        className="relative overflow-hidden rounded-card border border-border checkerboard shadow-inset"
      >
        {!originalUrl ? (
          <div className="flex min-h-64 items-center justify-center px-6 py-16 text-sm text-muted">
            Drop a photo to preview the cutout on a checkerboard.
          </div>
        ) : view === "split" && originalUrl ? (
          <div className="grid grid-cols-2">
            <img src={originalUrl} alt="Original" className="max-h-[min(70vh,640px)] w-full object-contain bg-well" />
            <div className="checkerboard">
              {cutoutUrl ? (
                <img
                  data-testid="preview-cutout"
                  src={cutoutUrl}
                  alt="Cutout"
                  className="max-h-[min(70vh,640px)] w-full object-contain"
                />
              ) : (
                <img src={originalUrl} alt="" className="max-h-[min(70vh,640px)] w-full object-contain opacity-40" />
              )}
            </div>
          </div>
        ) : (
          <img
            data-testid={showCutout ? "preview-cutout" : "preview-original"}
            src={showCutout && cutoutUrl ? cutoutUrl : originalUrl}
            alt={showCutout ? `${filename} cutout` : filename}
            className={cn(
              "mx-auto max-h-[min(70vh,640px)] w-full object-contain",
              !showCutout && "bg-well",
            )}
          />
        )}
        {peeling && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-ink/40 px-4 text-center"
            data-testid="peeling-overlay"
          >
            <p className="rounded-control bg-surface px-3 py-2 text-sm font-medium">
              Peeling on this device…
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
