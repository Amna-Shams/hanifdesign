import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import {
  InstagramIcon,
  FacebookIcon,
  WhatsAppIcon,
  TikTokIcon,
} from "@/components/ui/BrandIcons";
import {
  CONTACT_INFO,
  REGISTERED_OFFICE,
  QUICK_LINKS,
  SERVICES,
} from "@/lib/constants";
import { toTelHref, toWhatsappHref } from "@/lib/utils";
import { NewsletterForm } from "./NewsletterForm";
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
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
  { label: "Cookie policy", href: "/cookies" },
  { label: "Site map", href: "/sitemap" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-subtle bg-surface-translucent">
      <div className="mx-auto w-full max-w-[100rem] px-4 py-16 sm:px-6 lg:px-10 lg:py-20 xl:px-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand + contact */}
          <div className="space-y-5">
            <Link href="/" className="inline-block" aria-label="Hanif Design and Consultancy — home">
              {/* The source art is a white sheet, so it is mounted like one: a
                  white card with a hairline and a soft shadow. The link carries
                  the accessible name, so the image itself is decorative. */}
              {/* Sized on the same breakpoints as the header plate, so the brand
                  mark scales with the viewport instead of sitting oversized on a
                  phone. The ratio is the source art's own 1.54:1. */}
              <span className="relative grid h-11 w-[4.25rem] place-items-center bg-white p-1 shadow-sm ring-1 ring-black/30 transition-shadow duration-300 hover:shadow-glow sm:h-12 sm:w-[4.75rem] lg:h-14 lg:w-[5.5rem]">
                <Image src="/logo.png" alt="" fill sizes="88px" className="object-contain" />
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-secondary">
              Hanif Design &amp; Consultancy Ltd provides planning consultancy and design support.
            </p>

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
          </div>

          {/* Quick links */}
          <nav aria-labelledby="footer-quicklinks">
            <h2 id="footer-quicklinks" className="mb-4 font-heading text-base font-semibold text-primary">
              Quick links
            </h2>
            <ul className="space-y-1">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                        className="group -mx-2 inline-flex min-h-11 items-center gap-1 rounded-md px-2 py-1.5 text-sm text-secondary transition-colors hover:text-gold"
                      >
                        {link.label}
                    <ArrowRight
                      className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-labelledby="footer-services">
            <h2 id="footer-services" className="mb-4 font-heading text-base font-semibold text-primary">
              Services
            </h2>
            <ul className="space-y-1">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group inline-flex items-center gap-1 py-1.5 text-sm text-secondary transition-colors hover:text-gold"
                  >
                    {service.label}
                    <ArrowRight
                      className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter + social */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-2 font-heading text-base font-semibold text-primary">Newsletter</h2>
              <p className="mb-4 text-sm text-secondary">
                Occasional planning tips and regulatory updates. No spam.
              </p>
              <NewsletterForm />
            </div>

            {/* Referenced by the cookie policy: the only way to revisit the
                consent choice after the banner has been dismissed. */}
            <CookieSettingsButton />
            <div>
              <h2 className="mb-3 font-heading text-base font-semibold text-primary">Follow us</h2>
              <ul className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={[
                        "flex h-10 w-10 items-center justify-center rounded-full border border-subtle",
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
        </div>

        {/* Legal bar — centred under the columns, as a colophon. */}
        <div className="mt-14 space-y-4 border-t border-subtle pt-8 text-center">
          <p className="text-sm text-secondary">
            &copy; {new Date().getFullYear()} Hanif Design &amp; Consultancy Limited. All rights
            reserved.
          </p>

          {/* Separators carry their own horizontal padding (`px-3`) instead of
              relying on a list gap, so the pipe sits the same distance from
              the link on its left as from the one on its right. */}
          <ul className="flex flex-wrap items-center justify-center gap-y-2 text-sm">
            {LEGAL_LINKS.map((link, index) => (
              <li key={link.href} className="flex items-center">
                {index > 0 ? (
                  <span aria-hidden="true" className="px-3 text-muted">
                    |
                  </span>
                ) : null}
                <Link href={link.href} className="-mx-2 inline-flex min-h-11 items-center rounded-md px-2 py-1.5 text-muted transition-colors hover:text-gold">
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
