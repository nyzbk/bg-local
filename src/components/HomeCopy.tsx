import { Link } from "@tanstack/react-router";
import { Prose } from "./Prose";

export function HomeCopy() {
  return (
    <Prose>
      <h2>A background remover that never takes the photo</h2>
      <p>
        Most “free background removers” are a form in front of someone else’s GPU. You drop a portrait, wait on a
        spinner, and hope the privacy policy means what the landing page implied. Peel is the other design: the cutout
        is computed in this browser tab. The pixels of your photo are not posted to Peel, not posted to a removal API,
        and not stored on a disk we control.
      </p>
      <p>
        The engine is a small open-source net, U²-NetP, running through onnxruntime-web inside a Web Worker. The weight
        file is about 4.7 megabytes and is served from this same origin at <code className="font-mono text-sm">/models/u2netp.onnx</code>.
        The first visit downloads it once and Cache Storage keeps it. After that, peeling a still is a local job:
        resize, normalise, infer a 320×320 saliency mask, upsample, feather, write a PNG.
      </p>
      <p>
        That architecture is the whole product. It is also the reason Peel is slower on a first load than a cloud demo,
        and sharper on the privacy question. If you open DevTools during a peel you should not see a multipart upload
        of the image. You should see the model and the WASM runtime, then canvas work.
      </p>

      <h2>Transparent PNG or a solid plate</h2>
      <p>
        Two exports cover almost every still people actually need. Transparent PNG is the default: subject on alpha, so
        you can drop the file on a slide, a product page, a thumbnail, or a design file without a halo of studio grey.
        JPEG cannot do this. If a site asks for a “transparent JPG”, they are asking for a white rectangle.
      </p>
      <p>
        Solid fill is the marketplace path. Amazon, Etsy, many Shopify themes and print-on-demand panels reject alpha
        and want a white (or brand-colour) studio plate. Switch Peel to Solid, keep white, download. The checkerboard
        you see in the preview is a local overlay so you can judge the mask; it is not burned into the file unless you
        ask for a colour.
      </p>
      <p>
        Step-by-step notes live on the <Link to="/how-to">how-to page</Link>. Dedicated walkthroughs cover{" "}
        <Link to="/transparent-png">transparent PNG</Link>, <Link to="/white-background">white backdrops</Link>, a{" "}
        <Link to="/backdrop">photograph as the plate</Link>,{" "}
        <Link to="/product-photos">catalogue stills</Link> and <Link to="/portraits">portraits</Link>. Hard cases —
        hair, glass, HEIC, memory — are listed honestly on <Link to="/limits">limits</Link>. After you download, the
        file still has to survive iPhone Photos, WhatsApp photo-send, and listing forms —{" "}
        <Link to="/iphone">Files vs Photos</Link>, <Link to="/whatsapp">WhatsApp flatten</Link>,{" "}
        <Link to="/marketplace">marketplace recode</Link>.
      </p>

      <h2>What Peel is, and what it is not</h2>
      <p>
        Peel is a single-image utility. One still at a time, JPG / PNG / WebP, under 15 MB. On iPhone the long edge is
        capped at 2048 px before inference so Safari does not run the tab out of canvas memory. HEIC from Camera Roll
        is the usual surprise: some iOS versions hand the page a HEIC blob that this decoder will not open. Convert to
        JPEG first, then drop the JPEG here.
      </p>
      <p>
        Peel is not a watermark remover, not a video pipeline, not a 200-SKU batch farm, and not a desktop studio. Fine
        hair against a busy hedge, wine glasses, bike spokes and white shirts on a white wall will look like a 320 px
        saliency net looking at them — because that is what they are. The threshold and feather controls recover a
        usable edge for a listing thumbnail. They will not replace a clipping path on a hero packshot.
      </p>
      <p>
        The weights are Apache-2.0. We do not ship AGPL browser kits and we do not run BRIA RMBG checkpoints, which are
        non-commercial without a paid licence. That is a legal constraint, not a slogan.
      </p>

      <h2>How a peel actually runs</h2>
      <p>
        Drop or pick a file. The main thread decodes it, downscales if needed, and packs RGB into an NCHW float tensor
        with ImageNet mean and std. The worker loads the ONNX session (or reuses one) and returns a single-channel
        mask. We stretch that mask back to the source size, apply a threshold you can move, optionally blur by one or
        two pixels, then write alpha (or composite a solid colour underneath). Download is a PNG blob from the canvas.
        Share on iOS uses the Web Share API when the browser allows file shares; otherwise it falls back to a download.
      </p>
      <p>
        None of those steps require an account. Closing the tab drops the bitmaps. Ads, if and when this site is
        approved to show them, measure page views. They do not receive the photograph.
      </p>
    </Prose>
  );
}
