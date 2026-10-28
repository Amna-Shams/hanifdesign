"use client";

import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/faqs";

interface FAQAccordionProps {
  items: readonly FaqItem[];
  /** Open the nth item by default (still works with JS disabled). */
  defaultOpen?: number;
  className?: string;
  idPrefix?: string;
}

/**
 * Accessible FAQ accordion built on native <details>/<summary>.
 *
 * Progressive enhancement is the whole point here:
 *  - With JavaScript disabled every question is still a native disclosure and
 *    every answer is reachable, so the content is never trapped.
 *  - Hover-to-open, single-open and the height animation are layered on by
 *    `HoverDisclosure` (mounted once in the marketing layout), so every
 *    accordion on the site behaves the same way.
 */
export function FAQAccordion({
  items,
  defaultOpen,
  className = "",
  idPrefix = "faq",
}: FAQAccordionProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={rootRef}
      className={`divide-y divide-subtle overflow-hidden rounded-xl border border-subtle bg-surface-elevated ${className}`}
    >
      {items.map((item, index) => {
        const panelId = `${idPrefix}-panel-${index}`;
        const buttonId = `${idPrefix}-button-${index}`;

        return (
          <details
            key={item.q}
            id={buttonId}
            data-accordion-item
            open={defaultOpen === index}
            className="group"
          >
            <summary
              aria-controls={panelId}
              className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-white/[0.03] focus-visible:bg-white/[0.03] sm:px-6 [&::-webkit-details-marker]:hidden"
            >
              <span className="min-w-0 font-heading text-base font-medium text-primary sm:text-lg">
                {item.q}
              </span>
              <ChevronDown
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none"
              />
            </summary>

            <div id={panelId} role="region" aria-labelledby={buttonId} className="px-5 pb-5 sm:px-6">
              <p className="max-w-4xl text-justify text-sm leading-relaxed text-secondary sm:text-base">{item.a}</p>
            </div>
          </details>
        );
      })}
    </div>
  );
}
