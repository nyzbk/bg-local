import type { FaqItem } from "@/lib/constants";
import {
  APP_DESCRIPTION,
  APP_NAME,
  HUB_URL,
} from "@/lib/constants";

export const SITE_ORIGIN = "https://bg-local.vercel.app";

export const CONTACT_EMAIL = "ultaultimatum@gmail.com";

export const CONTENT_LASTMOD = "2026-09-12";

/** 404 host. Do not emit in canonical, sitemap loc, or llms.txt. */
export const DEAD_HOST = "https://peel-local.vercel.app";

const OG_IMAGE = `${SITE_ORIGIN}/og.jpg`;

export function absUrl(path: string): string {
  if ((SITE_ORIGIN as string) === DEAD_HOST) {
    throw new Error("peel-local.vercel.app is not the public origin");
  }
  if (path === "/" || path === "") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

const publisher = {
  "@type": "Organization",
  name: "Ultimatum",
  email: CONTACT_EMAIL,
  url: HUB_URL,
  sameAs: [HUB_URL],
};

function socialMeta(title: string, description: string, url: string) {
  return [
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: "en_US" },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: OG_IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: APP_NAME },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: OG_IMAGE },
  ];
}

export type JsonLdOpts = {
  appName: string;
  path: string;
  description: string;
  faqs?: readonly FaqItem[];
  howToName?: string;
  howToSteps?: string[];
  includeApp?: boolean;
};

export function jsonLdScripts(opts: JsonLdOpts) {
  const url = absUrl(opts.path);
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: APP_NAME,
    url: `${SITE_ORIGIN}/`,
    description: APP_DESCRIPTION,
    inLanguage: "en",
    publisher,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: APP_NAME,
        item: `${SITE_ORIGIN}/`,
      },
      ...(opts.path !== "/"
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: opts.appName,
              item: url,
            },
          ]
        : []),
    ],
  };
  const scripts: { type: string; children: string }[] = [
    { type: "application/ld+json", children: JSON.stringify(website) },
    { type: "application/ld+json", children: JSON.stringify(breadcrumb) },
  ];
  if (opts.includeApp) {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: opts.appName,
        url,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript. Image bytes stay in this tab.",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: opts.description,
        featureList: [
          "Transparent PNG cutout",
          "Solid hex plate including white",
          "Photo backdrop composite",
          "On-device U²-NetP",
          "No upload",
        ],
        publisher,
        screenshot: OG_IMAGE,
      }),
    });
  }
  if (opts.faqs?.length) {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: opts.faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }),
    });
  }
  if (opts.howToName && opts.howToSteps?.length) {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: opts.howToName,
        description: opts.description,
        step: opts.howToSteps.map((text, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          text,
        })),
      }),
    });
  }
  return scripts;
}

export function pageHead(opts: {
  title: string;
  description: string;
  path: string;
  appName?: string;
  faqs?: readonly FaqItem[];
  howToName?: string;
  howToSteps?: string[];
  includeApp?: boolean;
}) {
  const url = absUrl(opts.path);
  const appName = opts.appName ?? APP_NAME;
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      ...socialMeta(opts.title, opts.description, url),
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLdScripts({
      appName,
      path: opts.path,
      description: opts.description,
      faqs: opts.faqs,
      howToName: opts.howToName,
      howToSteps: opts.howToSteps,
      includeApp: opts.includeApp ?? false,
    }),
  };
}

export const SITEMAP_PATHS = [
  "/",
  "/transparent-png",
  "/white-background",
  "/backdrop",
  "/how-to",
  "/product-photos",
  "/portraits",
  "/limits",
  "/iphone",
  "/whatsapp",
  "/marketplace",
  "/faq",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export const SITEMAP_PRIORITY: Record<string, string> = {
  "/": "1.0",
  "/transparent-png": "0.9",
  "/white-background": "0.9",
  "/backdrop": "0.9",
  "/how-to": "0.9",
};

export const HOME_HOW_TO_STEPS = [
  "Drop a JPG, PNG or WebP. Bytes stay in this tab. Convert Camera-roll HEIC first.",
  "Tap Peel. U²-NetP runs in a Web Worker at 320 px, then the mask is upsampled. First visit fetches 4.7 MB from this origin.",
  "Download a transparent PNG, or switch to Solid #FFFFFF for listings that reject alpha. Nothing was uploaded.",
];
