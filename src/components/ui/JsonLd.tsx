/**
 * JSON-LD structured data.
 *
 * Rendered as a plain `<script type="application/ld+json">` from the server
 * component that owns the page, so the markup is in the initial HTML and
 * crawlers that do not execute JavaScript still see it.
 */
import { SITE_NAME, SITE_URL, canonical } from "@/lib/site";
import { COMPANY_NAME, CONTACT_INFO } from "@/lib/constants";

type Json = Record<string, unknown>;

function organisation(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organisation`,
    name: SITE_NAME,
    // `legalName` must be the registered name verbatim. It used to be derived as
    // `${SITE_NAME} Limited`, which invented a suffix the company is not
    // registered under — structured data should state facts, not concatenate.
    legalName: COMPANY_NAME,
    url: SITE_URL,
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    description:
      "Planning consultancy and design support for residential projects across Birmingham and the West Midlands.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "369 Hagley Road West",
      addressLocality: "Quinton, Birmingham",
      addressRegion: "West Midlands",
      postalCode: "B32 2AL",
      addressCountry: "GB",
    },
    areaServed: [
      { "@type": "City", name: "Birmingham" },
      { "@type": "AdministrativeArea", name: "West Midlands" },
    ],
    knowsAbout: [
      "Planning applications",
      "Permitted development",
      "Planning appeals",
      "Building regulations",
      "Design drawings",
      "3D visualisation",
    ],
    sameAs: [
      "https://www.instagram.com/hanifplanninganddesign",
      "https://www.facebook.com/hanifplanninganddesign",
      "https://www.tiktok.com/@hanifplanninganddesign",
    ],
  };
}

/**
 * Sitewide organisation markup.
 *
 * `ProfessionalService` is a subtype of `LocalBusiness`, so this one block
 * satisfies the local-business panel for a consultancy: it is what makes the
 * office address, phone and service area eligible to appear in a knowledge
 * panel. It is emitted once from the marketing layout rather than on every
 * page, which is both correct and avoids repeating identical markup.
 */
export function OrganisationSchema() {
  return (
    <script
      type="application/ld+json"
      // Serialised server-side from a literal, so there is no user input in it.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation()) }}
    />
  );
}

export type Crumb = { name: string; path: string };

/**
 * Breadcrumb trail. Emitted on nested pages only — a breadcrumb that just says
 * "Home" is not worth the markup.
 */
export function BreadcrumbSchema({ items }: { items: Crumb[] }) {
  const data: Json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export type Faq = { q: string; a: string };

/**
 * FAQPage markup.
 *
 * Only emitted where the questions and answers are both genuinely on the page
 * and in the same wording — marking up questions that are not visible is a
 * manual-action risk, and Google restricted FAQ rich results to authoritative
 * government and health sites in 2023, so this is for entity understanding
 * rather than expected rich snippets.
 */
export function FaqSchema({ faqs }: { faqs: Faq[] }) {
  const data: Json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
