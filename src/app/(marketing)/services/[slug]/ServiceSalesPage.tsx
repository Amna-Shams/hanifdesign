import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROJECTS } from "@/lib/projects";
import type { SalesContent } from "./serviceSalesContent";

/**
 * Shared layout for the long-form service pages. It follows the same section
 * order and styling as the Interior Visualisation page so every service reads
 * as part of one family. Content lives in `serviceSalesContent.tsx`.
 */

/** Tinted tile with an image on top. */
function Pic({
  src,
  alt,
  className = "",
  sizes,
  priority = false,
  position = "object-center",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  position?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-surface-elevated ${className}`}>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-navy/20 to-gold/10" />
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${position}`} />
    </div>
  );
}

function Band({
  children,
  tone = "plain",
  label,
}: {
  children: ReactNode;
  tone?: "plain" | "tint" | "dark";
  label?: string;
}) {
  const tones = {
    plain: "bg-background",
    tint: "bg-surface-translucent",
    dark: "bg-[#1d2024] light:bg-surface-translucent",
  } as const;
  return (
    <section aria-label={label} className={`${tones[tone]} py-16 sm:py-20 lg:py-24`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function ServiceSalesPage({ content: c }: { content: SalesContent }) {
  const caseStudies = PROJECTS.filter((project) => project.images.length > 0).slice(0, 3);

  return (
    <article>
      {/* 1 — Hero */}
      <header className="relative isolate flex min-h-[34rem] items-end overflow-hidden bg-[#0b0d12] lg:min-h-[40rem]">
        <Image
          src={c.hero.src}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className={`-z-20 object-cover ${c.hero.position ?? "object-center"}`}
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
        <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-32 sm:px-6 lg:px-8 lg:pb-20">
          <nav aria-label="Breadcrumb" className="mb-10 text-xs text-white/80">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">›</li>
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" className="font-semibold text-white">{c.label}</li>
            </ol>
          </nav>
          <h1 className="max-w-3xl !text-white font-heading text-4xl font-bold leading-tight sm:text-5xl">{c.title}</h1>
          <p className="mt-5 max-w-2xl !text-white/90 text-base leading-relaxed sm:text-lg">{c.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/quote"
              className="inline-flex min-h-11 items-center justify-center rounded-sm bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#1a1a1a] transition-opacity hover:opacity-90"
            >
              Request a quote
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-sm bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-wider text-on-accent transition-opacity hover:opacity-90"
            >
              Book free consultation
            </Link>
          </div>
        </div>
      </header>

      {/* 2 — Image mosaic (dark band) */}
      <Band tone="dark">
        <h2 className="mb-4 text-center font-heading text-2xl font-bold !text-white light:!text-primary sm:text-4xl">{c.mosaic.title}</h2>
        {c.mosaic.text ? (
          <p className="mx-auto mb-10 max-w-3xl text-center !text-white/80 light:!text-secondary">{c.mosaic.text}</p>
        ) : (
          <div className="mb-6" />
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <Pic src={c.mosaic.large.src} alt={c.mosaic.large.alt} sizes="(min-width: 1280px) 1200px, 100vw" className="aspect-[16/9] rounded-sm sm:col-span-2" />
          <Pic src={c.mosaic.a.src} alt={c.mosaic.a.alt} sizes="(min-width: 640px) 50vw, 100vw" className="aspect-[4/3] rounded-sm" />
          <Pic src={c.mosaic.b.src} alt={c.mosaic.b.alt} sizes="(min-width: 640px) 50vw, 100vw" className="aspect-[4/3] rounded-sm" />
        </div>
      </Band>

      {/* 2b — Optional explainer */}
      {c.explainer ? (
        <Band>
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">{c.explainer.title}</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-secondary">
              {c.explainer.paragraphs.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </div>
        </Band>
      ) : null}

      {/* 3 — Comparison */}
      <Band>
        <SectionHeading title={c.compare.title} subtitle={c.compare.subtitle} className="mb-10" />
        <div className="grid gap-6 sm:grid-cols-2">
          {[c.compare.left, c.compare.right].map((fig) => (
            <figure key={fig.caption}>
              <figcaption className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">{fig.caption}</figcaption>
              <Pic src={fig.src} alt={fig.alt} sizes="(min-width: 640px) 50vw, 100vw" className="aspect-[4/3] rounded-sm" />
            </figure>
          ))}
        </div>
        <div className="mt-12 max-w-3xl">
          <h3 className="mb-4 font-heading text-lg font-semibold text-primary">{c.compare.pointsTitle}</h3>
          <ul className="list-disc space-y-2 pl-5 text-sm text-secondary marker:text-gold">
            {c.compare.points.map(([lead, rest]) => (
              <li key={lead}>
                <strong className="text-primary">{lead}</strong> {rest}
              </li>
            ))}
          </ul>
        </div>
      </Band>

      {/* 4 — Audiences */}
      <Band tone="tint">
        <SectionHeading title={c.audiences.title} subtitle={c.audiences.subtitle} className="mb-10" />
        <ul className="grid gap-8 sm:grid-cols-2">
          {c.audiences.items.map((item) => (
            <li key={item.title} className="text-center">
              <Pic src={item.img.src} alt={item.img.alt} sizes="(min-width: 640px) 50vw, 100vw" className="mb-5 aspect-[16/10] rounded-sm" />
              <h3 className="font-heading text-lg font-semibold text-primary">{item.title}</h3>
              <p className="mt-1 text-sm text-secondary">{item.text}</p>
            </li>
          ))}
        </ul>
      </Band>

      {/* 5 — Highlights */}
      <Band>
        <SectionHeading title={c.highlights.title} subtitle={c.highlights.subtitle} className="mb-10" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.highlights.items.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-sm border border-subtle bg-surface-elevated p-5">
              <Icon className="mb-4 h-6 w-6 text-gold" aria-hidden="true" />
              <h3 className="mb-2 font-heading text-base font-semibold text-primary">{title}</h3>
              <p className="text-sm leading-relaxed text-secondary">{text}</p>
            </li>
          ))}
        </ul>
      </Band>

      {/* 6 — Quote band */}
      <section className="relative isolate overflow-hidden bg-[#1d2024] light:bg-surface-translucent py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <h2 className="font-heading text-2xl font-bold !text-white light:!text-primary sm:text-3xl">{c.quote.title}</h2>
            <div className="mt-6">
              <Button variant="gold" asChild>
                <Link href="/quote">Request a quote</Link>
              </Button>
            </div>
          </div>
          <Pic src={c.quote.img.src} alt={c.quote.img.alt} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[16/7] rounded-sm" />
        </div>
      </section>

      {/* 7 — Deep-dive rows */}
      <Band>
        <SectionHeading title={c.types.title} subtitle={c.types.subtitle} className="mb-14" />
        <div className="space-y-14">
          {c.types.items.map((item, index) => (
            <div key={item.title} className="grid items-center gap-8 md:grid-cols-2 lg:gap-14">
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <Pic src={item.img.src} alt={item.img.alt} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3] rounded-sm" />
              </div>
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <h3 className="mb-4 font-heading text-2xl font-bold text-primary">{item.title}</h3>
                <p className="leading-relaxed text-secondary">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Band>

      {/* 8 — Workflow */}
      <Band tone="tint">
        <SectionHeading title={c.workflow.title} subtitle={c.workflow.subtitle} className="mb-12" />
        <ol className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {c.workflow.steps.map(([title, text]) => (
            <li key={title}>
              <h3 className="mb-2 font-heading text-lg font-semibold text-primary">{title}</h3>
              <p className="text-sm leading-relaxed text-secondary">{text}</p>
            </li>
          ))}
        </ol>
      </Band>

      {/* 9 — Why choose us */}
      <Band>
        <SectionHeading title={c.why.title} className="mb-12" />
        <ul className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {c.why.items.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4">
              <Icon className="mt-1 h-7 w-7 shrink-0 text-gold" aria-hidden="true" />
              <div>
                <h3 className="font-heading text-base font-semibold text-primary">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-secondary">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Band>

      {/* 10 — Case studies */}
      <Band tone="tint">
        <SectionHeading
          title="Our Projects"
          subtitle="Real projects, not portfolio picks. Each case study shows what the client sent us, what we delivered and the outcome."
          className="mb-10"
        />
        <ul className="grid gap-6 sm:grid-cols-3">
          {caseStudies.map((project) => (
            <li key={project.slug}>
              <Link href={`/projects/${project.slug}`} className="group block">
                <Pic src={project.images[0]} alt={`${project.title} — ${project.location}`} sizes="(min-width: 640px) 33vw, 100vw" className="aspect-[4/3] rounded-sm" />
                <h3 className="mt-4 text-center font-heading text-base font-semibold text-primary transition-colors group-hover:text-gold">
                  {project.title}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <Link href="/projects" className="inline-flex items-center gap-1 text-sm font-medium text-gold hover:text-primary">
            View all projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Band>

      {/* 11 — FAQ */}
      <Band>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">{c.faq.title}</h2>
            <p className="mt-4 text-secondary">
              Cannot find your answer? <Link href="/contact" className="text-gold underline underline-offset-4">Contact us</Link>.
            </p>
          </div>
          <div className="divide-y divide-[var(--border-subtle)] border-y border-subtle">
            {c.faq.items.map(([question, answer]) => (
              <details key={question} className="group py-4">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-heading text-base font-semibold text-primary [&::-webkit-details-marker]:hidden">
                  {question}
                  <Plus className="h-4 w-4 shrink-0 text-gold transition-transform group-open:rotate-45" aria-hidden="true" />
                </summary>
                <p className="pt-2 text-sm leading-relaxed text-secondary">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Band>

      {/* 12 — Closing CTA */}
      <Band tone="dark">
        <div className="text-center">
          <Box className="mx-auto mb-4 h-8 w-8 text-gold" aria-hidden="true" />
          <h2 className="font-heading text-2xl font-bold !text-white light:!text-primary sm:text-3xl">{c.closing.title}</h2>
          <p className="mx-auto mt-3 max-w-xl !text-white/80 light:!text-secondary">{c.closing.text}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="gold" size="lg" asChild>
              <Link href="/quote">Request a quote</Link>
            </Button>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/40 px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-white/10 light:border-subtle light:text-primary light:hover:bg-black/5"
            >
              Book free consultation
            </Link>
          </div>
        </div>
      </Band>
    </article>
  );
}
