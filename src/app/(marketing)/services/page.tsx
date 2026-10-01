import type { Metadata } from "next";
import Link from "next/link";
import {
  FileCheck,
  ShieldCheck,
  Ruler,
  LayoutGrid,
  Box,
  Compass,
  ArrowRight,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: canonical("/services") },
  title: "Our Services",
  description:
    "Planning applications, building regulations support, design drawings, feasibility layouts, 3D visualisation and development guidance for residential projects in Birmingham and the West Midlands.",
};

/** Icon per service slug. Kept beside the list so it stays easy to audit. */
const ICONS = {
  "planning-applications": FileCheck,
  "building-regulations-support": ShieldCheck,
  "design-drawings": Ruler,
  "feasibility-layouts": LayoutGrid,
  "3d-visualisation": Box,
  "development-guidance": Compass,
} as const;

export default function ServicesPage() {
  return (
    <>
      <section className="bg-surface-translucent py-16 sm:py-20 lg:py-28" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* The h1 sits in the first viewport, so it stays static: a
              `whileInView` fade would put `opacity: 0` into the server HTML and
              hold the LCP element back until hydration. Same reasoning as the
              no-op PageTransition. */}
          <SectionHeading
            id="services-heading"
            as="h1"
            eyebrow="Our services"
            title="What we do"
            subtitle="Comprehensive planning and design support tailored to your project."
            align="center"
            className="mb-12"
          />

          {/* One reveal for the whole grid: `RevealItem` renders a div, which is
              not valid inside a <ul>, so the list keeps its semantics and the
              cards share a single block reveal. */}
          <Reveal amount={0.15}>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {SERVICES.map((service) => {
                const Icon = ICONS[service.slug];
                return (
                  <li key={service.slug} className="h-full">
                    <Card hover className="flex h-full flex-col p-6">
                      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-hairline-tint bg-overlay-faint text-gold">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <h2 className="mb-2 font-heading text-xl font-semibold text-primary">
                        {service.label}
                      </h2>
                      <p className="mb-6 flex-1 text-sm leading-relaxed text-secondary">{service.short}</p>
                      <Link
                        href={`/services/${service.slug}`}
                        className="-mx-2 inline-flex min-h-11 items-center gap-1 rounded-md px-2 font-medium text-gold transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        Explore {service.label}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Card>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-translucent py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="mb-6 font-heading text-3xl font-bold text-primary sm:text-4xl">
              Not sure which service you need?
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-secondary">
              Book a free consultation and we&rsquo;ll advise on the best approach for your project.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Button variant="gold" size="lg" asChild>
              <Link href="/contact">Book a free consultation</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
