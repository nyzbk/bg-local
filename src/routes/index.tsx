import { createFileRoute } from "@tanstack/react-router";
import { AdUnit } from "@/components/AdUnit";
import { HomeFaq } from "@/components/Faq";
import { HomeCopy } from "@/components/HomeCopy";
import { HowItWorks } from "@/components/HowItWorks";
import { PeelApp } from "@/components/PeelApp";
import { SiteShell } from "@/components/SiteShell";
import { APP_DESCRIPTION, APP_NAME, HOME_FAQ } from "@/lib/constants";
import { HOME_HOW_TO_STEPS, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: `${APP_NAME} — Free Background Remover · Transparent PNG · No Upload`,
      description: APP_DESCRIPTION,
      path: "/",
      appName: "Peel — Free Background Remover",
      faqs: HOME_FAQ,
      howToName: "How to peel a photo background in the browser",
      howToSteps: HOME_HOW_TO_STEPS,
      includeApp: true,
    }),
  component: Home,
});

function Home() {
  return (
    <SiteShell>
      <PeelApp
        heading="Peel the background off a photo — in this tab, nothing uploaded"
        lede="Transparent PNG, or a solid color behind the subject. Works on people and products. Fine hair and glass may need a desktop editor."
      />
      <HowItWorks />
      <HomeCopy />
      <AdUnit slot="mid" className="mt-10" />
      <HomeFaq />
    </SiteShell>
  );
}
