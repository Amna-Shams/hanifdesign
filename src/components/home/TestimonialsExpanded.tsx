"use client";

import { Quote, Star } from "lucide-react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const testimonials = [
  {
    quote:
      "Hanif Design and Consultancy transformed our vision into reality. Their expertise in planning support and attention to detail made the entire process smooth and stress free.",
    name: "Sarah Johnson",
    role: "Home Extension, Birmingham",
    initial: "S",
    rating: 5,
  },
  {
    quote:
      "Professional, reliable, and creative. They handled everything from design to planning approval with exceptional skill and care.",
    name: "Michael Chen",
    role: "New Build Home, Solihull",
    initial: "M",
    rating: 5,
  },
  {
    quote:
      "Outstanding service from start to finish. Their knowledge of Building Regulations and planning policies is second to none.",
    name: "Emma Williams",
    role: "Commercial Development",
    initial: "E",
    rating: 5,
  },
  {
    quote:
      "Clear, professional, and fast. The drawings were exactly what the council needed and the whole process was smooth.",
    name: "James Patel",
    role: "Loft Conversion, Wolverhampton",
    initial: "J",
    rating: 5,
  },
  {
    quote:
      "I've worked with several planning consultants and Hanif is by far the most responsive and knowledgeable.",
    name: "Ahmed Khan",
    role: "Property Developer, Birmingham",
    initial: "A",
    rating: 5,
  },
] as const;

export function TestimonialsExpanded() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-surface-translucent overflow-hidden" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionHeading
            eyebrow="Testimonials"
            title="What Our Clients Say"
            align="center"
          />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col p-6 lg:p-8">
                  <div className="flex flex-col h-full">
                    <Quote className="w-10 h-10 text-gold/30 mb-4" aria-hidden="true" />
                    <p className="text-primary text-lg italic leading-relaxed flex-1 mb-6">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-1 mb-4" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-gold fill-current" aria-hidden="true" />
                      ))}
                    </div>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-gold text-on-accent font-heading font-semibold flex items-center justify-center shrink-0">
                        {testimonial.initial}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-primary">{testimonial.name}</p>
                        <p className="text-textmuted text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}