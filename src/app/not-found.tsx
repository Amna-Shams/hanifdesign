import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { NotFoundContent } from "@/components/layout/NotFoundContent";

/**
 * Root not-found page.
 *
 * This lives at `src/app/` rather than inside the `(marketing)` group because
 * Next uses this file for URLs that match no route at all, and that render path
 * does not pass through the group layout. Header/Footer are composed here
 * explicitly so a 404 still looks like the rest of the site, and the page
 * reuses the drafting language already established elsewhere on the site: the
 * blueprint grid comes from the root layout's `GridBackground`, the sheet
 * reference and corner crop marks from the about page's figure, and the same
 * Reveal/Button/SectionHeading primitives the rest of the site animates with.
 *
 * Next returns a real 404 status for this document (it is a static, non-streamed
 * server component) and injects `<meta name="robots" content="noindex">` for
 * the 404 response by itself. Declaring `robots` here as well only produced a
 * second, conflicting tag, so it is deliberately left off.
 */
export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you are looking for does not exist or may have been moved.",
};

export default function NotFound() {
  return (
    /*
     * No background fill on the wrapper, for the same reason the marketing
     * layout omits one: the root layout's `z-index: -1` grid wallpaper has to
     * stay visible, and an opaque fill here would paint straight over it. The
     * section below uses a translucent wash so the grid reads through.
     */
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <NotFoundContent />
      </main>

      <Footer />
      <CookieBanner />
      <FloatingActions />
    </div>
  );
}
