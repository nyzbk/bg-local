import { APP_DESCRIPTION, APP_NAME, FAQ } from "@/lib/constants";
import { CONTACT_EMAIL, SITE_ORIGIN } from "@/lib/seo";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: APP_NAME,
        url: SITE_ORIGIN,
        description: APP_DESCRIPTION,
      },
      {
        "@type": "WebApplication",
        name: APP_NAME,
        url: SITE_ORIGIN,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: APP_DESCRIPTION,
        browserRequirements: "Requires JavaScript. Runs entirely in the browser.",
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "Organization",
        name: APP_NAME,
        url: SITE_ORIGIN,
        email: CONTACT_EMAIL,
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
