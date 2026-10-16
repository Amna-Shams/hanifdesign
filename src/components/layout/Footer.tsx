import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import {
  InstagramIcon,
  FacebookIcon,
  WhatsAppIcon,
  TikTokIcon,
} from "@/components/ui/BrandIcons";
import {
  CONTACT_INFO,
  QUICK_LINKS,
  COMPANY_NAME,
  SERVICES,
} from "@/lib/constants";
import { toTelHref, toWhatsappHref } from "@/lib/utils";

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
        {/* Brand + contact on the left; Company and Services lists on the right. */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-12">
          {/* Brand, contact, social */}
          <div className="col-span-2 space-y-5 lg:col-span-1">
            <Link
              href="/"
              className="inline-block"
              aria-label="Hanif Design and Consultancy — home"
            >
              {/* Theme-swapped lockups, matching the header. `light:` is a CSS
                  custom variant (see globals.css). The link carries the
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

            <p className="max-w-sm text-sm leading-relaxed text-secondary">
              Planning, design and visualisation for residential projects, with interior design and graphics support, based in Birmingham and serving the West Midlands.
            </p>

            <address className="not-italic">
              <ul className="space-y-2 text-sm">
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
                    className="flex items-center gap-3 text-secondary transition-colors hover:text-gold"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    {CONTACT_INFO.email}
                  </a>
                </li>
              </ul>
            </address>

            <div>
              <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-wider text-muted">
                Follow &amp; Connect
              </p>
              <ul className="flex flex-nowrap items-center gap-2.5">
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

          {/* Company */}
          <nav aria-labelledby="footer-company">
            <h2
              id="footer-company"
              className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary sm:mb-4"
            >
              Company
            </h2>
            <ul className="space-y-0.5">
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

          {/* Services */}
          <nav aria-labelledby="footer-services">
            <h2
              id="footer-services"
              className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary sm:mb-4"
            >
              Services
            </h2>
            <ul className="space-y-0.5">
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
        </div>

        {/* Colophon */}
        <div className="mt-10 flex flex-col gap-4 border-t border-subtle pt-6 text-sm sm:pt-8 lg:mt-14 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-secondary">
              {/* Literal character: React decodes JSX entities as text, which
                  rendered a bare "c" instead of "©". */}
              © 2026 {COMPANY_NAME}. All rights reserved.
            </p>
          </div>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-secondary">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
