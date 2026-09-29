"use client";

/**
 * Footer control that reopens the cookie consent banner.
 *
 * The banner and this button are separate client components, so they talk over
 * a DOM event rather than shared state — that keeps the Footer a server
 * component while still letting the visitor change their mind later, which the
 * cookie policy promises.
 */

export const OPEN_COOKIE_SETTINGS_EVENT = "hanif:open-cookie-settings";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
      className="inline-flex min-h-11 items-center py-2 text-sm text-muted underline underline-offset-4 transition-colors hover:text-gold"
    >
      Cookie settings
    </button>
  );
}
