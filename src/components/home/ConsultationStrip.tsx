"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function ConsultationStrip() {
  return (
    <section className="py-8 bg-surface-elevated-translucent border-t border-subtle overflow-hidden" aria-labelledby="consultation-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <h3 id="consultation-heading" className="font-heading font-semibold text-xl sm:text-2xl text-primary">
              Ready to get started?
            </h3>
            <p className="text-textmuted mt-1">Book a free consultation today.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">Book a free consultation</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}