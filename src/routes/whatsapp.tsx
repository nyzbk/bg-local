import { createFileRoute, Link } from "@tanstack/react-router";
import { AdUnit } from "@/components/AdUnit";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Faq } from "@/components/Faq";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { whatsappFaq } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/whatsapp")({
  head: () =>
    pageHead({
      title: "WhatsApp recodes a photo-send and flattens alpha — Peel",
      description:
        "Send the cutout as a WhatsApp document if you need the PNG. Photo-send is their JPEG. Transparent pixels become a plate you did not pick.",
      path: "/whatsapp",
      appName: "WhatsApp and alpha",
      faqs: whatsappFaq,
    }),
  component: WhatsAppPage,
});

function WhatsAppPage() {
  return (
    <SiteShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Peel", path: "/" },
          { name: "WhatsApp", path: "/whatsapp" },
        ]}
      />
      <Prose>
        <p className="text-sm text-muted">Updated 7 September 2026</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Photo-send flattens alpha. Document-send can carry the PNG.
        </h1>
        <p>
          Peel’s job ends when the PNG exists in this tab. WhatsApp’s job starts when you attach something. Those are
          different programs. A photo-send is their image pipeline: resize, JPEG, often a white or black plate where
          alpha was. A document-send is a file the other person can save. Status, View once, and a forwarded bubble
          are more recodes. This page is only that pipe. It is not QR modules. It is not AVIF. It is not GPS. It is
          not a 25 MB mailbox. Peel does not sit inside WhatsApp and does not raise their format ceiling.
        </p>
        <p>
          The usual failure: someone peels a product onto transparency, taps Share → WhatsApp, sends it as a photo,
          and the buyer sees a ragged white box. The mask was fine in Peel. The chat flattened it. If you needed the
          holes, you needed a document, or you needed Solid white before you sent a photo —{" "}
          <Link to="/white-background">white background</Link>.
        </p>

        <h2>What a photo-send actually transmits</h2>
        <p>
          WhatsApp treats an image share as a picture in a bubble. Pictures are compressed for the chat. JPEG has no
          alpha. The encoder has to pick a colour for every previously-clear pixel. That colour is not Peel’s Solid
          picker. It is their flatten. Hair, bottle edges and feathered mattes become a halo against that plate. HD
          photo toggle, if the client shows one, is still their JPEG, not Peel’s PNG. You cannot see the flatten on
          your own bubble at phone size. You see it when the other person drops the image into a listing or a slide.
        </p>
        <p>
          Desktop WhatsApp and the phone app are not one encoder. A file that looked all right on a laptop preview
          can still arrive as a smaller JPEG on the phone. Do not debug Peel’s threshold because a chat preview looks
          soft. Open the original PNG from Files — <Link to="/iphone">iPhone / Files</Link> — and compare.
        </p>

        <h2>Document-send is the pipe that can keep PNG</h2>
        <p>
          Attach as a document. The other person gets a file they can export, not only a bubble. PNG with alpha can
          survive this path. They still have to save it as a file, not “save image” back into a camera roll. If they
          tap the document and the client immediately opens a recoded preview, tell them to use Save / Export. Peel
          cannot write that instruction into WhatsApp’s UI.
        </p>
        <p>
          Document-send is slower to open. People avoid it because a photo is one tap. One tap is how alpha dies. If
          the cutout is the artwork, pay the extra tap. If the cutout is just “look at this mug”, a photo-send of a
          Solid white PNG is enough — peel to white first, then send the photo.
        </p>

        <h2>Status, View once, stickers, and forwards</h2>
        <p>
          Status is not an archive. View once is not an archive. A sticker is a new asset WhatsApp built. Forwarding
          a photo bubble forwards the JPEG, not Peel’s canvas. None of those are how you hand a printer a matte. If
          you must show a cutout in Status, treat it as a preview and keep the PNG in Files as the master.
        </p>

        <h2>Hair, glass, and their JPEG</h2>
        <p>
          U²-NetP already struggles with hair and glass — honest notes on <Link to="/limits">limits</Link>. WhatsApp’s
          JPEG then smudges the leftover fringe. Raising Peel’s feather to hide a chat recode is the wrong order.
          Export the best mask you can, save the PNG, send the document. If the other person only needs a thumbnail
          in chat, export Solid and send a photo of that plate. Do not add two pixels of feather “for WhatsApp”.
        </p>

        <h2>What Peel does before the chat</h2>
        <p>
          Decoding, inference and PNG encoding run in this tab. The photo is not posted to Peel or to WhatsApp until
          you share it. Sharing is your action. Closing the tab drops our bitmaps. We do not receive a copy of the
          chat. Ads, if this site is ever Ready, measure page views, not the pixels in the canvas. The generator stays
          on the <Link to="/">homepage</Link>. Steps: <Link to="/how-to">how to</Link>.
        </p>

        <h2>The ceiling</h2>
        <p>
          Peel cannot disable WhatsApp image compression. Peel cannot force a photo-send to keep tRNS. Peel cannot
          make Status store a PNG. Peel cannot make the other person’s “save image” land in Files instead of Photos.
          Success is: you sent a document, they saved a file, that file still has the alpha or the plate you chose.
          If you sent a photo, you sent their JPEG.
        </p>

        <h2>Steps</h2>
        <ol>
          <li>
            Peel on the <Link to="/">homepage</Link>. Transparent only if the other person will composite. Otherwise
            Solid white.
          </li>
          <li>
            Save to Files first — <Link to="/iphone">iPhone</Link>. Do not Share the preview screenshot.
          </li>
          <li>
            In WhatsApp: attach document, pick the PNG. Caption it so they do not treat it as a casual photo.
          </li>
          <li>
            Ask them to save the file, then open it in Preview or a design tool. If they only screenshot your bubble,
            they have a JPEG of a JPEG.
          </li>
          <li>
            If they must upload to a shop next, they should use the file, not the bubble —{" "}
            <Link to="/marketplace">marketplace</Link>.
          </li>
        </ol>

        <h2>What looks like a bug and is not</h2>
        <ul>
          <li>The bubble looks white around the subject. Photo-send flattened alpha. Send a document, or export Solid first.</li>
          <li>HD toggle did not restore holes. HD is still JPEG.</li>
          <li>Forwarded copy is worse. Each hop is another recode of the JPEG, not of Peel’s canvas.</li>
          <li>Desktop preview looked sharper than the phone. Two clients, one photo pipeline.</li>
          <li>They saved from the bubble into Photos and lost alpha. That is Photos, covered on the iPhone page.</li>
          <li>Sticker maker ate the fringe. Stickers are a different asset. Do not use them as the master.</li>
        </ul>

        <h2>Groups, broadcast lists, and business profiles</h2>
        <p>
          A group of twenty people is twenty clients. Each client may recode the bubble again when it downloads the
          preview. Broadcast lists are still photo-send. A WhatsApp Business catalogue is closer to a listing form —
          that ingest belongs on <Link to="/marketplace">marketplace</Link>, not here. Do not paste a Business-API
          help article onto this origin. Peel is not a seller-centre plugin. If you use a desktop CRM that “posts to
          WhatsApp”, assume it sends a JPEG unless you watched it attach a document.
        </p>
        <p>
          Quoted replies thumbnail the bubble. The thumbnail is not the PNG. Designers who grab the quote instead of
          the document will composite a 64 px JPEG. Tell them the filename. If you cannot remember the filename, you
          did not save to Files first.
        </p>
        <h2>Voice notes and PDFs are unrelated, and that is the point</h2>
        <p>
          WhatsApp can carry a PDF, a voice note, a location pin. None of those restore alpha in a photo-send. Bind
          is a different product for images-to-PDF; it is not this header. A PDF of a cutout is a page of paper, not
          a matte. If you needed a printable sheet of SKUs, that is another job. This URL stays the flatten of a
          single PNG in a chat.
        </p>

        <p>
          We do not copy WhatsApp’s help centre. We do not promise a future app version will keep PNG in photo-send.
          We do not run a bot in the chat. We do not compress “for WhatsApp” inside Peel — that would be guessing
          their encoder. We do not create an <code>/email</code> or <code>/android</code> URL on this origin: a
          mailbox and an OEM camera are different jobs, and similar pages fail uniqueness review. If the next surface
          is a listing form, stop using this page as the shop manual.
        </p>
        <p>
          Also on this origin:{" "}
          <Link to="/iphone">Files vs Photos</Link>
          {" · "}
          <Link to="/marketplace">marketplace recode</Link>
          {" · "}
          <Link to="/white-background">solid white plate</Link>
          {" · "}
          <Link to="/transparent-png">transparent PNG</Link>
          {" · "}
          <Link to="/how-to">how to</Link>.
        </p>
      </Prose>
      <Faq items={whatsappFaq} title="WhatsApp questions" />
      <AdUnit slot="mid" className="mt-10" />
    </SiteShell>
  );
}
