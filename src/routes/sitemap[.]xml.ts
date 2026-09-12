import { createFileRoute } from "@tanstack/react-router";
import { CONTENT_LASTMOD, SITE_ORIGIN, SITEMAP_PATHS, SITEMAP_PRIORITY } from "@/lib/seo";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_PATHS.map((path) => {
  const loc = path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
  const priority = SITEMAP_PRIORITY[path] ?? "0.8";
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${CONTENT_LASTMOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join("\n")}
</urlset>
`;
        return new Response(body, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
