"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { HONEYPOT_FIELD_PROPS, HONEYPOT_FIELD, readHoneypot } from "@/lib/spam";

const field =
  "w-full border border-[#d9d9d9] bg-white px-4 py-3 text-[0.8125rem] text-[#1b1b1b] placeholder:text-[#8a8a8a] focus:border-[#b8865b] focus:outline-none";

/** Short enquiry form that posts to the same endpoint as the main contact page. */
export function PlanContactForm({
  subject,
  compact = false,
  submitLabel = "Send",
}: {
  subject: string;
  /** Name, email and message only, with no phone field or terms checkbox. */
  compact?: boolean;
  submitLabel?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          phone: String(data.get("phone") ?? ""),
          subject,
          message: String(data.get("message") ?? ""),
          [HONEYPOT_FIELD]: readHoneypot(event),
        }),
      });
      if (!response.ok) throw new Error("failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" aria-label={subject}>
      <input {...HONEYPOT_FIELD_PROPS} />
      <input name="name" required minLength={2} placeholder="Name *" aria-label="Name" className={field} />
      <input name="email" type="email" required placeholder="Email *" aria-label="Email" className={field} />
      {!compact && (
        <input name="phone" type="tel" placeholder="Phone" aria-label="Phone" className={field} />
      )}
      <textarea
        name="message"
        required
        minLength={10}
        rows={5}
        placeholder="Message *"
        aria-label="Message"
        className={`${field} resize-y`}
      />
      {!compact && (
        <label className="flex items-start gap-2 text-[0.6875rem] text-[#3b3b3b]">
          <input type="checkbox" required className="mt-0.5" />
          <span>
            I agree with{" "}
            <Link href="/terms" className="text-[#b8865b] underline">Terms of Service</Link> and{" "}
            <Link href="/privacy" className="text-[#b8865b] underline">Privacy Policy</Link>
          </span>
        </label>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="min-h-11 w-full bg-[#b8865b] px-6 py-3 text-[0.75rem] font-medium uppercase tracking-wider !text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : submitLabel}
      </button>
      <p aria-live="polite" className="text-xs">
        {status === "success" && "Thank you. Your message has been sent and we will reply soon."}
        {status === "error" && "Something went wrong. Please try again or call us."}
      </p>
    </form>
  );
}
