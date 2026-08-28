import { createFileRoute, Link } from "@tanstack/react-router";
import { AdUnit } from "@/components/AdUnit";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/product-photos")({
  head: () =>
    pageHead({
      title: "Product photo background removal in the browser — Peel",
      description:
        "Cut catalogue stills onto white or transparent PNG without uploading. Built for single SKUs, not a 200-item farm.",
      path: "/product-photos",
    }),
  component: ProductPhotosPage,
});

function ProductPhotosPage() {
  return (
    <SiteShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Peel", path: "/" },
          { name: "Product photos", path: "/product-photos" },
        ]}
      />
      <Prose>
        <h1 className="text-3xl font-semibold tracking-tight">Catalogue stills, one SKU at a time</h1>
        <p>
          A usable product cutout starts at the table, not in the net. Put one object in the frame. Fill most of it.
          Light the object harder than the cloth. A phone on a tripod and a north window beats a 40 MB handheld shot
          with a busy rug. Peel will not invent a missing corner of a box.
        </p>
        <p>
          For marketplaces that demand a white plate, open the <Link to="/white-background">white background tool</Link>{" "}
          and download PNG. For a theme that composites onto a colour block, use{" "}
          <Link to="/transparent-png">transparent PNG</Link>. Do not upload a screenshot of Peel’s checkerboard; that
          pattern is a preview, and validators treat it as a defect.
        </p>
        <h2>What the net actually sees</h2>
        <p>
          Inference is 320 pixels on the long side of a square. A tiny SKU in the middle of a 12 MP still is a few
          pixels of object and a lot of table. Crop first. Reflective bottles, clear blisters, chrome and jewellery
          are the usual misses: the net paints the highlight as background and you get a bite out of the glass. Reshoot
          on a mid-grey cloth or accept a desktop path.
        </p>
        <h2>Shadows and contact with the table</h2>
        <p>
          Peel removes the table. It also removes the contact shadow that made the object sit. A floating bottle on
          #FFFFFF looks cheap in a grid. Either keep a sliver of surface in the original crop (and live with it), or
          add a soft shadow in your theme after download. Peel does not synthesise a floor.
        </p>
        <h2>Batch work</h2>
        <p>
          There is no zip uploader. A browser tab that eats 200 files is a crash with extra steps, and it starts to
          look like a cloud queue — the thing this product is built not to be. If you need a private batch pipeline
          that still never ships pixels off-box, that is a different build. The public tool stays one still.
        </p>
        <p>
          Walk the controls on the <Link to="/how-to">how-to</Link>. If hair-like fringes on fabric keep failing, read{" "}
          <Link to="/limits">limits</Link> before you recrop the same JPEG twenty times.
        </p>
      </Prose>
      <AdUnit slot="mid" className="mt-10" />
    </SiteShell>
  );
}
