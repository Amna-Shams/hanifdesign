import type { Metadata } from "next";
import { Suspense } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectsClient } from "./ProjectsClient";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Recent planning and design projects across Birmingham and the West Midlands, including rear extensions, side extensions, loft conversions and new builds.",
};

/** Links matching the in-page filter, so the full list is reachable without JS. */
const QUICK_FILTER_LINKS = PROJECT_CATEGORIES.map((category) => ({
  category,
  count: PROJECTS.filter((project) => project.category === category).length,
}));

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-surface-translucent py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* The title block is deliberately static: it is the first viewport and
              the h1 is the LCP element, so a `whileInView` reveal would ship
              `opacity: 0` in the server HTML and hold it back until hydration. */}
          <SectionHeading
            id="projects-heading"
            as="h1"
            eyebrow="Our work"
            title="Our projects"
            subtitle="A selection of planning and design projects across the West Midlands."
            align="center"
            className="mb-10"
          />

          {/* ProjectsClient reads the URL for the active filter, so it needs a
              Suspense boundary. The boundary is scoped to the interactive
              filter + grid only — the heading above stays server-rendered. */}
          <Suspense fallback={<ProjectGridSkeleton />}>
            <ProjectsClient />
          </Suspense>
        </div>
      </section>

      {/* The no-JS fallback is deliberately left unanimated: a `whileInView`
          reveal paints opacity: 0 into the markup and needs JavaScript to run,
          which would leave this block invisible for exactly the visitors who
          need it. */}
      <noscript>
        <section className="bg-surface-translucent py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 font-heading text-2xl font-semibold text-primary">
              All projects ({PROJECTS.length})
            </h2>
            <ul className="space-y-4">
              {QUICK_FILTER_LINKS.map(({ category, count }) => (
                <li key={category}>
                  <a
                    href={`/projects?category=${encodeURIComponent(category)}`}
                    className="text-gold underline underline-offset-4"
                  >
                    {category} ({count})
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </noscript>
    </>
  );
}

function ProjectGridSkeleton() {
  return (
    <div aria-hidden="true" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="h-64 animate-pulse rounded-xl border border-subtle bg-surface-elevated"
        />
      ))}
    </div>
  );
}
