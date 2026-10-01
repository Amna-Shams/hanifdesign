"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
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

function readStoredTheme(): Theme {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Starts dark to match the server-rendered CSS. The inline <head> script has
  // already set `data-theme` before paint, so the very first client render reads
  // the same stored value and React never shows the wrong palette.
  const [theme, setTheme] = useState<Theme>("dark");

  // Adjust during render rather than in an effect: reading storage synchronises
  // an external system, and doing it here avoids a cascading re-render.
  const [initialised, setInitialised] = useState(false);
  if (!initialised) {
    setInitialised(true);
    const stored = readStoredTheme();
    if (stored !== theme) setTheme(stored);
  }

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage unavailable — the choice lasts for this page view only */
    }
  }, [theme]);

  // Follow the OS only while the visitor has not made an explicit choice.
  useEffect(() => {
    if (!window.matchMedia) return;

    const query = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (event: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch {
        stored = null;
      }
      if (stored) return;
      setTheme(event.matches ? "light" : "dark");
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
