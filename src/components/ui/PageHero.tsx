import type { ReactNode } from "react";
import Image from "next/image";

interface PageHeroProps {
  image: string;
  alt: string;
  title: string;
  subtitle?: string;
  /** Optional call to action rendered under the subtitle. */
  children?: ReactNode;
}

/**
 * Full-viewport photographic hero used at the top of the main pages, matching
 * the homepage: the fixed `HomeHeader` floats over it, the headline sits at the
 * bottom left over a soft scrim, and the page content follows on scroll.
 *
 * The h1 and subtitle force their colour and font because the global heading
 * and paragraph rules are unlayered and would otherwise override utilities.
 */
export function PageHero({ image, alt, title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-[#0b0d12]">
      <Image
        src={image}
        alt={alt}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/10 to-black/45"
      />

      <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16">
        <h1 className="max-w-5xl text-4xl font-normal leading-[1.1] !font-serif !text-white sm:text-5xl lg:text-[3.5rem]">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 max-w-3xl text-base leading-relaxed !text-white/90 sm:text-lg">
            {subtitle}
          </p>
        ) : null}
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </section>
  );
}
