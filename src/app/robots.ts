import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * `/robots.txt`, generated from the same origin as the sitemap and canonicals.
 *
 * Legal pages are NOT disallowed here on purpose: they carry `noindex` in
 * their own metadata, and a crawler must be able to fetch a page to see that
 * tag. Blocking them in robots.txt would stop Google reading the `noindex`.
 */
export default function robots(): MetadataRoute.Robots {
  // Only the real production deployment may be indexed.
  const isProd = process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production";

  if (!isProd) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}