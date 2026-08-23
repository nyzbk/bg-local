import { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import { ACCEPT_TYPES } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Props = {
  disabled?: boolean;
  onFile: (file: File) => void;
  hasImage: boolean;
};

export function DropZone({ disabled, onFile, hasImage }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  function take(files: FileList | File[] | null) {
    const file = files?.[0];
    if (file) onFile(file);
  }

  return (
    <div
      data-testid="dropzone"
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        if (!disabled) take(e.dataTransfer.files);
      }}
      className={cn(
        "flex flex-col items-center justify-center rounded-card border border-dashed px-4 py-10 text-center transition-colors duration-150",
        over ? "border-accent bg-accent/5" : "border-border bg-surface",
        hasImage && "py-6",
      )}
    >
      <ImagePlus className="size-8 text-accent" strokeWidth={1.6} aria-hidden="true" />
      <p className="mt-3 text-sm font-medium">{hasImage ? "Replace photo" : "Drop a photo"}</p>
      <p className="mt-1 max-w-xs text-sm leading-relaxed text-muted">
        JPG, PNG or WebP. The pixels never leave this tab.
      </p>
      <button
        type="button"
        data-testid="choose-image"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className="mt-5 inline-flex min-h-11 items-center rounded-control bg-ink px-4 text-sm font-medium text-surface transition-opacity duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Choose image
      </button>
      <input
        ref={inputRef}
        data-testid="file-input"
        type="file"
        accept={ACCEPT_TYPES}
        className="sr-only"
        onChange={(e) => {
          take(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
