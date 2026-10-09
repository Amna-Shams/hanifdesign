"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer whenever the route changes. Adjusting state during
  // render (rather than in an effect) avoids a frame where the old route is
  // still showing an open drawer.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setIsMobileOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full transition-[background-color,box-shadow,border-color] duration-300",
        /* Translucent so the grid wallpaper reads through. The blur is only
           paid for once the page has scrolled under the bar; at rest there is
           nothing behind it, so the at-rest fill can stay lighter.
           Scrolled, real content sits behind the bar, so the fill goes to 90%
           — any lighter and a gold heading scrolling underneath would drop the
           small nav text under 4.5:1. */
        isScrolled
          ? "border-b border-subtle bg-background/90 shadow-lg backdrop-blur-md"
          : "border-b border-transparent bg-background/55",
      ].join(" ")}
    >
      {/* Accent rule: reads as the sheet edge of a drawing, and only appears
          once the page has moved so the header does not shout on first paint. */}
      <div
        aria-hidden="true"
        className={[
          "h-px w-full origin-left bg-gradient-to-r from-gold/80 via-gold/25 to-transparent",
          "transition-transform duration-500 ease-out",
          isScrolled ? "scale-x-100" : "scale-x-0",
        ].join(" ")}
      />

      <div className="mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-10 xl:px-12">
        <nav
          className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem] lg:h-20 lg:gap-8"
          aria-label="Main"
        >
          {/* Wordmark */}
          <Link
            href="/"
            className="group flex min-w-0 shrink items-center gap-3 sm:gap-4"
            aria-label="Hanif Design & Consultancy Ltd — home"
          >
            {/* Two lockups of identical 1.75:1 geometry, swapped by theme. On the
                light theme the dark-ink artwork is mounted on a white plate
                with a hairline and a soft shadow; on the dark theme the plate
                is dropped and the light-ink artwork sits directly against the
                background. `light:` is a CSS custom variant (see globals.css),
                so this resolves with no client state and cannot flash the wrong
                logo. Only the dark-theme copy is `priority`: dark is what the
                server renders, and the light-theme copy stays lazy so it is not
                fetched until it is shown. */}
            <span className="relative grid h-10 w-[4.38rem] shrink-0 place-items-center light:bg-white light:p-1 light:shadow-sm light:ring-1 light:ring-black/30 light:transition-shadow light:duration-300 light:group-hover:shadow-glow sm:h-11 sm:w-[4.8rem] lg:h-12 lg:w-[5.25rem]">
              <Image
                src="/hanif-design-logo.webp"
                alt=""
                fill
                sizes="96px"
                className="hidden object-contain light:block"
              />
              <Image
                src="/hanif-design-logo-light.webp"
                alt=""
                fill
                priority
                sizes="96px"
                className="object-contain light:hidden"
              />
            </span>

            <span className="flex min-w-0 flex-col leading-none">
              <span className="truncate font-heading text-[0.8rem] font-bold tracking-tight text-gold sm:text-sm lg:text-base">
                Hanif Design &amp; Consultancy Ltd
              </span>
            </span>
          </Link>

          {/* Desktop nav. The full set of links, the direct line and the CTA
              only fit from `lg` up — below that the drawer takes over. */}
          <div className="hidden min-w-0 items-center gap-1 lg:flex xl:gap-2">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "group relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 xl:px-4",
                    active
                      ? "bg-primary-light text-primary"
                      : "text-secondary hover:bg-primary-light/60 hover:text-primary",
                  ].join(" ")}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={[
                      "absolute inset-x-3 -bottom-px h-0.5 origin-left rounded-full bg-gold xl:inset-x-4",
                      "transition-transform duration-300 ease-out",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    ].join(" ")}
                  />
                </Link>
              );
            })}

            <Button variant="gold" size="sm" className="ml-1 shrink-0 xl:ml-2" asChild>
              <Link href="/contact">Get a consultation</Link>
            </Button>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-md border border-subtle text-primary transition-colors hover:border-primary hover:bg-surface-elevated"
              aria-label="Open menu"
              aria-expanded={isMobileOpen}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </div>

      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </header>
  );
}
