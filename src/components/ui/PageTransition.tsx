import type { ReactNode } from "react";

/**
 * Page wrapper, kept in the layout tree as the natural place for a future
 * route-level transition.
 *
 * It used to wrap children in `AnimatePresence mode="wait"` with a 350ms exit
 * and a 350ms entry. `mode="wait"` serialises those two halves — the incoming
 * page could not start mounting until the outgoing page had finished animating
 * out — so every navigation cost ~700ms of dead time before the new content
 * appeared, on top of the time to download and execute the route's JS. It also
 * painted `opacity: 0` into the server-rendered HTML on first load, which put
 * the whole page behind the entry animation and hurt LCP.
 *
 * Motion is not gone: every home section still animates in on `whileInView`,
 * and the interactive states are CSS transitions. A page-level fade only added
 * latency, so children now render immediately.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
