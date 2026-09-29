import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Building2, Target, Heart, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Hanif Design & Consultancy — Birmingham's trusted planning consultancy with 30+ years of experience helping homeowners and developers secure planning approval.",
};

const values = [
  {
    icon: Target,
    title: "Integrity",
    description: "We provide honest, transparent advice. If a project isn't viable, we'll tell you upfront — saving you time and money.",
  },
  {
    icon: Building2,
    title: "Precision",
    description: "Every drawing and submission is meticulously prepared to meet local authority requirements and building regulations.",
  },
  {
    icon: Heart,
    title: "Client-First",
    description: "Your vision drives everything we do. We listen, advise, and deliver solutions tailored to your specific needs.",
  },
] as const;

const whyChooseUs = [
  "30+ years navigating Birmingham's planning system",
  "End-to-end service from concept to approval",
  "Proven track record with 500+ successful projects",
  "Direct access to senior consultants — no account managers",
] as const;

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface-elevated-translucent">
      <section className="py-16 sm:py-20 lg:py-28 bg-surface-translucent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            as="h1"
            eyebrow="About Us"
            title="About Hanif Design & Consultancy"
            subtitle="Perry Barr's trusted planning consultancy for residential and commercial projects."
            align="center"
          />

          {/* The title block is deliberately static: it is the first viewport and
              the h1 is the LCP element, so a `whileInView` reveal would ship
              `opacity: 0` in the server HTML and hold it back until hydration. */}
          <div className="mt-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal direction="left" duration={0.7}>
            <div className="space-y-6 text-textmuted leading-relaxed">
              <p className="text-lg text-secondary">
                Hanif Design &amp; Consultancy Ltd is a UK-based planning consultancy and
                design support providing planning-focused design assistance for residential
                development proposals.
              </p>
              <p>
                We support homeowners and developers by preparing planning drawings, layout
                studies, and visual presentation material to assist with planning applications
                and development submissions.
              </p>
              <p>
                Founded in Perry Barr, Birmingham, over three decades ago, Hanif Design &amp; Consultancy
                has grown from a small architectural practice into one of the West
                Midlands&rsquo; most respected planning consultancies. Our team combines
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
                Today, we work with homeowners, developers, architects, and
                housing associations across Birmingham, Solihull, and the wider
                West Midlands. Whether it&rsquo;s a householder extension, a complex
                appeal, or a multi-unit new build, we bring the same rigour and
                attention to detail to every project.
              </p>
            </div>
            </Reveal>

            <Reveal direction="right" duration={0.7} delay={0.15}>
            {/* Mounted like a sheet on a drawing: crop marks in the corners,
                a sheet reference in the margin. */}
            <figure className="crop relative aspect-[4/5] overflow-hidden rounded-2xl border border-subtle bg-gradient-to-br from-primary/25 via-surface-elevated to-black">
              <Image
                src="/work-10.jpeg"
                alt="Residential project photography by Hanif Design & Consultancy"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent"
              />
              {/* The mono labels are unbreakable at ~8.8px per character, so the
                  two of them side by side overrun a 288px figure. Stack them on
                  mobile and hide the short one until there is room. */}
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:p-5">
                <span className="annotation min-w-0 text-gold">Sheet A-02 &middot; The Practice</span>
                <span                 className="annotation hidden min-w-0 text-muted sm:inline">Perry Barr</span>
              </figcaption>
            </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28 bg-surface-elevated-translucent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Values"
            title="Mission & Values"
            subtitle="The principles that guide every project we undertake."
            align="center"
          />

          <RevealStagger className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" stagger={0.1}>
            {values.map((value, index) => (
              <RevealItem key={index} className="h-full">
                <Card hover className="p-6 text-center h-full">
                  <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-gold">
                    <value.icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-primary mb-2">{value.title}</h3>
                  <p className="text-textmuted leading-relaxed">{value.description}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28 bg-surface-translucent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="What Sets Us Apart"
            subtitle="Four reasons clients trust us with their most important projects."
            align="center"
          />

          <RevealStagger className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto" stagger={0.08}>
            {whyChooseUs.map((reason, index) => (
              <RevealItem key={index} className="flex items-start gap-4 p-4 bg-surface-elevated rounded-xl">
                <Check className="w-6 h-6 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-primary font-medium">{reason}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28 bg-surface-translucent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-secondary text-lg mb-10 max-w-2xl mx-auto">
                Let&rsquo;s discuss how we can help turn your vision into an approved reality.
                Book a free initial consultation with our senior consultants.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact">Book Free Consultation</Link>
              </Button>
              <Button variant="secondary" size="lg" className="border-white text-white hover:bg-surface-elevated hover:text-primary" asChild>
                <Link href="/quote">Request a Quote</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
