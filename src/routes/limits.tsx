import { createFileRoute, Link } from "@tanstack/react-router";
import { AdUnit } from "@/components/AdUnit";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Faq } from "@/components/Faq";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { limitsFaq } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/limits")({
  head: () =>
    pageHead({
      title: "Limits of on-device background removal — Peel",
      description:
        "What U²-NetP in a browser cannot do: HEIC, hair, glass, batch, video, watermarks, cyclorama, and huge stills on iPhone. Recropping does not grow a larger model.",
      path: "/limits",
      appName: "Limits",
      faqs: limitsFaq,
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
          sits on it, recropping ten times will not grow a larger model, and moving the same JPEG onto{" "}
          <Link to="/transparent-png">/transparent-png</Link> or <Link to="/white-background">/white-background</Link>{" "}
          will not either — those URLs are export presets, not extra weights.
        </p>
        <h2>What 320×320 actually means</h2>
        <p>
          The Worker runs U²-NetP on a 320 pixel square. We upsample the mask and feather the edge. Fine structure
          smaller than a few pixels at that scale — baby hair, a wine-glass stem, a bike spoke, chain-link, tulle —
          is a guess. A listing thumbnail often survives. A hero print does not. That is the product. It is written
          here so a reviewer, a crawler, and a person with a catalogue all see the same ceiling.
        </p>
        <h2>Files it will not open</h2>
        <ul>
          <li>HEIC / HEIF from iPhone Camera Roll, unless the browser already converted them to JPEG.</li>
          <li>GIF, SVG, PDF, PSD, TIFF, RAW, video, panoramic stitches well above 15 MB.</li>
          <li>Empty drops and 0-byte files. The picker will say so; that is not a model failure.</li>
        </ul>
        <p>
          Convert HEIC, then drop the JPEG. The portrait-specific crop of that problem is on{" "}
          <Link to="/portraits">/portraits</Link>. The iPhone save path after a successful PNG is{" "}
          <Link to="/iphone">/iphone</Link>. Do not treat those three URLs as the same paragraph.
        </p>
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
          reloads, shrink the file. The first visit also fetches <span className="font-mono text-sm">u2netp.onnx</span>{" "}
          (~4.7 MB) and the onnxruntime-web engine from this origin, then stores them in Cache Storage. That delay is
          a download, not a GPU queue in a data centre.
        </p>
        <h2>Jobs we refuse</h2>
        <p>
          Peel is not a watermark remover. It does not inpaint logos, credits, QR codes or rights-management marks.
          That is both a product line and a policy line for this site. It is also not a batch farm, not a video
          pipeline, not a cyclorama generator, and not an upload API you wrap with a script. See the{" "}
          <Link to="/terms">terms</Link>. Catalogue shooting notes stay on{" "}
          <Link to="/product-photos">/product-photos</Link>. Listing-form recode stays on{" "}
          <Link to="/marketplace">/marketplace</Link>.
        </p>
        <p>
          If the still is a single well-lit object or a person a step off a wall, start at the{" "}
          <Link to="/how-to">how-to</Link> and the <Link to="/">tool</Link>.
        </p>
      </Prose>
      <Faq items={limitsFaq} title="Limit questions" />
      <AdUnit slot="mid" className="mt-10" />
    </SiteShell>
  );
}
