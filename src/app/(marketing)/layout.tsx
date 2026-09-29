import type { Metadata, Viewport } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { SITE_URL } from "@/lib/site";

export const viewport: Viewport = {
  themeColor: "#101113",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hanif Design & Consultancy — Design Consultancy in Birmingham",
    template: "%s | Hanif Design & Consultancy",
  },
  description: "Expert planning consultancy for residential projects in Birmingham. Planning applications, permitted development, appeals, and pre-application advice.",
  keywords: ["planning consultant", "Birmingham", "planning applications", "permitted development", "planning appeals", "residential planning"],
  authors: [{ name: "Hanif Design & Consultancy Limited" }],
  creator: "Hanif Design & Consultancy Limited",
  publisher: "Hanif Design & Consultancy Limited",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "Hanif Design & Consultancy",
    title: "Hanif Design & Consultancy — Design Consultancy in Birmingham",
    description: "Expert planning consultancy for residential projects in Birmingham.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hanif Design & Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hanif Design & Consultancy",
    description: "Expert planning consultancy for residential projects in Birmingham.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }],
    shortcut: ["/favicon-16x16.png"],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    /* No background fill here on purpose: this wrapper is the stacking context
       that lets the root layout's `z-index: -1` grid wallpaper sit behind the
       page. An opaque fill here would paint straight over it. The base colour
       comes from the body background, which propagates to the canvas. */
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}