import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Root not-found page.
 *
 * This lives at `src/app/` rather than inside the `(marketing)` group because
 * Next uses this file for URLs that match no route at all, and that render path
 * does not pass through the group layout. Header/Footer are composed here
 * explicitly so a 404 still looks like the rest of the site.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-lightgray py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />

          {/* The whole card is one block rather than a per-line cascade: the 404
              and the h1 are both above the fold on most viewports, so staggered
              lines would just delay the message. */}
          <Reveal duration={0.7} className="relative mx-auto w-full max-w-2xl px-4 text-center sm:px-6">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
              <Compass className="h-7 w-7 text-gold" aria-hidden="true" />
            </div>

            <p className="mb-2 font-heading text-6xl font-bold text-gold sm:text-7xl">404</p>

            <h1 className="mb-4 font-heading text-3xl font-bold text-primary sm:text-4xl">
              Page not found
            </h1>

            <p className="mx-auto mb-8 max-w-lg text-lg leading-relaxed text-secondary">
              The page you&rsquo;re looking for has moved or no longer exists. Let&rsquo;s get you
              back to something useful.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button variant="gold" size="lg" asChild>
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                  Back to home
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/services">Explore our services</Link>
              </Button>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}
