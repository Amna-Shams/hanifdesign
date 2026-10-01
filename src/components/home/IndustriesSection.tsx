"use client";

import {
  Home,
  Building2,
  Users,
  Briefcase,
  Hammer,
  BriefcaseBusiness,
} from "lucide-react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const industries = [
  {
    icon: Home,
    title: "Homeowners",
    description: "Extensions, conversions and renovations.",
  },
  {
    icon: Building2,
    title: "Property Developers",
    description: "Multi-unit residential schemes.",
  },
  {
    icon: Users,
    title: "Landlords",
    description: "HMO conversions and property improvements.",
  },
  {
    icon: Briefcase,
    title: "Estate Agents",
    description: "Pre-sale feasibility and planning advice.",
  },
  {
    icon: Hammer,
    title: "Builders & Contractors",
    description: "Design drawings and planning packs.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Commercial Clients",
    description: "Change-of-use and commercial applications.",
  },
] as const;

export function IndustriesSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-surface-translucent overflow-hidden" aria-labelledby="industries-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionHeading
            eyebrow="Who We Work With"
            title="Industries & Client Types"
            subtitle="We support a diverse range of clients across the West Midlands."
            align="center"
          />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {industries.map((industry, index) => (
              <motion.article
                key={industry.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="h-full p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-overlay-faint border border-hairline-tint flex items-center justify-center mx-auto mb-4 text-gold">
                    <industry.icon className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-primary mb-2">{industry.title}</h3>
                  <p className="text-textmuted">{industry.description}</p>
                </Card>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
