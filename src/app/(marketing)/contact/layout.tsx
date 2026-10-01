import type { Metadata } from "next";
import { canonical } from "@/lib/site";

/**
 * Metadata lives in a layout rather than in `page.tsx` because that page is a
 * `"use client"` component, and Next.js only reads `metadata` exports from
 * server components. A layout is a server component by default, so this is the
 * supported way to give a client page its own title, description and canonical.
 *
 * These three routes previously inherited the site-wide default, which meant
 * /contact, /quote and /sitemap all shipped a byte-identical `<title>` to the
 * home page.
 */
export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Speak to Hanif Design & Consultancy about your project. Call 07901 646 719, send an enquiry, or request a free consultation for residential planning in Birmingham.",
  alternates: { canonical: canonical("/contact") },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
