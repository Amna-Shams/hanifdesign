"use client";

import { useEffect } from "react";

/**
 * Opens FAQ-style <details> panels as the pointer moves over them, and closes
 * their siblings so only one answer is open at a time. Applies to every
 * accordion inside <main>, so the shared FAQ component and the bespoke service
 * page accordions behave the same way.
 *
 * Only active where hover exists (mouse / trackpad); touch devices keep the
 * normal tap-to-toggle behaviour. A click on a panel that hover just opened
 * keeps it open instead of toggling it shut, which would feel like a bug.
 */
export function HoverDisclosure() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const details = target?.closest<HTMLDetailsElement>("main details");
      if (!details || details.open) return;

      const parent = details.parentElement;
      parent?.querySelectorAll<HTMLDetailsElement>(":scope > details[open]").forEach((other) => {
        other.open = false;
        delete other.dataset.hoverOpened;
      });
      details.open = true;
      details.dataset.hoverOpened = "1";
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const summary = target?.closest("main summary");
      const details = summary?.parentElement as HTMLDetailsElement | null;
      if (details?.dataset.hoverOpened === "1") {
        event.preventDefault();
        delete details.dataset.hoverOpened;
      }
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
