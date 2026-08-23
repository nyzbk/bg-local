import { createFileRoute } from "@tanstack/react-router";
import { AdUnit } from "@/components/AdUnit";
import { Faq } from "@/components/Faq";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { PeelApp } from "@/components/PeelApp";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/transparent-png")({
  head: () => ({
    meta: [
      { title: "Transparent PNG maker — Peel" },
      {
        name: "description",
        content: "Cut a subject onto a transparent PNG in your browser. No upload, no account, no watermark.",
      },
    ],
  }),
  component: TransparentPage,
});

function TransparentPage() {
  return (
    <SiteShell>
      <JsonLd />
      <PeelApp preset={{ bgMode: "transparent" }} />
      <HowItWorks />
      <AdUnit slot="mid" className="mt-10" />
      <Faq />
    </SiteShell>
  );
}
