import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { AGENCY_NAME, AGENCY_URL } from "@/lib/constants";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [{ title: "About Peel" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const url = import.meta.env.VITE_AGENCY_URL || AGENCY_URL;
  const name = import.meta.env.VITE_AGENCY_NAME || AGENCY_NAME;

  return (
    <SiteShell>
      <article className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">About Peel</h1>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink">
          <p>
            Peel is a free, private background remover. Drop a photo, peel the backdrop, download a transparent PNG —
            without an account and without uploading anything.
          </p>
          <p>
            The subject is isolated on your device by a small open-source model (U²-NetP). There is no watermark and no
            daily limit beyond what your device can run.
          </p>
          <p className="text-muted">
            Peel is part of a family of client-side utilities. Need a custom product or a $10k site?{" "}
            <a href={url} className="font-medium text-accent underline-offset-2 hover:underline" rel="noopener noreferrer">
              {name}
            </a>
            .
          </p>
        </div>
      </article>
    </SiteShell>
  );
}
