import { cn } from "@/lib/utils";
import { AGENCY_NAME, HUB_URL } from "@/lib/constants";

type Props = {
  className?: string;
  variant?: "footer" | "after-success";
};

function agencyHref(): string {
  const raw = import.meta.env.VITE_AGENCY_URL as string | undefined;
  if (!raw || raw === "#" || raw.includes("ultimatum.studio")) return HUB_URL;
  return raw;
}

export function SoftAgencyCta({ className, variant = "footer" }: Props) {
  const url = agencyHref();
  const name = import.meta.env.VITE_AGENCY_NAME || AGENCY_NAME;

  if (variant === "after-success") {
    return (
      <p className={cn("text-sm leading-relaxed text-muted", className)}>
        Need a custom tool or a $10k site?{" "}
        <a
          href={url}
          className="font-medium text-accent underline-offset-2 hover:underline"
          rel="noopener noreferrer"
        >
          Talk to {name}
        </a>
        .
      </p>
    );
  }

  return (
    <p className={cn("max-w-xl text-sm leading-relaxed text-muted", className)}>
      Need a custom web application, brand identity or high-end website?{" "}
      <a href={url} className="font-medium text-ink underline-offset-2 hover:underline" rel="noopener noreferrer">
        {name}
      </a>{" "}
      builds $10k sites and private utilities like this one. Hub of the free tools is the same link.
    </p>
  );
}
