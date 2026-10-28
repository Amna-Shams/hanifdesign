"use client";

import Image from "next/image";
import { Sofa, FileText, Compass } from "lucide-react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const miniCards = [
  {
    icon: FileText,
    title: "Planning Applications",
    description: "Full support from concept to approval",
  },
  {
    icon: Sofa,
    title: "Interior Design & Rendering",
    description: "Interior design and photorealistic 3D renders",
  },
  {
    icon: Compass,
    title: "Development Guidance",
    description: "Advice aligned with local planning policy",
  },
] as const;

export function AboutSnapshot() {
  return (
    <section className="pb-6 pt-16 sm:pb-8 sm:pt-20 lg:pb-8 lg:pt-28 bg-surface-elevated-translucent overflow-hidden" aria-labelledby="about-heading">
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
            {/* Mounted with drawing-sheet crop marks in the corners. */}
            <figure className="crop relative aspect-[4/5] overflow-hidden rounded-2xl border border-subtle bg-gradient-to-br from-primary/25 via-surface-elevated to-black">
              <Image
                src="/interior-classic-kitchen-island-portrait.webp"
                alt="Interior render of a classic kitchen with a marble island, gold-framed bar stools and a skylight"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
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
              title="Bringing Your Design Ideas to Life"
              subtitle="Professional Planning, Design & Visualisation Services"
              align="left"
            />

            <div className="space-y-4 text-justify text-textmuted leading-relaxed">
              <p>
                At Hanif Design &amp; Consultancy Ltd, we specialise in providing
                professional planning consultancy, creative design solutions, interior
                design concepts and high-quality 2D and 3D visualisation services for
                residential and commercial projects.
              </p>
              <p>
                Serving clients across England, we combine practical property design
                knowledge with creative expertise to transform ideas into clear,
                functional and visually appealing design proposals.
              </p>
              <p>
                With 40 years of professional experience at Director level, our team
                provides personalised guidance throughout the design process, from
                initial concepts and space planning to detailed presentation drawings,
                realistic interior and exterior renderings, and supporting project
                documentation.
              </p>
              <p>
                Whether you are a homeowner planning property improvements, a developer
                exploring new opportunities or a business looking to enhance its
                premises, we are committed to delivering professional, practical and
                visually engaging solutions.
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
                  <div className="w-10 h-10 rounded-lg bg-overlay-faint border border-hairline-tint flex items-center justify-center text-gold mb-3">
                    <card.icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading font-semibold text-primary mb-1">{card.title}</h3>
                  <p className="text-textmuted text-sm">{card.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
