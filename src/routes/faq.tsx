import { createFileRoute, Link } from "@tanstack/react-router";
import { AdUnit } from "@/components/AdUnit";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Faq } from "@/components/Faq";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { FAQ } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () =>
    pageHead({
      title: "FAQ — Peel background remover",
      description:
        "Does Peel upload photos? Why the first run is slow? HEIC, iPhone, watermarks, U²-NetP licence, white vs transparent PNG.",
      path: "/faq",
      appName: "FAQ",
      faqs: FAQ,
    }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <SiteShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Peel", path: "/" },
          { name: "FAQ", path: "/faq" },
        ]}
      />
      <Prose>
        <h1 className="text-3xl font-semibold tracking-tight">FAQ</h1>
        <p>
          Short answers for the questions that show up around a browser-only cutout: upload, the 4.7 MB model, iPhone
          HEIC, PNG versus JPEG, and the jobs Peel will not take. The tool itself is on the{" "}
          <Link to="/">home page</Link>.
        </p>
      </Prose>
      <Faq title="Eighteen concrete questions" />
      <AdUnit slot="mid" className="mt-10" />
    </SiteShell>
  );
}
