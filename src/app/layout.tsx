import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Poppins } from "next/font/google";
import { GridBackground } from "@/components/layout/GridBackground";
import { ThemeProvider, themeInitScript } from "@/components/providers/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700"],
});

/* Used for drafting annotations — kickers, sheet references, figure labels. */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: "#101113",
  colorScheme: "dark",
};

/**
 * Root layout — supplies `<html>`/`<body>` and the font variables only.
 *
 * Titles, descriptions, OpenGraph and `metadataBase` live in the `(marketing)`
 * group layout, which now wraps every route. Duplicating them here would mean
 * two places to update the site URL.
 */
export const metadata: Metadata = {
  title: {
    default: "Hanif Design & Consultancy — Design Consultancy in Birmingham",
    template: "%s | Hanif Design & Consultancy",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      // The inline theme script sets `data-theme` on <html> before React
      // hydrates, so this one element is expected to differ from the server HTML.
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable} ${plexMono.variable} h-full antialiased`}
    >
      <head>
        {/* Applies the stored theme before first paint, so switching never
            flashes the dark palette first. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <ThemeProvider>
          {/* Site-wide blueprint wallpaper. Lives in the root layout so every
              route inherits it; `isolation: isolate` gives the negative-z child a
              stacking context to sit in, which is what keeps it from being
              painted over by the route content below. */}
          <div className="isolate">
            <GridBackground />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
