export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const CONTACT_INFO = {
  phone: "+44 7813 706185",
  /** Same line as `phone`; kept separate so intent is explicit at call sites. */
  whatsappPhone: "+44 7813 706185",
  email: "info@hanifdesignconsultancyltd.co.uk",
} as const;

/**
 * Registered company name.
 *
 * Single source of truth for the legal entity name, used by the footer colophon,
 * the privacy/terms/cookies pages and the page metadata. Centralised because
 * "Ltd" and "Limited" had already drifted apart across eight call sites, and the
 * branding carries the authority here: the mark reads "HANIF DESIGN", so the
 * "& Consultancy Ltd" that completes the registered name has to be set in type
 * alongside it rather than left to the artwork.
 *
 * "Ltd" and "Limited" are legally interchangeable, but only one of them is the
 * registered name, and mixing them on the same site undermines credibility.
 */
export const COMPANY_NAME = "Hanif Design & Consultancy Ltd";

export const COMPANY_NUMBER = "14139690";

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
  { value: "under-50k", label: "Smaller project" },
  { value: "50k-100k", label: "Medium project" },
  { value: "100k-250k", label: "Larger project" },
  { value: "250k-500k", label: "Substantial project" },
  { value: "500k-plus", label: "Major development" },
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
    slug: "interior-visualisation",
    label: "Interior Visualisation",
    short: "Photorealistic interior renders, animations and virtual tours.",
  },
  {
    slug: "exterior-rendering",
    label: "Exterior Rendering",
    short: "Photorealistic exterior renders that place projects in real context.",
  },
  {
    slug: "3d-floor-plans",
    label: "3D Floor Plans",
    short: "Top-view, angle-view and dollhouse floor plan renders.",
  },
  {
    slug: "3d-visualisation",
    label: "3D Visualisation",
    short: "Photorealistic renders for committees and sales.",
  },
  {
    slug: "virtual-staging",
    label: "Virtual Staging",
    short: "Virtual staging, styling, renovation and 360° views for property marketing.",
  },
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
    slug: "feasibility-layouts",
    label: "Feasibility Layouts",
    short: "Capacity studies and constraint mapping before you commit.",
  },
  {
    slug: "development-guidance",
    label: "Development Guidance",
    short: "Policy-led strategy to protect your programme.",
  },
] as const;