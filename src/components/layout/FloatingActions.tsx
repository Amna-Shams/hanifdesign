"use client";

import { Sun, Moon } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";
import { toWhatsappHref } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { useTheme } from "@/components/providers/ThemeProvider";

/** Prefilled opening message, so the visitor lands in a started conversation. */
const WHATSAPP_MESSAGE =
  "Hello, I would like to discuss a planning or design project with Hanif Design & Consultancy.";

/**
 * Fixed-position action stack in the bottom-right corner: WhatsApp above, theme
 * toggle below.
 *
 * Both controls are circular with a 44px hit target. The toggle renders its icon
 * for the theme it will *switch to* (moon in dark mode), which is the
 * conventional and unambiguous reading — the icon is the action, not the state.
 */
export function FloatingActions() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";

  const whatsappHref = `${toWhatsappHref(CONTACT_INFO.whatsappPhone)}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    // `pb-[max(1rem,env(safe-area-inset-bottom))]` clears the iPhone home
    // indicator; the `pr` inset clears the notch in landscape.
    <div className="fixed bottom-0 right-0 z-[60] flex flex-col items-center gap-3 pb-[max(1rem,env(safe-area-inset-bottom))] pr-[max(1rem,env(safe-area-inset-right))] pt-4 sm:pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:pr-[max(1.5rem,env(safe-area-inset-right))]">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message us on WhatsApp"
        title="Message us on WhatsApp"
        className={[
          "group flex h-14 w-14 items-center justify-center rounded-full",
          "bg-[#25D366] text-white shadow-lg",
          "ring-1 ring-black/10",
          "transition-transform duration-200",
          "hover:scale-105 hover:bg-[#1EBE5A] active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
        ].join(" ")}
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${nextTheme} theme`}
        title={`Switch to ${nextTheme} theme`}
        aria-pressed={theme === "light"}
        className={[
          "flex h-14 w-14 items-center justify-center rounded-full",
          "border border-subtle bg-surface-elevated text-secondary shadow-lg",
          "transition-colors duration-200",
          "hover:border-gold hover:text-gold",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
        ].join(" ")}
      >
        {theme === "dark" ? (
          <Sun className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Moon className="h-6 w-6" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
