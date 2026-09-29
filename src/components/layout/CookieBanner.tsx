"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { setStoredConsent, useCookieConsent } from "./useCookieConsent";
import { OPEN_COOKIE_SETTINGS_EVENT } from "./CookieSettingsButton";

export function CookieBanner() {
  const { hasDecided, hasAccepted } = useCookieConsent();
  const [reopened, setReopened] = useState(false);
  const visible = !hasAccepted && (!hasDecided || reopened);

  // The footer "Cookie settings" link reopens this banner.
  useEffect(() => {
    const onOpen = () => setReopened(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpen);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
          aria-describedby="cookie-banner-text"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 260 }}
          className="fixed inset-x-0 bottom-0 z-[70] border-t border-subtle bg-surface-elevated shadow-[0_-8px_30px_rgba(0,0,0,0.6)]"
        >
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <p
                id="cookie-banner-text"
                className="max-w-3xl text-sm leading-relaxed text-secondary"
              >
                We use essential cookies to make this website work. If you accept, we will also
                load Google Maps on our contact page. If you would rather not, the map stays off
                and you can still load it on that page with a single click. Read our{" "}
                <Link
                  href="/cookies"
                  className="font-medium text-gold underline underline-offset-2 hover:text-primary"
                >
                  Cookie Policy
                </Link>{" "}
                for details.
              </p>

              <div className="flex shrink-0 flex-wrap items-center gap-3">
                <Button variant="gold" size="sm" onClick={() => setStoredConsent("accepted")}>
                  Accept all
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setStoredConsent("rejected")}
                >
                  Reject non-essential
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setStoredConsent("dismissed");
                    setReopened(false);
                  }}
                  className="rounded-md p-1.5 text-muted transition-colors hover:text-primary"
                  aria-label="Dismiss cookie notice"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
