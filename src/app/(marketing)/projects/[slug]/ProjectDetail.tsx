"use client";

import { ArrowLeft, MapPin, CheckCircle, Building2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import type { Project } from "@/lib/projects";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="min-h-screen bg-surface-elevated-translucent">
      <section className="bg-surface-translucent py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal amount={0.3}>
            <Link
              href="/projects"
              className="mb-8 inline-flex items-center gap-2 text-textmuted transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </Reveal>

          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="left">
              <div className="space-y-4">
                <span className="inline-block rounded bg-gold px-3 py-1 text-xs font-medium text-on-accent">
                  {project.category}
                </span>
                <h1 className="font-heading text-4xl font-bold text-primary sm:text-5xl">
                  {project.title}
                </h1>
                <p className="text-sm font-medium uppercase tracking-wide text-gold">
                  {project.sector}
                </p>
                <div className="flex items-center gap-4 text-textmuted">
                  <MapPin className="h-5 w-5 shrink-0" />
                  <span>{project.location}</span>
                </div>
                <p className="text-lg leading-relaxed text-textmuted">{project.summary}</p>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.1}>
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-subtle bg-surface-elevated">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
                  aria-hidden="true"
                />
                {project.images[0] ? (
                  <Image
                    src={project.images[0]}
                    alt={`${project.title} — ${project.location}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center text-gold/60"
                    aria-hidden="true"
                  >
                    <Building2 className="h-16 w-16" />
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-surface-elevated-translucent py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
            <div className="space-y-12 lg:col-span-2">
              {/* The Brief */}
              <div>
                <Reveal>
                  <SectionHeading eyebrow="Case study" title="The Brief" align="left" />
                </Reveal>
                <Reveal>
                  <div className="mt-6 space-y-4 text-lg leading-relaxed text-secondary">
                    {project.brief.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </Reveal>
              </div>

              {/* Services & Deliverables */}
              <div>
                <Reveal>
                  <SectionHeading
                    eyebrow="What we did"
                    title="Services & Deliverables"
                    align="left"
                  />
                </Reveal>
                <Reveal>
                  <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                    {project.services.map((service) => (
                      <li key={service}>
                        <Card className="h-full p-4">
                          <CheckCircle className="mb-2 h-5 w-5 text-gold" aria-hidden="true" />
                          <p className="text-sm leading-relaxed text-secondary">{service}</p>
                        </Card>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              {/* The Outcome */}
              <div>
                <Reveal>
                  <SectionHeading eyebrow="The result" title="The Outcome" align="left" />
                </Reveal>
                <Reveal>
                  <div className="mt-6 space-y-4 text-lg leading-relaxed text-secondary">
                    {project.outcome.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </Reveal>
              </div>

              {/* One extra image sits in the text column, as it always has. */}
              {project.images.length === 2 && (
                <Reveal>
                  <figure>
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
                      {project.title} — {project.location}.
                    </figcaption>
                  </figure>
                </Reveal>
              )}
            </div>

            <Reveal direction="right" delay={0.1}>
              <div>
                <Card className="sticky top-24 h-fit p-6">
                  <h3 className="mb-4 font-heading text-xl font-semibold text-primary">
                    Project Summary
                  </h3>
                  <dl className="space-y-4 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-textmuted">Category</dt>
                      <dd className="text-right font-medium text-primary">{project.category}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-textmuted">Sector</dt>
                      <dd className="text-right font-medium text-primary">{project.sector}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-textmuted">Location</dt>
                      <dd className="text-right font-medium text-primary">{project.location}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 border-t border-subtle pt-6">
                    <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                      Project types &amp; services
                    </h4>
                    <ul className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-subtle px-3 py-1 text-xs text-secondary"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 border-t border-subtle pt-6">
                    <Button variant="primary" size="lg" className="w-full" asChild>
                      <Link href="/quote">Start Similar Project</Link>
                    </Button>
                  </div>
                </Card>
              </div>
            </Reveal>
          </div>

          {/* Gallery for projects with several images: full width, below the text
              and the summary card, so nothing is left empty beside it. */}
          {project.images.length > 2 && (
            <Reveal>
              <div className="mt-16">
                <SectionHeading eyebrow="Gallery" title="Project Gallery" align="left" />
                <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {project.images.slice(1).map((src, index) => (
                    <li
                      key={src}
                      className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-subtle bg-surface-elevated"
                    >
                      <Image
                        src={src}
                        alt={`${project.title}, view ${index + 2} — ${project.location}`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="bg-surface-translucent py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="mb-6 font-heading text-3xl font-bold text-primary sm:text-4xl">
              Have a Similar Project?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-secondary">
              We&rsquo;d love to hear about your project. Get in touch for a free initial
              consultation.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
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
