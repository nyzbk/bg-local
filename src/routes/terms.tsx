import { createFileRoute, Link } from "@tanstack/react-router";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { CONTACT_EMAIL, SITE_ORIGIN, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead({
      title: "Terms of Use — Peel",
      description:
        "Peel is provided as-is. No watermark removal, no warranty on hair or glass, you are responsible for the stills you process.",
      path: "/terms",
      appName: "Terms",
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Peel", path: "/" },
          { name: "Terms", path: "/terms" },
        ]}
      />
      <Prose>
        <h1 className="text-3xl font-semibold tracking-tight">Terms of Use</h1>
        <p className="font-mono text-xs text-muted">Last updated: 13 September 2026</p>
        <p>
          The Peel tool at <span className="font-mono text-sm">{SITE_ORIGIN}</span> is provided “as is” without
          warranty of any kind, including fitness for a particular listing, print job or likeness release.
        </p>
        <h2>The cutout</h2>
        <ul>
          <li>
            Quality varies. Fine hair, smoke, glass, fences and low-contrast subjects may be imperfect. Test the PNG
            before you publish it. Read <Link to="/limits">limits</Link>.
          </li>
          <li>
            You are solely responsible for the photos you process and for how you use the output, including other
            people’s likenesses, trademarked products and marketplace rules.
          </li>
          <li>Do not use the tool on illegal content.</li>
        </ul>
        <h2>What you may not do with Peel</h2>
        <ul>
          <li>
            This is not a watermark-removal tool and must not be used to strip rights-management marks, credits, QR
            authentication or similar.
          </li>
          <li>Do not attempt to turn Peel into an upload API or a bulk farm by wrapping the page.</li>
          <li>Do not click our ads, if ads are live, or ask others to click them.</li>
        </ul>
        <h2>The model</h2>
        <p>
          U²-NetP weights are Apache-2.0. onnxruntime-web is used under its own licences. You get a PNG; you do not
          get a service-level agreement. We may update or pause the tool at any time.
        </p>
        <h2>Ads</h2>
        <p>
          If AdSense units are live, they are Google’s ads. Clicking your own ads is forbidden. We do not sell the
          photographs. The advertising disclosure is on the <Link to="/privacy">privacy</Link> page even while ads are
          off.
        </p>
        <p>
          By using Peel you accept these terms. Questions: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> ·{" "}
          <Link to="/privacy">privacy</Link> · <Link to="/contact">contact</Link>.
        </p>
      </Prose>
    </SiteShell>
  );
}
