import { createFileRoute } from "@tanstack/react-router";
import { AdUnit } from "@/components/AdUnit";
import { Faq } from "@/components/Faq";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { PeelApp } from "@/components/PeelApp";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/white-background")({
  head: () => ({
    meta: [
      { title: "White background photo maker — Peel" },
      {
        name: "description",
        content: "Peel a product photo onto a solid white backdrop in your browser. Nothing is uploaded.",
      },
    ],
  }),
  component: WhitePage,
});

function WhitePage() {
  return (
    <SiteShell>
      <JsonLd />
      <PeelApp preset={{ bgMode: "solid", solidColor: "#FFFFFF" }} />
      <HowItWorks />
      <AdUnit slot="mid" className="mt-10" />
      <Faq />
    </SiteShell>
  );
}
