"use client";

import type { LucideIcon } from "lucide-react";
import {
  FileCheck,
  ShieldCheck,
  Ruler,
  LayoutGrid,
  Box,
  Compass,
  Check,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES } from "@/lib/constants";

type Slug = (typeof SERVICES)[number]["slug"];

/**
 * Rich homepage copy, keyed by the canonical slug. Slugs, titles and the
 * 01/02/03 numbering all derive from SERVICES, so this can never drift out of
 * sync with the pages that actually exist.
 */
const COPY: Record<Slug, { icon: LucideIcon; description: string; bullets: readonly string[] }> = {
  "planning-applications": {
    icon: FileCheck,
    description:
      "End-to-end planning application support for residential projects of all scales.",
    bullets: [
      "Full application preparation",
      "Pre-application advice",
      "Planning statements",
      "Drawings submission",
      "Council liaison",
      "Appeal support",
    ],
  },
  "building-regulations-support": {
    icon: ShieldCheck,
    description: "Comprehensive building regulations compliance for safe, approved construction.",
    bullets: [
      "Full plans submission",
      "Building notice support",
      "Compliance drawings",
      "Structural calculations coordination",
      "Specification writing",
      "Inspection scheduling",
    ],
  },
  "design-drawings": {
    icon: Ruler,
    description: "Precise, planning-ready drawings that builders and councils can actually use.",
    bullets: [
      "Concept design",
      "Floor plans and elevations",
      "Site plans and sections",
      "2D technical drawings",
      "Planning-ready packs",
      "Revisions and amendments",
    ],
  },
  "feasibility-layouts": {
    icon: LayoutGrid,
    description: "Site-specific analysis to test development viability before committing to design.",
    bullets: [
      "Site analysis",
      "Development capacity studies",
      "Layout options",
      "Constraint mapping",
      "Cost-benefit snapshots",
      "Recommendation reports",
    ],
  },
  "3d-visualisation": {
    icon: Box,
    description: "Photorealistic renders that bring schemes to life for stakeholders and committees.",
    bullets: [
      "Photorealistic renders",
      "Exterior and interior views",
      "Aerial and street views",
      "Contextual visualisation",
      "Planning committee visuals",
      "Presentation boards",
    ],
  },
  "development-guidance": {
    icon: Compass,
    description: "Strategic advice to align projects with policy and maximise approval chances.",
    bullets: [
      "Policy interpretation",
      "Site selection advice",
      "Pre-purchase feasibility",
      "Local plan alignment",
      "Design review",
      "Project strategy",
    ],
  },
};

const services = SERVICES.map((service, index) => ({
  ...service,
  ...COPY[service.slug],
  number: String(index + 1).padStart(2, "0"),
}));

export function CoreServices() {
  return (
    <section
      className="overflow-hidden bg-surface-translucent py-16 sm:py-20 lg:py-28"
      aria-labelledby="core-services-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="core-services-heading"
          eyebrow="Core services"
          title="What we do"
          subtitle="Comprehensive planning and design support tailored to your project."
          align="center"
          className="mb-12"
        />

        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.li
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-2xl border border-subtle bg-surface-elevated p-6 transition-[border-color,box-shadow] duration-300 hover:border-primary/50 hover:shadow-lg lg:p-8"
              >
                <div className="mb-6 flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="font-heading text-3xl font-bold tabular-nums text-gold/70"
                  >
                    {service.number}
                  </span>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-hairline-tint bg-overlay-faint text-gold transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </span>
                </div>

                <h3 className="mb-2 font-heading text-xl font-semibold text-primary">
                  {service.label}
                </h3>
                <p className="mb-6 leading-relaxed text-secondary">{service.description}</p>

                <ul className="mb-6 grid gap-2 sm:grid-cols-2">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-secondary">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/services/${service.slug}`}
                  className="-mx-2 inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 font-medium text-gold transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Explore {service.label}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
