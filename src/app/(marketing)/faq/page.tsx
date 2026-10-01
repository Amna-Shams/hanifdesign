import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Reveal } from "@/components/ui/Reveal";
import { FAQS } from "@/lib/faqs";
import { canonical } from "@/lib/site";
import { FaqSchema } from "@/components/ui/JsonLd";

export const metadata: Metadata = {
  alternates: { canonical: canonical("/faq") },
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about planning applications, permitted development, timelines, fees, appeals and our services in Birmingham and the West Midlands.",
};

export default function FAQPage() {
  return (
    <section className="bg-surface-translucent py-16 sm:py-20 lg:py-28" aria-labelledby="faq-heading">
      {/* Sourced from the same FAQS array the accordion renders, so the
          structured data can never claim a question the page does not show. */}
      <FaqSchema faqs={FAQS.map((f) => ({ q: f.q, a: f.a }))} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* The title block is deliberately static: it is the first viewport and
            the h1 is the LCP element, so a `whileInView` reveal would ship
            `opacity: 0` in the server HTML and hold it back until hydration. */}
        <SectionHeading
          id="faq-heading"
          as="h1"
          eyebrow="FAQ"
          title="Frequently asked questions"
          subtitle="Common questions about planning applications, timelines, fees, and our services."
          align="center"
          className="mb-12"
        />

        <div className="mx-auto max-w-3xl">
          <Reveal amount={0.1}>
            <FAQAccordion items={FAQS} defaultOpen={0} idPrefix="faq-page" />
          </Reveal>

          <Reveal className="mt-12 text-center">
            <p className="mb-6 text-secondary">Still have questions? We&rsquo;re happy to help.</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button variant="gold" size="lg" asChild>
                <Link href="/contact">Contact us</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/quote">Request a Quote</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
