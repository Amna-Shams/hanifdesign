import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, ChevronDown, Clock, Plus, RefreshCw } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";
import { PlanTabs } from "./PlanTabs";
import { PlanContactForm } from "./PlanContactForm";

/**
 * 3D Plan service page — a single long sales page in a light palette with a
 * tan accent and a tabbed demo, following the supplied reference.
 *
 * The site's colour tokens are re-pointed on the wrapper so the global heading
 * and paragraph colours resolve to this page's palette in either theme.
 * Image slots are collected in IMG so they can be swapped for real work.
 */
const IMG = {
  hero: "/home-hero.webp",
  strip: [
    "/spacious-loft-conversion-harborne-1.webp",
    "/new-build-family-home-sutton-coldfield-1.webp",
    "/hmo-development-selly-oak-2.webp",
  ],
  reasons: [
    "/hmo-development-selly-oak-1.webp",
    "/rear-home-extension-edgbaston-2.webp",
    "/garden-office-studio-bournville-1.webp",
    "/spacious-loft-conversion-harborne-2.webp",
    "/new-build-family-home-sutton-coldfield-2.webp",
    "/two-storey-side-extension-four-oaks-2.webp",
  ],
  workflow: [
    "/garage-conversion-kings-heath-1.webp",
    "/rear-home-extension-edgbaston-1.webp",
    "/two-storey-side-extension-four-oaks-1.webp",
  ],
} as const;

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

const PERKS = [
  { icon: Clock, title: "Fast Turnaround Time", text: "Time is money, so we agree a delivery date in the quote and keep to it." },
  { icon: RefreshCw, title: "2 Rounds of Free Revisions", text: "We will improve the images for free twice." },
  { icon: BadgeCheck, title: "Satisfaction Focused", text: "If you are not happy with the result, tell us and we will put it right." },
] as const;

const REASONS = [
  ["1. Large Furniture Library", "You get access to our library of furniture and décor, so rooms are staged with pieces that suit the property and the buyer."],
  ["2. Design Experts at Your Service", "Appealing design does more than please the eye: it helps buyers picture themselves in the home. Our designers choose styles to match your target audience."],
  ["3. Responsive Support", "Every minute counts when selling a property, so we reply quickly and agree delivery dates up front. You can ask for changes or add something to the image at any point."],
  ["4. Perfect Lighting and Reflections", "To make the image a buyer's magnet, we match the real light in the space and add careful reflections, so staged furniture sits naturally in the photo."],
  ["5. 100% Photorealistic Materials", "The impact of the image depends on materials. If the picture makes you want to touch the chair upholstery or the cool marble countertop, the buyer will feel it too."],
  ["6. 100% Photorealistic Proportions", "Every piece is scaled to the room, so you never see tiny chairs next to a giant table. Everything in your pictures looks right."],
] as const;

const WORKFLOW = [
  { title: "1. Set the task", text: "Starting a project is a piece of cake. All you need is to specify a few details and we are ready to go.", list: ["send us a photo", "choose a style", "select furniture"] },
  { title: "2. Communicate", text: "Communicate easily with the team and track your ongoing tasks using our online platform.", list: ["talk to your project manager", "add corrections", "store results"] },
  { title: "3. Use results", text: "Finally, get your show-stopping visuals, which you can use for all your marketing and sales assets.", list: ["on property listings", "on your website", "on social media"] },
] as const;

const FAQS = [
  ["How much does virtual staging cost?", "The price depends on the number of images and the level of work. Send us your photos and we will give you a fixed quote."],
  ["Do you stage exteriors too?", "Yes. We can refresh the outside of a property, from the front elevation to the garden and drive."],
  ["How fast will I get the staged photos?", "We agree a delivery date in the quote. Sets of several rooms are produced in parallel."],
  ["Do you work with agencies and photographers?", "Yes. Many of our clients are estate agents and photographers who send us photos for a whole portfolio of properties."],
  ["What do I need to send to start?", "A photo of each room, the style you want, and any furniture you would like us to use. That is enough to begin."],
  ["Do you only do virtual staging?", "No. We also offer virtual styling, virtual renovation, exterior renovation, 360° views and 3D plans."],
  ["Can you stage occupied or furnished homes?", "Yes. We can restyle a furnished room, or remove existing items and stage it afresh."],
  ["Should buyers be told the photos are staged?", "Yes. We recommend labelling staged images clearly, so buyers know what they are looking at. It is also good practice and helps build trust."],
] as const;

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

export function Plan3D() {
  return (
    <article style={PAGE_VARS} className="isolate">
      {/* 1 — Hero */}
      <header className="relative isolate flex min-h-[34rem] items-center justify-center overflow-hidden bg-[#222] lg:min-h-[44rem]">
        <Image src={IMG.hero} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/55" />
        <div className="px-4 py-24 text-center">
          <h1 className="font-heading text-[2.25rem] font-light uppercase leading-[1.1] tracking-wide !text-white sm:text-6xl lg:text-[4.5rem]">
            Virtual Home Staging Services
          </h1>
          <p className="mt-4 text-base !text-white sm:text-lg">
            The Ultimate Cutting-Edge Tool for Increasing Real Estate Sales
          </p>
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

      {/* 2 — Six ways */}
      <section id="ways" className="bg-white py-16 sm:py-20">
        <H2>6 Ways You Can Sell More Properties Than Ever</H2>
        <Sub>With photorealistic virtual home staging services, you get everything you need in one place</Sub>
        <ul className="mx-auto mt-14 grid max-w-5xl gap-10 px-4 text-center sm:px-6 md:grid-cols-3">
          {PERKS.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <Icon className="mx-auto h-12 w-12 text-[#b8865b]" strokeWidth={1.25} aria-hidden="true" />
              <h3 className="mt-5 font-heading text-base font-medium">{title}</h3>
              <p className="mx-auto mt-2 max-w-[16rem] text-[0.8125rem] text-[#5b5b5b]">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 3 — Tabs and demo */}
      <PlanTabs />

      {/* 4 — Solutions */}
      <section className="border-t border-[#eee] bg-white py-14 sm:py-20">
        <H2>Solutions That Will Boost Your Ads</H2>
        <Sub>
          We create real estate marketing imagery that inspires people and makes them call for viewing
          appointments. Need proof? Take a look at our work.
        </Sub>
        <ul className="mx-auto mt-10 grid max-w-4xl grid-cols-3 gap-3 px-4 sm:px-6">
          {IMG.strip.map((src) => (
            <li key={src}>
              <Thumb src={src} alt="" className="aspect-[3/2]" />
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <Link href="/projects" className={tanButton}>
            Portfolio
          </Link>
        </div>
      </section>

      {/* 5 — Six reasons */}
      <section id="features" className="bg-[#f6f6f6] py-16 sm:py-20">
        <H2>We Take Real Estate Ad Imagery to the Art Level</H2>
        <Sub>Wonder how? Here are 6 reasons we turn vacant photographs into real masterpieces</Sub>
        <ul className="mx-auto mt-12 grid max-w-4xl gap-x-10 gap-y-10 px-4 sm:px-6 md:grid-cols-2">
          {REASONS.map(([title, text], index) => (
            <li key={title} className="flex gap-5">
              <Thumb src={IMG.reasons[index]} alt="" className="h-28 w-28 shrink-0 sm:h-32 sm:w-28" />
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
        <H2>Workflow</H2>
        <ul className="mx-auto mt-12 grid max-w-4xl gap-10 px-4 sm:px-6 md:grid-cols-3">
          {WORKFLOW.map((step, index) => (
            <li key={step.title}>
              <Thumb src={IMG.workflow[index]} alt="" className="mb-6 aspect-[4/3]" />
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
        <H2>Impressed? And That&rsquo;s Far From All.</H2>
        <Sub>By working with us, you automatically get:</Sub>
        <ul className="mx-auto mt-12 grid max-w-4xl gap-8 px-4 text-[0.8125rem] sm:px-6 md:grid-cols-3">
          <li className="list-inside list-disc marker:text-[#b8865b]">
            <strong className="font-semibold">Unlimited online storage</strong> for your images in our
            project platform
          </li>
          <li className="list-inside list-disc marker:text-[#b8865b]">
            <strong className="font-semibold text-[#b8865b]">2 free rounds of revisions</strong> — you can
            come back twice and ask for adjustments to any picture
          </li>
          <li className="list-inside list-disc marker:text-[#b8865b]">
            <strong className="font-semibold text-[#b8865b]">PDF specification</strong> for all the
            furniture used in the project
          </li>
        </ul>
        <div className="mt-12 text-center">
          <Link href="/quote" className={tanButton}>
            Start project
          </Link>
        </div>
      </section>

      {/* 8 — FAQ */}
      <section id="faq" className="bg-white py-16 sm:py-20">
        <H2>Virtual Staging FAQ</H2>
        <Sub>
          Everything realtors usually ask us about virtual home staging services, prices and turnaround,
          collected in one place.
        </Sub>
        <div className="mx-auto mt-12 grid max-w-4xl items-start gap-3 px-4 sm:px-6 md:grid-cols-2">
          {FAQS.map(([question, answer]) => (
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
          <PlanContactForm />
        </div>
      </section>
    </article>
  );
}
