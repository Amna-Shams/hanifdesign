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
