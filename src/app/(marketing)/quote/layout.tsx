import type { Metadata } from "next";
import { canonical } from "@/lib/site";

/** Server-component layout, because `page.tsx` is a client component. */
export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a no-obligation quote for planning applications, design drawings or feasibility layouts. Tell us about your Birmingham project and get a clear, itemised price.",
  alternates: { canonical: canonical("/quote") },
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
