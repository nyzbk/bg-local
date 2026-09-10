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
] as const;
