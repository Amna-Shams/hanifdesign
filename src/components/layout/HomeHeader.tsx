"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";

/** Menu entries for the slide-in panel. */
const MENU_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

/** Thumbnail for each service tile in the panel's left-hand column. */
const SERVICE_IMAGES: Record<(typeof SERVICES)[number]["slug"], string> = {
  "planning-applications": "/planning application.webp",
  "building-regulations-support": "/building regulation support.webp",
  "feasibility-layouts": "/feasibility layouts.webp",
  "interior-visualisation": "/two-storey-side-extension-four-oaks-2.webp",
  "3d-floor-plans": "/hmo-development-selly-oak-1.webp",
  "virtual-staging": "/interior-vis-warm-modern.webp",
  drawings: "/design drawings.webp",
  "exterior-rendering": "/two-storey-side-extension-four-oaks-1.webp",
  "3d-visualisation": "/3d.webp",
  "development-guidance": "/development guidance.webp",
};

/**
 * Homepage header. Floats over the full-bleed hero with the logo at the left
 * and a single MENU pill at the right; the pill opens a yellow panel that
 * slides in from the right while the page dims behind it.
 */
export function HomeHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change (adjusting state during render avoids a stale frame).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Escape to close, scroll lock, and focus management while open.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();
    const opener = openRef.current;
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      opener?.focus();
    };
  }, [open]);

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-300",
          scrolled ? "bg-background/90 shadow-lg backdrop-blur-md" : "bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex h-16 w-full max-w-[100rem] items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-10 xl:px-12">
          <Link
            href="/"
            aria-label="Hanif Design & Consultancy Ltd — home"
            className="relative block h-10 w-[4.38rem] sm:h-12 sm:w-[5.25rem]"
          >
            {/* Over the photo the light-ink lockup is always used; once the bar
                is solid the theme-swapped pair takes over, as elsewhere. */}
            {scrolled ? (
              <>
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
                  sizes="96px"
                  className="object-contain light:hidden"
                />
              </>
            ) : (
              <Image
                src="/hanif-design-logo-light.webp"
                alt=""
                fill
                priority
                sizes="96px"
                className="object-contain brightness-125 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]"
              />
            )}
          </Link>

          <button
            ref={openRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="home-menu"
            className="min-h-11 rounded-full bg-gold px-5 text-xs font-semibold uppercase tracking-wider text-on-accent transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Menu
          </button>
        </div>
      </header>

      {/* Dimmer */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={[
          "fixed inset-0 z-50 bg-black/60 transition-opacity duration-500",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      />

      {/* Slide-in panel */}
      <div
        id="home-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        className={[
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-[44rem] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Services column (from `sm` up) */}
        <nav
          aria-label="Services"
          className="hidden w-48 shrink-0 overflow-y-auto bg-[#101113]/80 px-4 pb-6 pt-24 backdrop-blur-md sm:block"
        >
          <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/70">
            Services
          </p>
          <ul className="space-y-4">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="group block">
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-sm bg-white/10">
                    <Image
                      src={SERVICE_IMAGES[service.slug]}
                      alt=""
                      fill
                      sizes="160px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </span>
                  <span className="mt-1.5 block text-xs text-white/85 group-hover:text-white">
                    {service.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Yellow link panel */}
        <div className="relative flex flex-1 flex-col bg-gold px-6 pb-8 pt-24 text-on-accent sm:px-8">
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-3 min-h-11 rounded-full bg-[#1a1a1a] px-5 text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a1a1a] sm:right-6 sm:top-4"
          >
            Close
          </button>

          <nav aria-label="Main">
            <ul className="space-y-1">
              {MENU_LINKS.map((link) => {
                const active =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className="group flex items-center gap-3 font-serif text-[2.1rem] leading-[1.2] sm:text-[2.6rem]"
                    >
                      <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center">
                        {active && (
                          <span
                            aria-hidden="true"
                            className="h-2 w-2 bg-[#1a1a1a] group-hover:hidden"
                          />
                        )}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 hidden items-center justify-center rounded-full bg-[#1a1a1a] text-white group-hover:flex group-focus-visible:flex"
                        >
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </span>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
