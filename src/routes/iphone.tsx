import { createFileRoute, Link } from "@tanstack/react-router";
import { AdUnit } from "@/components/AdUnit";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Faq } from "@/components/Faq";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { iphoneFaq } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/iphone")({
  head: () =>
    pageHead({
      title: "Save the cutout PNG to Files, not Photos — Peel",
      description:
        "Safari Share into Photos often flattens alpha. Files keeps the transparent PNG Peel wrote. Recents is not an archive. This page is where the file lives after iPhone download.",
      path: "/iphone",
    }),
  component: IPhonePage,
});

function IPhonePage() {
  return (
    <SiteShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Peel", path: "/" },
          { name: "iPhone", path: "/iphone" },
        ]}
      />
      <Prose>
        <p className="text-sm text-muted">Updated 7 September 2026</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          The PNG with alpha lives in Files. Photos is usually a flatten.
        </h1>
        <p>
          Peel writes a PNG. Transparent mode writes an alpha channel. Solid mode still writes PNG, just with an
          opaque plate under the subject. iPhone then decides where that object goes. Safari Download is unreliable.
          Share → Save Image lands in Photos. Recents is a mixed view of screenshots and camera-roll recodes. Files is
          the directory that can actually hold the bytes Peel encoded in this tab. This page is only that split. It is
          not how to shoot a SKU — that is <Link to="/product-photos">product photos</Link>. It is not the white-fill
          control — that is <Link to="/white-background">white background</Link>. It is not HEIC decode; one sentence
          below, then a link to <Link to="/how-to">how to</Link>.
        </p>
        <p>
          People peel a bottle, tap Share, pick the first friendly button, and later upload “the PNG” to a shop. The
          shop receives a JPEG from Photos, or a screenshot of Peel’s checkerboard. The listing looks dirty. Peel did
          not fail. The bucket did. Alpha does not survive a camera-roll recode. JPEG has no alpha. HEIC in Photos is
          not a lossless PNG archive either.
        </p>

        <h2>What Peel actually put on disk</h2>
        <p>
          After inference, the canvas holds RGBA. Transparent export keeps a = 0 behind the subject. Solid export
          composites a colour, often #FFFFFF, then still encodes PNG so edges stay clean. The checkerboard you judged
          the mask against is CSS in the preview. It is not in the file unless you screenshot the preview. Screenshot
          is a new JPEG of a UI. That JPEG includes the board, chrome, and a scale that is no longer the source width.
          Do not upload it. Download the PNG, then open that file in another app.
        </p>
        <p>
          The generator, the Worker, and the model stay on the <Link to="/">homepage</Link>. This article does not
          re-run the net. Closing the tab drops the bitmaps. The file you kept is yours. Peel does not keep a copy on
          a server because the photo never left the device.
        </p>

        <h2>Safari Download is not a Downloads folder like desktop Chrome</h2>
        <p>
          iOS Safari often ignores the HTML download attribute. Sometimes nothing appears. Sometimes a share sheet
          opens. Sometimes a file lands in Files with the stem peel-cutout.png. Do not wait for a Chrome-style
          Downloads list. If the sheet appears, the two buttons that matter are Save to Files and Save Image. They
          are not synonyms. Save to Files is a file. Save Image is the camera roll.
        </p>

        <h2>Files can hold PNG with alpha</h2>
        <p>
          Open the Files app. Look for peel-cutout.png or the stem you typed. Open it. If the backdrop is
          checkerboard or see-through in Preview, you still have alpha. AirDrop that file. Attach it as a document.
          Upload it to a portal that accepts PNG. That object is the canvas Peel wrote. If Preview shows a white
          rectangle and you expected holes, you either exported Solid or you are not looking at the Files object.
        </p>
        <p>
          iCloud Drive versus On My iPhone is a location, not a recode. Either can hold PNG. A managed work profile
          may hide On My iPhone. Save somewhere you can open. Peel does not know MDM. Rename the file before you hand
          it to a shop so they do not save it as IMG_3490.jpg from Photos.
        </p>

        <h2>Photos is a camera roll. Camera rolls flatten alpha.</h2>
        <p>
          Save Image puts the square next to selfies. iOS may keep PNG. iOS may recode to HEIC or JPEG depending on
          Settings → Camera → Formats and how the share sheet classified the blob. You cannot see that recode on a
          thumbnail. You see it when a marketplace validator says “background is not white”, or when a theme composites
          your “transparent” file and you get a dirty plate. Photographic Styles, Enhance, and iCloud Photos
          “Optimise iPhone Storage” are extra recodes. None of them exist to preserve tRNS. None of them are Peel.
        </p>
        <p>
          If you need alpha in the next app — Figma, a slide, a Shopify section that composites onto a colour block —
          start from Files. If the next app only wants a white plate, export Solid on the{" "}
          <Link to="/white-background">white background</Link> page, still save to Files, then upload that PNG. Do not
          hope Photos will keep a checkerboard.
        </p>

        <h2>Recents is a view, not a folder you own</h2>
        <p>
          Recents mixes screenshots of the Peel tab, Save Image recodes, AirDropped pictures, and the occasional real
          download. The first thumbnail that “looks cut out” is often the checkerboard screenshot. Tapping it is how
          people attach the wrong object. If you need Peel’s file, open Files and look for the stem. If you cannot
          find it, Share from the generator again and pick Save to Files.
        </p>

        <h2>HEIC is an input problem, not a download-location problem</h2>
        <p>
          Camera Roll HEIC is often a blob this decoder will not open. Convert to JPEG first, then peel. That sentence
          already lives on <Link to="/how-to">how to</Link> and <Link to="/limits">limits</Link>. This page does not
          become a HEIC converter. This origin is not HEIC Local. Sibling tools do not belong in the header.
        </p>

        <h2>Share sheet buttons lie by being friendly</h2>
        <p>
          Save Image is Photos. Save to Files is Files. Copy may put a bitmap on the clipboard that another app
          recodes without alpha. Markup annotates and flattens. Share into WhatsApp from Photos is a photo-send —
          that pipe is the <Link to="/whatsapp">WhatsApp page</Link>. Share into Mail from Files is an attachment.
          Share into Mail from Photos is often an inline image the other client recodes again. There is no{" "}
          <code>/email</code> article on this origin: Peel does not send mail, and a mailbox is not a cutout.
        </p>

        <h2>The ceiling</h2>
        <p>
          Peel cannot patch Safari’s download attribute. Peel cannot freeze Photos from flattening alpha. Peel cannot
          make a screenshot of the checkerboard into a real matte. Peel cannot sit inside iCloud Photos optimisation.
          Success is: a file you opened in Files, with the alpha you asked for, then handed on as that file. If you
          still pick Recents and send a photo, you sent a photo.
        </p>

        <h2>Steps</h2>
        <ol>
          <li>
            Peel on the <Link to="/">homepage</Link>. Transparent if the next surface composites. Solid white if the
            next surface rejects alpha — details on <Link to="/white-background">white background</Link>.
          </li>
          <li>
            When Safari offers Share, pick Save to Files. iCloud Drive or On My iPhone. Do not pick Save Image unless
            you only need a preview on the roll.
          </li>
          <li>
            Open Files. Find the PNG. Confirm alpha or the solid plate in Preview. If the board from the site is in
            the pixels, you screenshotted. Delete it. Download again.
          </li>
          <li>
            Hand that Files object to the next app. If the next hop is a chat, read{" "}
            <Link to="/whatsapp">WhatsApp</Link>. If the next hop is a listing form, read{" "}
            <Link to="/marketplace">marketplace</Link>.
          </li>
        </ol>

        <h2>What looks like a bug and is not</h2>
        <ul>
          <li>Safari did not show a Downloads list. That is Safari. Use Files.</li>
          <li>The thumbnail in Photos looks fine and the listing does not. Photos displayed a recode. Files is the master.</li>
          <li>AirDrop arrived as JPEG on a Mac. You AirDropped from Photos. AirDrop from Files.</li>
          <li>Clipboard paste into Keynote lost the holes. Clipboard is a bitmap path. Place the PNG file.</li>
          <li>A screenshot of the generator includes the checkerboard. That pattern is CSS. It is a defect in a shop.</li>
          <li>iCloud “Optimise Storage” replaced a PNG with a smaller derivative. Keep the master in Files, not only in Photos.</li>
          <li>Work profile hid On My iPhone. Save to a location you can open.</li>
        </ul>

        <h2>iPad, Mac Safari, and “Open in…” are still not Photos</h2>
        <p>
          iPad Safari is the same download attribute problem with a larger screen. A stage-manager window does not
          create a Downloads folder. Files still holds the PNG. “Open in Preview” from the share sheet on a Mac can
          place a real file in Downloads — that path is closer to desktop Chrome and is not this page’s failure mode.
          Continuity Camera and Sidecar are extra hops. Each hop can recode. If the master left iPhone via AirDrop
          from Photos, the Mac already lost alpha.
        </p>
        <p>
          Shortcuts that “save to Photos” are a trap you wrote yourself. A Shortcut that saves to Files with a .png
          name is fine. Peel does not ship Shortcuts. We will not debug a gallery of automations. The test is always
          the same: open the object in Files or Finder, confirm alpha or the solid plate, then hand that object on.
        </p>
        <h2>Why the checkerboard on a phone looks like the product</h2>
        <p>
          On a 390 px preview the CSS board reads as “cut out”. At 100% in Preview the same PNG may show a fringe
          the 320 px net left on a sleeve. That fringe is a mask limit, documented on{" "}
          <Link to="/limits">limits</Link>, not a Files bug. The opposite error is also common: the PNG is clean and
          the listing is dirty because you uploaded a screenshot of the board. Zoom the file, not the tab. If you see
          grey squares in the pixels, you do not have Peel’s PNG.
        </p>
        <p>
          Dark Mode on iPhone does not change PNG bytes. It changes how Preview composites alpha over a dark chrome.
          A cutout that looks correct on a dark Files preview can still be a white-plate listing. Judge transparent
          files over a known colour, or switch Peel to Solid before export if the next surface is a shop.
        </p>
        <h2>Name the file before anyone else does</h2>
        <p>
          peel-cutout.png is fine on your phone. A shop that receives five files named IMG_3488.jpg will recode the
          wrong one. Rename in Files to sku-colour-front.png. Do not rename in Photos — that is still the camera roll.
          Do not rely on the share sheet’s “Copy Name”. The stem lives in Peel’s download control on the homepage.
          If you typed a custom stem, that is the filename Files should show. If Files shows a UUID, you saved a
          screenshot or a Photos export.
        </p>
        <p>
          AirDrop from Files to a Mac, then inspect with a tool that shows channels. If you only have Preview, use
          a coloured background behind the window. If the subject sits on white and you asked for holes, you are
          looking at a flatten. Go back to the generator and download again. Do not “fix” a flatten by raising
          Peel’s threshold — the mask is not the object you are holding.
        </p>


        <p>
          We write about what this origin does. We do not copy Apple’s Files user guide. We do not promise every iOS
          version keeps PNG in Photos. We do not promise a shop will refuse to recode a PNG you uploaded through a
          “photo” field. We do not decode HEIC here. We do not batch 200 SKUs. Test the Files object in the next app
          before you call the cutout finished.
        </p>
        <p>
          Also on this origin:{" "}
          <Link to="/whatsapp">WhatsApp flattens alpha on photo-send</Link>
          {" · "}
          <Link to="/marketplace">listing forms recode or reject alpha</Link>
          {" · "}
          <Link to="/how-to">how to peel</Link>
          {" · "}
          <Link to="/transparent-png">transparent PNG</Link>
          {" · "}
          <Link to="/limits">limits</Link>.
        </p>
      </Prose>
      <Faq items={iphoneFaq} title="iPhone questions" />
      <AdUnit slot="mid" className="mt-10" />
    </SiteShell>
  );
}
