import { createFileRoute, Link } from "@tanstack/react-router";
import { AdUnit } from "@/components/AdUnit";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/how-to")({
  head: () =>
    pageHead({
      title: "How to remove a photo background in the browser — Peel",
      description:
        "Step-by-step: prepare a still, drop it into Peel, wait for the 4.7 MB model on first visit, refine the mask, download a transparent or white PNG. Nothing is uploaded.",
      path: "/how-to",
    }),
  component: HowToPage,
});

function HowToPage() {
  return (
    <SiteShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Peel", path: "/" },
          { name: "How to", path: "/how-to" },
        ]}
      />
      <Prose>
        <h1 className="text-3xl font-semibold tracking-tight">How to peel a background in this tab</h1>
        <p>
          Peel is a short sequence, not a cloud job. The photo is decoded here, a small net draws a mask, you download
          a PNG. Below is the order that actually works on a laptop and on iPhone Safari, including the two failures
          people hit on day one: HEIC from Camera Roll, and judging the mask against a checkerboard they then
          screenshot.
        </p>

        <h2>1. Shoot or pick a still that has a subject</h2>
        <p>
          U²-NetP looks for a salient object. A product on a kitchen table, a person standing a step in front of a
          wall, a bag on asphalt — those work. A landscape with no foreground object, a collage of five items, or a
          screenshot of a screenshot will produce a mushy matte. Light the subject harder than the backdrop if you can.
          Avoid white-on-white unless you are ready to recrop.
        </p>
        <p>
          File types Peel opens: JPEG, PNG, WebP, under 15 MB. GIF, SVG, PDF and video are out. iPhone photos saved as
          HEIC often arrive as a type this decoder rejects. Convert them to JPEG first (any HEIC converter that runs
          on-device is fine), then drop the JPEG. On iOS, Peel also downscales the long edge to 2048 px before
          inference so WebKit does not kill the canvas.
        </p>

        <h2>2. Open Peel and wait out the first download</h2>
        <p>
          The first visit fetches two static files from this origin: the 4.7 MB <code className="font-mono text-sm">u2netp.onnx</code>{" "}
          weights and the onnxruntime-web WASM engine. That is not your photo leaving the machine. A progress bar
          reports the model. Cache Storage keeps both files, so the second peel on the same browser is much closer to
          instant. If you are on a metered mobile radio, do the first load on Wi-Fi.
        </p>

        <h2>3. Drop the file, then press Peel</h2>
        <p>
          Use the drop zone or the file picker. The image should appear in the original pane. If you see an error about
          HEIC, empty files or an unsupported type, stop — converting is faster than retrying the same blob. The Peel
          control stays disabled until a bitmap is in memory and the model reports ready. Tap targets are at least 44 px
          so the button is usable with a thumb.
        </p>
        <p>
          Inference runs in a Worker. The main thread stays free enough to show a spinner. Typical laptop time after
          the model is warm is a couple of seconds. A large 12 MP still on an older phone can take longer and can still
          fail if the GPU is already full; shrink the JPEG and try once more.
        </p>

        <h2>4. Read the mask on the checkerboard</h2>
        <p>
          Switch the preview to the cutout. Holes in the subject mean the threshold is too hungry or the net missed a
          low-contrast limb. Chunks of sofa stuck to a sleeve mean the opposite. Threshold (default 50) is the hard
          cut of the saliency map. Feather 0 / 1 / 2 px blurs that cut so you do not get a jagged halo. One pixel of
          feather is the usual listing thumbnail. Zero is better on hard graphic logos. Two is a last resort on hair.
        </p>
        <p>
          The checkerboard is CSS. It is not in the file. Do not screenshot it and upload that PNG to a shop. If you
          need white, switch to Solid and keep #FFFFFF, then download. That path is documented on{" "}
          <Link to="/white-background">white background</Link>. If you need alpha, stay on Transparent —{" "}
          <Link to="/transparent-png">transparent PNG notes</Link>.
        </p>

        <h2>5. Download, then look at the file in another app</h2>
        <p>
          Download writes a PNG from the canvas. Open it in Preview, Photos, or your design tool. Edges that looked
          fine on a 390 px phone will show matte errors at 100% zoom; that is the 320 px net, not a bug in the PNG
          writer. For a storefront card it is often enough. For a print-pack hero, it is a sketch.
        </p>
        <p>
          iOS Share uses the system sheet when the browser allows file shares. If Share is missing, use Download. Peel
          does not email the file to us. Closing the tab drops the bitmaps from memory.
        </p>

        <h2>6. What to do when it looks wrong</h2>
        <p>
          Recrop so the subject is larger. Reshoot against a darker or simpler wall. Convert HEIC. Lower resolution if
          the tab crashed. Read <Link to="/limits">limits</Link> before you spend an hour on a wine glass. Catalogue
          and headshot specifics are on <Link to="/product-photos">product photos</Link> and{" "}
          <Link to="/portraits">portraits</Link>.
        </p>
        <p>
          Peel will not strip a watermark, will not inpaint a logo, and will not queue 200 SKUs. Those are different
          tools, and some of them are not allowed on this site.
        </p>
      </Prose>
      <AdUnit slot="mid" className="mt-10" />
    </SiteShell>
  );
}
