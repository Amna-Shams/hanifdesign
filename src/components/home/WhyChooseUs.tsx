"use client";

import {
  MapPin,
  FileText,
  Package,
  MessageSquare,
  Zap,
  Tag,
  Check,
} from "lucide-react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  {
    icon: MapPin,
    title: "Local Knowledge",
    description: "Deep understanding of Birmingham planning policy and council processes.",
  },
  {
    icon: FileText,
    title: "Clear Drawings",
    description: "Drawings that builders and councils can actually use — precise and buildable.",
  },
  {
    icon: Package,
    title: "End-to-End Support",
    description: "From initial concept through to approved plans and beyond.",
  },
  {
    icon: MessageSquare,
    title: "Direct Communication",
    description: "Speak directly to the person working on your project — no account managers.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Efficient timelines without compromising quality or thoroughness.",
  },
  {
    icon: Tag,
    title: "Transparent Pricing",
    description: "Clear, fixed quotes with no hidden fees or surprise costs.",
  },
] as const;

export function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-surface-elevated-translucent overflow-hidden" aria-labelledby="why-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Why Choose Hanif Design & Consultancy"
            subtitle="Six reasons clients trust us with their most important projects."
            align="center"
          />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 lg:p-8 bg-lightgray rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gold">
                    <reason.icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading font-semibold text-xl text-primary mb-2">{reason.title}</h3>
                    <p className="text-textmuted leading-relaxed">{reason.description}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-gold font-medium">
                  <Check className="w-5 h-5" aria-hidden="true" />
                  <span>Delivered on every project</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
