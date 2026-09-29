"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { BlockTextReveal } from "@/components/ui/BlockTextReveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const trustItems = [
  "30+ Years Experience",
  "500+ Projects Delivered",
  "100% Client Satisfaction",
  "Perry Barr, Birmingham",
] as const;

export function Hero() {
  return (
    /* No local background: the blueprint grid and warm glow are the site-wide
       wallpaper rendered once by the root layout. Duplicating them here would
       stack two grids on the one page that already shows the global one. */
    <section className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden py-20">
      <div className="relative mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-gold"
        >
          <span aria-hidden="true" className="h-px w-6 shrink-0 bg-gold/60 sm:w-10" />
          <span className="annotation">Planning Consultancy &middot; Perry Barr</span>
          <span aria-hidden="true" className="h-px w-6 shrink-0 bg-gold/60 sm:w-10" />
        </motion.p>

        <BlockTextReveal
          as="h1"
          text="Planning & Design Support for Residential Projects in Birmingham"
          className="mb-6 font-heading text-4xl font-bold leading-[1.12] tracking-[-0.02em] text-primary sm:text-5xl lg:text-6xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-secondary sm:text-xl"
        >
          Trusted planning consultancy helping homeowners and developers turn their ideas into
          approved projects.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.62, ease: EASE }}
          className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button variant="gold" size="lg" asChild>
            <Link href="/services">Explore our services</Link>
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/contact">Book a free consultation</Link>
          </Button>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="crop grid grid-cols-1 min-[380px]:grid-cols-2 gap-x-4 gap-y-6 border-t border-subtle px-4 pt-8 sm:grid-cols-4 sm:gap-4"
        >
          {trustItems.map((item) => {
            const [value, label] = splitTrust(item);
            return (
              <div key={item} className="text-center sm:text-left">
                <dt className="sr-only">{item}</dt>
                <dd>
                  <span className="block font-heading text-lg font-bold text-gold sm:text-xl">
                    {value}
                  </span>
                  <span className="annotation mt-1.5 block text-muted">{label}</span>
                </dd>
              </div>
            );
          })}
        </motion.dl>
      </div>
    </section>
  );
}

/** "30+ Years Experience" -> ["30+", "Years Experience"] */
function splitTrust(item: string): [string, string] {
  const index = item.indexOf(" ");
  return index === -1 ? [item, ""] : [item.slice(0, index), item.slice(index + 1)];
}
