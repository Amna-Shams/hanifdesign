import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Plus } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";
import { PlanTabs, type PlanTab } from "./PlanTabs";
import { PlanContactForm } from "./PlanContactForm";

/**
 * Shared layout for the long, tabbed service pages (Virtual Staging).
 *
 * A light palette with a tan accent and grey bands. The site's colour tokens
 * are re-pointed on the wrapper so the global heading and paragraph colours
 * resolve to this page's palette in either theme. Everything that differs
 * between pages lives in a `PlanContent` object.
 */
export interface PlanContent {
  hero: { title: string; subtitle: string; image: string };
  ways: {
    title: string;
    sub: string;
    perks: readonly { icon: LucideIcon; title: string; text: string }[];
  };
  tabs: { ariaLabel: string; defaultId: string; items: readonly PlanTab[] };
  solutions: { title: string; sub: string; images: readonly string[]; cta: string; href: string };
  reasons: {
    title: string;
    sub: string;
    items: readonly (readonly [string, string])[];
    images: readonly string[];
  };
  workflow: {
    title: string;
    steps: readonly { title: string; text: string; list: readonly string[]; image: string }[];
  };
  impressed: {
    title: string;
    sub: string;
    items: readonly { lead: string; tan?: boolean; rest: string }[];
  };
  faq: { title: string; sub: string; items: readonly (readonly [string, string])[] };
  contactSubject: string;
}

const PAGE_VARS = {
  "--background": "#ffffff",
  "--text-primary": "#1b1b1b",
  "--text-secondary": "#2e2e2e",
  "--text-muted": "#5b5b5b",
  "--brand-gold": "#b8865b",
  "--on-accent": "#ffffff",
  "--border-subtle": "rgba(0,0,0,0.12)",
  "--surface-elevated": "#ffffff",
  "--surface-translucent": "#ffffff",
  backgroundColor: "#ffffff",
  color: "#1b1b1b",
} as CSSProperties;

function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-center font-heading text-2xl font-light uppercase tracking-wide sm:text-[1.75rem]">
      {children}
    </h2>
  );
}

function Sub({ children }: { children: ReactNode }) {
  return <p className="mx-auto mt-2 max-w-2xl text-center text-[0.8125rem]">{children}</p>;
}

function Thumb({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#eee] ${className}`}>
      <Image src={src} alt={alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
    </div>
  );
}

const tanButton =
  "inline-flex min-h-11 items-center justify-center bg-[#b8865b] px-8 py-3.5 text-[0.75rem] font-medium uppercase tracking-wider !text-white transition-opacity hover:opacity-90";

export function PlanLayout({ content }: { content: PlanContent }) {
  const { hero, ways, tabs, solutions, reasons, workflow, impressed, faq } = content;

  return (
    <article style={PAGE_VARS} className="isolate">
      {/* 1 — Hero */}
      <header className="relative isolate flex min-h-[34rem] items-center justify-center overflow-hidden bg-[#222] lg:min-h-[44rem]">
        <Image src={hero.image} alt="" fill priority quality={90} sizes="100vw" className="-z-20 object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/55" />
        <div className="px-4 py-24 text-center">
          <h1 className="font-heading text-[2.25rem] font-light uppercase leading-[1.1] tracking-wide !text-white sm:text-6xl lg:text-[4.5rem]">
            {hero.title}
          </h1>
          <p className="mt-4 text-base !text-white sm:text-lg">{hero.subtitle}</p>
          <Link href="/quote" className={`${tanButton} mt-12`}>
            Start project
          </Link>
        </div>
        <a
          href="#ways"
          aria-label="Scroll to content"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white"
        >
          <ChevronDown className="h-8 w-8" aria-hidden="true" />
        </a>
      </header>

      {/* 2 — Ways */}
      <section id="ways" className="bg-white py-16 sm:py-20">
        <H2>{ways.title}</H2>
        <Sub>{ways.sub}</Sub>
        <ul className="mx-auto mt-14 grid max-w-5xl gap-10 px-4 text-center sm:px-6 md:grid-cols-3">
          {ways.perks.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <Icon className="mx-auto h-12 w-12 text-[#b8865b]" strokeWidth={1.25} aria-hidden="true" />
              <h3 className="mt-5 font-heading text-base font-medium">{title}</h3>
              <p className="mx-auto mt-2 max-w-[16rem] text-[0.8125rem] text-[#5b5b5b]">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 3 — Tabs and demo */}
      <PlanTabs tabs={tabs.items} defaultId={tabs.defaultId} ariaLabel={tabs.ariaLabel} />

      {/* 4 — Solutions */}
      <section className="border-t border-[#eee] bg-white py-14 sm:py-20">
        <H2>{solutions.title}</H2>
        <Sub>{solutions.sub}</Sub>
        <ul className="mx-auto mt-10 grid max-w-4xl grid-cols-3 gap-3 px-4 sm:px-6">
          {solutions.images.map((src) => (
            <li key={src}>
              <Thumb src={src} alt="" className="aspect-[3/2]" />
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <Link href={solutions.href} className={tanButton}>
            {solutions.cta}
          </Link>
        </div>
      </section>

      {/* 5 — Reasons */}
      <section id="features" className="bg-[#f6f6f6] py-16 sm:py-20">
        <H2>{reasons.title}</H2>
        <Sub>{reasons.sub}</Sub>
        <ul className="mx-auto mt-12 grid max-w-4xl gap-x-10 gap-y-10 px-4 sm:px-6 md:grid-cols-2">
          {reasons.items.map(([title, text], index) => (
            <li key={title} className="flex gap-5">
              <Thumb src={reasons.images[index]} alt="" className="h-28 w-28 shrink-0 sm:h-32 sm:w-28" />
              <div>
                <h3 className="font-heading text-base font-medium">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#444]">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 6 — Workflow */}
      <section id="workflow" className="bg-white py-16 sm:py-20">
        <H2>{workflow.title}</H2>
        <ul className="mx-auto mt-12 grid max-w-4xl gap-10 px-4 sm:px-6 md:grid-cols-3">
          {workflow.steps.map((step) => (
            <li key={step.title}>
              <Thumb src={step.image} alt="" className="mb-6 aspect-[4/3]" />
              <h3 className="font-heading text-lg font-medium">{step.title}</h3>
              <p className="mt-3 text-xs leading-relaxed text-[#444]">{step.text}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-[#444] marker:text-[#b8865b]">
                {step.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {/* 7 — Impressed */}
      <section className="bg-[#f6f6f6] py-16 sm:py-20">
        <H2>{impressed.title}</H2>
        <Sub>{impressed.sub}</Sub>
        <ul className="mx-auto mt-12 grid max-w-4xl gap-8 px-4 text-[0.8125rem] sm:px-6 md:grid-cols-3">
          {impressed.items.map((item) => (
            <li key={item.lead} className="list-inside list-disc marker:text-[#b8865b]">
              <strong className={`font-semibold ${item.tan ? "text-[#b8865b]" : ""}`}>{item.lead}</strong>{" "}
              {item.rest}
            </li>
          ))}
        </ul>
        <div className="mt-12 text-center">
          <Link href="/quote" className={tanButton}>
            Start project
          </Link>
        </div>
      </section>

      {/* 8 — FAQ */}
      <section id="faq" className="bg-white py-16 sm:py-20">
        <H2>{faq.title}</H2>
        <Sub>{faq.sub}</Sub>
        <div className="mx-auto mt-12 grid max-w-4xl items-start gap-3 px-4 sm:px-6 md:grid-cols-2">
          {faq.items.map(([question, answer]) => (
            <details key={question} className="group border border-[#e1e1e1] bg-white">
              <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 px-3 py-3 text-xs [&::-webkit-details-marker]:hidden">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center border border-[#cfcfcf] text-[#777]">
                  <Plus className="h-3 w-3 transition-transform group-open:rotate-45" aria-hidden="true" />
                </span>
                {question}
              </summary>
              <p className="border-t border-[#eee] px-4 py-3 text-xs leading-relaxed text-[#555]">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 9 — Contact */}
      <section id="contacts" className="bg-white pb-16 sm:pb-24">
        <div className="mx-auto grid max-w-4xl gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <H2>Contacts</H2>
            <ul className="mt-6 space-y-2 text-center text-[0.8125rem]">
              <li>
                <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`} className="hover:underline">
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:underline">
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>
          <PlanContactForm subject={content.contactSubject} />
        </div>
      </section>
    </article>
  );
}
