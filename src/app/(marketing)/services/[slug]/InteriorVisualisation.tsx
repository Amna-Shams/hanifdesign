import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Box,
  Clock,
  Layers,
  MessageSquare,
  Plus,
  Repeat,
  Sofa,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROJECTS } from "@/lib/projects";

/**
 * Long-form service page for Interior Visualisation. It does not use the shared
 * ServiceDetail layout: it is a sales page in its own right, so it carries its
 * own sections (hero, proof, comparison, types, styles, workflow, FAQ).
 *
 * Image slots are collected in IMG so they are easy to swap for real renders —
 * a slot with no file falls back to a tinted tile.
 */
const IMG = {
  hero: "/interior-vis-hero.webp",
  mosaicLarge: "/interior-vis-suite.webp",
  mosaicA: "/interior-vis-mosaic-a.webp",
  mosaicB: "/interior-vis-mosaic-b.webp",
  drawing: "/design drawings.webp",
  render: "/interior-vis-render.webp",
  residential: "/interior-vis-residential.webp",
  commercial: "/interior-vis-commercial.webp",
  retail: "/interior-vis-retail.webp",
  hospitality: "/interior-vis-hospitality.webp",
  still: "/interior-vis-still.webp",
  animation: "/interior-vis-animation.webp",
  tour: "/interior-vis-tour.webp",
  cta: "/interior-vis-cta.webp",
} as const;

const PRODUCT_POINTS = [
  ["Exact items.", "Send product links or spec sheets and we model the furniture and fixtures you chose, not look-alikes."],
  ["Custom pieces.", "Bespoke joinery and furniture are modelled from your drawings or reference photos."],
  ["No exact model available.", "We propose the closest match and show it to you before the final render."],
  ["Design still in progress.", "We start with what is confirmed and mark open items, so nothing is guessed silently."],
] as const;

const SPACES = [
  { title: "Residential Design", text: "Clients approve layouts and finishes long before building work starts.", img: IMG.residential },
  { title: "Commercial Design", text: "Investors and tenants see the space working before the lease is signed.", img: IMG.commercial },
  { title: "Retail Design", text: "Brands test layouts and merchandising before the first store is fitted.", img: IMG.retail },
  { title: "Hospitality Design", text: "Hotels, cafés and restaurants are walked through before a single order is placed.", img: IMG.hospitality },
] as const;

const STUDIO_FEATURES = [
  { icon: Layers, title: "Finish and layout options", text: "The same room rendered with alternative materials, colours or furniture layouts, so the client chooses from images instead of samples." },
  { icon: Sofa, title: "Products, modelled to spec", text: "Custom joinery, specified fixtures and branded fabrics are built from your drawings or product links." },
  { icon: MessageSquare, title: "Review in one place", text: "Comments go straight onto the images. Two revision rounds are included in the price." },
  { icon: Clock, title: "Predictable timing", text: "A fixed quote within a working day, work starting the next business day, and an agreed delivery date for the first view." },
] as const;

const TYPES = [
  {
    title: "Still Renderings",
    text: "Still renderings are photorealistic images of interiors. They show colours, textures and lighting with accuracy, making every detail clear. They are the most common form of 3D interior design rendering, ideal for presentations, catalogues and portfolios.",
    img: IMG.still,
  },
  {
    title: "3D Animation",
    text: "A 3D animation is a short cinematic film of an interior. It shows how spaces connect and how people move through them, and it conveys the mood of the interior through light, colour and rhythm. It works well for presentations and marketing content.",
    img: IMG.animation,
  },
  {
    title: "Virtual Tour",
    text: "A 3D virtual tour is a digital walk inside an interior. Viewers move through the rooms at their own pace and can stop to look at the details. This type of interior rendering gives a strong sense of presence.",
    img: IMG.tour,
  },
] as const;

const STYLES = [
  { label: "Classic", img: "/interior-vis-classic.webp" },
  { label: "Warm Modern", img: "/interior-vis-warm-modern.webp" },
  { label: "Contemporary", img: "/interior-vis-contemporary.webp" },
  { label: "Minimalist", img: "/interior-vis-minimalist.webp" },
  { label: "Hotel Suite", img: "/interior-vis-suite.webp" },
  { label: "Sculptural", img: "/interior-vis-sculptural.webp" },
] as const;

const WORKFLOW = [
  ["1. Brief and quote", "Tell us the rooms, the number of views and the deadline. We send a fixed quote and a start date."],
  ["2. Information and references", "Send drawings, plans, photos, sketches, a mood board or a specification list. If there are no drawings yet, we start from what exists."],
  ["3. 3D scene and camera angles", "We build the room in 3D: geometry, furniture and finishes. You approve the camera angles on grey-model previews, when changing them costs nothing."],
  ["4. Materials and lighting", "We add textures, décor and lighting scenarios: daylight, evening, accent lighting. You see draft renders and comment on colours, finishes and mood."],
  ["5. Revisions", "You leave comments on the images and we correct them. Two rounds of revisions are included. Corrections inside the agreed scope are not an extra charge."],
  ["6. Final renders", "You receive final high-resolution images, plus any extra formats you need: vertical crops for social media, 360 views or an animation from the same 3D scene."],
] as const;

const WHY = [
  { icon: BadgeCheck, title: "Accurate to your design", text: "We build every scene from your plans, furniture specifications and material references, so the final images show the interior you designed, not a generic look-alike." },
  { icon: MessageSquare, title: "Clear approvals", text: "Camera angles, materials and lighting are agreed step by step. You comment directly on the images, and two revision rounds are included." },
  { icon: Users, title: "A dedicated team", text: "You work with one named contact and the same team throughout, so decisions are remembered and nothing has to be explained twice." },
  { icon: Repeat, title: "Consistent series", text: "The same team keeps furniture, finishes and lighting identical across every view and every project, and scales up for a whole development or a series of rooms." },
] as const;

const FAQS = [
  ["What is interior visualisation?", "Interior visualisation turns plans, sketches and specifications into photorealistic images or films of a room before it is built or fitted out, so clients can judge layouts, materials and lighting with confidence."],
  ["How is interior visualisation done?", "We build a 3D model of the space from your drawings, add furniture, materials and lighting, agree camera angles with you, then produce draft and final renders. You review at each stage."],
  ["What software is used for 3D interior design rendering services?", "We use industry-standard 3D modelling and rendering software, chosen to suit the project. You do not need to use or own any of it; we deliver finished images, animations or tours."],
  ["What is the difference between 3D rendering and 3D visualisation?", "Rendering is the process of producing the final image from a 3D model. Visualisation is the wider service: modelling the space, setting up materials and lighting, and presenting the result in the form you need."],
  ["Do you work with interior design firms and studios?", "Yes. Many of our clients are designers who send plans, a mood board and a product list so we can show their client the finished room before anything is ordered."],
  ["Do you render commercial interiors, not just homes?", "Yes. We visualise offices, retail units, hospitality spaces and other commercial interiors, as well as residential rooms."],
  ["Who owns the rights to the finished renders?", "Once the project is complete and paid for, you can use the finished images for your own presentations, marketing and portfolio. We agree any special usage terms in the quote."],
  ["Do you guarantee the deadline?", "We agree a delivery date for each stage in the quote and plan the work around it. If your deadline is tight, tell us at the start and we will confirm what is possible."],
] as const;

/** Tinted tile with an image on top when the source file exists. */
function Pic({
  src,
  alt,
  className = "",
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-surface-elevated ${className}`}>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-navy/20 to-gold/10"
      />
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}

function Band({
  children,
  tone = "plain",
  className = "",
  label,
}: {
  children: ReactNode;
  tone?: "plain" | "tint" | "dark";
  className?: string;
  label?: string;
}) {
  const tones = {
    plain: "bg-background",
    tint: "bg-surface-translucent",
    dark: "bg-[#1d2024] light:bg-surface-translucent",
  } as const;
  return (
    <section
      aria-label={label}
      className={`${tones[tone]} py-16 sm:py-20 lg:py-24 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function InteriorVisualisation() {
  const caseStudies = PROJECTS.filter((project) => project.images.length > 0).slice(0, 3);

  return (
    <article>
      {/* 1 — Hero */}
      <header className="relative isolate flex min-h-[34rem] items-end overflow-hidden bg-[#0b0d12] lg:min-h-[40rem]">
        <Image
          src={IMG.hero}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/40 to-black/60"
        />
        <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-32 sm:px-6 lg:px-8 lg:pb-20">
          <nav aria-label="Breadcrumb" className="mb-10 text-xs text-white/80">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">›</li>
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" className="font-semibold text-white">Interior Visualisation</li>
            </ol>
          </nav>
          <h1 className="max-w-3xl !text-white font-heading text-4xl font-bold leading-tight sm:text-5xl">
            3D Interior Visualisation &amp; Interior Rendering Services
          </h1>
          <p className="mt-5 max-w-2xl !text-white/90 text-base leading-relaxed sm:text-lg">
            Photorealistic 3D interior rendering for presentations, design sign-off and marketing,
            across residential, commercial and hospitality spaces. A quick start and clear
            delivery dates agreed upfront.
          </p>
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

      {/* 3 — Industry leaders (dark band with image mosaic) */}
      <Band tone="dark">
        <h2 className="mb-10 text-center font-heading text-2xl font-bold !text-white light:!text-primary sm:text-4xl">
          Interior Visualisation for Industry Leaders
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Pic src={IMG.mosaicLarge} alt="3D interior render of a living and dining space" sizes="(min-width: 1280px) 1200px, 100vw" className="aspect-[16/9] rounded-sm sm:col-span-2" />
          <Pic src={IMG.mosaicA} alt="Finished living room visualised in 3D" sizes="(min-width: 640px) 50vw, 100vw" className="aspect-[4/3] rounded-sm" />
          <Pic src={IMG.mosaicB} alt="Interior layout drawing overlaid on a living space" sizes="(min-width: 640px) 50vw, 100vw" className="aspect-[4/3] rounded-sm" />
        </div>
      </Band>

      {/* 4 — Drawings vs renders */}
      <Band>
        <SectionHeading
          title="Your Design, Accurately Visualised"
          subtitle="The easiest way to judge accuracy is on one real project. We take the designer's drawings, build one 3D model and produce both the dimensioned drawings and the renders from it, so what the client approves is exactly what gets built."
          className="mb-10"
        />
        <div className="grid gap-6 sm:grid-cols-[1fr_1fr]">
          <figure>
            <figcaption className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Drawings</figcaption>
            <Pic src={IMG.drawing} alt="Dimensioned interior drawing" sizes="(min-width: 640px) 50vw, 100vw" className="aspect-[4/3] rounded-sm" />
          </figure>
          <figure>
            <figcaption className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Renders</figcaption>
            <Pic src={IMG.render} alt="3D render produced from the same model" sizes="(min-width: 640px) 50vw, 100vw" className="aspect-[4/3] rounded-sm" />
          </figure>
        </div>

        <div className="mt-12 max-w-3xl">
          <h3 className="mb-4 font-heading text-lg font-semibold text-primary">
            Working with your products
          </h3>
          <ul className="list-disc space-y-2 pl-5 text-sm text-secondary marker:text-gold">
            {PRODUCT_POINTS.map(([lead, rest]) => (
              <li key={lead}>
                <strong className="text-primary">{lead}</strong> {rest}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm">
            <Link href="/projects" className="text-gold underline underline-offset-4 hover:text-primary">
              See the full case studies
            </Link>
          </p>
        </div>
      </Band>

      {/* 5 — Spaces */}
      <Band tone="tint">
        <SectionHeading
          title="Interior Rendering: From Living Rooms to Hotel Lobbies"
          subtitle="We render interiors for designers, developers, homeowners, estate agents and hospitality operators."
          className="mb-10"
        />
        <ul className="grid gap-8 sm:grid-cols-2">
          {SPACES.map((space) => (
            <li key={space.title} className="text-center">
              <Pic src={space.img} alt={`${space.title} visualisation`} sizes="(min-width: 640px) 50vw, 100vw" className="mb-5 aspect-[16/10] rounded-sm" />
              <h3 className="font-heading text-lg font-semibold text-primary">{space.title}</h3>
              <p className="mt-1 text-sm text-secondary">{space.text}</p>
            </li>
          ))}
        </ul>
      </Band>

      {/* 6 — For design studios */}
      <Band>
        <SectionHeading
          title="Interior Design Rendering Services for Design Studios"
          subtitle="Interior designers use our rendering services to show clients the finished room before anything is ordered or built. You send the floor plan, the mood board and the product list. We build the scene with your exact furniture, finishes and lighting, and return photoreal views ready for the client presentation."
          className="mb-10"
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STUDIO_FEATURES.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-sm border border-subtle bg-surface-elevated p-5">
              <Icon className="mb-4 h-6 w-6 text-gold" aria-hidden="true" />
              <h3 className="mb-2 font-heading text-base font-semibold text-primary">{title}</h3>
              <p className="text-sm leading-relaxed text-secondary">{text}</p>
            </li>
          ))}
        </ul>
      </Band>

      {/* 7 — Quote band */}
      <section className="relative isolate overflow-hidden bg-[#1d2024] light:bg-surface-translucent py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <h2 className="font-heading text-2xl font-bold !text-white light:!text-primary sm:text-3xl">
              Want to learn how much your project will cost?
            </h2>
            <div className="mt-6">
              <Button variant="gold" asChild>
                <Link href="/quote">Request a quote</Link>
              </Button>
            </div>
          </div>
          <Pic src={IMG.cta} alt="" sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[16/7] rounded-sm" />
        </div>
      </section>

      {/* 8 — Types */}
      <Band>
        <SectionHeading
          title="Types of 3D Interior Rendering Services"
          subtitle="3D rendering for interior design covers projects both before and under construction. These are the three most popular options."
          className="mb-14"
        />
        <div className="space-y-14">
          {TYPES.map((type, index) => (
            <div
              key={type.title}
              className="grid items-center gap-8 md:grid-cols-2 lg:gap-14"
            >
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <Pic src={type.img} alt={`${type.title} example`} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3] rounded-sm" />
              </div>
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <h3 className="mb-4 font-heading text-2xl font-bold text-primary">{type.title}</h3>
                <p className="leading-relaxed text-secondary">{type.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Band>

      {/* 9 — Styles */}
      <Band tone="tint">
        <SectionHeading
          title="Interior Styles We Visualise"
          subtitle="These are examples, not a menu. Send a reference, a mood board or a photo of a room you like and we will match it."
          className="mb-10"
        />
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {STYLES.map((style) => (
            <li key={style.label} className="relative">
              <Pic src={style.img} alt={`${style.label} interior style`} sizes="(min-width: 1024px) 33vw, 50vw" className="aspect-[4/3] rounded-sm" />
              <span className="absolute bottom-2 left-3 text-sm font-semibold !text-white drop-shadow">
                {style.label}
              </span>
            </li>
          ))}
        </ul>
      </Band>

      {/* 10 — Workflow */}
      <Band>
        <SectionHeading
          title="Interior Rendering Workflow"
          subtitle="Six steps from the first brief to final images. You see the project at every one of them, so nothing goes into a full render before you approve it."
          className="mb-12"
        />
        <ol className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {WORKFLOW.map(([title, text]) => (
            <li key={title}>
              <h3 className="mb-2 font-heading text-lg font-semibold text-primary">{title}</h3>
              <p className="text-sm leading-relaxed text-secondary">{text}</p>
            </li>
          ))}
        </ol>
      </Band>

      {/* 11 — Why choose us */}
      <Band tone="tint">
        <SectionHeading title="Why Choose Us as Your 3D Interior Rendering Company" className="mb-12" />
        <ul className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {WHY.map(({ icon: Icon, title, text }) => (
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

      {/* 12 — Case studies */}
      <Band>
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

      {/* 13 — FAQ */}
      <Band tone="tint">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
              Frequently Asked Questions About Interior Visualisation
            </h2>
            <p className="mt-4 text-secondary">
              Cannot find your answer? <Link href="/contact" className="text-gold underline underline-offset-4">Contact us</Link>.
            </p>
          </div>
          <div className="divide-y divide-[var(--border-subtle)] border-y border-subtle">
            {FAQS.map(([question, answer]) => (
              <details key={question} className="group py-4">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-heading text-base font-semibold text-primary [&::-webkit-details-marker]:hidden">
                  {question}
                  <Plus
                    className="h-4 w-4 shrink-0 text-gold transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <p className="pt-2 text-sm leading-relaxed text-secondary">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Band>

      {/* 14 — Closing CTA */}
      <Band tone="dark">
        <div className="text-center">
          <Box className="mx-auto mb-4 h-8 w-8 text-gold" aria-hidden="true" />
          <h2 className="font-heading text-2xl font-bold !text-white light:!text-primary sm:text-3xl">
            Ready to see your interior before it is built?
          </h2>
          <p className="mx-auto mt-3 max-w-xl !text-white/80 light:!text-secondary">
            Send us your plans and a few references. We will come back with a fixed quote and a start date.
          </p>
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
