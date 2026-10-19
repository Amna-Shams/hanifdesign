import { BadgeCheck, Clock, RefreshCw } from "lucide-react";
import { PlanLayout, type PlanContent } from "./PlanLayout";

/**
 * Drawings service page content, on the shared tabbed layout. Image paths are
 * placeholders from `public/` — replace them with real drawing sheets and the
 * matching site photographs or surveys.
 */
const CONTENT: PlanContent = {
  hero: {
    title: "Planning & Technical Drawing Services",
    subtitle: "Accurate, Planning-Ready Drawings for Homes, Extensions and Developments",
    image: "/drawings-hero.webp",
  },
  ways: {
    title: "6 Ways Our Drawings Help Your Project Move Faster",
    sub: "From the first survey to the final construction set, you get everything you need in one place",
    perks: [
      { icon: Clock, title: "Clear Delivery Dates", text: "We agree a delivery date for each stage in the quote and plan the work around it." },
      { icon: RefreshCw, title: "2 Rounds of Free Revisions", text: "We will amend the drawings for free twice." },
      { icon: BadgeCheck, title: "Checked Before Issue", text: "Every set is checked against the survey and the brief before it leaves our studio." },
    ],
  },
  tabs: {
    ariaLabel: "Drawing services",
    defaultId: "planning-drawings",
    items: [
      { id: "planning-drawings", label: "Planning Drawings", icon: "grid", kind: "slider", title: "Planning Drawings", text: "Scaled plans, elevations and sections prepared for a planning application, drawn to the format the council expects.", image: "/rear-home-extension-edgbaston-2.webp", alt: "Site photograph beside the planning drawing for the same project" },
      { id: "building-regulations", label: "Building Regulations Drawings", icon: "hammer", kind: "slider", title: "Building Regulations Drawings", text: "Construction details covering structure, insulation, fire safety and ventilation, ready for building control.", image: "/spacious-loft-conversion-harborne-2.webp", alt: "Construction detail drawing beside the finished work" },
      { id: "technical-drawings", label: "Technical Drawings", icon: "palette", kind: "slider", title: "Technical Drawings", text: "Coordinated construction information that builders can price and build from with confidence.", image: "/design drawings.webp", alt: "Technical drawing sheet beside the building it describes" },
      { id: "measured-survey", label: "Measured Survey", icon: "house", kind: "slider", title: "Measured Building Survey", text: "An accurate record of the existing building, which becomes the base for every drawing that follows.", image: "/two-storey-side-extension-four-oaks-1.webp", alt: "Building photograph beside its measured survey" },
      { id: "as-built", label: "As-Built Drawings", icon: "sofa", kind: "slider", title: "As-Built Drawings", text: "Drawings that record what was actually built, for handover, sale or future alterations.", image: "/commercial-unit-selly-oak-1.webp", alt: "Completed building beside its as-built drawing" },
      { id: "floor-plans-elevations", label: "Floor Plans & Elevations", icon: "rotate", kind: "plan", title: "Floor Plans and Elevations", text: "Existing and proposed floor plans and elevations that show exactly what is changing and why.", image: "/hmo-development-selly-oak-1.webp", alt: "Coloured floor plan of a home" },
    ],
  },
  solutions: {
    title: "Drawings That Keep Your Application on Track",
    sub: "We prepare clear, consistent drawing sets that help officers and builders understand your project the first time they read it. Need proof? Take a look at our work.",
    images: [
      "/rear-home-extension-edgbaston-2.webp",
      "/spacious-loft-conversion-harborne-2.webp",
      "/hmo-development-selly-oak-1.webp",
    ],
    cta: "Portfolio",
    href: "/projects",
  },
  reasons: {
    title: "We Take Technical Drawings to the Next Level",
    sub: "Wonder how? Here are 6 reasons our drawing sets help projects get approved and built",
    items: [
      ["1. Surveyed, Not Assumed", "Every set starts from a measured survey, so dimensions are real and the drawings match the building on site."],
      ["2. Designers in the Studio", "Our design team prepares the drawings, so the design intent carries through from the first sketch to the construction set."],
      ["3. Responsive Support", "Deadlines matter on any project. We reply quickly and agree delivery dates up front, and you can ask for changes at any point."],
      ["4. Consistent Standards", "Line weights, scales, annotations and layouts follow one standard across the set, so it reads clearly to the council and the contractor."],
      ["5. Built for Planning and Build", "Planning drawings and building regulations drawings are prepared together, so there is no need to redraw the project between stages."],
      ["6. Coordinated Information", "Plans, elevations, sections and details are cross-checked against each other, so what one sheet says, the next one agrees with."],
    ],
    images: [
      "/hmo-development-selly-oak-1.webp",
      "/rear-home-extension-edgbaston-2.webp",
      "/design drawings.webp",
      "/spacious-loft-conversion-harborne-2.webp",
      "/feasibility layouts.webp",
      "/planning application.webp",
    ],
  },
  workflow: {
    title: "Workflow",
    steps: [
      { title: "1. Set the task", text: "Starting a project is simple. Tell us about the property and what you want to achieve, and we are ready to go.", list: ["send us your plans or photos", "tell us what you want to build", "agree the scope and quote"], image: "/garage-conversion-kings-heath-1.webp" },
      { title: "2. Communicate", text: "Talk to the team throughout and review each stage of the drawings before they are finalised.", list: ["talk to your project manager", "add corrections", "approve each stage"], image: "/drawings-workflow-2.webp" },
      { title: "3. Use results", text: "Receive a finished, organised drawing set that you can use straight away for planning, building control and tender.", list: ["for planning applications", "for building control", "for builders to price"], image: "/two-storey-side-extension-four-oaks-1.webp" },
    ],
  },
  impressed: {
    title: "Impressed? And That’s Far From All.",
    sub: "By working with us, you automatically get:",
    items: [
      { lead: "Organised PDF sets", rest: "issued in a clear drawing schedule, with a clean revision history" },
      { lead: "2 free rounds of revisions", tan: true, rest: "— you can come back twice and ask for adjustments to any sheet" },
      { lead: "CAD and BIM-ready files", tan: true, rest: "available on request, so your wider team can work from the same drawings" },
    ],
  },
  faq: {
    title: "Drawings FAQ",
    sub: "Everything clients usually ask us about planning drawings, building regulations drawings and technical drawings, collected in one place.",
    items: [
      ["How much do drawings cost?", "The price depends on the size of the project and the drawings required. Send us the details and we will give you a fixed quote."],
      ["What is the difference between planning and building regulations drawings?", "Planning drawings show the council what is proposed and how it looks. Building regulations drawings show the builder and building control how it will be constructed, with the technical detail."],
      ["How fast will I get the drawings?", "We agree a delivery date for each stage in the quote. Smaller projects are quick, and larger schemes are phased."],
      ["Do you carry out the survey?", "Yes. We can carry out a measured building survey or a topographical survey of your site, and use it as the base for the drawings."],
      ["What do I need to send to start?", "Any existing plans, photographs and a short description of what you want to do. If you have no plans, we can survey the property."],
      ["Do you produce as-built drawings?", "Yes. We can record a completed building or an existing property, for handover, sale or future alterations."],
      ["Can you amend drawings someone else produced?", "Yes, if we can have the original files or a clear set of PDFs. We will check them against the survey and advise on what needs redrawing."],
      ["Do you provide 3D visuals as well?", "Yes. We can add 3D visualisation and rendering to help the council, neighbours and clients understand the proposal."],
    ],
  },
  contactSubject: "Drawings enquiry",
};

export function Drawings() {
  return <PlanLayout content={CONTENT} />;
}
