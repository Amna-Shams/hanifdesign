import type { Metadata } from "next";
import { canonical } from "@/lib/site";

/** Server-component layout, because `page.tsx` is a client component. */
export const metadata: Metadata = {
  title: "Site Map",
  description:
    "Every page on the Hanif Design & Consultancy website: services, projects, about, contact and legal pages, in one place.",
  alternates: { canonical: canonical("/sitemap") },
};

export default function SitemapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
