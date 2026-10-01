import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { Reveal } from "@/components/ui/Reveal";

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
        <section
          className="flex min-h-[80vh] items-center bg-surface-translucent py-20 sm:py-24 lg:py-28"
          aria-labelledby="not-found-heading"
        >
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
            {/*
              One block reveal rather than a per-line cascade: the 404 and the
              heading are both above the fold on most viewports, and a page
              whose only job is to explain a dead link should not animate its
              message in.
            */}
            <Reveal
              duration={0.7}
              amount={0.15}
              className="crop relative rounded-lg border border-subtle bg-surface-elevated px-6 py-12 text-center sm:px-12 sm:py-16"
            >
              {/* The sheet reference, borrowing the drafting annotations from the
                  about page's figure. The two labels sit together on narrow
                  viewports and split to the sheet's edges from `sm` up. */}
              <div className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-between">
                <span className="annotation text-gold">Sheet 404</span>
                <span className="annotation text-muted">Not issued</span>
              </div>

              <p className="mb-4 font-heading text-7xl font-bold leading-none text-gold sm:text-8xl lg:text-9xl">
                404
              </p>

              <h1
                id="not-found-heading"
                className="mb-4 text-balance font-heading text-3xl font-bold text-primary sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
              >
                This page wasn&rsquo;t in the plan.
              </h1>

              <p className="mx-auto mb-10 max-w-xl text-balance text-base leading-relaxed text-secondary sm:text-lg">
                The page you&rsquo;re looking for doesn&rsquo;t exist or may have been
                moved.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
                <Button variant="gold" size="lg" asChild>
                  <Link href="/">
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Back to Home
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/services">View Services</Link>
                </Button>
                <Button variant="ghost" size="lg" asChild>
                  <Link href="/projects">View Projects</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner />
      <FloatingActions />
    </div>
  );
}
