import { createFileRoute, Link } from "@tanstack/react-router";
import { AdUnit } from "@/components/AdUnit";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/limits")({
  head: () =>
    pageHead({
      title: "Limits of on-device background removal — Peel",
      description:
        "What U²-NetP in a browser cannot do: HEIC, hair, glass, batch, video, watermarks, and huge stills on iPhone.",
      path: "/limits",
      appName: "Limits",
    }),
  component: LimitsPage,
});

function LimitsPage() {
  return (
    <SiteShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Peel", path: "/" },
          { name: "Limits", path: "/limits" },
        ]}
      />
      <Prose>
        <h1 className="text-3xl font-semibold tracking-tight">What Peel will not pretend to do</h1>
        <p>
          A 4.7 MB saliency net in WebAssembly is a utility, not a retoucher. This page is the honest list. If a still
          sits on it, recropping ten times will not grow a larger model.
        </p>
        <h2>Files it will not open</h2>
        <ul>
          <li>HEIC / HEIF from iPhone Camera Roll, unless the browser already converted them to JPEG.</li>
          <li>GIF, SVG, PDF, PSD, TIFF, RAW, video, panoramic stitches well above 15 MB.</li>
          <li>Empty drops and 0-byte files. The picker will say so; that is not a model failure.</li>
        </ul>
        <h2>Scenes the mask usually damages</h2>
        <ul>
          <li>Flyaway hair on a busy background. Feather 2 helps a thumbnail. It will not match a clipping path.</li>
          <li>Wine glasses, bottle highlights, bike wheels, chain-link, fences, netting.</li>
          <li>White product on a white table. The net cannot see a boundary you did not light.</li>
          <li>Several equal subjects. It will pick one blob or smear them together.</li>
          <li>Smoke, tulle, splash, motion blur.</li>
        </ul>
        <h2>Device ceilings</h2>
        <p>
          iOS Safari: long edge capped at 2048 px. A 48 MP HEIC converted to a 12 MB JPEG can still exhaust the tab.
          Desktop browsers go higher (up to 4096 px) but a huge still plus the WASM heap is a lottery. If the tab
          reloads, shrink the file.
        </p>
        <h2>Jobs we refuse</h2>
        <p>
          Peel is not a watermark remover. It does not inpaint logos, credits, QR codes or rights-management marks.
          That is both a product line and a policy line. It is also not a batch farm and not a video pipeline. See the{" "}
          <Link to="/terms">terms</Link>.
        </p>
        <p>
          If the still is a single well-lit object or a person a step off a wall, start at the{" "}
          <Link to="/how-to">how-to</Link> and the <Link to="/">tool</Link>.
        </p>
      </Prose>
      <AdUnit slot="mid" className="mt-10" />
    </SiteShell>
  );
}
