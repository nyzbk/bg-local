import { createFileRoute, Link } from "@tanstack/react-router";
import { AdUnit } from "@/components/AdUnit";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { Prose } from "@/components/Prose";
import { SiteShell } from "@/components/SiteShell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/portraits")({
  head: () =>
    pageHead({
      title: "Portrait background removal in the browser — Peel",
      description:
        "Cut a headshot onto transparent PNG or a white plate without uploading. Hair, glasses and iPhone HEIC notes included.",
      path: "/portraits",
      appName: "Portraits",
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
          Peel still does not upload the frame. The face stays in the tab. What you get back is a saliency matte, not
          a studio retouch.
        </p>
        <p>
          Stand a step away from the wall. Soft daylight from the side beats overhead tungsten. Hair against a busy
          hedge will fray; hair against a plain painted wall usually survives a listing-size thumbnail. Glasses
          reflect the room — the net often treats a bright lens flare as background and puts a hole in the glass.
          Tilt the head or kill the bounce before you peel.
        </p>
        <h2>iPhone Camera Roll</h2>
        <p>
          Current iPhones save HEIC. Some Safari versions expose that file to the picker as HEIC, which Peel rejects
          on purpose (the decoder here is JPEG / PNG / WebP). Convert, then drop the JPEG. If Safari already converted
          it behind the scenes, the drop just works. After decode, iOS downscales to 2048 px on the long edge so the
          canvas does not die mid-peel.
        </p>
        <h2>Where to put the cutout</h2>
        <p>
          Transparent PNG is right for a slide, a circular avatar that your app already masks, or a poster with a
          designed field. White plate is right when a directory or HR portal refuses alpha. Use the matching tools:{" "}
          <Link to="/transparent-png">transparent</Link> and <Link to="/white-background">white</Link>. Do not flatten
          to JPEG unless you accept a white box.
        </p>
        <h2>Likeness and other people</h2>
        <p>
          You are responsible for the face in the frame. Peel does not check consent. Do not peel a photograph you
          do not have the right to use, and do not treat a cutout as anonymisation — the person is still obvious.
          Watermarks and agency credits on a headshot are not “background”. Stripping them is outside the{" "}
          <Link to="/terms">terms</Link>.
        </p>
        <p>
          Full sequence: <Link to="/how-to">how to peel</Link>. Hair, tulle and smoke notes: <Link to="/limits">limits</Link>.
        </p>
      </Prose>
      <AdUnit slot="mid" className="mt-10" />
    </SiteShell>
  );
}
