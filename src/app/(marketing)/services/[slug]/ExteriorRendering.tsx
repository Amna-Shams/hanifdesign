import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";
import { PROJECTS } from "@/lib/projects";
import { ExteriorGallery } from "./ExteriorGallery";
import { PlanContactForm } from "./PlanContactForm";

/**
 * Exterior Rendering service page: a light page with a tan accent and two dark
 * bands, following the supplied reference. Colour tokens are re-pointed on the
 * wrapper so global heading and paragraph colours follow this palette in either
 * theme. All image slots are placeholders from `public/` — swap in real
 * exterior renders.
 */
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

const IMG = {
  hero: "/exterior-hero.webp",
  useDev: "/exterior-use-development.webp",
  usePres: "/exterior-use-presentation.webp",
  useMkt: "/exterior-use-marketing.webp",
  typeHouse: "/exterior-type-single-family.webp",
  typeApt: "/exterior-type-apartments.webp",
  typeComplex: "/exterior-type-complexes.webp",
  typeMixed: "/exterior-type-mixed-use.webp",
  e1: "/two-storey-side-extension-four-oaks-1.webp",
  e2: "/rear-home-extension-edgbaston-1.webp",
  e3: "/digbeth-1.webp",
  e4: "/garage-conversion-kings-heath-1.webp",
  e5: "/garden-office-studio-bournville-1.webp",
  e6: "/single-storey-rear-extension-moseley-1.webp",
  e7: "/colmore-row-1.webp",
  e8: "/office-to-residential-conversion-city-centre-1.webp",
  e9: "/garden-office-studio-bournville-2.webp",
  e10: "/aston-logistics-2.webp",
  e11: "/new-build-family-home-sutton-coldfield-1.webp",
} as const;

const USES = [
  { title: "Project Development", img: IMG.useDev, text: "Design Decisions Made Visible. 3D renders put every finish option, cladding choice and window configuration in front of clients before construction begins. Fewer rounds of revisions. Faster sign-offs." },
  { title: "Design Presentation", img: IMG.usePres, text: "3D Does the Talking for You. Exterior renders show your design in a real environment with accurate light and site context. That kind of visual quality is what can separate a yes from a maybe." },
  { title: "Property Marketing", img: IMG.useMkt, text: "Sell Off-Plan Before Ground Breaks. 3D visualisation gives marketing teams strong imagery for listings, campaigns and investor decks. Properties move faster when people can picture themselves there." },
] as const;

const TYPES = [
  { title: "Single-family Homes", img: IMG.typeHouse, text: "Highlight design, materials and kerb appeal. Present the home as a finished space." },
  { title: "Apartment Buildings", img: IMG.typeApt, text: "Emphasise façade rhythm, scale and unit layout. Show how the building fits its context." },
  { title: "Residential Complexes", img: IMG.typeComplex, text: "Capture layout, shared spaces and circulation. Show how the community works as a whole." },
  { title: "Commercial Buildings", img: IMG.e7, text: "Show frontage, signage and entrances in the street scene. Help investors and tenants see the space before it is built." },
  { title: "Mixed-Use Schemes", img: IMG.typeMixed, text: "Explain how homes, shops and public space sit together, with activity and daylight at street level." },
  { title: "Extensions and Conversions", img: IMG.e6, text: "Show the new work against the existing building, so planners and owners can judge the change." },
] as const;

const VIEWS = [
  { title: "Aerial / Site Overview", img: IMG.e10, text: "The whole scheme, the roads and the green space in one image. Best for residential complexes and developments, where buyers first need to see how the community is laid out." },
  { title: "Street-Level View", img: IMG.e5, text: "An eye-level view down the main street: entrances, scale and what arriving home feels like. Best for presentations and the main marketing image." },
  { title: "Façade Close-Up", img: IMG.e1, text: "The front of one building, close enough to read the materials and details. Best for finish approvals and listings." },
] as const;

const CONTEXT = [
  { title: "Landscape and Environment Visualisation", img: IMG.e3, side: "text-right", text: "Exterior rendering can show how a project blends seamlessly into its surroundings. It can include trees, terrain and landscaping design with nearby buildings and the wider urban context. Such visuals highlight scale, density and alignment, creating a clear sense of place. At the neighbourhood level, they serve as powerful tools: supporting planning approvals and enhancing marketing by presenting a complete, realistic environment that communicates vision and impact." },
  { title: "Camera Angles and Composition", img: IMG.e8, side: "text-right", text: "Camera angles and composition control how the project is read and presented. A human-perspective view shows scale and proportions at eye level, while street-level views highlight the approach, entrances and façade details. Aerial views reveal site layout and relationships with the surrounding development. These viewpoints are arranged into marketing-focused compositions to direct attention to key features and present the project clearly in design reviews and promotional material." },
  { title: "Lighting, Weather, and Seasonal Atmosphere", img: IMG.e11, side: "text-left", text: "Lighting and atmospheric conditions are used to test and present the project under real scenarios. Daylight, overcast light and night rendering show how the façade, materials and landscaping behave at different times. Seasonal settings can be added to the same view to show the design in summer green or winter light." },
] as const;

const PROCESS = [
  { title: "Brief and Quote", text: "We agree the views you need, the files you send (drawings, CAD, Revit or SketchUp models), the timeline and the quote before production starts." },
  { title: "Geometry and Camera Approval", text: "The 3D model is built from your drawings, and you approve the geometry and camera angles on draft views before any detailing." },
  { title: "Materials, Lighting and Context", text: "Finishes, landscaping and lighting are added and shown to you as a preview. Your comments are collected in one consolidated list on our platform." },
  { title: "Final Renders", text: "Final images are rendered only after your approval, in the agreed resolution and formats, within the revision rounds set in the quote." },
] as const;

const GALLERY = [
  { src: IMG.e1, alt: "Exterior render of a detached house" },
  { src: IMG.e8, alt: "Exterior render of a residential building" },
  { src: IMG.e11, alt: "Exterior render of a new build home" },
  { src: IMG.e6, alt: "Exterior render of a rear extension" },
  { src: IMG.e5, alt: "Exterior render of a garden building" },
] as const;

const FAQS = [
  ["What information is needed to start an exterior rendering project?", "Your drawings (CAD, PDF, Revit or SketchUp models), the views you want, the materials and finishes, and any site photographs or references."],
  ["What is exterior rendering?", "Exterior rendering turns design drawings into photorealistic images of a building in its setting, before it is built."],
  ["How long does exterior rendering take?", "The time depends on the number of views and the complexity of the scene. We agree the schedule in the quote."],
  ["How much does exterior rendering cost?", "The price depends on the scope and level of detail, the number of views and the image resolution. Send us your drawings and we will give you a fixed quote."],
  ["Can exterior rendering be used for planning approvals?", "Yes. Accurate visuals help planning officers and neighbours understand a proposal, and they are often submitted alongside the planning drawings."],
  ["What resolution do exterior renderings have?", "We supply high-resolution images suitable for print and the web. Larger formats can be agreed in the quote."],
  ["What’s the difference between exterior rendering and exterior visualisation?", "Rendering is the process of producing the final image. Visualisation is the wider service: building the 3D model, setting up materials, light and context, and presenting the result."],
] as const;

function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`mx-auto max-w-3xl text-center font-heading text-[1.75rem] font-bold leading-tight sm:text-[2.25rem] ${className}`}
    >
      {children}
    </h2>
  );
}

function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="mx-auto mt-4 max-w-3xl text-center text-[0.8125rem] leading-relaxed sm:text-sm">
      {children}
    </p>
  );
}

function Pic({
  src,
  alt = "",
  className = "",
  sizes = "(min-width: 768px) 33vw, 100vw",
}: {
  src: string;
  alt?: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-[#eee] ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

const tan =
  "inline-flex min-h-11 items-center justify-center bg-[#b8865b] px-6 py-3 text-[0.6875rem] font-medium uppercase tracking-wider !text-white transition-opacity hover:opacity-90";

export function ExteriorRendering() {
  const caseStudies = PROJECTS.filter((project) => project.images.length > 0).slice(0, 4);

  return (
    <article style={PAGE_VARS} className="isolate">
      {/* 1 — Hero */}
      <header className="relative isolate flex min-h-[34rem] items-center justify-center overflow-hidden bg-[#222] lg:min-h-[42rem]">
        <Image src={IMG.hero} alt="" fill priority quality={90} sizes="100vw" className="-z-20 object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/45" />
        <nav
          aria-label="Breadcrumb"
          className="absolute left-0 top-6 w-full px-4 text-[0.6875rem] text-white/90 sm:px-6 lg:px-8"
        >
          <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li aria-hidden="true">»</li>
            <li><Link href="/services" className="hover:underline">Services</Link></li>
            <li aria-hidden="true">»</li>
            <li aria-current="page" className="font-semibold text-white">3D Exterior Rendering Services</li>
          </ol>
        </nav>
        <div className="px-4 py-24 text-center">
          <h1 className="font-heading text-4xl font-bold !text-white sm:text-5xl">3D Exterior Rendering</h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm font-semibold !text-white sm:text-base">
            High-end imagery for residential, commercial, hospitality and mixed-use projects.
            Quick start, clear delivery dates agreed upfront.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/quote"
              className="inline-flex min-h-11 items-center justify-center bg-white px-6 py-3 text-[0.6875rem] font-medium uppercase tracking-wider !text-[#b8865b] transition-opacity hover:opacity-90"
            >
              See our pricing
            </Link>
            <Link href="/contact" className={tan}>
              Get your free consultation
            </Link>
          </div>
        </div>
      </header>

      {/* 3 — What it is used for */}
      <section className="bg-white pb-14 sm:pb-20">
        <H2>What 3D Exterior Rendering Is Used For</H2>
        <Lead>
          3D exterior rendering turns design drawings into photorealistic CGI images of a building
          before it exists. Designers bring it into design reviews, developers use it to sell units
          off-plan, builders rely on it for investor presentations, and marketing teams use it to make
          listings actually stop people mid-scroll. It is one of the core{" "}
          <Link href="/services/3d-visualisation" className="underline underline-offset-2">
            3D visualisation services
          </Link>{" "}
          we deliver. Site context, materials, lighting: all there, all convincing.
        </Lead>
        <ul className="mx-auto mt-10 grid max-w-5xl gap-8 px-4 sm:px-6 md:grid-cols-3">
          {USES.map((use) => (
            <li key={use.title}>
              <Pic src={use.img} alt={use.title} className="aspect-[3/2]" />
              <h3 className="mt-4 font-heading text-base font-bold">{use.title}</h3>
              <p className="mt-2 text-xs italic leading-relaxed text-[#444]">{use.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 4 — Project types */}
      <section className="bg-white pb-14 sm:pb-20">
        <H2>Exterior Visualisation for Different Project Types</H2>
        <Lead>
          3D rendering brings designs into their real-world context. From private homes and residential
          complexes to commercial and public buildings, it illustrates scale, materials and surroundings
          with clarity. This level of detail allows stakeholders to evaluate projects confidently and make
          informed decisions. We also render institutional buildings, infrastructure, public spaces and
          industrial facilities.
        </Lead>
        <ul className="mx-auto mt-10 grid max-w-5xl gap-x-6 gap-y-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {TYPES.map((type) => (
            <li key={type.title} className="text-center">
              <Pic src={type.img} alt={type.title} className="aspect-[3/2]" />
              <h3 className="mt-4 font-heading text-base font-bold">{type.title}</h3>
              <p className="mt-2 text-[0.8125rem] leading-relaxed">{type.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 5 — Dark CTA band */}
      <section className="bg-[#3a3a3a] py-14 text-center sm:py-20">
        <h2 className="font-heading text-3xl font-bold !text-white sm:text-4xl">Starting a CGI project?</h2>
        <p className="mt-6 text-sm !text-white">See the full range of CGI solutions and their costs.</p>
        <Link href="/quote" className={`${tan} mt-8`}>
          See 3D rendering prices
        </Link>
      </section>

      {/* 6 — Views */}
      <section className="bg-white py-14 sm:py-20">
        <H2>Choose the Views Your Project Needs</H2>
        <Lead>
          One development, three views, three different jobs. For a townhouse scheme, the client sent
          drawings and a finish scheme for each building. We delivered a set of exterior views, each
          answering a different buyer question.
        </Lead>
        <ul className="mx-auto mt-10 grid max-w-5xl gap-8 px-4 sm:px-6 md:grid-cols-3">
          {VIEWS.map((view) => (
            <li key={view.title}>
              <Pic src={view.img} alt={view.title} className="aspect-[4/3]" />
              <h3 className="mt-4 font-heading text-sm font-bold">{view.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#444]">{view.text}</p>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-10 max-w-3xl px-4 text-center text-xs text-[#444] sm:px-6">
          Other views we often add to a set: a courtyard or amenities view to show shared spaces, and a
          dusk version of an approved view for extra marketing material.{" "}
          <Link href="/projects" className="underline underline-offset-2">
            See the full case studies
          </Link>
          .
        </p>
      </section>

      {/* 7 — Real context */}
      <section className="bg-white pb-14 sm:pb-20">
        <H2>Renderings That Place Projects in Real Context</H2>
        <Lead>
          Exterior renderings present your project in its real context. We visualise{" "}
          <strong>site surroundings, landscape and urban fabric</strong> to show how the building
          integrates into its environment. Every detail, from adjacent structures to greenery, adds
          realism and helps communicate the full vision of the development.
        </Lead>
        <div className="mx-auto mt-12 max-w-6xl space-y-14 px-4 sm:px-6 lg:px-8">
          {CONTEXT.map((block, index) => (
            <div
              key={block.title}
              className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]"
            >
              <Pic
                src={block.img}
                alt={block.title}
                sizes="(min-width: 768px) 55vw, 100vw"
                className={`aspect-[3/2] ${index === 2 ? "md:order-2" : ""}`}
              />
              <div className={index === 2 ? "md:order-1" : ""}>
                {index !== 1 && (
                  <h3 className="mb-3 font-heading text-lg font-bold leading-snug">{block.title}</h3>
                )}
                <p className="text-xs leading-relaxed text-[#444]">{block.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8 — Production process */}
      <section className="bg-white pb-14 sm:pb-20">
        <H2>Our Exterior Rendering Production Process</H2>
        <ol className="mx-auto mt-12 grid max-w-6xl gap-10 px-4 text-center sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {PROCESS.map((step) => (
            <li key={step.title}>
              <h3 className="font-heading text-lg font-bold leading-snug">{step.title}</h3>
              <p className="mt-4 text-xs italic leading-relaxed text-[#444]">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 9 — Brief (dark band with form) */}
      <section className="bg-[#3a3a3a] py-14 sm:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold !text-white sm:text-[2rem]">
              What does a brief include?
            </h2>
            <p className="mt-4 text-[0.8125rem] leading-relaxed !text-white/85">
              To start an exterior rendering project, send the drawings or 3D model, the views you
              need, the materials and finishes, site photographs and references, and the deadline.
              That is enough for an accurate quote.
            </p>
          </div>
          <PlanContactForm subject="Exterior rendering brief" compact submitLabel="Get the brief" />
        </div>
      </section>

      {/* 10 — Gallery */}
      <section className="bg-white py-14 sm:py-20">
        <H2 className="mb-10">Photorealistic Exterior Renderings That Tell a Story</H2>
        <ExteriorGallery images={GALLERY} />
      </section>

      {/* 11 — Pricing */}
      <section className="bg-white pb-14 sm:pb-20">
        <H2>Pricing for Exterior Rendering Services</H2>
        <div className="mx-auto mt-12 grid max-w-5xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div className="space-y-4 text-xs leading-relaxed text-[#444]">
            <p>
              The price depends on the <strong>scope</strong> and <strong>level of detail</strong>.
              Complex building design, detailed landscapes and high-end lighting increase production time.
            </p>
            <p>
              Key pricing factors also include <strong>image resolution</strong>,{" "}
              <strong>the number of views</strong>, and <strong>the overall complexity of the scene</strong>.
              Larger buildings, rich environments and advanced materials require more work to model and
              refine.
            </p>
            <p>
              Another factor is <strong>the number of revisions</strong> and{" "}
              <strong>the delivery timeline</strong>. Tight deadlines and multiple feedback rounds
              typically add to the final price.
            </p>
          </div>
          <Pic src={IMG.e8} alt="Exterior render of a residential building" className="aspect-[3/4]" />
        </div>
      </section>

      {/* 12 — Dark price band */}
      <section className="bg-[#3a3a3a] py-14 sm:py-16">
        <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-xl font-bold leading-snug !text-white sm:text-2xl">
              Want to learn how much your project costs? See how we evaluate 3D rendering projects
            </h2>
            <Link href="/quote" className={`${tan} mt-6`}>
              See our pricing
            </Link>
          </div>
          <Pic src={IMG.hero} alt="" className="aspect-[16/9]" />
        </div>
      </section>

      {/* 13 — Why choose us */}
      <section className="bg-white py-14 sm:py-20">
        <H2>Why Clients Choose Us for Exterior Renderings</H2>
        <Lead>
          Clients choose us for our experience, project portfolio and consistent quality. Advanced
          rendering tools and realistic materials ensure accurate visual results, while experienced 3D
          artists bring design knowledge and attention to detail. A structured production workflow,
          supported by dedicated project managers, keeps communication clear and timelines predictable.
        </Lead>
        <ul className="mx-auto mt-12 grid max-w-6xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {caseStudies.map((project) => (
            <li key={project.slug}>
              <Link href={`/projects/${project.slug}`} className="group block">
                <Pic src={project.images[0]} alt={`${project.title} — ${project.location}`} className="aspect-[4/3]" />
                <h3 className="mt-4 font-heading text-base font-bold leading-snug group-hover:underline">
                  {project.title}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 14 — FAQ */}
      <section className="bg-white pb-14 sm:pb-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:px-8">
          <h2 className="font-heading text-[2rem] font-bold leading-tight sm:text-[2.5rem]">
            Frequently asked questions
          </h2>
          <div>
            {FAQS.map(([question, answer]) => (
              <details key={question} className="group border-b border-[#e6e6e6] py-3">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-[0.8125rem] font-semibold [&::-webkit-details-marker]:hidden">
                  {question}
                  <Plus
                    className="h-4 w-4 shrink-0 text-[#b8865b] transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-2 pt-1 text-xs leading-relaxed text-[#5b5b5b]">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 15 — Contact */}
      <section className="bg-white pb-16 sm:pb-24">
        <div className="mx-auto grid max-w-5xl overflow-hidden bg-[#f1f1f1] md:grid-cols-[1fr_1.1fr]">
          <Pic src={IMG.e2} alt="" className="min-h-64" sizes="(min-width: 768px) 40vw, 100vw" />
          <div className="p-6 sm:p-10">
            <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">Contact Us</h2>
            <p className="mx-auto mt-4 max-w-sm text-center text-xs leading-relaxed text-[#444]">
              Have a project you would like to discuss? Wonder what 3D rendering solution will suit you
              best? Have a question on how we work? Leave a message here and we will get in touch.
            </p>
            <div className="mt-6">
              <PlanContactForm subject="Exterior rendering enquiry" compact submitLabel="Submit form" />
            </div>
            <p className="mt-4 text-center text-[0.6875rem] text-[#5b5b5b]">
              Or call{" "}
              <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`} className="underline">
                {CONTACT_INFO.phone}
              </a>
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
