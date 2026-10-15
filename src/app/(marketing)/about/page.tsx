import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BreadcrumbSchema } from "@/components/ui/JsonLd";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { SITE_URL, canonical } from "@/lib/site";

const OG_TITLE = "About Hanif Design & Consultancy | Planning Consultants in Birmingham";
const OG_DESCRIPTION =
  "Meet the planning consultants helping homeowners, landlords and developers across Birmingham and the West Midlands secure approval.";

export const metadata: Metadata = {
  alternates: { canonical: canonical("/about") },
  // `absolute` skips the "%s | Hanif Design & Consultancy" template, which
  // would repeat the brand in a title that already names it.
  title: { absolute: "About Hanif Design | Planning Consultants in Birmingham" },
  description:
    "Hanif Design & Consultancy are planning consultants in Birmingham helping homeowners, landlords and developers secure approval across the West Midlands.",
  // A page-level `openGraph` replaces the layout's object rather than merging
  // with it, so every field the layout set must be restated here.
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Hanif Design & Consultancy",
    url: `${SITE_URL}/about`,
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [
      {
        url: "/images/about-og.jpg",
        width: 1200,
        height: 630,
        alt: "Hanif Design & Consultancy, planning consultants in Birmingham",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: ["/images/about-og.jpg"],
  },
};

const researchPoints = [
  "Local planning policy for your area",
  "Past decisions on similar sites nearby",
  "Anything on the site that could limit what you can build",
] as const;

const deliverables = [
  "Planning-ready drawings",
  "A design and access statement, which explains your design to the planning officer",
  "Clear 3D visualisations",
] as const;

const workingWithYou = [
  "A named consultant who knows your project",
  "A fixed-fee quote before any work begins",
  "Support from your first feasibility call through to approval",
  "Help with condition discharge after approval",
] as const;

const linkClass =
  "text-gold underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface-elevated-translucent">
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ]}
      />

      <section className="py-16 sm:py-20 lg:py-28 bg-surface-translucent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* The title block is deliberately static: it is the first viewport and
              the h1 is the LCP element, so a `whileInView` reveal would ship
              `opacity: 0` in the server HTML and hold it back until hydration.
              One h1 with a styled second line, not two headings. */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gold/60" />
              <span className="annotation text-gold">About Us</span>
              <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gold/60" />
            </div>
            <h1 className="font-heading font-bold text-primary text-balance text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.2]">
              Hanif Design &amp; Consultancy Ltd
              <br />
              <span className="mt-3 block text-lg sm:text-xl font-normal text-secondary">
                Your Planning and Design Partner in Birmingham
              </span>
            </h1>
          </div>

          <div className="mt-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal direction="left" duration={0.7}>
              <div className="space-y-6 text-textmuted leading-relaxed">
                <p className="text-lg text-secondary">
                  We are planning consultants in Birmingham, based in Quinton. We help
                  homeowners, landlords and developers across Birmingham and the West
                  Midlands turn residential ideas into approved projects.
                </p>
                <p>
                  Our work runs from{" "}
                  <Link href="/projects/home-extension" className={linkClass}>
                    householder extensions
                  </Link>{" "}
                  and{" "}
                  <Link href="/projects/loft-conversion" className={linkClass}>
                    loft conversions
                  </Link>{" "}
                  to multi-unit schemes and planning appeals. Whatever the size, we bring
                  the same care and attention to detail.
                </p>
              </div>
            </Reveal>

            <Reveal direction="right" duration={0.7} delay={0.15}>
              {/* Mounted like a sheet on a drawing: crop marks in the corners,
                  a sheet reference in the margin. */}
              <figure className="crop relative aspect-[4/5] overflow-hidden rounded-2xl border border-subtle bg-gradient-to-br from-primary/25 via-surface-elevated to-black">
                <Image
                  src="/office-to-residential-conversion-city-centre-2.webp"
                  alt="Office to residential conversion in Birmingham city centre by Hanif Design & Consultancy"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:p-5">
                  <span className="annotation min-w-0 text-gold">Sheet A-02 &middot; The Practice</span>
                  <span className="annotation hidden min-w-0 text-muted sm:inline">Quinton</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28 bg-surface-elevated-translucent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-heading font-bold text-primary text-balance text-3xl sm:text-4xl leading-[1.15] mb-6">
                Our approach
              </h2>
              <p className="text-textmuted leading-relaxed">
                Getting planning permission is often the hardest part of a project. So we
                start with the site and the policy, not the drawings.
              </p>
            </Reveal>

            <RevealStagger className="mt-10 grid grid-cols-1 gap-6" stagger={0.1}>
              <RevealItem>
                <Card className="p-6">
                  <h3 className="font-heading font-semibold text-xl text-primary mb-3">
                    Research first
                  </h3>
                  <p className="text-textmuted mb-3">Before we design anything, we look at:</p>
                  <ul className="space-y-2">
                    {researchPoints.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-secondary">
                        <Check className="w-5 h-5 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Card>
              </RevealItem>

              <RevealItem>
                <Card className="p-6">
                  <h3 className="font-heading font-semibold text-xl text-primary mb-3">
                    Design that is ready to submit
                  </h3>
                  <p className="text-textmuted mb-3">
                    We test your options with{" "}
                    <Link href="/services/feasibility-layouts" className={linkClass}>
                      feasibility layouts
                    </Link>
                    . Then we prepare:
                  </p>
                  <ul className="space-y-2">
                    {deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-secondary">
                        <Check className="w-5 h-5 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </RevealItem>

              <RevealItem>
                <Card className="p-6">
                  <h3 className="font-heading font-semibold text-xl text-primary mb-3">
                    A strategy, not just a submission
                  </h3>
                  <p className="text-textmuted leading-relaxed">
                    We don&rsquo;t only send in an application. We think about what the case
                    officer is likely to worry about and deal with it up front. We show how
                    your project meets policy and present it clearly, so the officer can
                    decide with confidence. See our{" "}
                    <Link href="/services/planning-applications" className={linkClass}>
                      Planning Applications
                    </Link>{" "}
                    service.
                  </p>
                </Card>
              </RevealItem>
            </RevealStagger>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28 bg-surface-translucent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-heading font-bold text-primary text-balance text-3xl sm:text-4xl leading-[1.15] mb-6">
                How we work with you
              </h2>
            </Reveal>
            <RevealStagger className="grid grid-cols-1 md:grid-cols-2 gap-4" stagger={0.08}>
              {workingWithYou.map((item) => (
                <RevealItem
                  key={item}
                  className="flex items-start gap-4 p-4 bg-surface-elevated rounded-xl"
                >
                  <Check className="w-6 h-6 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-primary font-medium">{item}</p>
                </RevealItem>
              ))}
            </RevealStagger>
            <Reveal delay={0.1}>
              <p className="mt-6 text-textmuted leading-relaxed">
                Condition discharge means meeting the requirements the council attaches to
                your permission, such as agreeing the materials. For larger schemes, our{" "}
                <Link href="/services/development-guidance" className={linkClass}>
                  development guidance
                </Link>{" "}
                covers multi-unit projects.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/*
        TODO before launch — two sections from the brief are NOT rendered because
        they need real content from the client, and placeholders must not ship:
          - "Meet the team": names, roles, qualifications, experience, bios.
          - "Our track record": 2–3 real approvals (one appeal win if any) and a
            "Last updated" date.
        Add each as an <h2> section between "How we work with you" and
        "Areas we cover".
      */}

      <section className="py-16 sm:py-20 lg:py-28 bg-surface-elevated-translucent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-heading font-bold text-primary text-balance text-3xl sm:text-4xl leading-[1.15] mb-6">
                Areas we cover
              </h2>
              <p className="text-textmuted leading-relaxed mb-4">
                We work across Birmingham and the West Midlands, from our base in Quinton.
                Not sure whether we cover your site?{" "}
                <Link href="/contact" className={linkClass}>
                  Contact us
                </Link>{" "}
                and we will tell you.
              </p>
              <p className="text-textmuted leading-relaxed">
                Useful reading:{" "}
                <a
                  href="https://www.birmingham.gov.uk/planning"
                  target="_blank"
                  rel="noopener"
                  className={linkClass}
                >
                  Birmingham City Council planning
                </a>
                ,{" "}
                <a
                  href="https://www.gov.uk/planning-permission-england-wales"
                  target="_blank"
                  rel="noopener"
                  className={linkClass}
                >
                  GOV.UK planning permission guidance
                </a>{" "}
                and{" "}
                <a
                  href="https://www.gov.uk/government/organisations/planning-inspectorate"
                  target="_blank"
                  rel="noopener"
                  className={linkClass}
                >
                  The Planning Inspectorate
                </a>{" "}
                for appeals.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28 bg-surface-translucent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-primary mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-secondary text-lg mb-10 max-w-2xl mx-auto">
              Tell us about your site and we will talk you through your options.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact">Book a free consultation</Link>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="border-hairline-tint text-primary hover:bg-surface-elevated hover:text-primary"
                asChild
              >
                <Link href="/quote">Request a Quote</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
