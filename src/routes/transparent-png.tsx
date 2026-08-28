import { createFileRoute, Link } from "@tanstack/react-router";
import { AdUnit } from "@/components/AdUnit";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { PeelApp } from "@/components/PeelApp";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/transparent-png")({
  head: () =>
    pageHead({
      title: "Transparent PNG cutout in the browser — Peel",
      description:
        "Cut a subject onto a transparent PNG without uploading. Alpha stays in the file; JPEG cannot do this. Runs on-device with U²-NetP.",
      path: "/transparent-png",
    }),
  component: TransparentPage,
});

function TransparentPage() {
  return (
    <SiteShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Peel", path: "/" },
          { name: "Transparent PNG", path: "/transparent-png" },
        ]}
      />
      <PeelApp preset={{ bgMode: "transparent" }} />
      <Prose>
        <h1 className="text-3xl font-semibold tracking-tight">Transparent PNG, on this device</h1>
        <p>
          A transparent PNG is a bitmap with an alpha channel. Where the mask is empty, those pixels are actually empty
          — not white, not a checkerboard. Design tools, slides, storefronts and most social templates composite that
          file over whatever sits underneath. Peel’s default export is this file.
        </p>
        <p>
          JPEG will not hold alpha. If you flatten a cutout to JPG you get an opaque rectangle, usually white or the
          last backdrop you happened to have. WebP can hold alpha, but PNG is the format every tool in a catalogue
          pipeline already knows how to open. Peel writes PNG for both transparent and solid exports so the edge does
          not pick up JPEG ringing.
        </p>
        <h2>How to read the checkerboard</h2>
        <p>
          The preview draws a local checker so you can see holes in the mask. That pattern is CSS, not pixels in the
          download. If you still see a grey halo after download, the mask is soft at that edge: raise the threshold a
          little or drop feather to 0. If you see chunks of the real background stuck to the subject, lower the
          threshold or recrop so the subject fills more of the frame.
        </p>
        <h2>When transparent is the wrong export</h2>
        <p>
          Marketplaces that reject “images with transparency” want a solid plate. Use the{" "}
          <Link to="/white-background">white background tool</Link> instead of screenshotting the checkerboard. Print
          shops that impose CMYK on a PNG will also treat empty pixels as paper; confirm with them before you send a
          file with alpha.
        </p>
        <p>
          Hair, tulle, smoke and glass do not become magically perfect because the file has alpha. They become a soft
          matte at 320 px of network resolution. Read <Link to="/limits">limits</Link> before you promise a client a
          clipping-path substitute. The <Link to="/how-to">how-to</Link> walks the sliders in order.
        </p>
      </Prose>
      <AdUnit slot="mid" className="mt-10" />
    </SiteShell>
  );
}
