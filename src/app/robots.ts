import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * `/robots.txt`, generated from the same origin as the sitemap and canonicals.
 *
 * Without this file a crawler gets a 404, which is technically "allow
 * everything" but is not what a production site should be serving: it advertises
 * that no crawl rules were ever considered, and it is the file Search Console
 * reads to decide where to send the sitemap from.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The legal pages carry `noindex` in their own metadata, but there is no
        // reason for a crawler to spend budget fetching them at all.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
