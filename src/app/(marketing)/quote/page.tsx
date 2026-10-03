"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, CheckCircle, Loader2, Send } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { HONEYPOT_FIELD, HONEYPOT_FIELD_PROPS, readHoneypot } from "@/lib/spam";

import {
  CONTACT_INFO,
  QUOTE_BUDGET_RANGES,
  QUOTE_PROJECT_TYPES,
} from "@/lib/constants";

/**
 * The mirror of the server schema in `src/app/api/quote/route.ts`. The two are
 * duplicated deliberately: the client copy gives inline field errors before a
 * request is made, the server copy is the one that actually protects the
 * database.
 */
const quoteSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().min(10, "Please enter a valid phone number"),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().trim().min(20, "Please tell us a little more (20 characters minimum)"),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const fieldClass =
  "w-full rounded-lg border border-subtle bg-surface-elevated px-4 py-3 transition-colors " +
  "placeholder:text-muted focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gold";

const labelClass = "mb-1.5 block text-sm font-medium text-primary";

export default function QuotePage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    mode: "onBlur",
    defaultValues: { projectType: "", budget: "" },
  });

  const onSubmit = async (data: QuoteFormData, event?: React.BaseSyntheticEvent) => {
    setStatus("idle");
    setFeedback("");

    try {
      const response = await fetch("/api/quote", {
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
        throw new Error(result?.message || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setFeedback("Thanks — we'll be in touch within 24 hours");
      reset();
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again, or call us directly.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-surface-elevated">
      <section className="bg-lightgray py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            as="h1"
            eyebrow="Get a Quote"
            title="Get a Quote"
            subtitle="Tell us about your project and we'll get back within 24 hours."
            align="center"
          />

          {/* The form card is in the first viewport, so it reveals as one block:
              cascading each field would animate the primary action on a page
              whose whole job is that form. */}
          <Reveal amount={0.15} className="mt-10">
          <Card className="p-6 sm:p-8">
            {/* Announced as well as shown, so the outcome of a submit is not
                a purely visual change. */}
            <div aria-live="polite">
              {status === "success" && (
                <div
                  className="mb-6 flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4"
                  role="status"
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
                  <p className="text-emerald-300">{feedback}</p>
                </div>
              )}

              {status === "error" && (
                <div
                  className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4"
                  role="alert"
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" aria-hidden="true" />
                  <p className="text-red-300">{feedback}</p>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              {/* Honeypot: a real visitor never sees or fills this. */}
              <input {...HONEYPOT_FIELD_PROPS} />
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full Name *
                  </label>
                  <input
                    {...register("name")}
                    required
                    aria-required="true"
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="John Smith"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={fieldClass}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email *
                  </label>
                  <input
                    {...register("email")}
                    required
                    aria-required="true"
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="john@email.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={fieldClass}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone *
                  </label>
                  <input
                    {...register("phone")}
                    required
                    aria-required="true"
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder={CONTACT_INFO.phone}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={fieldClass}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1 text-sm text-red-400" role="alert">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="projectType" className={labelClass}>
                    Project Type *
                  </label>
                  <select
                    {...register("projectType")}
                    id="projectType"
                    aria-invalid={!!errors.projectType}
                    aria-describedby={errors.projectType ? "projectType-error" : undefined}
                    className={fieldClass}
                  >
                    <option value="">Select a project type</option>
                    {QUOTE_PROJECT_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p id="projectType-error" className="mt-1 text-sm text-red-400" role="alert">
                      {errors.projectType.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="budget" className={labelClass}>
                  Budget *
                </label>
                <select
                  {...register("budget")}
                  id="budget"
                  aria-invalid={!!errors.budget}
                  aria-describedby={errors.budget ? "budget-error" : undefined}
                  className={fieldClass}
                >
                  <option value="">Select a budget range</option>
                  {QUOTE_BUDGET_RANGES.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
                {errors.budget && (
                  <p id="budget-error" className="mt-1 text-sm text-red-400" role="alert">
                    {errors.budget.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  Message *
                </label>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={5}
                  placeholder="Tell us about your project: scope, location, style preferences, any constraints or special requirements."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`${fieldClass} resize-none`}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-400" role="alert">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-start gap-3 border-t border-subtle pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted">
                  Or call us on{" "}
                  <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`} className="text-secondary transition-colors hover:text-gold">
                    {CONTACT_INFO.phone}
                  </a>
                </p>
                <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send
                      <Send className="h-4 w-4" aria-hidden="true" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </Card>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
