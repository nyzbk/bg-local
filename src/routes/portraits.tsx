import { createFileRoute, Link } from "@tanstack/react-router";
import { AdUnit } from "@/components/AdUnit";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Faq } from "@/components/Faq";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { portraitsFaq } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/portraits")({
  head: () =>
    pageHead({
      title: "Portrait background removal in the browser — Peel",
      description:
        "Cut a headshot onto transparent PNG or a white plate without uploading. Hair, glasses, likeness and iPhone HEIC notes. The face stays in this tab.",
      path: "/portraits",
      appName: "Portraits",
      faqs: portraitsFaq,
    }),
  component: PortraitsPage,
});

function PortraitsPage() {
  return (
    <SiteShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Peel", path: "/" },
          { name: "Portraits", path: "/portraits" },
        ]}
      />
      <Prose>
        <h1 className="text-3xl font-semibold tracking-tight">Headshots without sending the face anywhere</h1>
        <p>
          A portrait is the case people worry about on privacy, and the case a 4.7 MB net is only “good enough” on.
          Peel still does not upload the frame. The face is decoded with Canvas, inferred in a Worker, and encoded to
          PNG in this tab. What you get back is a saliency matte, not a studio retouch, not frequency separation, and
          not a beauty filter.
        </p>
        <p>
          Stand a step away from the wall. Soft daylight from the side beats overhead tungsten. Hair against a busy
          hedge will fray; hair against a plain painted wall usually survives a listing-size thumbnail. Glasses
          reflect the room — the net often treats a bright lens flare as background and puts a hole in the glass.
          Tilt the head or kill the bounce before you peel. A second peel with more feather will not invent glass that
          the 320×320 pass never saw.
        </p>
        <h2>What this page is, and what it is not</h2>
        <p>
          This URL is the portrait crop and lighting problem: one person, head-and-shoulders or three-quarter, a wall
          you can step off, a decision between transparent PNG and a white plate. It is not the iPhone save path —
          after download, Safari’s Share → Save Image vs Files is <Link to="/iphone">/iphone</Link>. It is not the
          WhatsApp recode — photo-send vs document-send is <Link to="/whatsapp">/whatsapp</Link>. It is not a
          marketplace listing well — that ingest is <Link to="/marketplace">/marketplace</Link>.
        </p>
        <h2>iPhone Camera Roll</h2>
        <p>
          Current iPhones save HEIC. Some Safari versions expose that file to the picker as HEIC, which Peel rejects
          on purpose (the decoder here is JPEG / PNG / WebP). Convert, then drop the JPEG. If Safari already converted
          it behind the scenes, the drop just works. After decode, iOS downscales to 2048 px on the long edge so the
          canvas does not die mid-peel. Convert-first is also on <Link to="/how-to">/how-to</Link> and the hard list
          is on <Link to="/limits">/limits</Link>. Do not paste the same HEIC twenty times hoping the decoder will
          grow.
        </p>
        <h2>Hair, tulle, beards</h2>
        <p>
          U²-NetP is a saliency net, then we upsample and feather. Flyaway hair on a busy background becomes a soft
          fringe at thumbnail size and a broken halo at print size. A dark jumper on a dark sofa is the same miss in
          clothes form. Crop so the head fills most of the square before you peel. Feather 1 is the default; 2 helps a
          small avatar; 0 is for a hard edge you will clip again in a desktop editor. None of those sliders is a
          clipping path.
        </p>
        <h2>Where to put the cutout</h2>
        <p>
          Transparent PNG is right for a slide, a circular avatar that your app already masks, or a poster with a
          designed field. White plate is right when a directory or HR portal refuses alpha. Use the matching tools:{" "}
          <Link to="/transparent-png">transparent</Link> and <Link to="/white-background">white</Link>. Do not flatten
          to JPEG unless you accept a white box. A photo of a real studio behind the person is{" "}
          <Link to="/backdrop">/backdrop</Link> — two files, cover-crop — not a hex and not this page.
        </p>
        <h2>Likeness and other people</h2>
        <p>
          You are responsible for the face in the frame. Peel does not check consent. Do not peel a photograph you
          do not have the right to use, and do not treat a cutout as anonymisation — the person is still obvious.
          Watermarks and agency credits on a headshot are not “background”. Stripping them is outside the{" "}
          <Link to="/terms">terms</Link> and against the advertising policy this site is built under. Group shots with
          two equal faces confuse the net: it will pick one blob or smear them. Shoot one person.
        </p>
        <p>
          Full sequence: <Link to="/how-to">how to peel</Link>. Hair, tulle and smoke notes: <Link to="/limits">limits</Link>.
        </p>
      </Prose>
      <Faq items={portraitsFaq} title="Portrait questions" />
      <AdUnit slot="mid" className="mt-10" />
    </SiteShell>
  );
}
