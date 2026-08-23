import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [{ title: "Terms of Use — Peel" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteShell>
      <article className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Terms of Use</h1>
        <p className="mt-2 font-mono text-xs text-muted">Last updated: 23 August 2026</p>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink">
          <p>The Peel tool is provided “as is” without warranty of any kind.</p>
          <ul className="list-disc space-y-2 pl-5 text-muted">
            <li>
              Cutout quality varies. Fine hair, smoke, glass, fences and low-contrast subjects may be imperfect. Test
              the PNG before you publish it.
            </li>
            <li>
              You are solely responsible for the photos you process and for how you use the output (including other
              people’s likenesses and trademarked products).
            </li>
            <li>Do not use the tool on illegal or deceptive content.</li>
            <li>This is not a watermark-removal tool and must not be used to strip rights-management marks.</li>
            <li>We may update the tool at any time.</li>
          </ul>
          <p className="text-muted">By using Peel you accept these terms.</p>
        </div>
      </article>
    </SiteShell>
  );
}
