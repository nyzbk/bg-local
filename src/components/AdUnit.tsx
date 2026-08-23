import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ADSENSE_CLIENT } from "@/lib/constants";

type Slot = "after-success" | "mid" | "footer";

const SLOT_ENV: Record<Slot, keyof ImportMetaEnv> = {
  "after-success": "VITE_ADSENSE_SLOT_AFTER_SUCCESS",
  mid: "VITE_ADSENSE_SLOT_MID",
  footer: "VITE_ADSENSE_SLOT_FOOTER",
};

type Props = {
  slot: Slot;
  className?: string;
};

export function AdUnit({ slot, className }: Props) {
  const ref = useRef<HTMLModElement>(null);
  const live = String(import.meta.env.VITE_ADSENSE_LIVE || "false") === "true";
  const client = (import.meta.env.VITE_ADSENSE_CLIENT as string | undefined) || ADSENSE_CLIENT;
  const slotId = import.meta.env[SLOT_ENV[slot]] as string | undefined;

  useEffect(() => {
    if (!live || !client || !slotId) return;
    try {
      // @ts-expect-error adsbygoogle
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // ignore push errors in strict mode double-mount
    }
  }, [live, client, slotId]);

  if (!live || !client || !slotId) {
    return (
      <aside
        data-ad-slot={slot}
        aria-label="Advertisement placeholder"
        className={cn(
          "flex min-h-16 items-center justify-center rounded-card border border-dashed border-border bg-surface px-4 py-5 text-center",
          className,
        )}
      >
        <p className="font-mono text-xs tracking-wide text-muted uppercase">Ad slot — {slot}</p>
      </aside>
    );
  }

  return (
    <aside data-ad-slot={slot} className={cn("min-h-[90px] w-full overflow-hidden", className)}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
