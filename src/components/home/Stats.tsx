"use client";

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: "30+", label: "Years experience" },
  { value: "500+", label: "Projects completed" },
  { value: "100%", label: "Client satisfaction" },
  { value: "24/7", label: "Support available" },
] as const;

export function Stats() {
  return (
    <section className="bg-surface-translucent py-16 sm:py-20 lg:py-24" aria-labelledby="stats-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="stats-heading" className="sr-only">
          Key statistics
        </h2>

        <dl className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: index * 0.09, ease: EASE }}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-heading text-4xl font-bold text-gold sm:text-5xl">
                  {stat.value}
                </span>
                <span className="mt-2 block text-sm text-secondary sm:text-base">
                  {stat.label}
                </span>
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
