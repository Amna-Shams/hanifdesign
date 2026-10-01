/**
 * Canonical site origin.
 *
 * Set `NEXT_PUBLIC_SITE_URL` in the deployment environment so metadata,
 * canonical URLs and the XML sitemap point at the real domain. The fallback
 * keeps local builds producing absolute URLs rather than throwing on an invalid
 * `metadataBase`.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hanifplanning.co.uk"
).replace(/\/+$/, "");

export const SITE_NAME = "Hanif Design & Consultancy";

/**
 * Builds an absolute canonical URL for a route.
 *
 * `metadataBase` alone is not enough: without an explicit `alternates.canonical`
 * on each page, Next emits no `<link rel="canonical">` at all, and a route that
 * is reachable by more than one URL (trailing slash, query string, `?utm_*`)
 * can then be indexed as several near-duplicate pages competing with itself.
 *
 * Paths are normalised so `/about` and `/about/` cannot produce two different
 * canonicals for the same page.
 */
export function canonical(path: string = "/"): string {
  const clean = path === "/" ? "" : path.replace(/\/+$/, "");
  return `${SITE_URL}${clean}`;
}
