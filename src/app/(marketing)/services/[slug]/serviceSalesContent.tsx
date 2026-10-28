import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Clock,
  Compass,
  FileCheck,
  Layers,
  LayoutGrid,
  MessageSquare,
  Repeat,
  Ruler,
  ShieldCheck,
  Sofa,
  Users,
} from "lucide-react";

/**
 * Content for the long-form service pages that share `ServiceSalesPage`.
 *
 * Interior Visualisation and Exterior Rendering keep their own bespoke pages;
 * every other service is described here and rendered by the same layout, so
 * the pages read as one family: hero, image mosaic, comparison, audiences,
 * highlights, quote band, deep-dive rows, workflow, reasons, projects, FAQ
 * and a closing call to action.
 *
 * Wording is deliberately specific to what is delivered and avoids unverifiable
 * claims (project counts, turnaround guarantees); timings and fees are agreed
 * in the quote.
 */

export interface SalesImage {
  src: string;
  alt: string;
}

export interface SalesContent {
  /** Short label used in the breadcrumb. */
  label: string;
  title: string;
  intro: string;
  hero: SalesImage & { position?: string };
  /** Optional plain-language explainer shown straight after the mosaic. */
  /** Which projects to feature (index into PROJECTS), so sibling pages do not show the same trio. */
  projectOffset?: number;
  explainer?: { title: string; paragraphs: readonly string[] };
  mosaic: { title: string; text?: string; large: SalesImage; a: SalesImage; b: SalesImage };
  compare: {
    title: string;
    subtitle: string;
    left: SalesImage & { caption: string };
    right: SalesImage & { caption: string };
    pointsTitle: string;
    points: readonly (readonly [string, string])[];
  };
  audiences: {
    title: string;
    subtitle: string;
    items: readonly { title: string; text: string; img: SalesImage }[];
  };
  highlights: {
    title: string;
    subtitle: string;
    items: readonly { icon: LucideIcon; title: string; text: string }[];
  };
  quote: { title: string; img: SalesImage };
  types: {
    title: string;
    subtitle: string;
    items: readonly { title: string; text: string; img: SalesImage }[];
  };
  workflow: { title: string; subtitle: string; steps: readonly (readonly [string, string])[] };
  why: {
    title: string;
    items: readonly { icon: LucideIcon; title: string; text: string }[];
  };
  faq: { title: string; items: readonly (readonly [string, string])[] };
  closing: { title: string; text: string };
}

const QUOTE_NOTE =
  "Send us your plans and a short brief. We will come back with a clear quote and a start date.";

const CLOSING_TEXT = QUOTE_NOTE;

export const SALES_CONTENT: Record<string, SalesContent> = {
  /* ------------------------------------------------------------------ */
  "3d-visualisation": {
    label: "3D Visualisation",
    projectOffset: 3,
    title: "3D Visualisation & Rendering Services",
    intro:
      "Experts in CGI, 3D visualisation and 3D design for designers, developers and homeowners. We turn plans into photorealistic images that win approvals, sell schemes and settle design decisions before anything is built.",
    hero: {
      src: "/exterior-hero.webp",
      alt: "Photorealistic exterior render of a contemporary home and pool at dusk",
    },
    explainer: {
      title: "What Is 3D Visualisation?",
      paragraphs: [
        "3D visualisation is the process of turning plans, layouts and early design ideas into something you can see and understand in three dimensions. What matters is the outcome: a visual representation that makes complex ideas easier to grasp.",
        "Instead of interpreting plans and schedules, clients, buyers and planning officers can look at a building or room and quickly understand its shape, scale and how it fits together. That removes a lot of guesswork.",
        "It also changes how decisions get made. When everyone is looking at the same image, conversations become more grounded, and disagreements surface earlier, when they are easier to fix.",
      ],
    },
    mosaic: {
      title: "Experts in CGI, 3D Visualisation and 3D Design",
      text: "We produce 3D visualisation, CGI and animation for marketing property, commercial and consumer products, for both interior and exterior designs. Customer service and premium-quality CGI are at the core of what we do.",
      large: { src: "/interior-kitchen-render-wide.webp", alt: "Photorealistic render of a modern kitchen with a fluted oak and marble island" },
      a: { src: "/interior-kitchen-render-island.webp", alt: "Kitchen render looking towards the island and roof lantern" },
      b: { src: "/interior-kitchen-render-aerial.webp", alt: "Aerial render of a marble kitchen island with bar stools" },
    },
    compare: {
      title: "From 2D Plan to 3D Image",
      subtitle:
        "We build photorealistic visuals directly from your plans and specifications. The render always matches what is proposed, because it is modelled from the plans, not drawn freehand.",
      left: { src: "/rear-home-extension-edgbaston-2.webp", alt: "Dimensioned ground floor plan of a family home", caption: "Plans" },
      right: { src: "/3d.webp", alt: "Exploded 3D render of a modern house", caption: "3D image" },
      pointsTitle: "Working from what you have",
      points: [
        ["Basic plans are enough.", "Floor plans, elevations and a specification list are a good starting point. No plan is too rough to start from."],
        ["Materials and textures.", "Surfaces are depicted accurately from your references, not approximated."],
        ["Sketch-stage designs.", "We build from what is confirmed and flag open items, so nothing is guessed silently."],
        ["Investor-ready finish.", "An ordinary 2D plan becomes a polished, computer-generated image that people can understand at a glance."],
      ],
    },
    audiences: {
      title: "3D Visualisation for Every Stage of a Project",
      subtitle: "Planning, sales, design sign-off and marketing all need images. We produce them in one consistent style.",
      items: [
        { title: "Design professionals", text: "Bring your vision to life. Our design knowledge, technical expertise and 3D visualisation skills help you showcase your work to clients and committees.", img: { src: "/feasibility layouts.webp", alt: "Translucent 3D model of a multi-storey building over site plans" } },
        { title: "Developers", text: "Give buyers and funders something concrete to commit to, before ground is broken.", img: { src: "/hmo-development-selly-oak-2.webp", alt: "Rendered house exterior above an exploded view of its floors" } },
        { title: "Interior designers", text: "Present finishes, joinery and layouts as finished rooms, not mood boards.", img: { src: "/interior-kitchen-render-island.webp", alt: "Interior render of a kitchen island" } },
        { title: "Homeowners", text: "See an extension or conversion properly before you spend on it.", img: { src: "/two-storey-side-extension-four-oaks-2.webp", alt: "3D render of a modern home above a cutaway of its interior" } },
      ],
    },
    highlights: {
      title: "CGI, Rendering and 3D Design",
      subtitle: "The visual services we produce from your plans.",
      items: [
        { icon: Sofa, title: "Interior CGI", text: "Kitchens, living spaces, bedrooms and bathrooms rendered to a photographic standard." },
        { icon: Layers, title: "Exterior visuals", text: "Street-level and aerial views that place the scheme in its surroundings." },
        { icon: Compass, title: "Planning visuals", text: "Clear images and photomontage that help officers and neighbours understand a proposal." },
        { icon: BadgeCheck, title: "Property marketing", text: "Images for brochures, listings and off-plan sales, ready before completion." },
      ],
    },
    quote: {
      title: "Ready to talk through your visuals?",
      img: { src: "/interior-kitchen-render-aerial.webp", alt: "" },
    },
    types: {
      title: "Types of 3D Visualisation We Produce",
      subtitle: "Choose the views that suit the job, or ask us to recommend a set.",
      items: [
        { title: "3D Imaging", text: "Photorealistic external and internal CGI for planning applications, design development and marketing. High-quality images for detail, accuracy and impact.", img: { src: "/interior-kitchen-render-wide.webp", alt: "3D imaging example showing a photorealistic kitchen" } },
        { title: "Verified Views", text: "Data-rich images and accurate visual representations prepared to support planning submissions and appeals. We confirm what the council requires before we start, so the images fit the submission.", img: { src: "/exterior-type-single-family.webp", alt: "Verified view of a proposed building in its setting" } },
        { title: "Interior Visualisation", text: "Photorealistic views of rooms before they are built or fitted out, with accurate materials, joinery and lighting so clients can decide with confidence.", img: { src: "/interior-kitchen-render-island.webp", alt: "Interior visualisation example" } },
        { title: "Exterior and Aerial Visualisation", text: "Eye-level and aerial views that show how a building sits in its landscape, helping planning officers, neighbours and buyers read the scheme.", img: { src: "/exterior-use-marketing.webp", alt: "Exterior visualisation example" } },
        { title: "Plan-Based 3D Visualisation", text: "A plan-led approach: we model directly from your plans and specifications, so every image is accurate to the proposal and ready for submissions and sales.", img: { src: "/feasibility layouts.webp", alt: "3D model rising from site plans" } },
      ],
    },
    workflow: {
      title: "3D Visualisation Workflow",
      subtitle: "Six steps from brief to final images, with your approval at the points that matter.",
      steps: [
        ["1. Brief and quote", "Tell us what you need the images for and how many views. We send a clear proposal and quote."],
        ["2. Plans and references", "You send plans, elevations, photos and material references. We confirm what we have and what is missing."],
        ["3. Clay-form model", "We build an accurate, untextured 3D model so layout, proportions and camera angles can be checked before any materials are applied."],
        ["4. Your approval", "You approve the model and views. Changes at this stage are the easiest to make."],
        ["5. Materials, lighting and rendering", "Materials and lighting are applied to every surface, then final rendering begins."],
        ["6. Delivery", "Final images are supplied as high-resolution files for web, print and planning submission."],
      ],
    },
    why: {
      title: "Why Choose Us for 3D Visualisation",
      items: [
        { icon: BadgeCheck, title: "Accurate to the plans", text: "Every image is modelled from your plans, so what you approve is what is proposed." },
        { icon: Ruler, title: "40 years at Director level", text: "With 40 years of professional experience, we understand plans, planning and construction, so renders never show something that could not be built." },
        { icon: MessageSquare, title: "Clear approvals", text: "Angles, materials and lighting are agreed step by step, with no surprises at the end." },
        { icon: Repeat, title: "Consistent style", text: "Interior and exterior views of one scheme come out in a matching style, ready to use together." },
        { icon: Users, title: "Premium-quality CGI", text: "Good customer service and premium-quality CGI sit at the core of what we do." },
        { icon: Layers, title: "Interior and exterior in one place", text: "Property marketing, commercial and consumer products, inside and out, from one team." },
      ],
    },
    faq: {
      title: "Frequently Asked Questions About 3D Visualisation",
      items: [
        ["What is 3D visualisation?", "3D visualisation turns plans and specifications into photorealistic images or films of a building or interior before it is built, so people can judge it properly."],
        ["Can you work from basic 2D plans?", "Yes. Plans, elevations and a specification are enough to start. If anything is unclear we ask before we model it."],
        ["Do you do interiors and exteriors?", "Yes. We produce interior, exterior and aerial views, in a consistent style for the same scheme."],
        ["Can the images be used for planning?", "Yes. Our visuals are produced to be accurate to the plans and are suitable to accompany a submission."],
        ["What do I receive at the end?", "Final high-resolution images for web and print, and any animation or additional views agreed in the quote."],
        ["How is the quote worked out?", "It depends on the number of views, the detail of the scene and the deadline. Send your plans and we will quote."],
      ],
    },
    closing: { title: "Ready to see your project before it is built?", text: CLOSING_TEXT },
  },

  /* ------------------------------------------------------------------ */
  "3d-floor-plans": {
    label: "3D Floor Plans",
    projectOffset: 6,
    title: "3D Floor Plan Rendering Services",
    intro:
      "Top-view, angle-view and dollhouse floor plan renders that buyers read at a glance. Furnished or empty, one unit or a whole development, in a consistent style.",
    hero: {
      src: "/floorplan-hero.webp",
      alt: "Furnished 3D floor plan render of a home",
      position: "object-center",
    },
    mosaic: {
      title: "3D Floor Plans for Property Marketing",
      large: { src: "/hmo-development-selly-oak-1.webp", alt: "Colour floor plan laying out kitchen, dining, lounge and bedrooms" },
      a: { src: "/rear-home-extension-edgbaston-2.webp", alt: "Dimensioned ground floor plan of a family home" },
      b: { src: "/interior-vis-warm-modern.webp", alt: "Furnished living space in a warm modern style" },
    },
    compare: {
      title: "A Layout Buyers Can Understand",
      subtitle:
        "Unlike flat 2D drawings, 3D floor plans show a layout the way buyers read it, so they see at once whether the rooms suit them.",
      left: { src: "/rear-home-extension-edgbaston-2.webp", alt: "2D dimensioned floor plan", caption: "2D plan" },
      right: { src: "/hmo-development-selly-oak-1.webp", alt: "Furnished 3D floor plan", caption: "3D floor plan" },
      pointsTitle: "Floor plan formats",
      points: [
        ["Top-down.", "A clear, straight-down view that shows room sizes and how spaces connect."],
        ["Angle-view.", "The same plan at an angle, with walls, furniture and finishes for a stronger sense of space."],
        ["Dollhouse.", "A cutaway of the whole home or building showing several levels in one image."],
        ["Furnished or unfurnished.", "Staged in the style you choose, or clean and empty for technical presentations."],
      ],
    },
    audiences: {
      title: "Who Uses 3D Floor Plans",
      subtitle: "Anyone who needs a layout to be understood quickly.",
      items: [
        { title: "Developers", text: "Every unit type in one consistent style, so buyers can compare layouts side by side.", img: { src: "/hmo-development-selly-oak-2.webp", alt: "Rendered development exterior" } },
        { title: "Estate agents", text: "Listings that hold attention and explain a property before the viewing.", img: { src: "/new-build-family-home-sutton-coldfield-2.webp", alt: "Before and after view of a plot" } },
        { title: "Landlords", text: "Clear plans for lettings and refurbishment proposals.", img: { src: "/garage-conversion-kings-heath-2.webp", alt: "Converted family home" } },
        { title: "Design studios", text: "Layout options shown to clients as finished plans, not line drawings.", img: { src: "/interior-classic-kitchen-island-angle.webp", alt: "Furnished kitchen and dining area in a classic style" } },
      ],
    },
    highlights: {
      title: "What Makes a Good 3D Floor Plan",
      subtitle: "The details that make plans useful for sales and design.",
      items: [
        { icon: LayoutGrid, title: "Accurate proportions", text: "Rooms and furniture are scaled to the measurements in your drawings." },
        { icon: Sofa, title: "Furnished in any style", text: "Choose furnishings that appeal to your target buyer or tenant." },
        { icon: Layers, title: "Distinct unit types", text: "Give each unit in a block its own look so prospects can tell them apart." },
        { icon: BadgeCheck, title: "Print and web ready", text: "The same files work for brochures, listings, adverts and social media." },
      ],
    },
    quote: {
      title: "Ready to talk through your floor plans?",
      img: { src: "/hmo-development-selly-oak-1.webp", alt: "" },
    },
    types: {
      title: "Why Use 3D Floor Plans",
      subtitle: "Four ways they help a listing or scheme do more.",
      items: [
        { title: "Eye-Catching Marketing Visuals", text: "3D floor plans make adverts and social posts stand out and generate interest among prospects.", img: { src: "/two-storey-side-extension-four-oaks-2.webp", alt: "3D render of a modern home above a cutaway interior" } },
        { title: "Informative Listings", text: "They give viewers the dimensions and layout of a property in a way that is easy to understand.", img: { src: "/rear-home-extension-edgbaston-2.webp", alt: "Dimensioned floor plan" } },
        { title: "Furnished Plans in Any Style", text: "Show floor plans virtually staged in a wide range of styles, with products and materials chosen for your target audience.", img: { src: "/interior-vis-warm-modern.webp", alt: "Furnished interior" } },
      ],
    },
    workflow: {
      title: "3D Floor Plan Workflow",
      subtitle: "Three clear stages, with revisions agreed before the final render.",
      steps: [
        ["1. Send your drawings", "A CAD file works best, but a PDF, a scan or even a hand sketch is enough to start. Tell us which levels you need."],
        ["2. Style and furnishing", "Choose furnished or empty, and share any material or style references."],
        ["3. Layout approved", "We build the plan and you confirm the layout before rendering."],
        ["4. Check the draft", "Review the draft image and send corrections. We agree changes before the final render starts."],
        ["5. Final render", "We produce the finished high-resolution plan."],
        ["6. Delivery", "Files supplied for listings, brochures, presentations and adverts."],
      ],
    },
    why: {
      title: "Why Choose Us for 3D Floor Plans",
      items: [
        { icon: BadgeCheck, title: "Built from your drawings", text: "Room sizes and proportions follow your measurements. If a drawing is unclear, we ask before we model it." },
        { icon: Repeat, title: "Consistent sets", text: "Whole developments are rendered in one style, so unit types read as a family." },
        { icon: Sofa, title: "Furnishing included", text: "We stage plans with ready-made 3D furniture models for most needs." },
        { icon: MessageSquare, title: "Clear revisions", text: "Corrections are agreed before the final render, so there are no surprises." },
      ],
    },
    faq: {
      title: "Frequently Asked Questions About 3D Floor Plans",
      items: [
        ["What is a 3D floor plan?", "A computer-generated image that shows a property layout realistically, either top-down or at an angle, usually with furnished rooms."],
        ["What is the difference between a 2D and a 3D floor plan?", "A 2D plan is a flat line drawing. A 3D plan adds depth, furniture and finishes so people who do not read technical drawings can still understand the layout."],
        ["What do I need to send?", "Your drawings in any format, plus any style references. If you do not have drawings yet, tell us what exists and we will advise."],
        ["What properties do you cover?", "Houses, flats, apartment buildings, offices, shops and mixed-use schemes, from a single dwelling to a full development."],
        ["What format are the files?", "High-resolution images ready for print and web. Extra formats such as vertical crops for social media are available on request."],
        ["How is a 3D floor plan quote worked out?", "It depends on the size of the plan, the level of furnishing and the number of units. Send your drawings for a quote."],
      ],
    },
    closing: { title: "Ready to show your layout properly?", text: CLOSING_TEXT },
  },

  /* ------------------------------------------------------------------ */
  "virtual-staging": {
    label: "Virtual Staging",
    title: "Virtual Home Staging Services",
    intro:
      "Turn photographs of vacant or dated rooms into beautifully dressed, market-ready images, with lighting and colour matched to the original photo. Domestic and commercial.",
    hero: {
      src: "/new-build-family-home-sutton-coldfield-1.webp",
      alt: "Split view of a bare concrete interior beside the same space finished as a living room",
      position: "object-center",
    },
    mosaic: {
      title: "Virtual Staging for Property Marketing",
      large: { src: "/interior-classic-dining-room.webp", alt: "Virtually staged dining room with table, chairs and artwork" },
      a: { src: "/new-build-family-home-sutton-coldfield-2.webp", alt: "Before and after view of a plot" },
      b: { src: "/hmo-development-selly-oak-2.webp", alt: "Staged home exterior and interior views" },
    },
    compare: {
      title: "Show Buyers the Potential",
      subtitle:
        "Empty rooms are hard to judge. We furnish and style your photographs digitally so buyers can picture living in the space.",
      left: { src: "/new-build-family-home-sutton-coldfield-1.webp", alt: "Bare concrete interior before staging", caption: "Before and after" },
      right: { src: "/spacious-loft-conversion-harborne-1.webp", alt: "Staged living space", caption: "Staged" },
      pointsTitle: "How we stage",
      points: [
        ["Photo-matched lighting.", "We match the colour and light of the original photo, so furniture sits naturally in the room."],
        ["Correct proportions.", "Every piece is scaled to the room, so nothing looks too big or too small."],
        ["Realistic materials.", "Upholstery, wood and stone are rendered so they look as good as they would in person."],
        ["Style for your buyer.", "We choose a style to suit your target audience."],
      ],
    },
    audiences: {
      title: "Virtual Staging for Every Kind of Property",
      subtitle: "Domestic or commercial, one room or a whole portfolio.",
      items: [
        { title: "Estate agents", text: "Vacant listings that photograph well and attract viewings.", img: { src: "/garage-conversion-kings-heath-1.webp", alt: "Brick family home" } },
        { title: "Developers", text: "Show completed homes before they are fitted out.", img: { src: "/new-build-family-home-sutton-coldfield-2.webp", alt: "New-build family home" } },
        { title: "Landlords and investors", text: "Make lets and sales more appealing without furnishing the property.", img: { src: "/office-to-residential-conversion-city-centre-1.webp", alt: "Converted building" } },
        { title: "Commercial owners", text: "Demonstrate how an office or unit could be laid out.", img: { src: "/commercial-unit-selly-oak-1.webp", alt: "Commercial unit" } },
      ],
    },
    highlights: {
      title: "What We Offer",
      subtitle: "More than furniture. A full range of virtual property services.",
      items: [
        { icon: Sofa, title: "Virtual staging", text: "Vacant photographs furnished with warmth and style." },
        { icon: Layers, title: "Virtual styling", text: "A furnished room restyled with new décor, colour and accessories." },
        { icon: Ruler, title: "Virtual renovation", text: "Tired interiors shown with new finishes, floors and fittings before work begins." },
        { icon: Compass, title: "Exterior renovation and 360° views", text: "Refresh the outside of a property, or let buyers look around a staged room in every direction." },
      ],
    },
    quote: {
      title: "Ready to talk through your virtual staging?",
      img: { src: "/spacious-loft-conversion-harborne-2.webp", alt: "" },
    },
    types: {
      title: "Types of Virtual Staging Services",
      subtitle: "Pick one service or combine several for the same property.",
      items: [
        { title: "Virtual Staging", text: "We take a photograph of a vacant room and furnish it digitally, adding warmth and style so buyers can imagine living there.", img: { src: "/interior-classic-breakfast-bar.webp", alt: "Virtually staged breakfast bar with stools" } },
        { title: "Virtual Renovation", text: "We show how a dated interior could look with new finishes, floors and fittings, so buyers and investors can judge the potential before any work starts.", img: { src: "/office-to-residential-conversion-city-centre-2.webp", alt: "Building site and finished conversion" } },
        { title: "3D Plan", text: "A furnished 3D floor plan shows the whole layout at a glance, so buyers understand how the home works.", img: { src: "/floorplan-hero.webp", alt: "Furnished 3D floor plan" } },
      ],
    },
    workflow: {
      title: "Virtual Staging Workflow",
      subtitle: "Simple to start: all we need is a photograph and a style.",
      steps: [
        ["1. Send photos", "A photograph of each room you would like staged."],
        ["2. Choose a style", "Pick a style, and any furniture you would like used."],
        ["3. Quote and schedule", "We agree the number of images, the scope and a delivery date."],
        ["4. Staging", "We furnish and light each image to match the original photograph."],
        ["5. Revisions", "Comment on the images and we make the changes agreed in the quote."],
        ["6. Delivery", "Staged images ready for listings, your website and social media."],
      ],
    },
    why: {
      title: "Why Choose Us for Virtual Staging",
      items: [
        { icon: Sofa, title: "A wide furniture library", text: "We stage with pieces that suit the property and the buyer." },
        { icon: BadgeCheck, title: "Photorealistic result", text: "Lighting, reflections, materials and proportions are matched to the photograph." },
        { icon: Clock, title: "Responsive support", text: "We agree delivery dates up front and reply quickly, because every day counts in a sale." },
        { icon: Users, title: "Design experts", text: "Our designers choose styles with your target buyer in mind." },
      ],
    },
    faq: {
      title: "Virtual Staging FAQ",
      items: [
        ["How is a virtual staging quote worked out?", "It depends on the number of images and the level of work. Send your photos for a quote."],
        ["Do you stage exteriors too?", "Yes. We can refresh the outside of a property, from the front elevation to the garden and drive."],
        ["What do I need to send to start?", "A photo of each room, the style you want, and any furniture you would like us to use."],
        ["Can you stage occupied homes?", "Yes. We can restyle a furnished room, or remove existing items and stage it afresh."],
        ["Should buyers be told the photos are staged?", "Yes. We recommend labelling staged images clearly so buyers know what they are looking at. It builds trust."],
        ["Do you only do virtual staging?", "No. We also offer virtual styling, virtual renovation, exterior renovation, 360° views and 3D plans."],
      ],
    },
    closing: { title: "Ready to make your empty rooms sell?", text: CLOSING_TEXT },
  },

  /* ------------------------------------------------------------------ */
  "planning-applications": {
    label: "Planning Applications",
    title: "Planning Application Services across England",
    intro:
      "We prepare and submit complete planning applications, with drawings, statements and evidence, then manage the process through to a decision. Built to validate first time.",
    hero: {
      src: "/contact.webp",
      alt: "Birmingham Council House at dusk",
    },
    mosaic: {
      title: "Planning Applications for Homes and Developments",
      large: { src: "/two-storey-side-extension-four-oaks-1.webp", alt: "Detached house with a pitched roof and dormer window" },
      a: { src: "/garden-office-studio-bournville-1.webp", alt: "Contemporary rear extension with bi-fold doors" },
      b: { src: "/garage-conversion-kings-heath-2.webp", alt: "Two-storey family home with integral garage" },
    },
    compare: {
      title: "A Clear Route to a Decision",
      subtitle:
        "A planning application is only as strong as its drawings and supporting documents. We prepare both, check them against validation requirements and deal with the council on your behalf.",
      left: { src: "/design drawings.webp", alt: "Isometric line drawing of a framed building", caption: "Drawings" },
      right: { src: "/planning application.webp", alt: "Planning application form stamped approved", caption: "Application" },
      pointsTitle: "What a package includes",
      points: [
        ["Existing and proposed drawings.", "Plans, elevations and site plans to the scale and format the council expects."],
        ["Supporting statements.", "Design and access statements and other documents the scheme needs."],
        ["Validation check.", "We check the package against the council's requirements before submitting."],
        ["Case-officer liaison.", "We respond to queries and negotiate changes through to a decision."],
      ],
    },
    audiences: {
      title: "Planning Support for Every Kind of Scheme",
      subtitle: "From a single extension to a multi-unit development.",
      items: [
        { title: "Homeowners", text: "Extensions, loft conversions and garage conversions.", img: { src: "/spacious-loft-conversion-harborne-2.webp", alt: "Loft conversion drawings" } },
        { title: "Landlords", text: "Changes of use and HMO schemes.", img: { src: "/hmo-development-selly-oak-1.webp", alt: "HMO floor plan" } },
        { title: "Developers", text: "New-build homes and multi-unit schemes.", img: { src: "/new-build-family-home-sutton-coldfield-2.webp", alt: "New-build family home" } },
        { title: "Commercial owners", text: "Conversions and changes of use for offices, shops and units.", img: { src: "/commercial-conversion-city-centre-1.webp", alt: "Commercial conversion" } },
      ],
    },
    highlights: {
      title: "How We Help Your Application Succeed",
      subtitle: "Practical steps that avoid delay.",
      items: [
        { icon: FileCheck, title: "Built to validate", text: "A complete package is the single biggest factor in avoiding delay." },
        { icon: Compass, title: "Pre-application advice", text: "Used where it adds value, to test the scheme with the council first." },
        { icon: Users, title: "A named consultant", text: "One person handles your file from start to finish." },
        { icon: ShieldCheck, title: "Conditions covered", text: "We support condition discharge after approval." },
      ],
    },
    quote: {
      title: "Ready to talk through your application?",
      img: { src: "/two-storey-side-extension-four-oaks-2.webp", alt: "" },
    },
    types: {
      title: "Types of Planning Application",
      subtitle: "The right route depends on the property and the scheme.",
      items: [
        { title: "Householder Applications", text: "For extensions and alterations to a single dwelling. Householder applications are usually the quickest route to a decision.", img: { src: "/garden-office-studio-bournville-2.webp", alt: "Modern glazed rear extension to a brick family home" } },
        { title: "Full Planning Applications", text: "For new homes, conversions and changes of use, with the full set of drawings and supporting documents.", img: { src: "/office-to-residential-conversion-city-centre-1.webp", alt: "Office to residential conversion" } },
        { title: "Verified Views for Planning Submissions and Appeals", text: "Accurate visual representations prepared to support a planning submission or an appeal, showing the proposal in its real setting. We confirm what the council expects first, so the images fit what is being asked for.", img: { src: "/exterior-hero.webp", alt: "Visual representation of a proposed building in its setting" } },
        { title: "Permitted Development and Lawful Development Certificates", text: "Some works do not need full permission. We confirm the route and obtain a certificate where it helps.", img: { src: "/spacious-loft-conversion-harborne-1.webp", alt: "Loft conversion" } },
      ],
    },
    workflow: {
      title: "Planning Application Workflow",
      subtitle: "A structured route from first call to approval.",
      steps: [
        ["1. Feasibility call", "A free call and site review to confirm the best route."],
        ["2. Pre-application advice", "Where it adds value, we test the scheme with the council first."],
        ["3. Drawings and documents", "We prepare the drawings and supporting documents."],
        ["4. Validation and submission", "We check the package and submit to the council."],
        ["5. Case-officer liaison", "We respond to queries and agree changes with the officer."],
        ["6. Decision and conditions", "We take you through the decision and condition discharge."],
      ],
    },
    why: {
      title: "Why Choose Us for Planning Applications",
      items: [
        { icon: FileCheck, title: "Packages built to validate", text: "Complete submissions reduce avoidable delay." },
        { icon: Users, title: "A named consultant", text: "A single point of contact, backed by 40 years of professional experience at Director level, handles your file end to end." },
        { icon: BadgeCheck, title: "Fees agreed first", text: "Fees are agreed before work starts." },
        { icon: Compass, title: "Nationwide reach", text: "Working with clients across England, wherever your site is." },
      ],
    },
    faq: {
      title: "Planning Application FAQ",
      items: [
        ["Do I need planning permission for my extension?", "Many extensions fall under permitted development, but it depends on the property, its location and any previous work. We offer a free initial assessment."],
        ["How long does a planning application take?", "Householder applications typically take 8 weeks and full applications 13 weeks. Complex schemes can take longer."],
        ["What is pre-application advice?", "A chance to test a scheme with the council before submitting. It adds a few weeks but can avoid delays later."],
        ["What happens if my application is refused?", "We review the reasons and advise on revising the scheme, resubmitting or appealing."],
        ["How are your fees structured?", "Our fees are agreed before we start. The council also charges its own application fee, which is set nationally."],
        ["Do you handle conditions after approval?", "Yes. We support condition discharge so work can begin."],
      ],
    },
    closing: { title: "Ready to start your planning application?", text: CLOSING_TEXT },
  },

  /* ------------------------------------------------------------------ */
  "building-regulations-support": {
    label: "Building Regulations Support",
    title: "Building Regulations Support across England",
    intro:
      "Building control approval sits alongside planning and is assessed on a different basis. We prepare the compliance package and liaise with building control through to completion.",
    hero: {
      src: "/about.webp",
      alt: "Large Birmingham sign on a modern building",
    },
    mosaic: {
      title: "Building Regulations for Extensions, Conversions and New Builds",
      large: { src: "/office-to-residential-conversion-city-centre-2.webp", alt: "Concrete frame and blockwork beside rolled drawings" },
      a: { src: "/single-storey-rear-extension-moseley-1.webp", alt: "House under construction with scaffolding" },
      b: { src: "/office-to-residential-conversion-city-centre-1.webp", alt: "Concrete building frame beside the finished home" },
    },
    compare: {
      title: "From Structure to Specification",
      subtitle:
        "Compliance is documented at every stage of the build. We coordinate the drawings, calculations and specifications building control needs.",
      left: { src: "/building regulation support.webp", alt: "Consultants reviewing a design model", caption: "Review" },
      right: { src: "/design drawings.webp", alt: "Isometric line drawing with dimensions", caption: "Drawings" },
      pointsTitle: "What the package covers",
      points: [
        ["Full plans submission.", "Construction details and the information building control requires."],
        ["Structural coordination.", "We work directly with your structural engineer."],
        ["Specification and materials.", "Clear documentation for the builder and the inspector."],
        ["Inspections and completion.", "Stage inspections scheduled and the completion certificate handled."],
      ],
    },
    audiences: {
      title: "Building Regulations for Every Project",
      subtitle: "Compliance matters whether the job is large or small.",
      items: [
        { title: "Extensions", text: "Rear, side and double-storey extensions.", img: { src: "/single-storey-rear-extension-moseley-2.webp", alt: "Single-storey rear extension" } },
        { title: "Loft conversions", text: "Dormers and roof conversions, including structure and fire safety.", img: { src: "/spacious-loft-conversion-harborne-2.webp", alt: "Loft conversion" } },
        { title: "Conversions", text: "Garage, commercial and office-to-residential conversions.", img: { src: "/garage-conversion-kings-heath-1.webp", alt: "Garage conversion" } },
        { title: "New builds", text: "New homes and multi-unit schemes.", img: { src: "/new-build-family-home-sutton-coldfield-1.webp", alt: "New-build family home" } },
      ],
    },
    highlights: {
      title: "Why Building Regulations Matter",
      subtitle: "Approval is separate from planning and just as important.",
      items: [
        { icon: ShieldCheck, title: "Safe and legal", text: "Compliance protects the people who will use the building." },
        { icon: FileCheck, title: "Avoids rejection", text: "We know the common reasons submissions are returned." },
        { icon: Users, title: "One team", text: "One team covering both planning and building control." },
        { icon: Clock, title: "Fewer delays", text: "Complete information avoids stop-start on site." },
      ],
    },
    quote: {
      title: "Ready to talk through your building regulations?",
      img: { src: "/two-storey-side-extension-four-oaks-2.webp", alt: "" },
    },
    types: {
      title: "How We Support Building Control",
      subtitle: "Choose the route that suits the project.",
      items: [
        { title: "Full Plans Submission", text: "A complete set of drawings and specification submitted for approval before work starts, giving certainty ahead of construction.", img: { src: "/design drawings.webp", alt: "Detailed drawings" } },
        { title: "Building Notice Coordination", text: "Where a building notice is suitable, we coordinate the process with building control and your builder.", img: { src: "/single-storey-rear-extension-moseley-1.webp", alt: "Rear extension under construction" } },
        { title: "Structural and Specification Support", text: "We coordinate structural calculations and prepare the specification and materials documentation the inspector will check.", img: { src: "/building regulation support.webp", alt: "Consultants reviewing a design model" } },
      ],
    },
    workflow: {
      title: "Building Regulations Workflow",
      subtitle: "From regulatory review to completion certificate.",
      steps: [
        ["1. Regulatory review", "We review the proposed scheme against the regulations."],
        ["2. Drawings and details", "Full plans and construction details are prepared."],
        ["3. Structural coordination", "We coordinate calculations with your structural engineer."],
        ["4. Specification", "Specification and materials documentation is completed."],
        ["5. Submission", "We submit and liaise with building control."],
        ["6. Inspections and completion", "Stage inspections are scheduled and the completion certificate obtained."],
      ],
    },
    why: {
      title: "Why Choose Us for Building Regulations",
      items: [
        { icon: Users, title: "One team", text: "Planning and building control from the same team." },
        { icon: Ruler, title: "Engineer coordination", text: "We coordinate directly with structural engineers." },
        { icon: ShieldCheck, title: "Common pitfalls avoided", text: "We know what causes building control rejections." },
        { icon: BadgeCheck, title: "Completion handled", text: "We manage the completion certificate for you." },
      ],
    },
    faq: {
      title: "Building Regulations FAQ",
      items: [
        ["What is the difference between planning permission and building regulations?", "Planning looks at what is built and how it affects its surroundings. Building regulations look at how it is built, including structure, fire safety and energy performance."],
        ["Do I need building regulations approval for an extension?", "Almost always, yes, even where planning permission is not required."],
        ["What is a full plans application?", "A complete set of drawings and specification submitted for approval before work starts."],
        ["What is a building notice?", "A shorter route where work can start after notice is given, with inspections during the build. It is not suitable for every project."],
        ["Do you coordinate with structural engineers?", "Yes. We coordinate calculations and details with your engineer."],
        ["Will I get a completion certificate?", "Yes. We guide the project through inspections to the certificate."],
      ],
    },
    closing: { title: "Ready to get your building regulations in order?", text: CLOSING_TEXT },
  },

  /* ------------------------------------------------------------------ */
  "feasibility-layouts": {
    label: "Feasibility Layouts",
    title: "Feasibility Studies & Layout Options",
    intro:
      "Before you buy, refinance or commit to design, know what a site can realistically deliver. We test capacity against policy and produce a clear recommendation.",
    hero: {
      src: "/projects-hero.webp",
      alt: "Canal-side housing and narrowboats in Birmingham",
    },
    mosaic: {
      title: "Feasibility Studies for Sites and Buildings",
      large: { src: "/feasibility layouts.webp", alt: "3D model rising from site drawings" },
      a: { src: "/hmo-development-selly-oak-1.webp", alt: "Colour floor plan of a scheme" },
      b: { src: "/garage-conversion-kings-heath-1.webp", alt: "Brick family home with a dark pitched roof and paved approach" },
    },
    compare: {
      title: "Know Before You Commit",
      subtitle:
        "A feasibility study identifies deal-breakers early, tests more than one layout and gives you evidence to share with funders and buyers.",
      left: { src: "/feasibility layouts.webp", alt: "Wireframe massing model over site plans", caption: "Massing" },
      right: { src: "/hmo-development-selly-oak-1.webp", alt: "Colour layout plan", caption: "Layout" },
      pointsTitle: "What a study covers",
      points: [
        ["Policy and constraints.", "Site and policy analysis so deal-breakers show up early."],
        ["Capacity testing.", "What the site can realistically deliver, with options compared."],
        ["Overlooking and constraints mapping.", "Constraints mapped before you invest in design."],
        ["Written recommendation.", "A clear go or no-go with the reasoning behind it."],
      ],
    },
    audiences: {
      title: "Feasibility Support for Every Kind of Buyer",
      subtitle: "Decide with evidence, not guesswork.",
      items: [
        { title: "Developers", text: "Test capacity before an offer is made.", img: { src: "/hmo-development-selly-oak-2.webp", alt: "Development exterior and floor layouts" } },
        { title: "Landlords", text: "Check HMO and conversion potential.", img: { src: "/hmo-development-selly-oak-1.webp", alt: "HMO floor plan" } },
        { title: "Homeowners", text: "Understand what an extension or conversion could realistically deliver.", img: { src: "/rear-home-extension-edgbaston-2.webp", alt: "Extension floor plan" } },
        { title: "Investors", text: "Evidence to share with funders and partners.", img: { src: "/new-build-family-home-sutton-coldfield-2.webp", alt: "Plot before and after" } },
      ],
    },
    highlights: {
      title: "What You Get",
      subtitle: "Practical outputs for a decision.",
      items: [
        { icon: LayoutGrid, title: "Layout options", text: "Two or three layouts tested against the findings." },
        { icon: Compass, title: "Policy view", text: "How local policy affects what is possible." },
        { icon: FileCheck, title: "Shareable evidence", text: "Material you can show funders and buyers." },
        { icon: Clock, title: "Fast answer", text: "Typically resolved within two weeks." },
      ],
    },
    quote: {
      title: "Ready to talk through your feasibility study?",
      img: { src: "/new-build-family-home-sutton-coldfield-2.webp", alt: "" },
    },
    types: {
      title: "Feasibility Studies We Carry Out",
      subtitle: "Scaled to the decision you need to make.",
      items: [
        { title: "Development Capacity Study", text: "How many homes or how much floor space a site could support within planning policy.", img: { src: "/feasibility layouts.webp", alt: "Capacity study model" } },
        { title: "Pre-Purchase Feasibility", text: "A quick, focused study before you buy, so you know the risks and the opportunity.", img: { src: "/hmo-development-selly-oak-1.webp", alt: "Layout plan" } },
        { title: "Layout Options", text: "Several layouts tested side by side so you can choose the strongest before committing to full design.", img: { src: "/rear-home-extension-edgbaston-2.webp", alt: "Layout option" } },
      ],
    },
    workflow: {
      title: "Feasibility Study Workflow",
      subtitle: "A short, structured route to a recommendation.",
      steps: [
        ["1. Brief", "What you want to achieve and what decision the study supports."],
        ["2. Site and policy analysis", "Constraints and policy are reviewed against the site."],
        ["3. Capacity study", "We test what the site can realistically deliver."],
        ["4. Layout options", "Two or three layouts are tested."],
        ["5. Indicative snapshot", "An indicative programme view."],
        ["6. Recommendation report", "A written go or no-go recommendation."],
      ],
    },
    why: {
      title: "Why Choose Us for Feasibility Studies",
      items: [
        { icon: FileCheck, title: "Deal-breakers found early", text: "Issues are identified before you commit funds." },
        { icon: BadgeCheck, title: "Clear recommendation", text: "A plain go or no-go with reasons." },
        { icon: Users, title: "Evidence for funders", text: "Material you can share with lenders and buyers." },
        { icon: Clock, title: "Fast turnaround", text: "Typically resolved within two weeks." },
      ],
    },
    faq: {
      title: "Feasibility Study FAQ",
      items: [
        ["What is a feasibility study?", "A short study of what a site or building can realistically deliver, tested against planning policy and constraints."],
        ["When should I commission one?", "Ideally before you buy, refinance or commit to design."],
        ["How long does it take?", "Typically within two weeks, depending on the site."],
        ["What do I receive?", "Layout options and a written recommendation you can share."],
        ["Does a study guarantee planning permission?", "No. It tests likelihood and risk. Permission is decided by the council."],
        ["Can it help with funding?", "Yes. It gives lenders and partners evidence of what is achievable."],
      ],
    },
    closing: { title: "Ready to test your site before you commit?", text: CLOSING_TEXT },
  },

  /* ------------------------------------------------------------------ */
  "development-guidance": {
    label: "Development Guidance",
    title: "Planning Policy & Development Guidance",
    intro:
      "Planning policy is the framework every decision sits inside. We read it against your scheme so you can make confident decisions about site, design and programme.",
    hero: {
      src: "/faq.webp",
      alt: "Stone civic building and statue in Birmingham",
    },
    mosaic: {
      title: "Development Guidance for Confident Decisions",
      large: { src: "/development guidance.webp", alt: "Design model, hard hat and plans on a desk" },
      a: { src: "/two-storey-side-extension-four-oaks-1.webp", alt: "Detached house in landscaped grounds" },
      b: { src: "/garage-conversion-kings-heath-1.webp", alt: "Brick family home" },
    },
    compare: {
      title: "Policy Read Against Your Scheme",
      subtitle:
        "General guidance is easy to find. We apply policy to your site and proposal, and tell you what it means for design and programme.",
      left: { src: "/development guidance.webp", alt: "Design model and plans on a desk", caption: "Guidance" },
      right: { src: "/planning application.webp", alt: "Planning application stamped approved", caption: "Application" },
      pointsTitle: "What we advise on",
      points: [
        ["Policy review.", "Your proposal against national and local policy."],
        ["Site selection.", "Advice on sites and acquisition before you commit."],
        ["Design review.", "Design reviewed with planners and consultees in mind."],
        ["Programme strategy.", "A realistic strategy and timetable for the project."],
      ],
    },
    audiences: {
      title: "Guidance for Every Stage",
      subtitle: "From first idea to a scheme the council can support.",
      items: [
        { title: "Landowners", text: "Understand what your land could support.", img: { src: "/new-build-family-home-sutton-coldfield-2.webp", alt: "Plot before and after" } },
        { title: "Developers", text: "Policy-led strategy that protects your programme.", img: { src: "/hmo-development-selly-oak-2.webp", alt: "Development exterior" } },
        { title: "Homeowners", text: "Clear direction before you design.", img: { src: "/garage-conversion-kings-heath-2.webp", alt: "Converted family home" } },
        { title: "Investors", text: "Policy risk identified before you buy.", img: { src: "/office-to-residential-conversion-city-centre-1.webp", alt: "Converted building" } },
      ],
    },
    highlights: {
      title: "Practical, Decision-Focused Advice",
      subtitle: "Independent of any development interest.",
      items: [
        { icon: Compass, title: "Policy risk early", text: "Risks are identified before you commit." },
        { icon: Users, title: "Independent advice", text: "No development interest of our own." },
        { icon: FileCheck, title: "Plain-English output", text: "Advice you can act on." },
        { icon: Repeat, title: "Ongoing support", text: "Support as the scheme evolves." },
      ],
    },
    quote: {
      title: "Ready to talk through your project?",
      img: { src: "/two-storey-side-extension-four-oaks-2.webp", alt: "" },
    },
    types: {
      title: "How We Guide Development",
      subtitle: "Support that fits where you are in the process.",
      items: [
        { title: "Policy Review", text: "A review of your proposal against national and local planning policy, with a clear view of risks and opportunities.", img: { src: "/planning application.webp", alt: "Planning application" } },
        { title: "Site and Acquisition Advice", text: "Input before purchase so you understand what a site is likely to allow.", img: { src: "/new-build-family-home-sutton-coldfield-2.webp", alt: "Site before and after" } },
        { title: "Strategy and Programme", text: "A realistic strategy and timetable, with design reviewed in light of what planners and consultees are likely to say.", img: { src: "/development guidance.webp", alt: "Design model and plans" } },
      ],
    },
    workflow: {
      title: "Development Guidance Workflow",
      subtitle: "Advice that follows your decisions.",
      steps: [
        ["1. Brief", "Your goals, the site and the decision in front of you."],
        ["2. Policy review", "Your proposal against policy."],
        ["3. Local plan alignment", "Local plan and neighbourhood guidance reviewed."],
        ["4. Design review", "Design considered with planners and consultees in mind."],
        ["5. Strategy", "Project strategy and programme advice."],
        ["6. Ongoing support", "Support as the scheme evolves."],
      ],
    },
    why: {
      title: "Why Choose Us for Development Guidance",
      items: [
        { icon: Compass, title: "Policy risk identified early", text: "Problems found before you commit." },
        { icon: BadgeCheck, title: "Independent advice", text: "Free from any development interest." },
        { icon: MessageSquare, title: "Practical advice", text: "Focused on the decision in front of you." },
        { icon: Repeat, title: "Ongoing support", text: "Available as the scheme evolves." },
      ],
    },
    faq: {
      title: "Development Guidance FAQ",
      items: [
        ["What is development guidance?", "Advice on how planning policy applies to your site and proposal, so you can make informed decisions."],
        ["When should I seek it?", "Before buying a site or committing to design."],
        ["Is it independent?", "Yes. We have no development interest in your scheme."],
        ["Can you attend meetings?", "We can advise on council engagement and consultees as part of the strategy."],
        ["Does guidance replace a planning application?", "No. It informs the application and reduces risk."],
        ["Is ongoing support available?", "Yes, as the scheme evolves."],
      ],
    },
    closing: { title: "Ready to get clear policy advice?", text: CLOSING_TEXT },
  },
};
