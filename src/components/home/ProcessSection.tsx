"use client";

import { Search, Pencil, FileText, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Consultation",
    description: "We listen, assess feasibility, and outline options.",
  },
  {
    number: "02",
    icon: Pencil,
    title: "Design & Drawings",
    description: "We prepare drawings and documentation aligned to policy.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Planning Submission",
    description: "We submit and manage the application with the council.",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Approval & Support",
    description: "We deliver the approved plans and guide your next steps.",
  },
] as const;

export function ProcessSection() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-surface-translucent overflow-hidden" aria-labelledby="process-heading">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(ellipse at center, gold 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionHeading
            eyebrow="Our Process"
            title="How We Work"
            subtitle="A clear, structured path from concept to approved plans."
            align="center"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-12 lg:mt-20 relative"
        >
          {/* Connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="hidden lg:absolute top-[60px] left-[84px] right-[84px] h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent transform origin-left"
            style={{ transformOrigin: "left" }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative text-center lg:text-left"
              >
                {/* Number badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/20 text-gold font-heading font-bold text-2xl mb-6"
                >
                  {step.number}
                </motion.div>

                {/* Connecting dot on mobile */}
                <div className="lg:hidden absolute left-1/2 top-[60px] w-3 h-3 rounded-full bg-gold transform -translate-x-1/2" />

                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto lg:mx-0 mb-4 text-gold">
                  <step.icon className="w-6 h-6" aria-hidden="true" />
                </div>

                <h3 className="font-heading font-semibold text-xl text-primary mb-3">{step.title}</h3>
                <p className="text-secondary leading-relaxed">{step.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}