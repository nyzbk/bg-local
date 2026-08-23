import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [{ title: "Privacy Policy — Peel" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteShell>
      <article className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 font-mono text-xs text-muted">Last updated: 23 August 2026</p>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink">
          <p>
            Peel removes image backgrounds entirely in your web browser. We do not upload, store, or transmit the
            pixels of your photos to any server for processing.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-muted">
            <li>No accounts or registration required.</li>
            <li>Your photo never leaves this device for processing.</li>
            <li>
              The on-device model (<span className="font-mono text-xs">u2netp.onnx</span>) is a static file loaded from
              this website, the same way a font or script is loaded. It is not your photo.
            </li>
            <li>Encoding uses only client-side libraries (onnxruntime-web + Canvas).</li>
            <li>
              Standard web analytics and advertising (Google AdSense) may collect anonymized usage data after you
              interact with the site. This does not include the photos you peel.
            </li>
            <li>We do not use remove.bg, Photoroom, or any third-party image API.</li>
          </ul>
          <p className="text-muted">
            Hosting and CDN providers may log IP addresses, user-agent strings and request paths for security and
            reliability. They do not receive the pixels of photos you process.
          </p>
        </div>
      </article>
    </SiteShell>
  );
}
