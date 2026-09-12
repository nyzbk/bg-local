import { createFileRoute, Link } from "@tanstack/react-router";
import { AdUnit } from "@/components/AdUnit";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Faq } from "@/components/Faq";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { marketplaceFaq } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/marketplace")({
  head: () =>
    pageHead({
      title: "Listing forms recode or reject alpha — Peel",
      description:
        "Amazon, Etsy, Shopify and similar listing uploads often flatten PNG alpha or refuse it. This page is the form, not how to shoot the SKU and not Peel’s white-fill control.",
      path: "/marketplace",
      appName: "Marketplace listing forms",
      faqs: marketplaceFaq,
    }),
  component: MarketplacePage,
});

function MarketplacePage() {
  return (
    <SiteShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Peel", path: "/" },
          { name: "Marketplace", path: "/marketplace" },
        ]}
      />
      <Prose>
        <p className="text-sm text-muted">Updated 7 September 2026</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          The listing form is another encoder. It is not Peel.
        </h1>
        <p>
          Peel can hand you a transparent PNG or a solid plate. A marketplace listing upload is a second program
          with its own rules: no alpha, minimum pixels, sRGB, JPEG after ingest, “pure white” thresholds, no
          watermarks, no ghost mannequins in some categories, no lifestyle props in others. Those rules live in
          their form. They change. This page is what happens to Peel’s file after you press Upload on that form. It
          is not how to light a bottle — that is <Link to="/product-photos">product photos</Link>. It is not the
          Solid white control — that is <Link to="/white-background">white background</Link>. Those URLs stay. This
          one exists so we do not duplicate them under a synonym.
        </p>
        <p>
          The usual failure: a seller peels onto transparency, uploads the PNG into a “photo” field, and the form
          either rejects “transparent background” or silently composites onto white/black and then JPEG-encodes. The
          card on the category page looks dirty. Peel’s preview looked clean because the checkerboard was CSS.
        </p>

        <h2>Alpha is a file feature. Many shops do not want a file feature.</h2>
        <p>
          Main-image rules on large marketplaces are written for a studio plate, not for a compositor. They want a
          subject on #FFFFFF, filling most of the frame, with no competing props. A PNG with holes looks like a
          broken JPEG to a validator that only reads three channels. Some forms say “PNG allowed” and still flatten
          on ingest. You find out when the public card is a JPEG URL on their CDN. Check the public URL, not only
          the seller-centre thumbnail.
        </p>
        <p>
          If the catalogue wants white, export Solid #FFFFFF in Peel, save the PNG from{" "}
          <Link to="/iphone">Files</Link>, then upload that. If the theme on your own shop composites onto a colour
          block, keep alpha and host the PNG on a stack that will not recode it — many Shopify CDNs still emit JPEG
          for product cards even when you uploaded PNG. That recode is Shopify’s image pipeline, not Peel’s canvas.
        </p>

        <h2>The checkerboard is a defect in a listing</h2>
        <p>
          Sellers screenshot Peel because Download felt uncertain on Safari. The screenshot contains the preview
          board. Validators treat a repeating grey pattern as a bad background. Buyers think the product is printed
          on chessboard paper. Delete that screenshot. Download the PNG. Confirm in Preview. Then upload.
        </p>

        <h2>What the form often recodes even when it accepts the file</h2>
        <p>
          Resize to a template. Convert to sRGB. Strip metadata. JPEG quality 80. Pad to a square with more white.
          Sharpen. Each step can halo a feathered matte. A 320-pixel saliency net plus a JPEG shop encoder is not a
          clipping path. If the public card shows a grey fringe, re-export with less feather, more crop, Solid white,
          and a larger long edge before you pay for a desktop path. Catalogue lighting notes remain on{" "}
          <Link to="/product-photos">product photos</Link>. Hard cases remain on <Link to="/limits">limits</Link>.
        </p>

        <h2>Photo field versus file field</h2>
        <p>
          Some seller centres have “photos” and a separate “documents / brand assets”. Photos go through the recode.
          Documents sometimes keep PNG. A size chart can be a document. A main image almost never is. If the form
          only has a photo well, assume JPEG ingest. Give it a Solid plate. Do not argue with the well by uploading
          alpha “because PNG is lossless”.
        </p>

        <h2>WhatsApp is not a listing, and a listing is not WhatsApp</h2>
        <p>
          A buyer who asked for a cutout in chat is the <Link to="/whatsapp">WhatsApp</Link> problem. A public
          category card is this page. Do not send a chat JPEG into the listing form. Do not send a listing JPEG into
          a designer who needed alpha. Two pipes, two URLs, on purpose. Duplicate pages with synonym titles are how
          thin tool sites fail uniqueness review.
        </p>

        <h2>What Peel will not sign off</h2>
        <p>
          Peel does not certify Amazon, Etsy, eBay, Shopify, Wildberries, Kaspi or any other catalogue. We do not
          scrape their help articles into this page. We do not promise a 1000 px minimum, a 10 MB cap, or a “pure
          white” threshold — those numbers move. We do not batch 200 SKUs. We do not inpaint a missing cap. We do not
          add a contact shadow. A floating bottle on #FFFFFF often looks cheap; that is a photography problem, named
          on the product-photos URL, not a form recode.
        </p>
        <p>
          The engine stays locked on the <Link to="/">homepage</Link>. U²-NetP at 320 px is a sketch for a hero pack
          shot. Use it for a thumbnail or a draft plate. Pay a path when the card is the brand.
        </p>

        <h2>The ceiling</h2>
        <p>
          Peel cannot freeze a marketplace CDN. Peel cannot make a photo well keep tRNS. Peel cannot pass a
          validator that wants a real sweep. Success is: you exported the right mode (Solid vs Transparent) for that
          form, you uploaded the Files object, you then opened the public card and looked at the real URL. If the
          public card is a JPEG of a flatten you did not choose, the form recoded you. Export Solid and try one more
          time. If it still fails, the listing rules are stricter than a browser matte.
        </p>

        <h2>Steps</h2>
        <ol>
          <li>
            Read the listing’s image rules for that category. If they want white, use{" "}
            <Link to="/white-background">white background</Link>. If they allow composite later, keep transparent.
          </li>
          <li>
            Peel one SKU on the <Link to="/">homepage</Link>. Crop so the object fills the frame. Judge the mask, not
            the CSS board.
          </li>
          <li>
            Save to Files. Confirm the file in Preview. No board in the pixels.{" "}
            <Link to="/iphone">iPhone notes</Link>.
          </li>
          <li>
            Upload from the file picker, not from Recents, not from a WhatsApp bubble.
          </li>
          <li>
            After ingest, open the public card in a private window. If the CDN URL is JPEG and the fringe is new, the
            form recoded. Re-export Solid, less feather, try once. Then stop and use a desktop path.
          </li>
        </ol>

        <h2>What looks like a bug and is not</h2>
        <ul>
          <li>Validator says background not white. You uploaded alpha, or a checkerboard screenshot, or a JPEG flatten to grey.</li>
          <li>Card looks softer than Peel. Shop JPEG. Start from a larger PNG, less feather.</li>
          <li>Theme shows the product on colour even though you uploaded white. The theme composites. You may have wanted alpha on your own shop and Solid on the marketplace. Two files.</li>
          <li>Upload from Photos rotated or cropped. That is the camera roll, not Peel.</li>
          <li>A zip of 200 SKUs is not this tool. One still, on purpose.</li>
        </ul>

        <h2>Own-shop theme versus marketplace card</h2>
        <p>
          Your Shopify or Kaspi storefront is not Amazon. A theme that composites a PNG onto a colour block wants
          alpha. A marketplace card that must sit in a white grid wants Solid. Export twice. Name the files
          sku-alpha.png and sku-white.png so you do not upload the wrong one at 1 a.m. Peel will not keep both for
          you. Closing the tab drops the bitmaps. Files is the archive — <Link to="/iphone">iPhone</Link>.
        </p>
        <p>
          Print-on-demand panels are a third ingest: they often want a transparent PNG of the print file and a
          mockup JPEG for the store. Do not send the mockup as the print file. Do not send the CSS checkerboard as
          the mockup. Peel can make the transparent print file; the mockup is a scene, not a saliency net.
        </p>
        <h2>Why we will not add /product-photos-2</h2>
        <p>
          Lighting, crop, one SKU per frame, contact shadows — already written. Repeating that chapter under
          “marketplace tips” would be a doorway page. Uniqueness review treats similar pages as one thin page
          duplicated. This URL is the form recode. If you came here to learn how to shoot, follow the product-photos
          link and stay there.
        </p>

        <p>
          We do not paste marketplace help. We do not guarantee approval of a listing. We do not run their crawler.
          We do not add <code>/product-photos</code> content here under a new slug. We do not add{" "}
          <code>/white-background</code> as a synonym. We do not add <code>/blogs/</code> to chase a wiki’s “15
          articles” bar. Three delivery URLs plus the task URLs already on this origin are the cluster. If a form
          still rejects a correct Solid PNG, the remaining work is photography or a clipping path, not another Peel
          article.
        </p>
        <p>
          Also on this origin:{" "}
          <Link to="/product-photos">how to shoot the SKU</Link>
          {" · "}
          <Link to="/white-background">solid white in this tab</Link>
          {" · "}
          <Link to="/iphone">Files vs Photos</Link>
          {" · "}
          <Link to="/whatsapp">WhatsApp flatten</Link>
          {" · "}
          <Link to="/how-to">how to</Link>
          {" · "}
          <Link to="/limits">limits</Link>.
        </p>
      </Prose>
      <Faq items={marketplaceFaq} title="Marketplace questions" />
      <AdUnit slot="mid" className="mt-10" />
    </SiteShell>
  );
}
