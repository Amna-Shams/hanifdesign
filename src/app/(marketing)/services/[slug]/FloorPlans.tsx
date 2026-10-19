import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { PROJECTS } from "@/lib/projects";

/**
 * 3D Floor Plans service page.
 *
 * Unlike the rest of the site this page is deliberately light: white sections,
 * near-black text, a tan accent and one dark band, as in the reference. The
 * site's colour tokens are re-pointed on the wrapper below rather than
 * restyling every element, so `text-primary`, `text-secondary` and the global
 * heading colour all resolve to the page palette regardless of the theme.
 *
 * Image slots are collected in IMG so they can be swapped for real floor-plan
 * renders — nothing on this page is a stand-in for work we have not done.
 */
const IMG = {
  hero: "/floorplan-hero.webp",
  wide: "/hmo-development-selly-oak-1.webp",
  eyeCatching: "/two-storey-side-extension-four-oaks-2.webp",
  styled: "/interior-vis-warm-modern.webp",
  informative: "/rear-home-extension-edgbaston-2.webp",
  distinct: "/hmo-development-selly-oak-1.webp",
  strip: [
    "/floorplan-hero.webp",
    "/hmo-development-selly-oak-1.webp",
    "/rear-home-extension-edgbaston-2.webp",
  ],
} as const;

const TAN = "#b8865b";

const PAGE_VARS = {
  "--background": "#ffffff",
  "--text-primary": "#1b1b1b",
  "--text-secondary": "#2e2e2e",
  "--text-muted": "#5b5b5b",
  "--brand-gold": TAN,
  "--on-accent": "#ffffff",
  "--border-subtle": "rgba(0,0,0,0.12)",
  "--surface-elevated": "#ffffff",
  "--surface-translucent": "#ffffff",
  backgroundColor: "#ffffff",
  color: "#1b1b1b",
} as CSSProperties;

const STATS = [
  { value: "30+", label: "Years of Experience" },
  { value: "500+", label: "Projects Delivered" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "Birmingham", label: "Studio Location" },
] as const;

const AUDIENCES = ["Developers", "Estate Agents", "Landlords", "Homeowners", "Design Studios"] as const;

const INTRO_COLUMNS = [
  {
    title: "Realistic 3D Floor Plan Renders",
    text: "Unlike flat 2D drawings, 3D floor plans show a layout the way buyers read it, so they see at once whether the rooms suit them. When the whole lot matters more than one interior, a rendered site plan shows the full context.",
  },
  {
    title: "3D Floor Plans Buyers Read at a Glance",
    text: "Three-dimensional floor plans make it much easier for viewers to understand the dimensions of every room. Showing the furnishings as well gives people design ideas that will help them see the property's potential.",
  },
  {
    title: "A Consistent 3D Floor Plan Style for Your Listings",
    text: "3D floor plans instantly catch the attention of prospects and make them spend more time on listings. We can also develop a distinct visual style that sets your listings and adverts apart from the competition.",
  },
] as const;

const TYPES = [
  ["Top-down 3D floor plans.", "A clear, straight-down view of the layout that shows room sizes and how spaces connect."],
  ["Angle-view renders.", "The same plan seen at an angle, with walls, furniture and finishes that give a stronger sense of space."],
  ["Dollhouse renders.", "A cutaway of the whole home or building that shows several levels and the surroundings in one image."],
  ["Furnished or unfurnished.", "Staged in the interior style you choose, or clean and empty for technical presentations."],
  ["Full sets for developments.", "Every unit type in a building rendered in one consistent style, so buyers can compare layouts side by side."],
] as const;

const BENEFITS = [
  {
    title: "Eye-Catching Marketing Visuals",
    text: "With 3D floor plans, your adverts and social media posts really stand out from the crowd, generating interest among prospects.",
    img: IMG.eyeCatching,
  },
  {
    title: "Furnished 3D Floor Plans in Any Style",
    text: "3D visualisation lets you show your floor plans virtually staged in a great variety of styles. You can pick products and materials that will appeal specifically to your target audience.",
    img: IMG.styled,
  },
  {
    title: "Informative Listings",
    text: "This type of 3D rendering gives viewers crucial information about a property's dimensions and layout in a way that is easy to understand.",
    img: IMG.informative,
  },
  {
    title: "Distinct 3D Floor Plans for Every Unit Type",
    text: "When choosing between several units within the same building, prospects might find it difficult to tell them apart. You can easily help them by giving each floor plan its own distinct look.",
    img: IMG.distinct,
  },
] as const;

const PROCESS = [
  "Send us your requirements, the drawings and your style references. A CAD file works best if you have one, but a PDF, a scan or even a hand sketch is enough to start. Tell us which levels you need and whether the rooms should be furnished.",
  "Check the intermediate results on the image, so nothing gets lost in email threads. Two rounds of revisions are included in the price, and we agree the corrections before the final render starts.",
  "You get the finished 3D floor plans in high resolution, ready for listings, brochures, presentations and adverts. The same files work for print and for the web, so one set covers every marketing channel you use.",
] as const;

const BRIEF_POINTS = [
  "Drawings: CAD, PDF, scans or hand sketches",
  "Levels and units to be rendered",
  "Furnished or unfurnished, and the style you want",
  "Material and finish references, if you have them",
  "Where the images will be used: print, web, or both",
] as const;

const SAVINGS = [
  ["Turnaround.", "Agreed in the quote. Sets for a whole development are produced in parallel."],
  ["Bulk projects.", "Unit series and repeat orders are priced as a set, so a development costs less than the same plans ordered one at a time."],
  ["Furniture at no extra cost.", "We use our own library of ready 3D models for most furnishing needs."],
  ["Revisions.", "Two revision rounds are included."],
] as const;

const FAQS = [
  ["What is a 3D floor plan?", "A 3D floor plan is a computer-generated image that shows a property layout in a realistic way. These visuals can be top-down or from an angle. In most cases, floor plan renders show virtually staged rooms."],
  ["Why should I use 3D floor plan rendering services?", "If you want to make your listings and marketing materials more eye-catching and informative, 3D floor plan visuals attract prospects' attention and give a comprehensive understanding of a property's layout and dimensions."],
  ["How accurate are 3D floor plans in representing actual dimensions?", "We build every plan from your drawings, so room sizes and proportions follow the measurements you give us. If anything in the drawings is unclear, we ask before we model it."],
  ["How long does it take to create a 3D floor plan design?", "The time depends on the number of plans, their size and the level of detail. We agree the schedule in the quote, and sets for whole developments are produced in parallel."],
  ["How can 3D floor plans help in pre-selling a property?", "Buyers can understand a layout before anything is built. Furnished 3D plans make it easier to picture living in the space, which helps marketing and early sales."],
  ["How much does a 3D floor plan cost?", "The price depends on the size of the plan, the level of furnishing and the number of units. Send us your drawings and we will give you a fixed quote."],
  ["What is the difference between a 2D and a 3D floor plan?", "A 2D floor plan is a flat, top-down line drawing. A 3D floor plan adds depth, furniture and finishes, so people who do not read technical drawings can still understand the layout."],
  ["What types of properties do you make 3D floor plans for?", "Houses, flats, whole apartment buildings, offices, shops and mixed-use schemes, from a single dwelling to a full development."],
  ["What do I need to send to get a 3D floor plan?", "Your drawings, in any format, and any style references. If you do not have drawings yet, tell us what exists and we will advise on the best starting point."],
  ["What do I get at the end, and in what format?", "Finished high-resolution images, ready for print and web. We can supply extra formats such as vertical crops for social media on request."],
  ["Who owns the rights to the finished 3D floor plans?", "Once the project is complete and paid for, you can use the finished images for your own marketing and presentations. Any special usage terms are agreed in the quote."],
] as const;

const RELATED = [
  { title: "Interior Visualisation", href: "/services/interior-visualisation", img: "/two-storey-side-extension-four-oaks-2.webp" },
  { title: "3D Visualisation", href: "/services/3d-visualisation", img: "/3d.webp" },
  { title: "Feasibility Layouts", href: "/services/feasibility-layouts", img: "/feasibility layouts.webp" },
] as const;

function Pic({
  src,
  alt,
  className = "",
  sizes,
  fit = "cover",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  fit?: "cover" | "contain";
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-[#f1efec] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={fit === "contain" ? "object-contain" : "object-cover"}
      />
    </div>
  );
}

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
    <p className="mx-auto mt-4 max-w-2xl text-center text-[0.8125rem] leading-relaxed sm:text-sm">
      {children}
    </p>
  );
}

const btnOutline =
  "inline-flex min-h-11 items-center justify-center border px-6 py-3 text-[0.6875rem] font-medium uppercase tracking-wider transition-colors";

export function FloorPlans() {
  const caseStudies = PROJECTS.filter((project) => project.images.length > 0).slice(0, 3);

  return (
    <article style={PAGE_VARS} className="isolate">
      {/* 1 — Hero */}
      <header className="bg-white pb-12 pt-6 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8 text-[0.6875rem] text-[#8a8a8a]">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li aria-hidden="true">»</li>
              <li><Link href="/services" className="hover:underline">Services</Link></li>
              <li aria-hidden="true">»</li>
              <li aria-current="page" className="font-semibold text-[#1b1b1b]">3D Floor Plan Rendering Services</li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <Pic
              src={IMG.hero}
              alt="Exploded 3D render of a house showing each floor in plan"
              sizes="(min-width: 1024px) 55vw, 100vw"
              fit="contain"
              priority
              className="aspect-square !bg-white"
            />
            <div>
              <h1 className="font-heading text-[2.25rem] font-bold leading-[1.15] sm:text-[2.6rem]">
                3D Floor Plan Rendering Services
              </h1>
              <p className="mt-6 text-[0.8125rem] leading-relaxed sm:text-sm">
                Photorealistic 3D floor plan rendering services for property developers, estate
                agents and homeowners. We turn your 2D drawings into detailed top-view, angle-view
                and dollhouse renders. Floor plans are one of the{" "}
                <Link href="/services/3d-visualisation" className="underline underline-offset-2">
                  3D visualisation services
                </Link>{" "}
                available from a single team.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/quote"
                  className={`${btnOutline} border-[#b8865b] text-[#b8865b] hover:bg-[#b8865b] hover:text-white`}
                >
                  See our pricing
                </Link>
                <Link
                  href="/contact"
                  className={`${btnOutline} border-[#b8865b] bg-[#b8865b] !text-white hover:opacity-90`}
                >
                  Get your free consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2 — Stats */}
      <section aria-label="At a glance" className="bg-white py-12 sm:py-16">
        <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 text-center sm:px-6 lg:grid-cols-4">
          {STATS.map((stat) => (
            <li key={stat.label}>
              <p className="font-heading text-4xl font-bold sm:text-5xl">{stat.value}</p>
              <p className="mt-3 text-[0.8125rem] text-[#5b5b5b]">{stat.label}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 3 — Dark band: audiences */}
      <section className="bg-[#3a3a3a] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-xl font-bold !text-white sm:text-[1.75rem]">
            3D Floor Plans Trusted by Industry Leaders
          </h2>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {AUDIENCES.map((name) => (
              <li
                key={name}
                className="text-sm font-semibold uppercase tracking-[0.2em] !text-white/80"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 — Intro columns */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {INTRO_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="font-heading text-base font-bold leading-snug sm:text-[1.0625rem]">
                {column.title}
              </h3>
              <p className="mt-3 text-[0.8125rem] leading-relaxed">{column.text}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-14 max-w-5xl px-4 sm:px-6">
          <Pic
            src={IMG.wide}
            alt="Coloured floor plan laying out kitchen, dining, lounge, bedrooms and bathrooms"
            sizes="(min-width: 1024px) 960px, 100vw"
            fit="contain"
            className="aspect-[16/9]"
          />
        </div>
      </section>

      {/* 5 — Types */}
      <section className="bg-white pb-14 sm:pb-20">
        <H2>Types of 3D Floor Plans We Render</H2>
        <div className="mx-auto mt-8 max-w-3xl px-4 sm:px-6">
          <ul className="list-disc space-y-2 pl-5 text-[0.8125rem] leading-relaxed marker:text-[#1b1b1b]">
            {TYPES.map(([lead, rest]) => (
              <li key={lead}>
                <strong>{lead}</strong> {rest}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 — Benefits */}
      <section className="bg-white pb-14 sm:pb-20">
        <H2>Benefits of Our 3D Floor Plan Rendering Services</H2>
        <Lead>The use of floor plan renders broadens your marketing possibilities, allowing you to achieve greater success in your presale campaigns.</Lead>
        <ul className="mx-auto mt-12 grid max-w-6xl gap-x-12 gap-y-14 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {BENEFITS.map((benefit) => (
            <li key={benefit.title} className="text-center">
              <Pic
                src={benefit.img}
                alt={benefit.title}
                sizes="(min-width: 768px) 45vw, 100vw"
                fit="contain"
                className="mx-auto mb-6 aspect-[4/3] w-full"
              />
              <h3 className="font-heading text-lg font-bold">{benefit.title}</h3>
              <p className="mx-auto mt-2 max-w-md text-[0.8125rem] leading-relaxed">{benefit.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 7 — Close the deal */}
      <section className="bg-white pb-14 sm:pb-20">
        <H2>3D Floor Plans That Close the Deal</H2>
        <Lead>A well-made 3D floor plan does the explaining so you do not have to. Clients see the layout, get the space and move forward faster. These are built to work in proposals, listings and presentations.</Lead>
        <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-3 gap-4 px-4 sm:px-6">
          {IMG.strip.map((src) => (
            <li key={src}>
              <Pic src={src} alt="3D floor plan example" sizes="33vw" fit="contain" className="aspect-square" />
            </li>
          ))}
        </ul>
        <ol className="mx-auto mt-14 grid max-w-5xl gap-8 px-4 text-[0.8125rem] leading-relaxed sm:px-6 md:grid-cols-3">
          {PROCESS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      {/* 8 — Brief (dark band) */}
      <section className="bg-[#3a3a3a] py-14 sm:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold !text-white sm:text-[2rem]">
              What should be in the brief?
            </h2>
            <p className="mt-4 text-[0.8125rem] leading-relaxed !text-white/85">
              To get a 3D floor plan project started, send us a set of materials such as
              drawings, style references and material specifications. These are the points that
              help us quote accurately and start quickly.
            </p>
          </div>
          <div>
            <ul className="space-y-2 text-[0.8125rem] !text-white/90">
              {BRIEF_POINTS.map((point) => (
                <li key={point} className="flex gap-2">
                  <span aria-hidden="true" className="text-[#d8a878]">•</span>
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href="/quote"
              className="mt-6 inline-flex min-h-11 w-full items-center justify-center bg-[#b8865b] px-6 py-3 text-[0.75rem] font-medium uppercase tracking-wider !text-white transition-opacity hover:opacity-90"
            >
              Send your brief
            </Link>
          </div>
        </div>
      </section>

      {/* 9 — Cost saving */}
      <section className="bg-white py-14 sm:py-20">
        <H2>Our Cost-Saving Practices in 3D Floor Plan Rendering</H2>
        <Lead>We offer you ways to significantly reduce your project costs. By choosing our studio, you get the best deal on the market.</Lead>
        <div className="mx-auto mt-8 max-w-3xl px-4 sm:px-6">
          <ul className="list-disc space-y-2 pl-5 text-[0.8125rem] leading-relaxed marker:text-[#1b1b1b]">
            {SAVINGS.map(([lead, rest]) => (
              <li key={lead}>
                <strong>{lead}</strong> {rest}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10 — Case studies */}
      <section className="bg-white pb-14 sm:pb-20">
        <H2>3D Floor Plan Rendering Case Studies</H2>
        <ul className="mx-auto mt-10 grid max-w-6xl gap-6 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {caseStudies.map((project) => (
            <li key={project.slug}>
              <Link href={`/projects/${project.slug}`} className="group block">
                <Pic src={project.images[0]} alt={`${project.title} — ${project.location}`} sizes="(min-width: 640px) 33vw, 100vw" className="aspect-[4/3]" />
                <h3 className="mt-4 font-heading text-base font-bold group-hover:underline">
                  {project.title}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 11 — FAQ */}
      <section className="bg-white pb-14 sm:pb-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:px-8">
          <h2 className="font-heading text-[2rem] font-bold leading-tight sm:text-[2.5rem]">
            Frequently Asked Questions
          </h2>
          <div>
            {FAQS.map(([question, answer], index) => (
              <details key={question} open={index < 2} className="group border-b border-[#e6e6e6] py-3">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-[0.8125rem] font-semibold group-open:text-[#b8865b] [&::-webkit-details-marker]:hidden">
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

      {/* 12 — Learn more */}
      <section className="bg-white pb-16 sm:pb-24">
        <H2>Learn More About Our Visualisation Services</H2>
        <ul className="mx-auto mt-10 grid max-w-6xl gap-6 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {RELATED.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="group block">
                <Pic src={item.img} alt="" sizes="(min-width: 640px) 33vw, 100vw" className="aspect-[4/3]" />
                <h3 className="mt-4 flex items-center gap-1 font-heading text-base font-bold group-hover:underline">
                  {item.title}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
