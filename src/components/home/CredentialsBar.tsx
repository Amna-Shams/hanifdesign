"use client";

import { Calendar, MapPin, Award, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

const credentials = [
  {
    icon: Calendar,
    title: "Established 2010",
    description: "Over a decade of planning expertise",
  },
  {
    icon: MapPin,
    title: "Perry Barr-Based",
    description: "Serving the West Midlands",
  },
  {
    icon: Award,
    title: "RTPI-Aligned Practice",
    description: "Following industry standards",
  },
  {
    icon: CheckCircle,
    title: "500+ Approvals",
    description: "Successful planning submissions",
  },
] as const;

export function CredentialsBar() {
  return (
    <section className="py-8 bg-surface-translucent overflow-hidden" aria-labelledby="credentials-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="credentials-heading" className="sr-only">Credentials</h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {credentials.map((cred, index) => (
            <motion.div
              key={cred.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gold">
                <cred.icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h3 className="font-heading font-semibold text-primary">{cred.title}</h3>
                <p className="text-textmuted text-sm">{cred.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
