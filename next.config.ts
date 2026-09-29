import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * AVIF first, WebP as the fallback. Project photography is the heaviest
     * asset on the site (the `work-*.jpeg` sources run 50–180 KB each), and
     * AVIF is roughly 30% smaller than WebP at the same perceived quality.
     * Next only ever serves a format the browser advertises support for, so
     * this costs older browsers nothing.
     */
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
