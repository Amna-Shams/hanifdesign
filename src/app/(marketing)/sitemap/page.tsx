"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { RevealItem, RevealStagger } from "@/components/ui/Reveal";
import { CONTACT_INFO, SERVICES } from "@/lib/constants";
import { toTelHref } from "@/lib/utils";

interface SitemapLink {
  label: string;
  href: string;
  /** Render as plain text — used for the current page. */
  disabled?: boolean;
  /** Off-site links open in a new tab. */
  external?: boolean;
}

interface SitemapCategory {
  id: string;
  title: string;
  links: readonly SitemapLink[];
}

/**
 * Every href below resolves to a real route. Service links are generated from
 * the SERVICES constant, so a new service can never produce a dead link here.
 */
const categories: readonly SitemapCategory[] = [
  {
    id: "main",
    title: "Main pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Projects", href: "/projects" },
      { label: "Frequently asked questions", href: "/faq" },
      { label: "Request a quote", href: "/quote" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    id: "services",
    title: "Services",
    links: SERVICES.map((service) => ({
      label: service.label,
      href: `/services/${service.slug}`,
    })),
  },
  {
    id: "projects",
    title: "Projects",
    links: [
      { label: "All projects", href: "/projects" },
      { label: "Residential projects", href: "/projects?category=Residential" },
      { label: "Commercial projects", href: "/projects?category=Commercial" },
    ],
  },
  {
    id: "company",
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Our services", href: "/services" },
      { label: "Recent work", href: "/projects" },
    ],
  },
  {
    id: "legal",
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
      { label: "Cookie policy", href: "/cookies" },
      { label: "Site map", href: "/sitemap", disabled: true },
    ],
  },
  {
    id: "contact",
    title: "Contact",
    links: [
      { label: "Contact form", href: "/contact" },
      { label: "Request a quote", href: "/quote" },
      { label: `Call ${CONTACT_INFO.phone}`, href: toTelHref(CONTACT_INFO.phone), external: true },
      { label: "WhatsApp us", href: "https://wa.me/447901646719", external: true },
      { label: "Email us", href: `mailto:${CONTACT_INFO.email}`, external: true },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      {/* Hero / breadcrumb */}
      <section className="relative overflow-hidden bg-surface-translucent py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/" className="font-medium text-gold transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-muted">
                /
              </li>
              <li aria-current="page" className="text-secondary">
                Site map
              </li>
            </ol>
          </nav>

          {/* The title block is deliberately static: it is the first viewport and
              the h1 is the LCP element, so a `whileInView` reveal would ship
              `opacity: 0` in the server HTML and hold it back until hydration. */}
          <h1 className="mb-4 font-heading text-4xl font-bold leading-tight text-primary sm:text-5xl">
            Site <span className="text-gold">structure</span>
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-secondary">
            Navigate the Hanif Design &amp; Consultancy website. Explore our services, projects and
            resources at a glance.
          </p>
        </div>
      </section>

      {/* Link index */}
      <section className="bg-surface-translucent py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">All pages</h2>

          <RevealStagger className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <RevealItem key={category.id}>
                <nav
                  id={category.id}
                  aria-labelledby={`${category.id}-heading`}
                  className="lg:border-l lg:border-subtle lg:pl-6"
                >
                  <h3
                    id={`${category.id}-heading`}
                    className="mb-4 font-heading text-lg font-semibold text-primary"
                  >
                    {category.title}
                  </h3>

                  <ul className="space-y-1">
                    {category.links.map((link) =>
                      link.disabled ? (
                        <li
                          key={link.href}
                          aria-current="page"
                          className="flex items-center justify-between gap-2 py-1.5 text-sm text-muted"
                        >
                          {link.label}
                          <span className="text-xs uppercase tracking-wide">Current</span>
                        </li>
                      ) : link.external ? (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            {...(link.href.startsWith("http")
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                            className="group flex items-center justify-between gap-2 py-1.5 text-sm text-secondary transition-colors hover:text-gold"
                          >
                            {link.label}
                            <ExternalLink
                              className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                      ) : (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="group flex items-center justify-between gap-2 py-1.5 text-sm text-secondary transition-colors hover:text-gold"
                          >
                            {link.label}
                            <ArrowRight
                              className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                              aria-hidden="true"
                            />
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                </nav>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>
    </>
  );
}
