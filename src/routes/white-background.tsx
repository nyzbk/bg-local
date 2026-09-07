import { createFileRoute, Link } from "@tanstack/react-router";
import { AdUnit } from "@/components/AdUnit";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { PeelApp } from "@/components/PeelApp";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/white-background")({
  head: () =>
    pageHead({
      title: "White background product photo in the browser — Peel",
      description:
        "Peel a still onto a solid white plate without uploading. Built for marketplace listings that reject transparent files.",
      path: "/white-background",
    }),
  component: WhitePage,
});

function WhitePage() {
  return (
    <SiteShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Peel", path: "/" },
          { name: "White background", path: "/white-background" },
        ]}
      />
      <PeelApp preset={{ bgMode: "solid", solidColor: "#FFFFFF" }} />
      <Prose>
        <h1 className="text-3xl font-semibold tracking-tight">White plate, still in this tab</h1>
        <p>
          A lot of catalogues do not want alpha. They want a subject on #FFFFFF, evenly lit, with no living-room
          wallpaper and no drop shadow from a bedroom lamp. Peel’s solid mode composites the mask over a colour you
          pick. White is preselected on this page because that is the rule Amazon, many Etsy categories and most
          print-on-demand panels actually enforce.
        </p>
        <p>
          The fill is a destination-over composite on the canvas. It is not a second photograph of a paper sweep. If
          the mask eats a white product on a white table, you will get a bite out of the object — raise contrast in
          the source still, or shoot against a darker cloth and peel again. A network trained to find “the subject”
          will not invent a missing bottle cap.
        </p>
        <h2>Why not screenshot the checkerboard</h2>
        <p>
          The checker is a preview aid. A PNG of that pattern will fail a marketplace validator and look like a bug in
          a theme. Solid white (or a brand hex) is the file they asked for. Keep the original on disk; Peel does not
          keep it for you.
        </p>
        <h2>Colour plates</h2>
        <p>
          Brand kits sometimes want #F5F5F5, a cream, or a packed colour. Change the fill, download, done. Edges are
          still PNG. If you need a true studio sweep with a floor horizon, that is a set, not a saliency net — Peel
          will not fake a cyclorama.
        </p>
        <p>
          Catalogue-specific notes are on <Link to="/product-photos">product photos</Link>. Portraits on a white plate
          are a different crop and lighting problem; see <Link to="/portraits">portraits</Link>. What a listing form
          does after upload — recode, reject alpha, JPEG on their CDN — is{" "}
          <Link to="/marketplace">marketplace</Link>, not this control.
        </p>
      </Prose>
      <AdUnit slot="mid" className="mt-10" />
    </SiteShell>
  );
}
