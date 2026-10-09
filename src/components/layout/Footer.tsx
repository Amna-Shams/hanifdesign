import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  InstagramIcon,
  FacebookIcon,
  WhatsAppIcon,
  TikTokIcon,
} from "@/components/ui/BrandIcons";
import {
  CONTACT_INFO,
  REGISTERED_OFFICE,
  COMPANY_NUMBER,
  QUICK_LINKS,
  COMPANY_NAME,
  SERVICES,
} from "@/lib/constants";
import { toTelHref, toWhatsappHref } from "@/lib/utils";
import { CookieSettingsButton } from "./CookieSettingsButton";

/**
 * `hoverClass` carries the official brand colour as a literal so Tailwind's
 * scanner sees it — an interpolated `hover:text-[${brand}]` would be dropped
 * from the build.
 */
const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/hanifplanninganddesign",
    Icon: InstagramIcon,
    hoverClass: "hover:border-[#E1306C] hover:text-[#E1306C]",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/hanifplanninganddesign",
    Icon: FacebookIcon,
    hoverClass: "hover:border-[#1877F2] hover:text-[#1877F2]",
  },
  {
    label: "WhatsApp",
    href: toWhatsappHref(CONTACT_INFO.whatsappPhone),
    Icon: WhatsAppIcon,
    hoverClass: "hover:border-[#25D366] hover:text-[#25D366]",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@hanifplanninganddesign",
    Icon: TikTokIcon,
    hoverClass: "hover:border-[#FE2C55] hover:text-[#FE2C55]",
  },
] as const;

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Sitemap", href: "/sitemap" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-subtle bg-surface-translucent">
      <div className="mx-auto w-full max-w-[100rem] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-20 xl:px-12">
        {/* Five equal-width columns from `sm` up. The previous 6-track grid
            gave the brand column two tracks, which made it visibly wider than
            its neighbours and left the row reading as ragged rather than
            justified. `sm:grid-cols-6` with three half-spans keeps every row
            exactly full at the 2-up breakpoint too, so there is no orphan gap.

            Below `sm` it is a 2-up grid rather than a single stack — a
            full-height stack of five sections left a lot of dead vertical
            space on a phone. The brand, services and contact blocks span both
            tracks; Legal and Company share the middle row.

            DOM order is kept logical for screen readers, and `order-*` moves
            the visual arrangement only below `sm` — Legal is ordered ahead of
            Company there so it lands in the column to its left, and every
            `order` is reset at `sm` so the desktop order stays as authored. */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-6 sm:gap-10 lg:grid-cols-5 lg:gap-8">
          {/* 1 — Brand */}
          <div className="col-span-2 order-1 space-y-4 sm:col-span-3 sm:order-none lg:col-span-1">
            <Link
              href="/"
              className="inline-block"
              aria-label="Hanif Design and Consultancy — home"
            >
              {/* Theme-swapped lockups, matching the header. Neither theme puts a plate
                  behind the logo — the artwork is transparent, and on the light
                  surface a card read as a border around it. `light:` is a CSS
                  custom variant (see globals.css), so this works in a server
                  component with no client state. The link carries the
                  accessible name, so both images are decorative. */}
              <span className="relative grid h-10 w-[4.38rem] place-items-center sm:h-11 sm:w-[4.8rem] lg:h-12 lg:w-[5.25rem]">
                <Image
                  src="/hanif-design-logo.webp"
                  alt=""
                  fill
                  sizes="88px"
                  className="hidden object-contain light:block"
                />
                <Image
                  src="/hanif-design-logo-light.webp"
                  alt=""
                  fill
                  sizes="88px"
                  className="object-contain light:hidden"
                />
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-secondary">
              Hanif Design &amp; Consultancy Ltd provides planning consultancy and design support.
            </p>
          </div>

          {/* 2 — Services */}
          <nav
            aria-labelledby="footer-services"
            className="order-2 col-span-2 sm:order-none sm:col-span-3 lg:col-span-1"
          >
            <h2
              id="footer-services"
              className="mb-3 font-heading text-base font-semibold text-primary sm:mb-4"
            >
              Services
            </h2>
            <ul className="space-y-0.5 sm:space-y-1">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="-mx-2 inline-flex min-h-11 items-center rounded-md px-2 py-1.5 text-sm text-secondary transition-colors hover:text-gold"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3 — Company */}
          <nav
            aria-labelledby="footer-company"
            className="order-4 sm:order-none sm:col-span-3 lg:col-span-1"
          >
            <h2
              id="footer-company"
              className="mb-3 font-heading text-base font-semibold text-primary sm:mb-4"
            >
              Company
            </h2>
            <ul className="space-y-1">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="-mx-2 inline-flex min-h-11 items-center rounded-md px-2 py-1.5 text-sm text-secondary transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 4 — Legal. Ordered ahead of Company below `sm` so it takes the left
                column of the middle row. */}
          <nav
            aria-labelledby="footer-legal"
            className="order-3 sm:order-none sm:col-span-3 lg:col-span-1"
          >
            <h2
              id="footer-legal"
              className="mb-3 font-heading text-base font-semibold text-primary sm:mb-4"
            >
              Legal
            </h2>
            <ul className="space-y-1">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="-mx-2 inline-flex min-h-11 items-center rounded-md px-2 py-1.5 text-sm text-secondary transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 5 — Contact + social */}
          <div className="order-5 col-span-2 sm:order-none sm:col-span-6 lg:col-span-1">
            <h2
              id="footer-contact"
              className="mb-3 font-heading text-base font-semibold text-primary sm:mb-4"
            >
              Contact
            </h2>

            <address className="not-italic">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3 text-secondary">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <span>{REGISTERED_OFFICE}</span>
                </li>
                <li>
                  <a
                    href={toTelHref(CONTACT_INFO.phone)}
                    className="flex items-center gap-3 text-secondary transition-colors hover:text-gold"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    {CONTACT_INFO.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="flex items-center gap-3 break-all text-secondary transition-colors hover:text-gold"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    {CONTACT_INFO.email}
                  </a>
                </li>
              </ul>
            </address>

            <ul className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={[
                      "flex h-11 w-11 items-center justify-center rounded-full border border-subtle",
                      "bg-surface-elevated text-secondary transition-colors duration-200",
                      "hover:-translate-y-0.5",
                      social.hoverClass,
                    ].join(" ")}
                  >
                    <social.Icon className="h-[1.15rem] w-[1.15rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Colophon */}
        <div className="mt-8 space-y-2 border-t border-subtle pt-6 text-sm sm:mt-10 sm:pt-8 lg:mt-14">
          <p className="text-secondary">
            {/* Literal character rather than the `&copy;` entity: React decodes
                JSX entities as text, which rendered a bare "c" instead of "©". */}
            © 2026 {COMPANY_NAME}. All rights reserved.
          </p>
          <p className="text-muted">
            Registered in England &amp; Wales | Company No. {COMPANY_NUMBER} | Registered Office:{" "}
            {REGISTERED_OFFICE}
          </p>

          {/* The cookie policy promises a way to revisit the consent choice. */}
          <CookieSettingsButton />
        </div>
      </div>
    </footer>
  );
}
