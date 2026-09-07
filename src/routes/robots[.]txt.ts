import { createFileRoute } from "@tanstack/react-router";
import { SITE_ORIGIN } from "@/lib/seo";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const body = `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Mediapartners-Google
Allow: /

User-agent: AdsBot-Google
Allow: /

User-agent: Yandex
Allow: /

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;
        return new Response(body, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
