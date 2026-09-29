"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PROJECTS, PROJECT_CATEGORIES, type ProjectCategory } from "@/lib/projects";

function isCategory(value: string | null): value is ProjectCategory {
  return value !== null && (PROJECT_CATEGORIES as readonly string[]).includes(value);
}

function readCategoryFromUrl(): ProjectCategory {
  if (typeof window === "undefined") return "All";
  const raw = new URLSearchParams(window.location.search).get("category");
  return isCategory(raw) ? raw : "All";
}

export function ProjectsClient() {
  // Starts as "All" so the full grid is server-rendered and indexable, then
  // narrows to the requested category once the client takes over. Reading
  // `useSearchParams()` here instead would bail the whole section out of static
  // prerendering, which left the page shipping "Loading projects..." to
  // crawlers and no-JS visitors.
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");

  // Adjust during render rather than in an effect: the first client render
  // (hydration) reconciles with the URL, so a shared ?category= link shows the
  // right subset immediately with no intermediate flash of the full grid.
  const [urlCategory, setUrlCategory] = useState<ProjectCategory | null>(null);
  if (urlCategory === null) {
    const fromUrl = readCategoryFromUrl();
    if (fromUrl !== activeFilter) setActiveFilter(fromUrl);
    setUrlCategory(fromUrl);
  }

  useEffect(() => {
    // Only back/forward navigation changes the URL after mount, so this stays a
    // pure external-system subscription.
    const onPopState = () => setActiveFilter(readCategoryFromUrl());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Keep the filter in the URL so links are shareable and the back button works.
  const setFilter = useCallback((next: ProjectCategory) => {
    setActiveFilter(next);

    const params = new URLSearchParams(window.location.search);
    if (next === "All") params.delete("category");
    else params.set("category", next);

    const query = params.toString();
    const url = query ? `/projects?${query}` : "/projects";
    window.history.replaceState(window.history.state, "", url);
  }, []);

  const visible = PROJECTS.filter(
    (project) => activeFilter === "All" || project.category === activeFilter,
  );

  return (
    <>
      {/* Filters */}
      <Reveal amount={0.3}>
        <div
          className="mb-12 flex flex-wrap justify-center gap-3"
          role="group"
          aria-label="Filter projects by category"
        >
          {PROJECT_CATEGORIES.map((category) => {
            const isActive = activeFilter === category;
            return (
              <Button
                key={category}
                variant={isActive ? "gold" : "secondary"}
                size="sm"
                aria-pressed={isActive}
                onClick={() => setFilter(category)}
              >
                {category}
              </Button>
            );
          })}
        </div>
      </Reveal>

      {/* Results. The grid reveals as one block rather than per card: the
          cards are `<li>`s carrying their own mount animation for the filter
          change, and a `RevealItem` per card would break the list semantics
          and fight that layout animation. */}
      <p aria-live="polite" className="sr-only">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        {activeFilter !== "All" ? ` in ${activeFilter}` : ""}.
      </p>

      <Reveal>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {visible.map((project, index) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
            >
              <Link href={`/projects/${project.slug}`} className="group block h-full">
                <Card hover className="h-full overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    {/* Gradient sits underneath so the tile is never blank if
                        the photo is still loading. */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
                      aria-hidden="true"
                    />
                    {project.images[0] ? (
                      <Image
                        src={project.images[0]}
                        alt={`${project.title} — ${project.location}`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : null}
                    <span className="absolute left-4 top-4 z-10 rounded bg-gold px-3 py-1 text-xs font-medium text-navy">
                      {project.category}
                    </span>
                  </div>
                  <div className="space-y-3 p-6">
                    <h2 className="font-heading text-xl font-semibold text-primary transition-colors group-hover:text-gold">
                      {project.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-secondary">{project.summary}</p>
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
      </Reveal>

      {visible.length === 0 ? (
        <p className="py-12 text-center text-secondary">
          No projects in this category yet. Please check back soon.
        </p>
      ) : null}
    </>
  );
}
