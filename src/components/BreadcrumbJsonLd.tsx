import { SITE_ORIGIN } from "@/lib/seo";

type Crumb = { name: string; path: string };

export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_ORIGIN}${item.path === "/" ? "/" : item.path}`,
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
