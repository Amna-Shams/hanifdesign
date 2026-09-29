"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Resets the window to the top of the document on every route change.
 *
 * Why this exists instead of relying on the App Router's built-in scroll
 * restoration: `globals.css` sets `html { scroll-behavior: smooth }`, which
 * turns the router's reset into an animated scroll. On a short page like
 * /services that animation is still in flight when the next route settles, so
 * the viewport is left partway down instead of at the top.
 *
 * Two details matter here:
 *
 * 1. `scroll-behavior` is forced to `auto` for the duration of the reset.
 *    Without it we are fighting our own CSS with another animated scroll.
 * 2. The first run is skipped. On a fresh load (and on back/forward, where the
 *    browser restores the offset) the viewport is already correct and forcing
 *    it to zero would destroy that restoration.
 *
 * Hash navigations are left alone so in-page anchors still land on their
 * target, offset by the `scroll-padding-top` in `globals.css`.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (window.location.hash) return;

    // `documentElement` is not guaranteed to exist when this effect runs:
    // during hydration and in some embedded/test environments the document
    // element is briefly absent, and reading `.style` off undefined throws,
    // which tears down the route transition. Bail out rather than crash.
    const root = document?.documentElement;
    if (!root?.style) return;

    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    let secondFrame = 0;
    const reset = () => window.scrollTo(0, 0);

    reset();
    // Re-assert after layout has settled: the incoming page mounts a frame or
    // two after the pathname change, and can shift the scroll offset again.
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(reset);
    });

    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      // React always runs the previous effect's cleanup before the next effect,
      // so this override is still the one in effect here and restoring the
      // captured value is safe.
      root.style.scrollBehavior = previousScrollBehavior;
    };
  }, [pathname]);

  return null;
}
