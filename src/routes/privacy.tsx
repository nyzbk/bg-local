import { createFileRoute, Link } from "@tanstack/react-router";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { ADSENSE_CLIENT } from "@/lib/constants";
import { CONTACT_EMAIL, SITE_ORIGIN, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy Policy — Peel",
      description:
        "Peel processes photos in your browser. We do not upload, store or transmit the pixels. AdSense, if approved, measures page views only — not the canvas.",
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
        <p className="font-mono text-xs text-muted">Last updated: 13 September 2026</p>
        <p>
          Peel removes image backgrounds in your web browser. We do not upload, store, or transmit the pixels of your
          photos to any server for processing. There is no Peel account and no photo library on our side. The public
          origin is <span className="font-mono text-sm">{SITE_ORIGIN}</span>.
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
          This site is set up for Google AdSense (publisher ID {ADSENSE_CLIENT}). The authorized seller line is at{" "}
          <a href="/ads.txt" className="font-mono text-sm">
            /ads.txt
          </a>
          . Until Google approves the site and ads are switched on, you should not see live ad units — only labelled
          placeholders. Auto ads stay off until that switch. We do not click our own ads and we do not ask you to.
        </p>
        <p>
          When ads are live, Google may collect standard advertising and measurement data on page views, using cookies
          or similar technologies where the law and your browser settings allow. That data is about the visit — URL,
          approximate location derived from IP, device and browser, cookie identifiers — not about the photograph
          inside the tool. We do not send cutouts, masks, or canvas pixels to Google for targeting. Google’s own
          descriptions of ads cookies are at{" "}
          <a href="https://policies.google.com/technologies/ads" rel="noopener noreferrer">
            policies.google.com/technologies/ads
          </a>{" "}
          and the privacy policy at{" "}
          <a href="https://policies.google.com/privacy" rel="noopener noreferrer">
            policies.google.com/privacy
          </a>
          . You can use ads settings and browser controls to limit some of that measurement.
        </p>
        <h2>Children</h2>
        <p>
          Peel is a utility for adults who already have photographs they have the right to process. It is not directed
          at children, it does not knowingly collect personal information from children, and it does not ask for an
          age gate because it does not ask for an account.
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
