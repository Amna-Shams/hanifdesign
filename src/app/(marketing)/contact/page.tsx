"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { CONTACT_INFO, REGISTERED_OFFICE, OFFICE_MAP_QUERY } from "@/lib/constants";
import { toTelHref, toWhatsappHref } from "@/lib/utils";
import { HONEYPOT_FIELD, HONEYPOT_FIELD_PROPS, readHoneypot } from "@/lib/spam";
import { ConsentGatedMap } from "@/components/layout/ConsentGatedMap";

/** Directions link, built from the same query the map uses so both agree. */
const officeDirectionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE_MAP_QUERY)}`;

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().trim().min(5, "Subject must be at least 5 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData, event?: React.BaseSyntheticEvent) => {
    setSubmitStatus("idle");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          // Read off the form element rather than the RHF values: `zodResolver`
          // returns the parsed object, which has unknown keys stripped, so an
          // unregistered honeypot would never reach the endpoint.
          [HONEYPOT_FIELD]: readHoneypot(event),
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.message || "Something went wrong");
      }

      setSubmitStatus("success");
      reset();
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-surface-elevated-translucent">
      <section className="py-16 sm:py-20 lg:py-28 bg-surface-translucent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="Get in touch"
            subtitle="Have a project in mind? We'd love to hear from you. Fill out the form or use the details below."
            align="center"
          />

          {/* Grid items stretch to the tallest of the two, so the shorter
              column must fill that height rather than leaving a hole: the
              details card grows (`flex-1`) and the form card is `h-full`. The
              reveal wrappers are what actually become the grid items now, so
              they carry the `h-full` and their children inherit it. */}
          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="left" duration={0.7} className="h-full">
            <div className="flex h-full flex-col gap-8">
              <Card className="flex-1 p-6">
                <h2 className="font-heading font-semibold text-xl text-primary mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-overlay-faint border border-hairline-tint flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-primary">Office Address</h3>
                      <address className="text-textmuted not-italic mt-1">{REGISTERED_OFFICE}</address>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-overlay-faint border border-hairline-tint flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-primary">Phone</h3>
                      <a href={toTelHref(CONTACT_INFO.phone)} className="text-textmuted hover:text-gold transition-colors mt-1 block">{CONTACT_INFO.phone}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-overlay-faint border border-hairline-tint flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-primary">Email</h3>
                      <a href={`mailto:${CONTACT_INFO.email}`} className="text-textmuted hover:text-gold transition-colors mt-1 block">{CONTACT_INFO.email}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-overlay-faint border border-hairline-tint flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-primary">Office Hours</h3>
                      <p className="text-textmuted mt-1">Mon–Fri: 9:00 AM – 5:30 PM</p>
                      <p className="text-textmuted">Sat–Sun: Closed</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="mb-4 font-heading text-xl font-semibold text-primary">
                  Quick Message
                </h2>

                {/* WhatsApp's own mark on its own green, rather than a generic
                    speech bubble on a stock green button. */}
                <a
                  href={toWhatsappHref(CONTACT_INFO.whatsappPhone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 p-4 transition-colors duration-200 hover:border-[#25D366] hover:bg-[#25D366]/20"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#25D366] text-white">
                    <WhatsAppIcon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium text-primary">Chat on WhatsApp</span>
                    <span className="mt-0.5 block text-sm text-secondary">
                      {CONTACT_INFO.whatsappPhone} &middot; replies within a few hours
                    </span>
                  </span>
                  <ArrowRight
                    className="ml-auto h-4 w-4 shrink-0 text-[#25D366] transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>

                <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
                  Prefer to call?
                  <a
                    href={toTelHref(CONTACT_INFO.phone)}
                    className="font-medium text-secondary transition-colors hover:text-gold"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </p>
              </Card>
            </div>
            </Reveal>

            <Reveal direction="right" duration={0.7} delay={0.15} className="h-full">
              <Card className="p-6 sm:p-8 h-full">
                <h2 className="font-heading font-semibold text-xl text-primary mb-6">Send us a Message</h2>

                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-emerald-300">Message sent successfully!</p>
                      <p className="text-emerald-300/80 text-sm">
                We&rsquo;ll get back to you within 24 hours.
              </p>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-300">Something went wrong</p>
                      <p className="text-red-300/80 text-sm">Please try again or call us directly.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                  {/* Honeypot: a real visitor never sees or fills this. */}
                  <input {...HONEYPOT_FIELD_PROPS} />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-primary mb-1.5">Name *</label>
                      <input
                        {...register("name")}
                        required
                        aria-required="true"
                        id="name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        type="text"
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-lg border border-subtle bg-surface-elevated focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                        disabled={isSubmitting}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-primary mb-1.5">Email *</label>
                      <input
                        {...register("email")}
                        required
                        aria-required="true"
                        id="email"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-lg border border-subtle bg-surface-elevated focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-primary mb-1.5">Phone (optional)</label>
                    <input
                      {...register("phone")}
                      id="phone"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                      type="tel"
                      placeholder={CONTACT_INFO.phone}
                      className="w-full px-4 py-3 rounded-lg border border-subtle bg-surface-elevated focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                      disabled={isSubmitting}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="mt-1 text-sm text-red-400" role="alert">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-primary mb-1.5">Subject *</label>
                    <input
                      {...register("subject")}
                      required
                      aria-required="true"
                      id="subject"
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? "subject-error" : undefined}
                      type="text"
                      placeholder="Brief description of your project"
                      className="w-full px-4 py-3 rounded-lg border border-subtle bg-surface-elevated focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                      disabled={isSubmitting}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="mt-1 text-sm text-red-400" role="alert">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-primary mb-1.5">Message *</label>
                    <textarea
                      {...register("message")}
                      required
                      aria-required="true"
                      id="message"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                      rows={5}
                      placeholder="Tell us about your project..."
                      className="w-full px-4 py-3 rounded-lg border border-subtle bg-surface-elevated focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors resize-none"
                      disabled={isSubmitting}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-sm text-red-400" role="alert">{errors.message.message}</p>
                    )}
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">Send Message <Send className="w-5 h-5" /></span>
                    )}
                  </Button>
                </form>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Office location — last section before the footer. */}
      <section className="bg-lightgray py-16 sm:py-20 lg:py-24" aria-labelledby="office-map-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            as="h2"
            id="office-map-heading"
            eyebrow="Find us"
            title="Our location"
            subtitle={`We are based in ${REGISTERED_OFFICE}. Get in touch to arrange a visit.`}
            align="center"
            className="mb-10"
          />

          <Card className="overflow-hidden p-0">
            <ConsentGatedMap
              title={`Map showing the Hanif Design &amp; Consultancy office in ${REGISTERED_OFFICE}`}
              query={OFFICE_MAP_QUERY}
            />
            <div className="flex flex-col gap-3 border-t border-subtle px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-start gap-2 text-sm text-secondary">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span>{REGISTERED_OFFICE}</span>
              </p>
              <a
                href={officeDirectionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-medium text-gold underline underline-offset-4 transition-colors hover:text-gold/80 sm:self-auto"
              >
                Get directions
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
