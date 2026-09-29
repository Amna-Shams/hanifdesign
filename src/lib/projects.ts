export interface ProjectSpec {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Only "Residential" | "Commercial" — the two filters the site offers. */
  category: "Residential" | "Commercial";
  /** Short line used on cards. */
  summary: string;
  location: string;
  year: string;
  /** Full description used on the detail page. */
  description: string;
  /**
   * Project photography in `public/`. Two frames per project: the first is the
   * card/hero image, the second appears on the detail page. `gradient` remains
   * the fallback if an image is ever removed.
   */
  images: readonly string[];
  /** Tailwind gradient stops, used behind/underneath the image. */
  gradient: string;
  specs: readonly ProjectSpec[];
}

export const PROJECT_CATEGORIES = ["All", "Residential", "Commercial"] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

/**
 * Canonical project catalogue — the single source of truth for the projects
 * index, the homepage featured grid, the detail pages (`generateStaticParams`)
 * and the XML sitemap, so a project can never be listed without a page existing.
 */
export const PROJECTS: readonly Project[] = [
  {
    slug: "home-extension",
    title: "Rear Home Extension",
    category: "Residential",
    summary: "Open-plan kitchen-diner with bi-fold doors onto the garden.",
    location: "Edgbaston, Birmingham",
    year: "2024",
    description:
      "Planning drawings and visualisation for a substantial rear home extension to a Victorian terrace property, including a kitchen-diner opening onto the garden.",
    images: ["/work-01.jpeg", "/work-02.jpeg"],
    gradient: "from-navy/10 to-gold/10",
    specs: [
      { label: "Project type", value: "Single-storey rear extension" },
      { label: "Floor area", value: "35 sqm additional" },
      { label: "Planning route", value: "Householder application" },
      { label: "Decision time", value: "8 weeks" },
      { label: "Outcome", value: "Approved with conditions" },
      { label: "Services provided", value: "Drawings, design & access statement, submission" },
    ],
  },
  {
    slug: "loft-conversion",
    title: "Spacious Loft Conversion",
    category: "Residential",
    summary: "Dormer conversion creating a master suite with en-suite.",
    location: "Harborne, Birmingham",
    year: "2024",
    description:
      "Feasibility study and planning support for a dormer loft conversion creating a master bedroom suite with en-suite bathroom.",
    images: ["/work-03.jpeg", "/work-04.jpeg"],
    gradient: "from-gold/10 to-navy/10",
    specs: [
      { label: "Project type", value: "Dormer loft conversion" },
      { label: "Floor area", value: "42 sqm additional" },
      { label: "Planning route", value: "Permitted development + prior approval" },
      { label: "Decision time", value: "6 weeks" },
      { label: "Outcome", value: "Lawful development certificate granted" },
      { label: "Services provided", value: "Feasibility, drawings, prior approval" },
    ],
  },
  {
    slug: "single-storey-extension",
    title: "Single-Storey Rear Extension",
    category: "Residential",
    summary: "Wraparound extension creating a bright open-plan living space.",
    location: "Moseley, Birmingham",
    year: "2023",
    description:
      "Design drawings and planning submission for a wraparound single-storey extension creating an open-plan living space with rooflights.",
    images: ["/work-05.jpeg", "/work-06.jpeg"],
    gradient: "from-navy/10 to-blue-500/10",
    specs: [
      { label: "Project type", value: "Wraparound extension" },
      { label: "Floor area", value: "48 sqm additional" },
      { label: "Planning route", value: "Householder application" },
      { label: "Decision time", value: "10 weeks" },
      { label: "Outcome", value: "Approved" },
      { label: "Services provided", value: "Drawings, design & access statement, submission" },
    ],
  },
  {
    slug: "new-build-home",
    title: "New Build Family Home",
    category: "Residential",
    summary: "Contemporary four-bedroom detached replacement dwelling.",
    location: "Sutton Coldfield, Birmingham",
    year: "2023",
    description:
      "Full planning package for a replacement dwelling — a contemporary four-bedroom detached home on a mature suburban plot.",
    images: ["/work-07.jpeg", "/work-08.jpeg"],
    gradient: "from-emerald/10 to-navy/10",
    specs: [
      { label: "Project type", value: "New build replacement dwelling" },
      { label: "Floor area", value: "220 sqm" },
      { label: "Planning route", value: "Full planning application" },
      { label: "Decision time", value: "13 weeks" },
      { label: "Outcome", value: "Approved" },
      { label: "Services provided", value: "Drawings, design & access, ecology, submission" },
    ],
  },
  {
    slug: "commercial-conversion",
    title: "Office to Residential Conversion",
    category: "Commercial",
    summary: "Prior approval converting an office building into eight flats.",
    location: "City Centre, Birmingham",
    year: "2024",
    description:
      "Prior approval and planning consent for the conversion of a vacant office building into eight residential units under Class MA rights.",
    images: ["/work-09.jpeg", "/work-10.jpeg"],
    gradient: "from-amber/10 to-navy/10",
    specs: [
      { label: "Project type", value: "Class MA prior approval" },
      { label: "Units", value: "8 flats (mix of 1 & 2 bed)" },
      { label: "Planning route", value: "Prior approval (Class MA)" },
      { label: "Decision time", value: "8 weeks" },
      { label: "Outcome", value: "Prior approval granted" },
      { label: "Services provided", value: "Prior approval, noise and air quality reports" },
    ],
  },
  {
    slug: "hmo-development",
    title: "HMO Development",
    category: "Commercial",
    summary: "Six-bed HMO with communal facilities near the university.",
    location: "Selly Oak, Birmingham",
    year: "2023",
    description:
      "Planning application for a six-bedroom house in multiple occupation with communal facilities, targeting the student rental market.",
    images: ["/work-11.jpeg", "/work-12.jpeg"],
    gradient: "from-rose/10 to-navy/10",
    specs: [
      { label: "Project type", value: "HMO (sui generis)" },
      { label: "Bedrooms", value: "6 en-suite bedrooms" },
      { label: "Planning route", value: "Full planning application" },
      { label: "Decision time", value: "12 weeks" },
      { label: "Outcome", value: "Approved with conditions" },
      { label: "Services provided", value: "Drawings, transport statement, submission" },
    ],
  },
  {
    slug: "garage-conversion",
    title: "Garage Conversion",
    category: "Residential",
    summary: "Lawful development certificate for an integral garage conversion.",
    location: "Kings Heath, Birmingham",
    year: "2023",
    description:
      "Lawful development certification for the conversion of an integral garage to a habitable room with a new window to the front elevation.",
    images: ["/work-13.jpeg", "/work-14.jpeg"],
    gradient: "from-cyan/10 to-navy/10",
    specs: [
      { label: "Project type", value: "Integral garage conversion" },
      { label: "Floor area", value: "18 sqm" },
      { label: "Planning route", value: "Certificate of lawfulness (proposed)" },
      { label: "Decision time", value: "8 weeks" },
      { label: "Outcome", value: "Certificate granted" },
      { label: "Services provided", value: "Drawings, lawful development application" },
    ],
  },
  {
    slug: "side-extension",
    title: "Two-Storey Side Extension",
    category: "Residential",
    summary: "Substantial side and rear extension adding four bedrooms.",
    location: "Four Oaks, Birmingham",
    year: "2024",
    description:
      "Planning submission for a substantial two-storey side and rear extension to a detached property, adding four bedrooms and two bathrooms.",
    images: ["/work-15.jpeg", "/work-16.jpeg"],
    gradient: "from-violet/10 to-navy/10",
    specs: [
      { label: "Project type", value: "Two-storey side & rear extension" },
      { label: "Floor area", value: "85 sqm additional" },
      { label: "Planning route", value: "Householder application" },
      { label: "Decision time", value: "11 weeks" },
      { label: "Outcome", value: "Approved" },
      { label: "Services provided", value: "Drawings, design & access, neighbour consultation" },
    ],
  },
  {
    slug: "outbuilding",
    title: "Garden Office & Studio",
    category: "Residential",
    summary: "Ancillary garden building used as a home office and studio.",
    location: "Bournville, Birmingham",
    year: "2023",
    description:
      "Confirmation that an ancillary garden building used as a home office and creative studio is permitted development, including electrical and insulation provisions.",
    images: ["/work-17.jpeg", "/work-18.jpeg"],
    gradient: "from-indigo/10 to-navy/10",
    specs: [
      { label: "Project type", value: "Garden outbuilding" },
      { label: "Floor area", value: "30 sqm" },
      { label: "Planning route", value: "Permitted development (Class E)" },
      { label: "Decision time", value: "N/A (permitted development)" },
      { label: "Outcome", value: "Confirmed as permitted development" },
      { label: "Services provided", value: "Feasibility, drawings, confirmation letter" },
    ],
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}
