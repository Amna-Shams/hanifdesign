"use client";

import { ArrowLeft, MapPin, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";

interface ProjectDetailProps {
  project: {
    title: string;
    category: string;
    location: string;
    summary: string;
    images: readonly string[];
    specs: readonly { label: string; value: string }[];
  };
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="min-h-screen bg-surface-elevated-translucent">
      <section className="py-16 sm:py-20 lg:py-28 bg-surface-translucent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal amount={0.3}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-textmuted hover:text-gold transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <Reveal direction="left">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-gold text-primary rounded">
                  {project.category}
                </span>
                <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary">
                  {project.title}
                </h1>
                <div className="flex items-center gap-4 text-textmuted">
                  <MapPin className="w-5 h-5 shrink-0" />
                  <span>{project.location}</span>
                </div>
                <p className="text-textmuted text-lg leading-relaxed">{project.summary}</p>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.1}>
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-subtle bg-surface-elevated hidden lg:block">
                {project.images[0] ? (
                  <Image
                    src={project.images[0]}
                    alt={`${project.title} — ${project.location}`}
                    fill
                    priority
                    sizes="50vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center" aria-hidden="true">
                    <span className="text-primary/20 text-6xl">📷</span>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28 bg-surface-elevated-translucent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-8">
              <Reveal>
                <SectionHeading
                  eyebrow="Project Details"
                  title="Specifications"
                  subtitle="Key project metrics and planning information."
                  align="left"
                />
              </Reveal>

              <RevealStagger className="space-y-4" stagger={0.06}>
                {project.specs.map((spec, index) => (
                  <RevealItem
                    key={index}
                    className="flex items-center justify-between p-4 bg-lightgray rounded-xl"
                  >
                    <span className="text-textmuted">{spec.label}</span>
                    <span className="font-medium text-primary">{spec.value}</span>
                  </RevealItem>
                ))}
              </RevealStagger>

              <Reveal>
                <SectionHeading
                  eyebrow="Our Approach"
                  title="How We Delivered"
                  subtitle="The strategy and services that secured approval."
                  align="left"
                />
              </Reveal>

              {/* One reveal for the whole grid rather than a staggered item per
                  card: each card is a direct grid child today, and a wrapping
                  div would take over that stretch instead of the card. */}
              <Reveal>
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <CheckCircle className="w-5 h-5 text-gold mb-2" />
                    <h4 className="font-semibold text-primary mb-1">Pre-application advice</h4>
                    <p className="text-textmuted text-sm">Early engagement with planning officers identified key constraints.</p>
                  </Card>
                  <Card className="p-4">
                    <CheckCircle className="w-5 h-5 text-gold mb-2" />
                    <h4 className="font-semibold text-primary mb-1">Design & Access Statement</h4>
                    <p className="text-textmuted text-sm">Comprehensive statement addressing all relevant local plan policies.</p>
                  </Card>
                  <Card className="p-4">
                    <CheckCircle className="w-5 h-5 text-gold mb-2" />
                    <h4 className="font-semibold text-primary mb-1">High-quality drawings</h4>
                    <p className="text-textmuted text-sm">Scaled plans, elevations, and 3D visualisations for clear communication.</p>
                  </Card>
                  <Card className="p-4">
                    <CheckCircle className="w-5 h-5 text-gold mb-2" />
                    <h4 className="font-semibold text-primary mb-1">Condition discharge</h4>
                    <p className="text-textmuted text-sm">Post-approval support to discharge all planning conditions.</p>
                  </Card>
                </div>
              </Reveal>

              {project.images.length > 1 && (
                <Reveal>
                  <figure className="mt-10">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-subtle">
                      <Image
                        src={project.images[1]}
                        alt={`${project.title}, second view — ${project.location}`}
                        fill
                        sizes="(min-width: 1024px) 66vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-3 text-sm text-muted">
                      {project.title} — completed work in {project.location}.
                    </figcaption>
                  </figure>
                </Reveal>
              )}
            </div>

            <Reveal direction="right" delay={0.1}>
              <div>
              <Card className="p-6 h-fit sticky top-24">
                <h3 className="font-heading font-semibold text-xl text-primary mb-4">Project Summary</h3>
                <dl className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-textmuted">Category</dt>
                    <dd className="font-medium text-primary">{project.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-textmuted">Location</dt>
                    <dd className="font-medium text-primary">{project.location}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-textmuted">Planning Route</dt>
                    <dd className="font-medium text-primary">
                      {project.specs.find(s => s.label === "Planning Route")?.value}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-textmuted">Decision Time</dt>
                    <dd className="font-medium text-primary">
                      {project.specs.find(s => s.label === "Decision Time")?.value}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-textmuted">Outcome</dt>
                    <dd className="font-medium text-gold">
                      {project.specs.find(s => s.label === "Outcome")?.value}
                    </dd>
                  </div>
                </dl>
                <div className="mt-6 pt-6 border-t border-subtle">
                  <Button variant="primary" size="lg" className="w-full" asChild>
                    <Link href="/quote">Start Similar Project</Link>
                  </Button>
                </div>
              </Card>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28 bg-surface-translucent">
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-6">
              Have a Similar Project?
            </h2>
            <p className="text-secondary text-lg mb-10 max-w-2xl mx-auto">
              We&rsquo;d love to hear about your project. Get in touch for a free initial
              consultation.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
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
