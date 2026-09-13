import { createFileRoute, Link } from "@tanstack/react-router";
import { AdUnit } from "@/components/AdUnit";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Faq } from "@/components/Faq";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { productPhotosFaq } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/product-photos")({
  head: () =>
    pageHead({
      title: "Product photo background removal in the browser — Peel",
      description:
        "Cut catalogue stills onto white or transparent PNG without uploading. One SKU, fill the frame, contact-shadow notes. Not a 200-item farm and not the listing-form recode.",
      path: "/product-photos",
      appName: "Product photos",
      faqs: productPhotosFaq,
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
          with a busy rug. Peel will not invent a missing corner of a box, a bottle cap that was out of frame, or a
          label that the highlight blew out.
        </p>
        <p>
          For marketplaces that demand a white plate, open the <Link to="/white-background">white background tool</Link>{" "}
          and download PNG. For a theme that composites onto a colour block, use{" "}
          <Link to="/transparent-png">transparent PNG</Link>. Do not upload a screenshot of Peel’s checkerboard; that
          pattern is a preview, and validators treat it as a defect. A lifestyle photograph as the plate is{" "}
          <Link to="/backdrop">/backdrop</Link>, two files, not a hex.
        </p>
        <h2>What this page is, and what it is not</h2>
        <p>
          This URL is how to shoot and crop one SKU so a 320×320 saliency net can see it. It is not Peel’s Solid
          control — that preset lives on <Link to="/white-background">/white-background</Link>. It is not what Amazon,
          Etsy or Shopify do to the file after you press upload — that recode and alpha-reject is{" "}
          <Link to="/marketplace">/marketplace</Link>. Mixing those three jobs into one article would be the synonym
          republish Google’s unique-content rule warns about. Keep them apart.
        </p>
        <h2>What the net actually sees</h2>
        <p>
          Inference is 320 pixels on the long side of a square. A tiny SKU in the middle of a 12 MP still is a few
          pixels of object and a lot of table. Crop first. Reflective bottles, clear blisters, chrome and jewellery
          are the usual misses: the net paints the highlight as background and you get a bite out of the glass. Reshoot
          on a mid-grey cloth or accept a desktop path. White product on a white table is the same miss in catalogue
          form — the net cannot see a boundary you did not light. That failure mode is also on{" "}
          <Link to="/limits">/limits</Link>, because it is a model ceiling, not a marketplace rule.
        </p>
        <h2>Shadows and contact with the table</h2>
        <p>
          Peel removes the table. It also removes the contact shadow that made the object sit. A floating bottle on
          #FFFFFF looks cheap in a grid. Either keep a sliver of surface in the original crop (and live with it), or
          add a soft shadow in your theme after download. Peel does not synthesise a floor, a cyclorama, or a
          reflection. If you need a horizon line, shoot a real sweep or composite on <Link to="/backdrop">/backdrop</Link>.
        </p>
        <h2>Batch work</h2>
        <p>
          There is no zip uploader. A browser tab that eats 200 files is a crash with extra steps, and it starts to
          look like a cloud queue — the thing this product is built not to be. If you need a private batch pipeline
          that still never ships pixels off-box, that is a different build. The public tool stays one still. Wrapping
          this page as an upload API is outside the <Link to="/terms">terms</Link>.
        </p>
        <p>
          Walk the controls on the <Link to="/how-to">how-to</Link>. If hair-like fringes on fabric keep failing, read{" "}
          <Link to="/limits">limits</Link> before you recrop the same JPEG twenty times. What a listing form does to
          the file after upload is a different page — <Link to="/marketplace">marketplace</Link> — not this one.
        </p>
      </Prose>
      <Faq items={productPhotosFaq} title="Catalogue questions" />
      <AdUnit slot="mid" className="mt-10" />
    </SiteShell>
  );
}
