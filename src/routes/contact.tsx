import { createFileRoute } from "@tanstack/react-router";
import { AdUnit } from "@/components/AdUnit";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { CONTACT_EMAIL, SITE_ORIGIN, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact Peel",
      description: `Email ${CONTACT_EMAIL} about the Peel background remover. Do not send photos to this address — the tool runs in your browser.`,
      path: "/contact",
      appName: "Contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE_ORIGIN}/contact`,
    name: "Contact Peel",
    email: CONTACT_EMAIL,
  };

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Peel", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <Prose>
        <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
        <p>
          Peel does not have accounts, so there is no in-app inbox. For a bug, a licence question, or a private batch
          build, email the operator directly.
        </p>
        <p>
          Email:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-mono text-sm">
            {CONTACT_EMAIL}
          </a>
        </p>
        <p>
          Do not attach the photographs you wanted to peel. That would be the upload this site is built to avoid. If
          the tool fails, describe the device, the browser, the file type (JPEG / PNG / WebP / HEIC) and the message
          on screen. A 200-byte error string is more useful than a 12 MB still in mail.
        </p>
        <h2>What this address is for</h2>
        <ul>
          <li>The model never loaded, or a peel crashed the tab.</li>
          <li>A legal or privacy question about the on-device pipeline.</li>
          <li>A custom utility or a $10k site — that conversation goes to Ultimatum via the same inbox.</li>
        </ul>
        <h2>What this address is not for</h2>
        <ul>
          <li>Sending a catalogue to be cut out. Peel is self-serve and one still at a time.</li>
          <li>Watermark removal jobs. They are refused.</li>
          <li>Ad-click or payment issues with Google. Those go through AdSense, not this mailbox.</li>
        </ul>
        <p>
          Site: <span className="font-mono text-sm">{SITE_ORIGIN}</span>. No phone support, no chat widget, no ticket
          form that would upload a file.
        </p>
      </Prose>
      <AdUnit slot="mid" className="mt-10" />
    </SiteShell>
  );
}
