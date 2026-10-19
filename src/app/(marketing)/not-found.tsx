import type { Metadata } from "next";
import { NotFoundContent } from "@/components/layout/NotFoundContent";

/**
 * Not-found page for URLs that fail inside the marketing group, such as an
 * unknown `/services/<slug>` or `/projects/<slug>`. The group layout already
 * supplies the header, footer and floating actions, so this renders only the
 * message; the root `not-found.tsx` composes its own chrome for URLs that match
 * no route at all.
 */
export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist or may have been moved.",
};

export default function MarketingNotFound() {
  return <NotFoundContent />;
}
