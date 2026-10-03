"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

/**
 * Colour theme.
 *
 * Dark is the default because it is the site's established identity, and the
 * dark palette lives on `:root` in `globals.css` so a visitor with JavaScript
 * disabled still gets a correct page. This provider only *re-points the same
 * token names* at the light palette via `data-theme="light"` on <html>, which
 * is why components need no theme-aware classes of their own.
 */

export type Theme = "light" | "dark";

const STORAGE_KEY = "hanif-theme";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
});

/** Inlined in <head> before paint, so the stored theme applies with no flash. */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
    var prefersLight =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    var theme = stored || (prefersLight ? "light" : "dark");
    if (theme === "light") document.documentElement.setAttribute("data-theme", "light");
  } catch (e) {
    /* storage blocked — keep the dark default */
  }
})();
`;

function readStoredTheme(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * The theme lives on <html data-theme>, which the inline <head> script sets
 * before first paint. That attribute is the single source of truth, so React
 * subscribes to it with `useSyncExternalStore` rather than copying it into
 * state: the server snapshot is "dark" (what the server rendered), React
 * hydrates against that, and only then re-renders with the real value. Reading
 * storage during the first client render instead made the toggle's
 * aria-label / title / aria-pressed disagree with the server HTML.
 */
function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "light") root.setAttribute("data-theme", "light");
  else root.removeAttribute("data-theme");
}

function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  // Follow the OS only while the visitor has not made an explicit choice.
  const query = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;
  const onSystemChange = (event: MediaQueryListEvent) => {
    if (readStoredTheme()) return;
    applyTheme(event.matches ? "light" : "dark");
  };
  query?.addEventListener("change", onSystemChange);

  return () => {
    observer.disconnect();
    query?.removeEventListener("change", onSystemChange);
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "dark");

  const toggleTheme = useCallback(() => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — the choice lasts for this page view only */
    }
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
