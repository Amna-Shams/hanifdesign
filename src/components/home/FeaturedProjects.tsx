"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import { PROJECTS } from "@/lib/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

/** The four most recent projects, straight from the canonical catalogue. */
const FEATURED = [...PROJECTS]
  .sort((a, b) => b.year.localeCompare(a.year))
  .slice(0, 4);

export function FeaturedProjects() {
  return (
    <section
      className="py-16 sm:py-20 lg:py-28"
      aria-labelledby="featured-projects-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionHeading
              id="featured-projects-heading"
              eyebrow="Our work"
              title="Recent projects"
              subtitle="A selection of planning and design projects across the West Midlands."
              align="left"
              className="mb-0"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="shrink-0"
          >
            <Button variant="ghost" size="sm" asChild>
              <Link href="/projects">
                View all projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {FEATURED.map((project, index) => (
            <motion.li
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/projects/${project.slug}`} className="group block h-full">
                <Card hover className="h-full overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
                      aria-hidden="true"
                    />
                    {project.images[0] ? (
                      <Image
                        src={project.images[0]}
                        alt={`${project.title} — ${project.location}`}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : null}
                    <span className="absolute left-4 top-4 rounded bg-gold px-3 py-1 text-xs font-medium text-navy">
                      {project.category}
                    </span>
                  </div>

                  <div className="space-y-3 p-6">
                    <h3 className="font-heading text-xl font-semibold text-primary transition-colors group-hover:text-gold">
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-secondary">{project.summary}</p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-subtle pt-3 text-xs text-muted">
                      <span className="inline-flex min-w-0 items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {project.location}
                      </span>
                      <span className="inline-flex min-w-0 items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        {project.year}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-sm font-medium text-gold">
                      Read case study
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
