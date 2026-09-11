export const SITE_ORIGIN = "https://bg-local.vercel.app";

export const CONTACT_EMAIL = "ultaultimatum@gmail.com";

export function pageHead(opts: {
  title: string;
  description: string;
  path: string;
}) {
  const url = `${SITE_ORIGIN}${opts.path === "/" ? "/" : opts.path}`;
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${SITE_ORIGIN}/og.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE_ORIGIN}/og.jpg` },
    ],
    links: [{ rel: "canonical", href: url }],
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
  "/llms.txt",
] as const;
