"use client";

import Image from "next/image";
import Link from "next/link";
import { Building2, FileText, Compass } from "lucide-react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const miniCards = [
  {
    icon: FileText,
    title: "Planning Applications",
    description: "Full support from concept to approval",
  },
  {
    icon: Building2,
    title: "Design Drawings",
    description: "Clear, buildable, planning-ready drawings",
  },
  {
    icon: Compass,
    title: "Development Guidance",
    description: "Advice aligned with local planning policy",
  },
] as const;

export function AboutSnapshot() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-surface-elevated-translucent overflow-hidden" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            {/* The photograph is mounted like a sheet on a drawing: crop marks
                in the corners, a sheet reference in the margin. */}
            <figure className="crop relative aspect-[4/5] overflow-hidden rounded-2xl border border-subtle bg-gradient-to-br from-primary/25 via-surface-elevated to-black">
              <Image
                src="/work-04.jpeg"
                alt="Residential project photography by Hanif Design & Consultancy"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent"
              />
              {/* The mono labels are unbreakable at ~8.8px per character, so the
                  two of them side by side overrun a 288px figure. Stack them on
                  mobile and hide the short one until there is room. */}
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:p-5">
                <span className="annotation min-w-0 text-gold">Sheet A-01 &middot; Residential</span>
                <span className="annotation hidden min-w-0 text-muted sm:inline">Birmingham</span>
              </figcaption>
            </figure>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <SectionHeading
              eyebrow="About Us"
              title="Empowering Residential Projects Through Expert Planning Support"
              align="left"
            />

            <div className="space-y-4 text-textmuted leading-relaxed">
              <p>
                Hanif Design & Consultancy has been guiding homeowners, developers,
                and architects through the UK planning system for over three decades.
                Based in Perry Barr, Birmingham, we combine deep local authority knowledge with
                practical design expertise to guide clients through every stage of
                the planning process.
              </p>
              <p>
                We understand that securing planning permission is often the biggest
                hurdle in any development project. That&apos;s why we don&apos;t just submit
                applications — we develop comprehensive strategies that anticipate
                officer concerns, address policy requirements, and present your
                project in the best possible light.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {miniCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="p-4 bg-lightgray rounded-xl"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gold mb-3">
                    <card.icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h4 className="font-heading font-semibold text-primary mb-1">{card.title}</h4>
                  <p className="text-textmuted text-sm">{card.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact">Schedule a Free Consultation</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
