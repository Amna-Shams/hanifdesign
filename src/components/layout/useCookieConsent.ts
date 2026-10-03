"use client";

import { useSyncExternalStore } from "react";

/**
 * Cookie consent state, shared between the consent banner and the components
 * that must not load third-party resources before a visitor opts in.
 *
 * Two independent records are kept:
 *
 * 1. `cookie-consent` — the global decision ("accepted" / "rejected" /
 *    "dismissed"). The site has exactly one optional third party, so a single
 *    coarse decision is enough for it.
 * 2. `cookie-consent-map` — a granular, per-embed grant for the Google Maps
 *    frame on the contact page.
 *
 * The split exists because a global "reject" must not be a dead end. Under
 * UK GDPR/PECR a visitor can decline non-essential cookies *and* still ask for
 * one specific embed, provided that embed only loads after an explicit,
 * informed action — which is exactly what the "Load map" button is. Withdrawal
 * then has to be as easy as granting, so the loaded map offers a "Hide map"
 * control that clears the granular grant again.
 */

const STORAGE_KEY = "cookie-consent";
const MAP_STORAGE_KEY = "cookie-consent-map";

export type ConsentValue = "accepted" | "rejected" | "dismissed" | null;

/**
 * `localStorage` is not reactive, so the store keeps its own subscriber set.
 * The previous version used a no-op `subscribe`, which meant writing a choice
 * never notified anyone: the banner and the map only picked up a new value on
 * the next full page load, so consent taken during a visit appeared to do
 * nothing. Both setters below call `emit()`.
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

function readMapConsent(): boolean {
  try {
    return window.localStorage.getItem(MAP_STORAGE_KEY) === "granted";
  } catch {
    return false;
  }
}

export function setStoredConsent(value: Exclude<ConsentValue, null>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
    // An explicit rejection overrides any earlier per-embed grant, otherwise a
    // visitor could decline everything on the banner and still be shown a map
    // they had previously opened.
    if (value === "rejected") {
      window.localStorage.removeItem(MAP_STORAGE_KEY);
    }
  } catch {
    /* storage unavailable — the choice lasts for this page view only */
  }
  emit();
}

/** Grants or withdraws consent for the Google Maps embed on its own. */
export function setMapConsent(granted: boolean) {
  try {
    if (granted) {
      window.localStorage.setItem(MAP_STORAGE_KEY, "granted");
    } else {
      window.localStorage.removeItem(MAP_STORAGE_KEY);
    }
  } catch {
    /* storage unavailable — the grant lasts for this page view only */
  }
  emit();
}

export function useCookieConsent() {
  const stored = useSyncExternalStore(subscribe, readStoredConsent, () => null);
  const mapGranted = useSyncExternalStore(subscribe, readMapConsent, () => false);
  // `dismissed` means the visitor closed the banner without choosing. That is
  // not consent, so optional third parties stay off by default.
  const hasAccepted = stored === "accepted";

  return {
    /** True once the visitor has made any decision, so the banner can hide. */
    hasDecided: stored !== null,
    hasAccepted,
    /** True when this embed was specifically allowed, regardless of the banner. */
    hasMapConsent: mapGranted,
  };
}

export { STORAGE_KEY as COOKIE_CONSENT_KEY, MAP_STORAGE_KEY as MAP_CONSENT_KEY };
