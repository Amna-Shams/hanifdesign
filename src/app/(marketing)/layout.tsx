import type { Metadata, Viewport } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { OrganisationSchema } from "@/components/ui/JsonLd";
import { SITE_URL } from "@/lib/site";
import { COMPANY_NAME } from "@/lib/constants";

export const viewport: Viewport = {
  themeColor: "#101113",
  colorScheme: "dark",
  // `viewport-fit=cover` lets the fixed cookie banner and the floating
  // WhatsApp/theme buttons sit flush to the edge, then opt back in via
  // `env(safe-area-inset-*)` padding so they clear the iPhone home indicator
  // and notch. Without it iOS insets the whole viewport, which looks broken.
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hanif Design & Consultancy — Design Consultancy in Birmingham",
    template: "%s | Hanif Design & Consultancy",
  },
  description: "Expert planning consultancy for residential projects in Birmingham. Planning applications, permitted development, appeals, and pre-application advice.",
  keywords: ["planning consultant", "Birmingham", "planning applications", "permitted development", "planning appeals", "residential planning"],
  authors: [{ name: COMPANY_NAME }],
  creator: COMPANY_NAME,
  publisher: COMPANY_NAME,
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
      {/* Emitted once here rather than per page: every route shares the same
          business identity, and repeating identical markup on 26 URLs is
          noise. */}
      <OrganisationSchema />
      <Header />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <CookieBanner />
      <FloatingActions />
    </div>
  );
}