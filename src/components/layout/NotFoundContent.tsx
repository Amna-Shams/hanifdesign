import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The 404 message block, shared by the root not-found page (which supplies its
 * own header and footer) and the `(marketing)` not-found page (which already
 * sits inside the marketing layout's header and footer).
 */
export function NotFoundContent() {
  return (
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
  );
}
