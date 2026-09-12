import { createFileRoute, Link } from "@tanstack/react-router";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { AGENCY_NAME, AGENCY_URL } from "@/lib/constants";
import { CONTACT_EMAIL, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About Peel — on-device background remover",
      description:
        "Peel is a free background remover that runs U²-NetP in your browser. No account, no upload, Apache-2.0 weights.",
      path: "/about",
      appName: "About",
    }),
  component: AboutPage,
});

function AboutPage() {
  const url = import.meta.env.VITE_AGENCY_URL || AGENCY_URL;
  const name = import.meta.env.VITE_AGENCY_NAME || AGENCY_NAME;

  return (
    <SiteShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Peel", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <Prose>
        <h1 className="text-3xl font-semibold tracking-tight">About Peel</h1>
        <p>
          Peel is a free background remover that runs in the browser you already have. Drop a still, isolate the
          subject with an on-device model, download a transparent or solid PNG. There is no account. The photograph is
          not uploaded to Peel and is not sent to a third-party cutout API.
        </p>
        <p>
          The model is U²-NetP, the portable ~4.7 MB sibling of U²-Net, licensed Apache-2.0. Inference uses
          onnxruntime-web in a Worker. The weight file is hosted on this origin. We do not depend on AGPL
          background-removal JavaScript packages and we do not ship BRIA RMBG checkpoints.
        </p>
        <h2>Why it exists</h2>
        <p>
          Cloud removers are fast on a good day and a privacy lecture on a bad one. A lot of stills people actually
          need — a bag, a bottle, a headshot for a slide — do not need a data-centre GPU. They need a mask that never
          left the laptop. Peel is that smaller machine, with the limits written down on the{" "}
          <Link to="/limits">limits</Link> page instead of hidden in a pricing table.
        </p>
        <h2>Who operates it</h2>
        <p>
          Peel is a client-side utility from{" "}
          <a href={url} rel="noopener noreferrer">
            {name}
          </a>
          , which also builds brand identity, high-end sites and private web apps. For a custom pipeline, email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. The public tool stays free, watermark-free and
          one still at a time.
        </p>
        <p>
          Questions: <Link to="/faq">FAQ</Link>. How to run it: <Link to="/how-to">how-to</Link>. Privacy of the
          pixels: <Link to="/privacy">privacy</Link>.
        </p>
      </Prose>
    </SiteShell>
  );
}
