"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { FAQS } from "@/lib/faqs";

/** Only the first few questions are shown on the homepage. */
const PREVIEW_COUNT = 5;

export function FAQPreview() {
  return (
    <section
      className="overflow-hidden bg-surface-translucent py-16 sm:py-20 lg:py-28"
      aria-labelledby="faq-preview-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row lg:mb-16"
        >
          <SectionHeading
            id="faq-preview-heading"
            eyebrow="FAQ"
            title="Frequently asked questions"
            align="left"
            className="mb-0"
          />

          <Button variant="ghost" size="sm" asChild className="shrink-0">
            <Link href="/faq">
              View all FAQs
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl"
        >
          <FAQAccordion items={FAQS.slice(0, PREVIEW_COUNT)} idPrefix="faq-preview" />

          <div className="mt-10 text-center">
            <p className="mb-4 text-secondary">Still have questions? We&rsquo;re happy to help.</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button variant="gold" size="lg" asChild>
                <Link href="/contact">Contact us</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/faq">View all FAQs</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
