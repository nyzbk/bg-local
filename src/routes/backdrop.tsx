import { createFileRoute, Link } from "@tanstack/react-router";
import { AdUnit } from "@/components/AdUnit";
import { BackdropApp } from "@/components/BackdropApp";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Faq } from "@/components/Faq";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { backdropFaq } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/backdrop")({
  head: () =>
    pageHead({
      title: "Put a cutout on a real photo backdrop — Peel",
      description:
        "Composite a peeled subject onto a backdrop photograph in this tab. Cover-crop, not a hex fill. Two files, no upload.",
      path: "/backdrop",
      appName: "Photo backdrop",
      faqs: backdropFaq,
      includeApp: true,
    }),
  component: BackdropPage,
});

function BackdropPage() {
  return (
    <SiteShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Peel", path: "/" },
          { name: "Photo backdrop", path: "/backdrop" },
        ]}
      />
      <BackdropApp />
      <Prose>
        <h2>A photograph is not a hex</h2>
        <p>
          Peel on the homepage writes either a transparent PNG or a solid colour behind the mask. Those two jobs are
          already live: <Link to="/transparent-png">transparent PNG</Link> keeps holes;{" "}
          <Link to="/white-background">white background</Link> fills <code className="font-mono text-sm">#FFFFFF</code>{" "}
          (or another hex) with a destination-over paint. This page is a third plate: a <strong>second photograph</strong>
          , cover-cropped to the subject canvas, then the cutout drawn on top. The holes of the mask show backdrop
          pixels, not a checkerboard and not a studio white.
        </p>
        <p>
          That is the only ceiling here. It is not how to light a SKU — that is <Link to="/product-photos">product photos</Link>.
          It is not what a listing form does after upload — <Link to="/marketplace">marketplace</Link>. It is not where
          iPhone puts a PNG with alpha — <Link to="/iphone">iPhone</Link>. It is not WhatsApp flattening a photo-send
          to JPEG — <Link to="/whatsapp">WhatsApp</Link>. Those pages stay those jobs.
        </p>
        <p>
          Two files, both still in this tab. The subject is the still U²-NetP peels. The backdrop is any JPG / PNG /
          WebP scene you already have: a painted wall, a wooden table, a street, a paper sweep you actually photographed.
          Peel does not invent a cyclorama and it does not inpaint. If the backdrop is busy, the mask still has to be
          honest or the edge will look like a sticker.
        </p>

        <h2>Cover, not letterbox</h2>
        <p>
          The output canvas is the subject’s size after Peel’s usual long-edge cap (2048 on iPhone, 4096 on desktop).
          The backdrop is scaled with <em>cover</em>: the shorter side of the scene is fitted to the canvas, the rest
          is clipped and centred. A 3:2 interior behind a 1:1 product loses the sides of the room. A tall doorway
          behind a wide packshot loses floor and ceiling. That is the trade: the subject is not letterboxed with empty
          bands, and we do not shrink the product into a tiny actor on a wide set.
        </p>
        <p>
          If you need the whole scene visible, crop the subject or shoot the backdrop closer to the product aspect
          before you drop it. This control will not add a layout editor. It will not perspective-warp the floor. It
          will not match a vanishing point. Those are a set or a 3D scene, not a saliency net plus{" "}
          <code className="font-mono text-sm">drawImage</code>.
        </p>

        <h2>Why a photo plate survives a JPEG recode better than alpha</h2>
        <p>
          A transparent PNG is the right file when the next app composites. A photo-send, a lot of CMS wells, and many
          “upload image” forms recode to JPEG. JPEG has no alpha, so the holes become a plate the host picks — often
          white, sometimes black. A backdrop composite is already opaque. The JPEG still compresses, still may
          downscale, still may strip metadata — but it does not have to invent a colour for the holes. That is why this
          export is a different object from the homepage Transparent download.
        </p>
        <p>
          It is still not a marketplace white still. Amazon-style rules want a clean #FFFFFF, not your kitchen wall.
          Use Solid on <Link to="/white-background">white background</Link> for that ingest. Use this page when the
          next hop is a lifestyle card, a lookbook, a slide, or a chat that will JPEG you anyway and you would rather
          they JPEG a scene than a checker.
        </p>

        <h2>What this control does not do</h2>
        <p>
          It does not add a second drop to the homepage Peel. <Link to="/">/</Link> and{" "}
          <Link to="/white-background">/white-background</Link> stay one file. It does not batch. It does not inpaint
          hair onto the new scene. It does not match colour temperature between subject and wall — if the product is
          tungsten and the backdrop is noon, you will see it. Shoot them closer, or grade later.
        </p>
        <p>
          It does not fetch a stock photo for you. Drop a file you have the right to use. We do not ship a gallery of
          rooms. We do not wrap an unsplash request. Copyrighted backdrops in the output are your problem, not a Peel
          feature.
        </p>
        <p>
          Watermark removal is still forbidden. If the “backdrop” is a screenshot of someone else’s listing, do not use
          this site to hide their mark. Hard cases for the mask itself — glass, hair, white-on-white — remain on{" "}
          <Link to="/limits">limits</Link>. HEIC still needs a JPEG first; that input note lives on{" "}
          <Link to="/how-to">how-to</Link>.
        </p>

        <h2>How a run is supposed to feel</h2>
        <ol>
          <li>Drop the subject. You should see the filename under that well.</li>
          <li>Drop the backdrop. A different well. Not a hex picker.</li>
          <li>Threshold and feather are the same knobs as the homepage mask. They do not colour-grade the scene.</li>
          <li>Peel onto backdrop. First visit still loads U²-NetP from this origin, then Cache Storage.</li>
          <li>Judge the preview. If the subject vanished, the mask failed — try a clearer still, not a busier wall.</li>
          <li>Download PNG. Open it in another app. The checkerboard on the homepage is not this file.</li>
        </ol>
        <p>
          After download, iPhone Files vs Photos is still <Link to="/iphone">iPhone</Link>. If the next hop is a
          listing form that demands white, go back to Solid. If the next hop is WhatsApp, a photo-send of this opaque
          PNG is their JPEG of a scene — better than their JPEG of alpha, still not an archive. Keep the PNG in Files.
        </p>

        <h2>Honesty</h2>
        <p>
          We do not copy a Photoshop “place into” tutorial. We do not promise every mask will sit on every wall. Cover
          crop is a geometry choice, not a studio. The engine is still U²-NetP at 320×320; this page only changes what
          sits under the alpha. Ads, if this origin is ever Ready, measure page views, not the two photographs.
        </p>
      </Prose>
      <Faq items={backdropFaq} title="Photo backdrop" />
      <AdUnit slot="mid" className="mt-10" />
    </SiteShell>
  );
}
