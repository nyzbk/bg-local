import { createFileRoute, Link } from "@tanstack/react-router";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { CONTACT_EMAIL, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy Policy — Peel",
      description:
        "Peel processes photos in your browser. We do not upload, store or transmit the pixels. AdSense, if approved, measures page views only.",
      path: "/privacy",
      appName: "Privacy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Peel", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ]}
      />
      <Prose>
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="font-mono text-xs text-muted">Last updated: 28 August 2026</p>
        <p>
          Peel removes image backgrounds in your web browser. We do not upload, store, or transmit the pixels of your
          photos to any server for processing. There is no Peel account and no photo library on our side.
        </p>
        <h2>What stays on the device</h2>
        <ul>
          <li>The still you drop: decoded with Canvas, inferred in a Web Worker, encoded to PNG in this tab.</li>
          <li>No registration, no email wall, no “save to cloud” for cutouts.</li>
          <li>
            The on-device model (<span className="font-mono text-sm">u2netp.onnx</span>) is a static file loaded from
            this website, the same way a font is loaded. It is not your photo.
          </li>
          <li>onnxruntime-web and the WASM engine are also static assets from this origin.</li>
          <li>We do not call remove.bg, Photoroom, Clipdrop, Slazzer or any image API with your pixels.</li>
        </ul>
        <h2>What the network does see</h2>
        <p>
          Hosting and CDN providers (currently Vercel) may log IP address, user-agent, referrer and the path of the
          request — <span className="font-mono text-sm">/</span>, <span className="font-mono text-sm">/how-to</span>,
          model bytes, WASM — for security and uptime. Those logs do not include the contents of the canvas.
        </p>
        <p>
          Cache Storage in your browser keeps the model so the second visit is faster. That cache lives on your device.
          Clearing site data deletes it.
        </p>
        <h2>Advertising</h2>
        <p>
          This site is set up for Google AdSense (publisher ID ca-pub-7636435144500691). Until Google approves the site
          and ads are switched on, you should not see live ad units — only placeholders. When ads are live, Google may
          collect standard advertising and measurement data on page views, using cookies or similar where the law and
          your browser settings allow. That data is about the visit, not about the photograph inside the tool. We do
          not send cutouts to Google for targeting.
        </p>
        <h2>Contact</h2>
        <p>
          Privacy questions: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Do not attach the photos. See
          also <Link to="/terms">terms</Link> and <Link to="/contact">contact</Link>.
        </p>
      </Prose>
    </SiteShell>
  );
}
