import { DEFAULT_SOLID } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { BackgroundMode, FeatherPx } from "@/lib/types";

type Props = {
  bgMode: BackgroundMode;
  solidColor: string;
  feather: FeatherPx;
  threshold: number;
  stem: string;
  onBgMode: (m: BackgroundMode) => void;
  onSolidColor: (c: string) => void;
  onFeather: (f: FeatherPx) => void;
  onThreshold: (t: number) => void;
  onStem: (s: string) => void;
};

const FEATHERS: FeatherPx[] = [0, 1, 2];

export function RefineControls({
  bgMode,
  solidColor,
  feather,
  threshold,
  stem,
  onBgMode,
  onSolidColor,
  onFeather,
  onThreshold,
  onStem,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <fieldset>
        <legend className="text-sm font-medium">Background</legend>
        <div className="mt-2 flex gap-2">
          <ModeButton
            active={bgMode === "transparent"}
            onClick={() => onBgMode("transparent")}
            testId="bg-transparent"
          >
            Transparent
          </ModeButton>
          <ModeButton active={bgMode === "solid"} onClick={() => onBgMode("solid")} testId="bg-solid">
            Solid
          </ModeButton>
          {bgMode === "solid" && (
            <label className="ml-auto flex min-h-11 items-center gap-2 text-sm text-muted">
              Color
              <input
                data-testid="solid-color"
                type="color"
                value={solidColor || DEFAULT_SOLID}
                onChange={(e) => onSolidColor(e.target.value)}
                className="size-9 cursor-pointer rounded-control border border-border bg-surface p-0.5"
              />
            </label>
          )}
        </div>
      </fieldset>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Filename</span>
        <input
          data-testid="filename-stem"
          type="text"
          value={stem}
          onChange={(e) => onStem(e.target.value)}
          className="min-h-11 rounded-control border border-border bg-surface px-3 text-sm"
        />
      </label>

      <details data-testid="refine" className="group rounded-control border border-border bg-surface">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-3 text-sm font-medium">
          Refine
          <span className="text-muted transition-transform duration-150 group-open:rotate-45" aria-hidden="true">
            +
          </span>
        </summary>
        <div className="flex flex-col gap-4 border-t border-border px-3 py-3">
          <fieldset>
            <legend className="text-xs font-medium text-muted">Feather</legend>
            <div className="mt-2 flex gap-2">
              {FEATHERS.map((px) => (
                <ModeButton
                  key={px}
                  active={feather === px}
                  onClick={() => onFeather(px)}
                  testId={`feather-${px}`}
                >
                  {`${px} px`}
                </ModeButton>
              ))}
            </div>
          </fieldset>
          <label className="flex flex-col gap-2">
            <span className="flex items-center justify-between text-xs font-medium text-muted">
              Threshold
              <span className="font-mono tabular-nums">{threshold}</span>
            </span>
            <input
              data-testid="threshold"
              type="range"
              min={0}
              max={100}
              value={threshold}
              onChange={(e) => onThreshold(Number(e.target.value))}
              className="w-full accent-accent"
            />
          </label>
        </div>
      </details>
    </div>
  );
}

function ModeButton({
  active,
  onClick,
  children,
  testId,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
  testId: string;
}) {
  return (
    <button
      type="button"
      data-testid={testId}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center rounded-control border px-3 text-sm font-medium transition-colors duration-150",
        active ? "border-ink bg-ink text-surface" : "border-border bg-surface text-ink hover:border-ink/40",
      )}
    >
      {children}
    </button>
  );
}
