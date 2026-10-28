"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    number: "01",
    title: "Discovery & Consultation",
    description: "We listen, assess feasibility, and outline options.",
  },
  {
    number: "02",
    title: "Design & Drawings",
    description: "We prepare drawings and documentation aligned to policy.",
  },
  {
    number: "03",
    title: "Planning Submission",
    description: "We submit and manage the application with the council.",
  },
  {
    number: "04",
    title: "Approval & Support",
    description: "We deliver the approved plans and guide your next steps.",
  },
] as const;

/**
 * Four numbered stages laid out like a drawing schedule: a hairline rule across
 * the top of each column with a short gold tick that runs out to full width on
 * hover, a mono "Step" reference and plain type underneath. No icons — the step
 * titles carry the meaning, and the section reads as part of the site's
 * drafting language rather than a row of feature cards.
 */
export function ProcessSection() {
  return (
    <section
      className="relative overflow-hidden bg-surface-translucent py-16 sm:py-20 lg:py-24"
      aria-labelledby="process-heading"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <SectionHeading
            id="process-heading"
            eyebrow="Our Process"
            title="How We Work"
            subtitle="A clear, structured path from concept to approved plans."
            align="center"
          />
        </motion.div>

        <ol className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: EASE }}
              className="group relative border-t border-subtle pt-6"
            >
              <span
                aria-hidden="true"
                className="absolute -top-px left-0 h-px w-14 bg-gold transition-[width] duration-500 ease-out group-hover:w-full motion-reduce:transition-none"
              />
              <span className="annotation block text-gold">Step {step.number}</span>
              <h3 className="mt-4 font-heading text-xl font-semibold leading-snug text-primary">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-secondary">{step.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
