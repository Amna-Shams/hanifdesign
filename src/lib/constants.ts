export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const CONTACT_INFO = {
  phone: "+44 7901 646 719",
  /** Same line as `phone`; kept separate so intent is explicit at call sites. */
  whatsappPhone: "+44 7901 646 719",
  email: "hanif.ghumra@yahoo.com",
} as const;

export const REGISTERED_OFFICE =
  "369 Hagley Road West Quinton, Birmingham, England, B32 2AL";

/**
 * Google Maps search target for {@link REGISTERED_OFFICE}. Kept separate so the
 * embed can target a latitude/longitude pair later without touching the postal
 * address shown to visitors.
 */
export const OFFICE_MAP_QUERY = "369 Hagley Road West Quinton, Birmingham, B32 2AL";

/**
 * Registered company name.
 *
 * Single source of truth for the legal entity name, used by the footer colophon,
 * the privacy/terms/cookies pages and the page metadata. Centralised because
 * "Ltd" and "Limited" had already drifted apart across eight call sites, and the
 * branding carries the authority here — the registered logo artwork reads
 * "HANIF DESIGN & CONSULTANCY LTD".
 *
 * "Ltd" and "Limited" are legally interchangeable, but only one of them is the
 * registered name, and mixing them on the same site undermines credibility.
 */
export const COMPANY_NAME = "Hanif Design & Consultancy Ltd";

export const COMPANY_NUMBER = "14139690";

export const DISCLAIMER = "The information on this website is for general guidance only and does not constitute professional planning advice. Always consult a qualified planning consultant for site-specific matters.";

export const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Quote form options, shared by the form and the API so the value stored in
 * the database and the label printed in the notification email can never
 * drift apart.
 */
export const QUOTE_PROJECT_TYPES = [
  { value: "extension", label: "Extension" },
  { value: "loft", label: "Loft Conversion" },
  { value: "new-build", label: "New Build Home" },
  { value: "commercial", label: "Commercial" },
  { value: "other", label: "Other" },
] as const;

export const QUOTE_BUDGET_RANGES = [
  { value: "under-50k", label: "Under £50,000" },
  { value: "50k-100k", label: "£50,000 – £100,000" },
  { value: "100k-250k", label: "£100,000 – £250,000" },
  { value: "250k-500k", label: "£250,000 – £500,000" },
  { value: "500k-plus", label: "£500,000+" },
  { value: "unsure", label: "Not sure yet" },
] as const;

/** Human-readable label for a stored option value, falling back to the raw value. */
export function labelForOption<T extends { value: string; label: string }>(
  options: readonly T[],
  value: string,
): string {
  return options.find((option) => option.value === value)?.label ?? value;
}

/**
 * Canonical service catalogue.
 *
 * This is the single source of truth: the services index, the service detail
 * pages (`generateStaticParams`), the footer, the sitemap page and the
 * homepage all derive from it, so a new entry automatically produces a working
 * page everywhere and a link can never 404.
 */
export const SERVICES = [
  {
    slug: "planning-applications",
    label: "Planning Applications",
    short: "Full planning support from feasibility to approval.",
  },
  {
    slug: "building-regulations-support",
    label: "Building Regulations Support",
    short: "Compliance drawings and submissions for building control.",
  },
  {
    slug: "design-drawings",
    label: "Design Drawings",
    short: "Clear, buildable, planning-ready drawing packages.",
  },
  {
    slug: "feasibility-layouts",
    label: "Feasibility Layouts",
    short: "Capacity studies and constraint mapping before you commit.",
  },
  {
    slug: "3d-visualisation",
    label: "3D Visualisation",
    short: "Photorealistic renders for committees and sales.",
  },
  {
    slug: "development-guidance",
    label: "Development Guidance",
    short: "Policy-led strategy to protect your programme.",
  },
] as const;