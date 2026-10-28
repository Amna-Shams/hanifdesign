import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal, RevealItem, RevealStagger } from "@/components/ui/Reveal";
import { BreadcrumbSchema } from "@/components/ui/JsonLd";
import { COMPANY_NAME, COMPANY_NUMBER, CONTACT_INFO, SERVICES } from "@/lib/constants";
import { SITE_NAME, SITE_URL, canonical } from "@/lib/site";
import { toWhatsappHref } from "@/lib/utils";

const PAGE_TITLE = "About Us | Planning Consultants across England | Hanif Design & Consultancy";
const PAGE_DESCRIPTION =
  "Hanif Design & Consultancy is a planning consultancy helping homeowners and developers across England win planning approval.";
const OG_IMAGE = "/uk-detached-brick-house-gravel-drive.webp";

export const metadata: Metadata = {
  // `absolute` skips the "%s | Hanif Design & Consultancy" template: the brand
  // is already in this title.
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: canonical("/about") },
  robots: { index: true, follow: true },
  // A page-level `openGraph` replaces the layout's object instead of merging
  // with it, so every field is restated.
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: SITE_NAME,
    url: canonical("/about"),
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}${OG_IMAGE}`,
        width: 735,
        height: 490,
        alt: "Detached brick and render family home with a gravel drive, designed by Hanif Design & Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}${OG_IMAGE}`],
  },
};

const approachSteps = [
  {
    title: "Policy and precedent research",
    body: "We read the local plan and the council's recent decisions on similar sites. This tells us what the case officer is likely to accept and what they are likely to question.",
  },
  {
    title: "Feasibility layouts",
    body: "We test two or three layouts against those findings, so you can see what fits the plot before you commit to full drawings.",
  },
  {
    title: "Planning-ready drawings and visuals",
    body: "We prepare planning drawings, a design and access statement and, where it helps, 3D visuals that show the proposal in its setting.",
  },
  {
    title: "Submission and officer liaison",
    body: "We submit the application, answer the case officer's questions and agree changes with you if they are needed.",
  },
] as const;

const serviceLines: Record<(typeof SERVICES)[number]["slug"], string> = {
  "planning-applications": "Householder and larger applications, from first advice to decision.",
  "building-regulations-support": "Drawings and information for building control.",
  "feasibility-layouts": "Layout studies that show what the site can take.",
  "interior-visualisation": "Photorealistic interior renders that show a room before it is built.",
  "3d-floor-plans": "Furnished 3D floor plans that buyers can read at a glance.",
  "virtual-staging": "Virtual staging that helps vacant and dated properties sell.",
  "exterior-rendering": "Exterior renders that show a building in its setting before it is built.",
  "3d-visualisation": "Visuals that help officers and neighbours understand the scheme.",
  "development-guidance": "Policy advice for larger and multi-unit schemes.",
};

const caseStudies = [
  {
    href: "/projects/highfield-road-residence",
    src: "/uk-detached-brick-house-gravel-drive.webp",
    width: 735,
    height: 490,
    alt: "Detached brick and render family home with a double garage and gravel drive",
    title: "Highfield Road Family Home",
    place: "Edgbaston, Birmingham",
  },
  {
    href: "/projects/oaklands-contemporary-dwelling",
    src: "/new-build-family-home-sutton-coldfield-1.webp",
    width: 736,
    height: 1307,
    alt: "Contemporary new build family home",
    title: "The Oaklands Contemporary Dwelling",
    place: "Solihull",
  },
  {
    href: "/projects/harborne-student-professional-living",
    src: "/hmo-development-selly-oak-1.webp",
    width: 720,
    height: 861,
    alt: "Floor plan of a shared house converted for student and professional living",
    title: "Harborne Student & Professional Living",
    place: "Harborne, Birmingham",
  },
] as const;

const linkClass =
  "text-gold underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2";

const sectionClass = "py-10 sm:py-12 lg:py-14";
const containerClass = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
const h2Class =
  "font-heading font-bold text-primary text-balance text-2xl sm:text-3xl leading-[1.2] mb-6";

/** A visible stand-in for a fact the client has not supplied yet. */
function Todo({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-gold/60 bg-overlay-faint p-4 text-secondary">
      {children}
    </p>
  );
}

function organisationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    // Same @id as the sitewide block in the marketing layout, so search engines
    // merge the two into one entity rather than reading two businesses.
    "@id": `${SITE_URL}/#organisation`,
    name: SITE_NAME,
    legalName: COMPANY_NAME,
    url: SITE_URL,
    // TODO: add `streetAddress` and `postalCode` once confirmed.
    address: {
      "@type": "PostalAddress",
      addressLocality: "Birmingham",
      addressRegion: "West Midlands",
      addressCountry: "GB",
    },
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    areaServed: [
      { "@type": "Country", name: "England" },
    ],
    // Matches the hours already published on the contact page.
    openingHours: "Mo-Fr 09:00-17:30",
    identifier: {
      "@type": "PropertyValue",
      propertyID: "Companies House number",
      value: COMPANY_NUMBER,
    },
    // `foundingDate` is deliberately omitted until the date is confirmed.
  };
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface-elevated-translucent">
      <script
        type="application/ld+json"
        // Serialised server-side from a literal; no user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema()) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      {/* 1. Photo hero with the h1, summary and CTA. */}
      <PageHero
        image="/about.webp"
        alt="The Birmingham sign on the front of a brick and steel stadium on a sunny day"
        title="About Hanif Design & Consultancy"
        subtitle="A multidisciplinary planning and design practice supporting homeowners and developers across England."
      >
        <Button variant="gold" size="lg" asChild>
          <Link href="/contact">Book a free consultation</Link>
        </Button>
      </PageHero>

      {/* 2. Who we are */}
      <section className={`${sectionClass} bg-surface-elevated-translucent`} aria-labelledby="who-we-are">
        <div className={containerClass}>
          <Reveal className="max-w-5xl">
            <h2 id="who-we-are" className={h2Class}>
              Who we are
            </h2>
            <div className="space-y-4 text-justify text-textmuted leading-relaxed">
              <p>
                We are a planning consultancy working across England. We help
                homeowners, landlords and developers get residential projects through the
                planning system, from a single extension to a multi-unit scheme.
              </p>
              <p>
                Hanif Design &amp; Consultancy Ltd
                has grown from a small design practice into a respected planning
                consultancy working across England, with 40 years of professional
                experience at Director level. Our team combines
                deep local authority knowledge with practical design expertise to
                guide clients through every stage of the planning process.
              </p>
              <p>
                We understand that securing planning permission is often the biggest
                hurdle in any development project. That&rsquo;s why we don&rsquo;t just submit
                applications — we develop comprehensive strategies that anticipate
                officer concerns, address policy requirements, and present your
                project in the best possible light.
              </p>
              <p>
                Today, we work with homeowners, developers, designers, and
                housing associations across England. Whether it&rsquo;s a householder extension, a complex
                appeal, or a multi-unit new build, we bring the same rigour and
                attention to detail to every project.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Our story */}
      <section className={`${sectionClass} bg-surface-translucent`} aria-labelledby="our-story">
        <div className={containerClass}>
          <Reveal className="max-w-5xl">
            <h2 id="our-story" className={h2Class}>
              Our story
            </h2>
            <Todo>
              [CONFIRM: founding year and 3–5 real milestones, for example when the company
              was formed, when it moved to its current office, and the first appeal won. Only
              dates you can prove.]
            </Todo>
          </Reveal>
        </div>
      </section>

      {/* 4. Our approach */}
      <section className={`${sectionClass} bg-surface-elevated-translucent`} aria-labelledby="our-approach">
        <div className={containerClass}>
          <div className="max-w-5xl">
            <Reveal>
              <h2 id="our-approach" className={h2Class}>
                Our approach: research-driven design
              </h2>
              <p className="text-justify text-textmuted leading-relaxed">
                Getting permission is often the hardest part of a project. So we start with
                the site and the policy, then design to suit. Every project follows the same
                four steps.
              </p>
            </Reveal>
            <RevealStagger className="mt-8 grid grid-cols-1 gap-4" stagger={0.08}>
              {approachSteps.map((step, index) => (
                <RevealItem key={step.title}>
                  <Card className="p-6">
                    <h3 className="font-heading font-semibold text-lg text-primary mb-2">
                      <span className="annotation text-gold mr-3">Step {index + 1}</span>
                      {step.title}
                    </h3>
                    <p className="text-justify text-textmuted leading-relaxed">{step.body}</p>
                  </Card>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* 5. Meet the team */}
      <section className={`${sectionClass} bg-surface-translucent`} aria-labelledby="meet-the-team">
        <div className={containerClass}>
          <Reveal className="max-w-5xl">
            <h2 id="meet-the-team" className={h2Class}>
              Meet the team
            </h2>
            <Todo>
              [CONFIRM: for each person, their name, role, qualification (only what they hold),
              a two-sentence bio and a photo. Photo alt text should read &ldquo;[Name], [role]
              at Hanif Design &amp; Consultancy&rdquo;. Do not add Person schema until this is
              confirmed.]
            </Todo>
          </Reveal>
        </div>
      </section>

      {/* 6. Local knowledge */}
      <section className={`${sectionClass} bg-surface-elevated-translucent`} aria-labelledby="local-knowledge">
        <div className={containerClass}>
          <Reveal className="max-w-5xl">
            <h2 id="local-knowledge" className={h2Class}>
              Local knowledge
            </h2>
            <p className="text-justify text-textmuted leading-relaxed mb-4">
              We work across England, so we are used to dealing with a wide range of councils
              and site constraints.
            </p>
            <Todo>
              [CONFIRM: which councils you have submitted to (for example the councils behind
              your recent projects), and which constraints you handle most, such as conservation areas,
              Article 4 directions or green belt. List only those you can back up.]
            </Todo>
          </Reveal>
        </div>
      </section>

      {/* 7. Proof */}
      <section className={`${sectionClass} bg-surface-translucent`} aria-labelledby="proof">
        <div className={containerClass}>
          <div className="max-w-5xl">
            <Reveal className="max-w-5xl">
              <h2 id="proof" className={h2Class}>
                Proof of our work
              </h2>
              <Todo>
                [CONFIRM: verified figures (for example applications submitted and approval
                rate, with the period they cover) and any named client reviews you have
                permission to publish. Leave this block out if you have neither.]
              </Todo>
              <p className="mt-6 text-textmuted leading-relaxed">
                See how we handled some of our projects:
              </p>
            </Reveal>
            <RevealStagger className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3" stagger={0.1}>
              {caseStudies.map((study) => (
                <RevealItem key={study.href}>
                  <Link
                    href={study.href}
                    className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-subtle">
                      <Image
                        src={study.src}
                        alt={study.alt}
                        width={study.width}
                        height={study.height}
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                      />
                    </div>
                    <h3 className="mt-3 font-heading font-semibold text-lg text-primary group-hover:text-gold">
                      {study.title}
                    </h3>
                    <p className="text-sm text-textmuted">{study.place}</p>
                  </Link>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* 8. Our services */}
      <section className={`${sectionClass} bg-surface-elevated-translucent`} aria-labelledby="our-services">
        <div className={containerClass}>
          <Reveal className="max-w-5xl">
            <h2 id="our-services" className={h2Class}>
              Our planning and design services
            </h2>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.slug} className="flex items-start gap-3 text-textmuted">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                  <span>
                    <Link href={`/services/${service.slug}`} className={linkClass}>
                      {service.label}
                    </Link>
                    : {serviceLines[service.slug]}
                  </span>
                </li>
              ))}
            </ul>
            <Todo>
              [CONFIRM: you mentioned interior design and graphic design. They have no page
              on the site yet. Either build a page for each so they can be listed and linked
              here, or leave them off.]
            </Todo>
          </Reveal>
        </div>
      </section>

      {/* 9. Fees and how we work */}
      <section className={`${sectionClass} bg-surface-translucent`} aria-labelledby="fees">
        <div className={containerClass}>
          <Reveal className="max-w-5xl">
            <h2 id="fees" className={h2Class}>
              Fees and how we work
            </h2>
            <div className="space-y-4 text-justify text-textmuted leading-relaxed">
              <p>
                We offer fixed-fee planning support. You get a written quote before any work
                begins, so you know what to expect up front.
              </p>
              <p>
                We stay with you from the first feasibility call through to approval and
                condition discharge. That means meeting the requirements the council attaches
                to your permission, such as agreeing the materials.
              </p>
            </div>
            <div className="mt-4">
              <Todo>
                [CONFIRM: what the fixed fee includes (for example drawings, design and
                access statement, submission, one round of officer changes) and what costs
                extra, such as council application fees and appeals.]
              </Todo>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10. Find us */}
      <section className={`${sectionClass} bg-surface-elevated-translucent`} aria-labelledby="find-us">
        <div className={containerClass}>
          <Reveal className="max-w-5xl">
            <h2 id="find-us" className={h2Class}>
              Find us
            </h2>
            <ul className="space-y-4 text-textmuted">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  Quinton, Birmingham.{" "}
                  <span className="text-secondary">
                    [CONFIRM: full address and postcode, and whether visitors are welcome by
                    appointment.]
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                <span>Monday to Friday, 9:00 am to 5:30 pm</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  <a
                    href={toWhatsappHref(CONTACT_INFO.whatsappPhone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    Message us on WhatsApp
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                <a href={`mailto:${CONTACT_INFO.email}`} className={`${linkClass} break-all`}>
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact">Book a free consultation</Link>
              </Button>
              <Link href="/quote" className={linkClass}>
                Or request a fixed-fee quote
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
