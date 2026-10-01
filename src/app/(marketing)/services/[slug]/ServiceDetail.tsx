"use client";

import type { LucideIcon } from "lucide-react";
import {
  FileCheck,
  ShieldCheck,
  Ruler,
  LayoutGrid,
  Box,
  Compass,
  Check,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CONTACT_INFO } from "@/lib/constants";

interface ServiceDetailProps {
  service: { slug: string; label: string; short: string };
}

/** Content for each service, keyed by the canonical slug from lib/constants. */
const serviceData: Record<
  string,
  {
    icon: LucideIcon;
    intro: string;
    process: string[];
    benefits: string[];
    /** Heading line for the gallery under the hero. */
    galleryCaption: string;
    /** Three images matched to this service. */
    gallery: { src: string; alt: string }[];
  }
> = {
  "planning-applications": {
    icon: FileCheck,
    intro:
      "We prepare and submit complete planning applications — drawings, statements and supporting evidence — then manage the process through to a decision. Our packages are built to validate first time, which is the single biggest factor in avoiding delay.",
    process: [
      "Free feasibility call and site review",
      "Pre-application advice where it adds value",
      "Preparation of drawings and supporting documents",
      "Validation check and submission to the council",
      "Case-officer liaison and responding to queries",
      "Decision, conditions and condition discharge",
    ],
    benefits: [
      "First-time validation rate above 95%",
      "A named consultant handles your file end to end",
      "Fixed fees agreed before we start",
      "Condition discharge support included",
    ],
    galleryCaption:
      "The kinds of residential schemes we take through planning to a decision.",
    gallery: [
      { src: "/garden-office-studio-bournville-1.webp", alt: "Contemporary single-storey rear extension with bi-fold doors opening onto a timber deck" },
      { src: "/garden-office-studio-bournville-2.webp", alt: "Modern flat-roofed glazed rear extension added to a brick family home" },
      { src: "/garage-conversion-kings-heath-2.webp", alt: "Two-storey rendered family home with an integral garage and landscaped frontage" },
    ],
  },
  "building-regulations-support": {
    icon: ShieldCheck,
    intro:
      "Building control approval sits alongside planning and is assessed on a different basis. We prepare the compliance package — plans, calculations and specifications — and liaise with building control through to completion.",
    process: [
      "Regulatory review of the proposed scheme",
      "Full plans and construction details submission",
      "Building notice coordination where required",
      "Structural calculation coordination",
      "Specification and materials documentation",
      "Stage inspection scheduling and completion certificate",
    ],
    benefits: [
      "One team covering both planning and building control",
      "Coordinates directly with your structural engineer",
      "Avoids the common causes of build-control rejection",
      "Completion certificate handled for you",
    ],
    galleryCaption:
      "From structure to specification, compliance is documented at every stage of the build.",
    gallery: [
      { src: "/office-to-residential-conversion-city-centre-2.webp", alt: "Building site with a concrete frame and blockwork beside rolled construction drawings and a hard hat" },
      { src: "/single-storey-rear-extension-moseley-1.webp", alt: "Contemporary house under construction with scaffolding, above the same house completed" },
      { src: "/office-to-residential-conversion-city-centre-1.webp", alt: "Split view of a concrete building frame beside the finished contemporary home" },
    ],
  },
  "design-drawings": {
    icon: Ruler,
    intro:
      "Good drawings get approved faster and get built without surprises. We produce a coordinated 2D drawing package that satisfies both the planning officer and the contractor on site.",
    process: [
      "Brief, site survey and measured drawings",
      "Concept options and design development",
      "Floor plans, elevations and site plans",
      "Sections and construction details",
      "Coordination with structural and services engineers",
      "Revisions through determination and beyond",
    ],
    benefits: [
      "Drawn to the scale and format the council expects",
      "Coordinated so builders can price from them",
      "Revisions included until approval",
      "Issued as an organised PDF pack",
    ],
    galleryCaption:
      "Coordinated plans, elevations and sections that planners can approve and builders can price.",
    gallery: [
      { src: "/spacious-loft-conversion-harborne-2.webp", alt: "Concept sheet combining elevation, section, plan and detail drawings of a modern two-storey house" },
      { src: "/spacious-loft-conversion-harborne-1.webp", alt: "Interior design drawing with floor plan, section and dimensions overlaid on a double-height living space" },
      { src: "/rear-home-extension-edgbaston-2.webp", alt: "Dimensioned ground floor plan of a family home with courtyard and parking" },
    ],
  },
  "feasibility-layouts": {
    icon: LayoutGrid,
    intro:
      "Before you buy, refinance or commit to design, it is worth knowing what a site can realistically deliver. We test capacity against policy and produce a clear recommendation.",
    process: [
      "Site and policy constraint analysis",
      "Development capacity study",
      "Testing of multiple layout options",
      "Constraint and overlooking mapping",
      "Indicative cost and programme snapshot",
      "Written recommendation report",
    ],
    benefits: [
      "Identifies deal-breakers before you commit",
      "Clear go / no-go recommendation",
      "Evidence you can share with funders and buyers",
      "Typically resolved within two weeks",
    ],
    galleryCaption:
      "Testing what a site can deliver before you commit to design or purchase.",
    gallery: [
      { src: "/hmo-development-selly-oak-1.webp", alt: "Colour floor plan laying out kitchen, dining, lounge, bedrooms and bathrooms" },
      { src: "/rear-home-extension-edgbaston-1.webp", alt: "Architectural scale model of a house held up in front of a building site" },
      { src: "/new-build-family-home-sutton-coldfield-2.webp", alt: "Before and after view of a plot, from groundworks and frame to the completed contemporary house" },
    ],
  },
  "3d-visualisation": {
    icon: Box,
    intro:
      "A strong image resolves objections faster than any report. We produce photorealistic visuals that show decision-makers exactly what will be built and how it sits in its surroundings.",
    process: [
      "3D model built from the approved drawings",
      "Material and landscaping specification",
      "Exterior, interior and contextual views",
      "Aerial and street-level perspectives",
      "Committee presentation boards",
      "Final image delivery in web and print formats",
    ],
    benefits: [
      "Significantly reduces officer and neighbour objection",
      "Useful for sales and off-plan marketing",
      "Accurate to the drawings, not aspirational",
      "Suitable for planning committee submission",
    ],
    galleryCaption:
      "Photorealistic visuals that show decision-makers exactly what will be built.",
    gallery: [
      { src: "/single-storey-rear-extension-moseley-2.webp", alt: "Architectural plan dissolving into a photorealistic 3D render of a modern house" },
      { src: "/hmo-development-selly-oak-2.webp", alt: "Rendered traditional house exterior above an exploded axonometric view of its floors" },
      { src: "/two-storey-side-extension-four-oaks-2.webp", alt: "3D render of a modern single-storey home above a cutaway view of its interior layout" },
    ],
  },
  "development-guidance": {
    icon: Compass,
    intro:
      "Planning policy is the framework every decision sits inside. We read it against your specific scheme so you can make confident decisions about site, design and programme.",
    process: [
      "Policy review against your proposal",
      "Site selection and acquisition advice",
      "Pre-purchase feasibility input",
      "Local plan and neighbourhood guidance alignment",
      "Design review with planners and consultees",
      "Project strategy and programme advice",
    ],
    benefits: [
      "Policy risk identified early",
      "Independent of any development interest",
      "Practical, decision-focused advice",
      "Ongoing support as the scheme evolves",
    ],
    galleryCaption:
      "Policy-led advice that supports confident decisions on site, design and programme.",
    gallery: [
      { src: "/two-storey-side-extension-four-oaks-1.webp", alt: "Detached house with a pitched roof and dormer window set in landscaped grounds" },
      { src: "/garage-conversion-kings-heath-1.webp", alt: "Brick family home with a dark pitched roof and paved approach" },
      { src: "/new-build-family-home-sutton-coldfield-1.webp", alt: "Split view of a bare concrete interior beside the same space finished as a living room" },
    ],
  },
};

export function ServiceDetail({ service }: ServiceDetailProps) {
  const data = serviceData[service.slug];
  if (!data) return null;

  const Icon = data.icon;

  return (
    <article className="bg-background">
      {/* Hero — deliberately static. It is the first viewport, so a `whileInView`
          reveal would ship `opacity: 0` in the server HTML and hold the h1 back
          until hydration, which is the cost PageTransition was removed to avoid. */}
      <header className="relative overflow-hidden bg-surface-translucent py-16 sm:py-20 lg:py-28">
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
            <ol className="flex flex-wrap items-center gap-2 text-sm text-secondary">
              <li>
                <Link href="/" className="text-gold transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-muted">
                /
              </li>
              <li>
                <Link href="/services" className="transition-colors hover:text-primary">
                  Services
                </Link>
              </li>
              <li aria-hidden="true" className="text-muted">
                /
              </li>
              <li aria-current="page" className="text-primary">
                {service.label}
              </li>
            </ol>
          </nav>

          <div className="flex items-start gap-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-hairline-tint bg-overlay-faint text-gold">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <div>
              <h1 className="font-heading text-4xl font-bold leading-tight text-primary sm:text-5xl">
                {service.label}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-secondary">{data.intro}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Gallery. Images are portrait, so each sits in a fixed 4:5 box with
          object-cover: the layout can never shift while they load. */}
      <section aria-labelledby="service-gallery-heading" className="pt-16 sm:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="service-gallery-heading" className="sr-only">
            {service.label} in pictures
          </h2>
          <p className="mb-6 max-w-2xl text-secondary">{data.galleryCaption}</p>
          <ul className="grid gap-4 sm:grid-cols-3 sm:gap-6">
            {data.gallery.map((img) => (
              <li
                key={img.src}
                className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-xl border border-subtle bg-surface-elevated sm:max-w-none"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1280px) 400px, (min-width: 640px) 33vw, 90vw"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process + benefits */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="left" duration={0.7}>
              <SectionHeading
                eyebrow="How we work"
                title="Our process"
                subtitle="A structured route from first call to approval."
                align="left"
                className="mb-8"
              />
              {/* The steps keep their <ol>/<li> semantics, so the list reveals as
                  one block rather than as a per-step stagger. */}
              <Reveal delay={0.15} amount={0.15}>
                <ol className="space-y-4">
                  {data.process.map((step, index) => (
                    <li key={step} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold font-heading text-sm font-bold text-on-accent"
                      >
                        {index + 1}
                      </span>
                      <p className="pt-1 text-primary">{step}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </Reveal>

            <Reveal direction="right" duration={0.7} delay={0.2}>
              <SectionHeading
                eyebrow="Why work with us"
                title="Key benefits"
                subtitle="What you get on every project."
                align="left"
                className="mb-8"
              />
              <Reveal delay={0.15} amount={0.15}>
                <ul className="space-y-3">
                  {data.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 rounded-xl border border-subtle bg-surface-elevated p-4"
                    >
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                      <span className="text-primary">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.3}>
                <Card className="mt-8 p-6">
                  <h3 className="font-heading text-lg font-semibold text-primary">
                    Not sure which service you need?
                  </h3>
                  <p className="mt-2 text-sm text-secondary">
                    A short call is usually enough to work out the right route and a realistic
                    timescale. It costs nothing.
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Button variant="gold" asChild>
                      <Link href="/quote">Request a Quote</Link>
                    </Button>
                    <Button variant="secondary" asChild>
                      <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}>
                        <Phone className="h-4 w-4" aria-hidden="true" />
                        {CONTACT_INFO.phone}
                      </a>
                    </Button>
                  </div>
                </Card>
              </Reveal>
            </Reveal>
          </div>
        </div>
      </section>
    </article>
  );
}
