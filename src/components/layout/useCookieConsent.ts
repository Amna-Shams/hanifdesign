"use client";

import { useSyncExternalStore } from "react";

/**
 * Cookie consent state, shared between the consent banner and any component
 * that must not load a third-party resource before a visitor opts in.
 */

const STORAGE_KEY = "cookie-consent";

export type ConsentValue = "accepted" | "rejected" | "dismissed" | null;

/**
 * `localStorage` is not reactive, so the store keeps its own subscriber set.
 * The previous version used a no-op `subscribe`, which meant writing a choice
 * never notified anyone: the banner only picked up a new value on the next
 * full page load, so consent taken during a visit appeared to do nothing.
 */
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

/** Also follows changes made in other tabs, which fire `storage` natively. */
const subscribe = (onStoreChange: () => void) => {
  listeners.add(onStoreChange);
  if (listeners.size === 1) {
    window.addEventListener("storage", onStoreChange);
  }
  return () => {
    listeners.delete(onStoreChange);
    if (listeners.size === 0) {
      window.removeEventListener("storage", onStoreChange);
    }
  };
};

function readStoredConsent(): ConsentValue {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "rejected" || value === "dismissed" ? value : null;
  } catch {
    // Storage blocked (private mode / cookies disabled). Treat as "no decision",
    // which keeps optional third parties switched off.
    return null;
  }
}

export function setStoredConsent(value: Exclude<ConsentValue, null>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* storage unavailable — the choice lasts for this page view only */
  }
  emit();
}

export function useCookieConsent() {
  const stored = useSyncExternalStore(subscribe, readStoredConsent, () => null);
  // `dismissed` means the visitor closed the banner without choosing. That is
  // not consent, so optional third parties stay off by default.
  const hasAccepted = stored === "accepted";

  return {
    /** True once the visitor has made any decision, so the banner can hide. */
    hasDecided: stored !== null,
    hasAccepted,
  };
}

export { STORAGE_KEY as COOKIE_CONSENT_KEY };
