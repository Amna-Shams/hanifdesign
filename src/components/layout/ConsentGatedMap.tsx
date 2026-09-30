"use client";

import { MapPin, X } from "lucide-react";
import { useCookieConsent, setMapConsent } from "@/components/layout/useCookieConsent";
import { Button } from "@/components/ui/Button";

/**
 * The map is a Google embed, so it sets Google cookies. Under UK GDPR/PECR that
 * needs consent, so the iframe is only mounted once the visitor opts in.
 *
 * A global "reject" is not the end of the road. The placeholder offers to load
 * the map anyway, and that button click is the consent: an affirmative,
 * informed action taken for this specific embed, immediately before the Google
 * request is made. Withdrawing is just as easy — the loaded map carries a
 * "Hide map" control that clears the granular grant.
 *
 * Nothing here contacts Google until one of those two things has happened.
 */
/**
 * Builds the embed URL from a plain-text location.
 *
 * Done here rather than at each call site so the query is always encoded
 * correctly — a raw address with spaces and commas produces a malformed URL
 * that renders a blank frame.
 */
function embedUrl(query: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}

export function ConsentGatedMap({ title, query }: { title: string; query: string }) {
  const { hasAccepted, hasDecided, hasMapConsent } = useCookieConsent();

  // Global consent covers every optional third party, so it loads the map
  // outright. Otherwise the map appears only on its own explicit grant.
  if (hasAccepted || hasMapConsent) {
    return (
      <div>
        <iframe
          title={title}
          src={embedUrl(query)}
          className="aspect-video w-full"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        {hasMapConsent && !hasAccepted ? (
          <div className="flex items-center justify-end gap-3 border-t border-subtle px-5 py-3">
            <p className="text-xs text-muted">Map loaded with your permission.</p>
            <button
              type="button"
              onClick={() => setMapConsent(false)}
              className="inline-flex min-h-11 items-center gap-1.5 py-2 text-xs text-muted underline underline-offset-4 transition-colors hover:text-gold"
            >
              <X className="h-3 w-3" aria-hidden="true" />
              Hide map
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 bg-surface-elevated px-6 text-center">
      <MapPin className="h-8 w-8 text-gold" aria-hidden="true" />

      <p className="max-w-sm text-sm leading-relaxed text-secondary">
        {hasDecided
          ? "You declined non-essential cookies, so the map has not loaded."
          : "The map has not loaded, because it is a Google embed that sets cookies."}
      </p>

      <Button variant="gold" size="sm" onClick={() => setMapConsent(true)}>
        Load map
      </Button>

      <p className="max-w-sm text-xs leading-relaxed text-muted">
        Loading it sends your request to Google, which may set cookies. You can hide the map again
        at any time. The office address is below either way.
      </p>
    </div>
  );
}
