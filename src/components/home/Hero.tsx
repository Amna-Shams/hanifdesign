import Image from "next/image";

/**
 * Full-bleed photographic hero. The homepage header floats over the top of it
 * (see layout/HomeHeader), so the section fills the viewport and the headline
 * sits at the bottom left over a soft scrim.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-[#0b0d12]">
      <Image
        src="/home-hero.webp"
        alt="Stone-fronted civic building with arched windows beside a tree-lined public square"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/65 via-black/10 to-black/55"
      />

      <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16">
        <h1 className="!font-serif !text-white text-4xl font-normal leading-[1.1] sm:text-5xl lg:text-[3.5rem]">
          Hanif Design &amp; Planning Consultancy
          <br />
          across Birmingham
        </h1>
      </div>
    </section>
  );
}
