import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Canonical host.
 *
 * One hostname serves the site; the other permanently redirects to it. Two
 * hosts answering the same content splits link equity and confuses canonical
 * signals, so this has to be settled before launch.
 *
 * Set `NEXT_PUBLIC_SITE_URL` in the deployment environment to the host you want
 * to be canonical (e.g. https://hanifplanning.co.uk). The non-canonical variant
 * is derived from it — and crucially only that one variant is redirected.
 * Declaring both directions would make www and apex redirect to each other
 * forever.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hanifplanning.co.uk";
const CANONICAL_HOST = new URL(SITE_URL).host;
const CANONICAL_IS_APEX = !CANONICAL_HOST.startsWith("www.");
const NON_CANONICAL_HOST = CANONICAL_IS_APEX
  ? `www.${CANONICAL_HOST}`
  : CANONICAL_HOST.replace(/^www\./, "");

/**
 * Content Security Policy.
 *
 * Scoped to what this site actually loads, rather than a generic policy that
 * would need loosening the first time anything broke:
 *
 * - `frame-src` is the one third party that is genuinely embedded: the
 *   consent-gated Google Maps iframe. Without it the map silently fails.
 * - `style-src` needs `unsafe-inline` because React sets element styles directly
 *   (the `next/image` `fill` pattern positions images with inline styles) and
 *   Tailwind's preflight is inlined. Removing it breaks image layout.
 * - `script-src` needs `unsafe-inline` for Next's own bootstrap and route
 *   payload. A nonce-based policy would be stricter, but it requires proxy or
 *   middleware cooperation to thread the nonce through every script tag, which
 *   this project does not have. Treated as a known trade-off, not a finished job.
 * - `unsafe-eval` is development-only: the dev overlay and React Fast Refresh
 *   need it, and it has no business in production.
 */
const csp = [
  "default-src 'self'",
  // `blob:` covers next/image optimisation output in some browsers.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  // The consent-gated Google Maps embed.
  "frame-src https://maps.google.com https://www.google.com",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const nextConfig: NextConfig = {
  images: {
    /**
     * AVIF first, WebP as the fallback. Project photography is the heaviest
     * asset on the site, and AVIF is roughly 30% smaller than WebP at the same
     * perceived quality. Next only ever serves a format the browser advertises
     * support for, so this costs older browsers nothing.
     */
    formats: ["image/avif", "image/webp"],
  },

  /**
   * Host and protocol normalisation.
   *
   * Everything is served from a single canonical https host:
   *   http://example.com       -> https://canonical-host
   *   https://www.canonical    -> https://canonical-host   (or the reverse)
   *
   * 308 is used deliberately: it is cacheable by browsers and keeps the method
   * and body intact, so a POST to the wrong host is not turned into a GET the
   * way a 301/302 can do.
   *
   * Skipped entirely in development, where the host is localhost and none of
   * this applies.
   */
  async redirects() {
    if (isDev) return [];

    return [
      // Any http:// request -> https, preserving path and query.
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "x-forwarded-proto",
            value: "http",
          },
        ],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
      // Non-canonical host -> canonical host (exactly one direction).
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "host",
            value: NON_CANONICAL_HOST,
          },
        ],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Redundant with `frame-ancestors` in the CSP, but older browsers
          // only understand this one.
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            // The site needs none of these; deny them so a future dependency
            // cannot quietly start asking for a camera or microphone.
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          // Only in production: HSTS on a plain-http local dev server is
          // meaningless at best and painful to undo at worst.
          ...(isDev
            ? []
            : [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=63072000; includeSubDomains; preload",
                },
              ]),
        ],
      },
      // Fingerprinted build output is immutable by definition, so it can be
      // cached for a year instead of revalidated on every navigation.
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
