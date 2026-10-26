"use client";

import {
  Box,
  Camera,
  Clock,
  Cpu,
  Gem,
  Layers,
  Mail,
  Phone,
  PoundSterling,
  Sparkles,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT_INFO } from "@/lib/constants";
import type { FaqItem } from "@/lib/faqs";

const AUDIENCES = ["Architects", "Designers", "Developers"];

const COVERAGE: { title: string; body: string }[] = [
  { title: "Interior CGI", body: "Kitchens, living spaces, bedrooms and bathrooms rendered to a photographic standard." },
  { title: "Exterior visuals", body: "Street-level and aerial views that place the scheme in its surroundings." },
  { title: "Property marketing", body: "Images for brochures, listings and websites, ready before completion." },
  { title: "Off-plan sales", body: "Visuals that let buyers commit to a home that is not yet built." },
  { title: "Virtual staging", body: "Empty rooms furnished and styled digitally for marketing." },
  { title: "Photomontage CGI", body: "Proposed buildings composited into real site photography for planning." },
  { title: "VR and animation", body: "Walkthroughs and immersive views for presentations and committees." },
  { title: "Product and furniture visualisation", body: "Clean, consistent CGI of products and furnishings." },
];

const WHY: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Users,
    title: "Win clients before the build starts",
    body: "People buy what they can picture. A convincing interior image turns a set of plans into a space a client, buyer or planning committee can already imagine living in.",
  },
  {
    icon: Gem,
    title: "High-end quality",
    body: "Accurate materials, believable lighting and careful composition give every view the finish of a professional interior photograph, without waiting for the room to exist.",
  },
  {
    icon: Sparkles,
    title: "Sharpen the design itself",
    body: "Seeing finishes, joinery and fittings together exposes what works and what doesn't while changes are still cheap, so the built result is better resolved.",
  },
];

const ADVANTAGES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Users,
    title: "Experienced team",
    body: "Architectural visualisers who understand construction, so a render never shows something that couldn't be built.",
  },
  {
    icon: Cpu,
    title: "Current software and techniques",
    body: "Physically based materials and lighting for a natural, photographic result.",
  },
  {
    icon: Clock,
    title: "Delivered on time",
    body: "A fixed schedule agreed up front, so images arrive when your submission, pitch or sale needs them.",
  },
  {
    icon: Layers,
    title: "Clear, detailed modelling",
    body: "Every room is modelled from your drawings, down to joinery profiles and fixtures.",
  },
  {
    icon: Camera,
    title: "Realistic images",
    body: "Eye-level, wide and aerial views that show how the space works, not just how it looks.",
  },
  {
    icon: PoundSterling,
    title: "Cost efficient",
    body: "Resolve layout and finish decisions on screen, before they become expensive changes on site.",
  },
];

const STEPS: { title: string; body: string }[] = [
  { title: "Discuss", body: "A call to understand the space, the audience and what the images need to achieve." },
  { title: "Proposal", body: "A clear scope covering views, finishes and timeline." },
  { title: "Agreement", body: "A fixed fee confirmed in writing before any work begins." },
  { title: "Details", body: "You send drawings, material references and any mood-board inspiration." },
  { title: "Build", body: "We model the interior and set up lighting and cameras." },
  { title: "Review", body: "A draft view for your comments, so changes happen before final rendering." },
  { title: "Render", body: "Final high-resolution images are produced." },
  { title: "Delivery", body: "Files supplied for web, print and planning submission." },
];

const VISUALISATION_FAQS: readonly FaqItem[] = [
  {
    q: "What kinds of interiors do you cover?",
    a: "Kitchens, living and dining spaces, bedrooms, bathrooms, loft conversions and extensions, plus commercial and hospitality fit-outs. If it has a floor plan, we can visualise it.",
  },
  {
    q: "Can you visualise exteriors as well as interiors?",
    a: "Yes. We produce exterior, street-level and aerial views too, so a scheme can be shown inside and out in a consistent style.",
  },
  {
    q: "Can I get the model and render files?",
    a: "Final images are supplied in web and print formats as standard. Source model files can be released by arrangement; ask when you request a quote.",
  },
];

const CONTACTS: { icon: LucideIcon; label: string; value: string; href: string }[] = [
  {
    icon: Phone,
    label: "Contact us",
    value: "Phone, WhatsApp and office hours",
    href: "/contact",
  },
  {
    icon: Mail,
    label: "Email us",
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
  },
  {
    icon: Box,
    label: "Request a quote",
    value: "Free, no-obligation quotation",
    href: "/quote",
  },
];

interface VisualisationOverviewProps {
  label: string;
}

/**
 * Dedicated layout for the 3D Visualisation service: a long-form
 * interior-visualisation page (benefits, advantages, process, CTA, FAQ)
 * led by large renders, rather than the generic service template.
 */
export function VisualisationOverview({ label }: VisualisationOverviewProps) {
  return (
    <article className="bg-background">
      {/* Static hero: first viewport, so no scroll-reveal (see ServiceDetail). */}
      <header className="relative overflow-hidden bg-surface-translucent pb-12 pt-16 sm:pb-16 sm:pt-20 lg:pt-24">
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
                {label}
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl font-bold leading-tight text-primary sm:text-5xl">
              Interior {label}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-secondary">
              Interior visualisation lets clients, buyers and planning committees see the
              potential of a proposed space before a single wall is built. We turn your drawings
              into photorealistic images that sell the design and settle the details.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="gold" asChild>
                <Link href="/quote">Get a Free Quote</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>

          {/* Lead render. `priority` + fixed aspect ratio: no layout shift, good LCP. */}
          <figure className="crop relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-subtle bg-surface-elevated">
            <Image
              src="/interior-kitchen-render-wide.webp"
              alt="Photorealistic render of a modern kitchen with a fluted oak and marble island, bar stools, a sculptural gold pendant light and garden doors"
              fill
              priority
              sizes="(min-width: 1280px) 1216px, 94vw"
              className="object-cover"
            />
          </figure>
        </div>
      </header>

      {/* Two supporting renders */}
      <section aria-labelledby="visualisation-gallery-heading" className="pt-12 sm:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="visualisation-gallery-heading" className="sr-only">
            Interior visualisation examples
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <li className="relative aspect-[5/4] overflow-hidden rounded-xl border border-subtle bg-surface-elevated">
              <Image
                src="/interior-kitchen-render-island.webp"
                alt="Kitchen render looking towards the island, a roof lantern with gold pendant lighting, a marble splashback and a dark integrated fridge"
                fill
                sizes="(min-width: 1280px) 596px, (min-width: 640px) 47vw, 94vw"
                className="object-cover"
              />
            </li>
            <li className="relative aspect-[5/4] overflow-hidden rounded-xl border border-subtle bg-surface-elevated">
              <Image
                src="/interior-kitchen-render-aerial.webp"
                alt="Aerial view of a marble waterfall kitchen island with a grey breakfast bar, three upholstered stools and polished marble flooring"
                fill
                sizes="(min-width: 1280px) 596px, (min-width: 640px) 47vw, 94vw"
                className="object-cover"
              />
            </li>
          </ul>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="3D visualisation specialists"
              title="CGI, rendering and 3D design for every stage"
              subtitle={`Trusted by ${AUDIENCES.join(", ").toLowerCase()} across Birmingham and the UK.`}
            />
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COVERAGE.map(({ title, body }) => (
              <li key={title} className="rounded-xl border border-subtle bg-surface-elevated p-6">
                <h3 className="font-heading text-lg font-semibold text-primary">{title}</h3>
                <p className="mt-2 text-sm text-secondary">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Why visualise"
              title="Why you need 3D interior rendering"
              subtitle="A strong image resolves doubts faster than a drawing set ever will."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {WHY.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <Card className="h-full p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-hairline-tint bg-overlay-faint text-gold">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-semibold text-primary">{title}</h3>
                  <p className="mt-2 text-secondary">{body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-surface-translucent py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Advantages"
              title="Why choose our interior rendering service"
              subtitle="Six reasons architects, developers and homeowners come back."
            />
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ADVANTAGES.map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                className="rounded-xl border border-subtle bg-surface-elevated p-6"
              >
                <Icon className="h-6 w-6 text-gold" aria-hidden="true" />
                <h3 className="mt-4 font-heading text-lg font-semibold text-primary">{title}</h3>
                <p className="mt-2 text-sm text-secondary">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="How we work"
              title="From brief to final image in eight steps"
              subtitle="A straightforward process with your sign-off before final rendering."
            />
          </Reveal>
          <Reveal delay={0.1} amount={0.1}>
            <ol className="mt-12 grid gap-x-10 gap-y-6 md:grid-cols-2">
              {STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold font-heading text-sm font-bold text-on-accent"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-heading font-semibold text-primary">{step.title}</h3>
                    <p className="mt-1 text-secondary">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-translucent py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              title="Impressed by our interior visualisation?"
              subtitle="Get in touch today for a free quotation and a chat."
            />
          </Reveal>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {CONTACTS.map(({ icon: Icon, label: contactLabel, value, href }) => {
              const external = !href.startsWith("/");
              const body = (
                <>
                  <Icon className="h-6 w-6 text-gold" aria-hidden="true" />
                  <span className="mt-4 font-heading font-semibold text-primary">{contactLabel}</span>
                  <span className="mt-1 break-words text-sm text-secondary">{value}</span>
                </>
              );
              const cls =
                "flex h-full flex-col items-center rounded-xl border border-subtle bg-surface-elevated p-6 text-center transition-colors hover:border-gold";
              return (
                <li key={contactLabel}>
                  {external ? (
                    <a href={href} className={cls}>
                      {body}
                    </a>
                  ) : (
                    <Link href={href} className={cls}>
                      {body}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently asked questions"
              subtitle="Quick answers about interior visualisation."
              className="mb-10"
            />
          </Reveal>
          <FAQAccordion items={VISUALISATION_FAQS} defaultOpen={0} idPrefix="visualisation-faq" />
        </div>
      </section>
    </article>
  );
}
