import { createFileRoute } from "@tanstack/react-router";
import { AdUnit } from "@/components/AdUnit";
import { HomeFaq } from "@/components/Faq";
import { HomeCopy } from "@/components/HomeCopy";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { PeelApp } from "@/components/PeelApp";
import { SiteShell } from "@/components/SiteShell";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: `${APP_NAME} — Free Background Remover · Transparent PNG · No Upload`,
      description: APP_DESCRIPTION,
      path: "/",
    }),
  component: Home,
});

function Home() {
  return (
    <SiteShell>
      <JsonLd />
      <PeelApp />
      <HowItWorks />
      <HomeCopy />
      <AdUnit slot="mid" className="mt-10" />
      <HomeFaq />
    </SiteShell>
  );
}
