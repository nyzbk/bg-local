type Crumb = { name: string; path: string };

/** @deprecated BreadcrumbList now emits from pageHead scripts. Kept so route imports typecheck. */
export function BreadcrumbJsonLd(_props: { items: Crumb[] }) {
  return null;
}