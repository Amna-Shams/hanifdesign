export interface Project {
  slug: string;
  /** Project name, shown as the card and page heading. */
  title: string;
  /** One of PROJECT_CATEGORIES (excluding "All") — drives the filter buttons. */
  category: ProjectGroup;
  /** Sector / project type line, e.g. "Residential — Extensions & Adaptations". */
  sector: string;
  /** Short line used on cards. */
  summary: string;
  location: string;
  /** "The Brief" — one paragraph per entry. */
  brief: readonly string[];
  /** "Services & Drawings Delivered" — one deliverable per entry. */
  services: readonly string[];
  /** "The Outcome" — one paragraph per entry. */
  outcome: readonly string[];
  /** Project-type and service keywords shown as tags on the detail page. */
  tags: readonly string[];
  /**
   * Photography in `public/`. The first image is the card/hero image and the
   * second, if present, appears on the detail page. Projects without
   * photography fall back to the gradient tile.
   */
  images: readonly string[];
  /** Tailwind gradient stops, used behind/underneath the image. */
  gradient: string;
}

export const PROJECT_GROUPS = [
  "Residential",
  "Commercial & Retail",
  "Mixed-Use & Institutional",
  "Industrial & Strategic",
  "Heritage & Rural",
] as const;
export type ProjectGroup = (typeof PROJECT_GROUPS)[number];

export const PROJECT_CATEGORIES = ["All", ...PROJECT_GROUPS] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

/**
 * Canonical project catalogue — the single source of truth for the projects
 * index, the homepage featured grid, the detail pages (`generateStaticParams`)
 * and the XML sitemap, so a project can never be listed without a page existing.
 */
export const PROJECTS: readonly Project[] = [
  {
    slug: "highfield-road-residence",
    title: "Highfield Road Residence",
    category: "Residential",
    sector: "Residential — Extensions & Adaptations",
    summary:
      "A rear extension, loft conversion and garden room that gave a Victorian family home the space it needed.",
    location: "Edgbaston, Birmingham",
    brief: [
      "The owners of a Victorian villa in Edgbaston had outgrown a layout of small, separate rooms. They wanted a kitchen and dining space that opened onto the garden, a main bedroom suite in the roof and a quiet garden room for working from home, all without losing the character of the house.",
      "This was a classic residential extension project with several moving parts: a rear extension, a loft conversion and a new outbuilding, each with its own planning and building control requirements. The brief was to design all three as one coherent scheme rather than three separate jobs.",
    ],
    services: [
      "Measured building survey of the house and garden to give an accurate base for the design",
      "Concept design services: layout options for the ground floor and roof space, tested with the family",
      "House extension design for a rear kitchen-diner with a large glazed opening to the garden",
      "Loft conversion design including a dormer, staircase position and an en-suite bathroom",
      "Garden room design with a studio layout and its own services route",
      "Floor plans and elevations for every level, existing and proposed",
      "Planning drawings and supporting statements for submission to the council",
      "Building regulations drawings and details covering structure, insulation and fire safety",
    ],
    outcome: [
      "The three elements were submitted together and read as one considered proposal, which made the case officer's job easier and kept the process moving.",
      "The family now has an open kitchen and dining room that connects to the garden, a main bedroom suite in the roof and a garden room that works as a home office, while the front of the house keeps its original character. Because the building regulations drawings were prepared alongside the planning set, the builder could plan and start from a single coordinated package.",
    ],
    tags: [
      "Residential extension projects",
      "House extension design",
      "Loft conversion projects",
      "Loft conversion design",
      "Garden room design",
      "Measured building survey",
      "Floor plans and elevations",
      "Planning drawings",
      "Building regulations drawings",
    ],
    images: ["/rear-home-extension-edgbaston-1.webp", "/rear-home-extension-edgbaston-2.webp"],
    gradient: "from-navy/10 to-gold/10",
  },
  {
    slug: "oaklands-contemporary-dwelling",
    title: "The Oaklands Contemporary Dwelling",
    category: "Residential",
    sector: "Residential — New Builds & Self-Builds",
    summary:
      "A self-build family home on a mature Solihull plot, taken from first sketches to construction drawings.",
    location: "Solihull",
    brief: [
      "A family had bought a generous plot in Solihull to build their own home. They knew they wanted a contemporary house with big south-facing windows and a close link to the garden, but had never run a build before and needed a team that could guide them through every stage.",
      "As residential design consultants, our job was to turn a loose wish list into a buildable design. That meant understanding the site first: its levels, its mature trees and its relationship to the neighbouring houses.",
    ],
    services: [
      "Topographical survey of the plot to record levels, boundaries and tree positions",
      "Concept design services: massing studies and layout options for the family to compare",
      "New build house design developed from the chosen concept, with attention to daylight and orientation",
      "3D visualisation and rendering to help the family and the planning officer picture the finished house",
      "Planning drawings and a design statement for the planning application",
      "Technical drawings for construction, coordinated with the structural engineer",
      "Self-build design services: guidance on programme, specification and what to decide when",
    ],
    outcome: [
      "The renders gave the family confidence in the design before they committed to it, and gave the planning officer a clear picture of how the house would sit on the plot and relate to its neighbours.",
      "With planning secured, the technical drawings gave the builder what they needed to plan and start. The project shows how new build housing design works best when the survey, design, visuals and construction information are handled by one team that knows the whole story.",
    ],
    tags: [
      "New build housing design",
      "New build house design",
      "Self-build design services",
      "Residential design consultants",
      "Topographical survey",
      "Concept design services",
      "3D visualisation and rendering",
      "Technical drawings",
    ],
    images: ["/new-build-family-home-sutton-coldfield-1.webp", "/oaklands-solihull-2.webp"],
    gradient: "from-gold/10 to-navy/10",
  },
  {
    slug: "harborne-student-professional-living",
    title: "Harborne Student & Professional Living",
    category: "Residential",
    sector: "Residential — HMOs & Multiple Occupancy",
    summary:
      "A large house in Harborne converted into well-planned shared accommodation for students and young professionals.",
    location: "Harborne, Birmingham",
    brief: [
      "An investor wanted to convert a large family house in Harborne into shared accommodation for students and young professionals. The building suited the use, but the existing layout wasted space, and the council has specific expectations for room sizes, shared facilities and fire safety in shared houses.",
      "The brief was HMO planning and design that would work for residents and for the owner: comfortable rooms, good shared spaces and a scheme that would satisfy both planning and building control.",
    ],
    services: [
      "Review of local HMO policy and the change of use conversions it requires",
      "Floor plans and elevations, existing and proposed, with every room dimensioned against the council's standards",
      "BIM modelling services to coordinate layouts, fire strategy and services in one model",
      "Planning drawings and supporting information for the change of use application",
      "Building regulations drawings covering fire separation, escape routes, sound insulation and ventilation",
    ],
    outcome: [
      "Working in a single BIM model meant layout changes updated every drawing at once, so the planning and building regulations sets stayed consistent and revisions were quick.",
      "The finished scheme gives each resident a well-sized private room and gives the house generous shared kitchen and living space. For the owner, a design that met the policy requirements from the outset avoided the delays that come from redesigning at the application stage.",
    ],
    tags: [
      "HMO planning and design",
      "Change of use conversions",
      "Floor plans and elevations",
      "BIM modelling services",
      "Planning drawings",
      "Building regulations drawings",
    ],
    images: ["/hmo-development-selly-oak-1.webp", "/hmo-development-selly-oak-2.webp"],
    gradient: "from-navy/10 to-gold/10",
  },
  {
    slug: "colmore-row-corporate-suite",
    title: "Colmore Row Corporate Suite",
    category: "Commercial & Retail",
    sector: "Commercial — Office & Commercial Interiors",
    summary:
      "A full-floor office fit-out in Birmingham's business district, designed around how the team actually works.",
    location: "Colmore Row, Birmingham",
    brief: [
      "A professional services firm was taking a full floor of an office building on Colmore Row. The space was an empty shell with an outdated layout, and the firm wanted a workplace that supported client meetings, focused work and collaboration, with a finish that reflected the standing of the business.",
      "The brief was commercial fit-out design with a tight programme: lease terms meant the firm needed to move in on a fixed date, so accurate information and decisions made early were essential.",
    ],
    services: [
      "Measured building survey of the floor, with as-built drawings recording the existing structure, services and risers",
      "Office design and planning: workspace studies based on the firm's headcount, meeting needs and growth plans",
      "Commercial design consultants' coordination of layouts, ceilings, lighting and finishes",
      "3D visualisation and rendering of reception, meeting suites and open-plan areas for sign-off",
      "Technical drawings and specifications for the fit-out contractor",
    ],
    outcome: [
      "The visuals allowed the partners to agree the design quickly and without second guesses, and the as-built drawings meant the contractor started from accurate information rather than assumptions about the shell.",
      "The result is a workplace with a welcoming reception, a suite of client meeting rooms and open work areas arranged around how the teams operate day to day. The fit-out was ready for the firm's move-in date.",
    ],
    tags: [
      "Commercial fit-out design",
      "Office design and planning",
      "Commercial design consultants",
      "Measured building survey",
      "As-built drawings",
      "3D visualisation and rendering",
    ],
    images: ["/colmore-row-1.webp"],
    gradient: "from-gold/10 to-navy/10",
  },
  {
    slug: "jewellery-quarter-boutique-retail-hub",
    title: "Jewellery Quarter Boutique Retail Hub",
    category: "Commercial & Retail",
    sector: "Retail & Hospitality",
    summary:
      "A former workshop in the Jewellery Quarter turned into a boutique retail and café destination.",
    location: "Jewellery Quarter, Birmingham",
    brief: [
      "A former jewellery workshop in the Jewellery Quarter had stood underused for years. The owner wanted to turn it into a small cluster of independent boutique units with a café at its heart, keeping the building's industrial character while giving it a new purpose.",
      "The scheme needed a change of use, and the design had to show the council a retail and leisure destination that would be good for the street, with sensible servicing, accessible entrances and an active frontage.",
    ],
    services: [
      "Concept design services: options for dividing the building into retail units and a shared café space",
      "Retail and leisure design: shopfront treatments, circulation and display zones for independent traders",
      "Change of use conversions: the planning case for moving from workshop to retail and café use",
      "Floor plans and elevations, existing and proposed",
      "Planning drawings and supporting statements for submission",
    ],
    outcome: [
      "Retaining the original brickwork, roof trusses and large workshop windows gave the building a distinctive identity that supports the boutique offer, and the concept design helped the owner attract interest from prospective tenants before work began.",
      "The planning submission set out clearly how the new uses would benefit the street, giving the council a straightforward case for the change of use.",
    ],
    tags: [
      "Retail and leisure design",
      "Change of use conversions",
      "Concept design services",
      "Floor plans and elevations",
      "Planning drawings",
    ],
    images: ["/jewellery-quarter-1.webp"],
    gradient: "from-navy/10 to-gold/10",
  },
  {
    slug: "digbeth-arts-residential-quarter",
    title: "Digbeth Arts & Residential Quarter",
    category: "Mixed-Use & Institutional",
    sector: "Mixed-Use & Urban Regeneration",
    summary:
      "A regeneration masterplan combining build-to-rent homes with studios, workspace and public space in Digbeth.",
    location: "Digbeth, Birmingham",
    brief: [
      "A group of former industrial buildings in Digbeth offered the chance to create a new neighbourhood. The vision was a mix of build-to-rent homes, artists' studios, workspace and public space, drawing on the area's creative character while adding the housing the city needs.",
      "This was a regeneration project that had to work at several scales: a masterplan for the whole site, detailed design for the individual buildings and a clear story about how the quarter would connect to the surrounding streets.",
    ],
    services: [
      "Masterplanning: site analysis, movement and public-space strategy, and phasing of the development",
      "Mixed-use development design: how homes, studios, workspace and ground-floor activity fit together",
      "Build-to-rent design: apartment layouts, shared amenity and management spaces",
      "BIM modelling services: a single coordinated model for the whole quarter, used for design coordination and area schedules",
      "3D visualisation and rendering: street-level and aerial views for stakeholder and community consultation",
    ],
    outcome: [
      "The masterplan showed how a mix of uses could create a lively neighbourhood, and the BIM model kept the design coordinated as it developed across several buildings and phases.",
      "The visuals became the centrepiece of stakeholder and community consultation, helping people understand the vision for the quarter and giving the project a clear public story. The scheme demonstrates how a masterplanning case study can be both ambitious and grounded in the character of a place.",
    ],
    tags: [
      "Mixed-use development design",
      "Build-to-rent design",
      "Regeneration projects",
      "Masterplanning case studies",
      "BIM modelling services",
      "3D visualisation and rendering",
    ],
    images: ["/digbeth-1.webp", "/digbeth-2.webp"],
    gradient: "from-gold/10 to-navy/10",
  },
  {
    slug: "selly-oak-student-complex",
    title: "Selly Oak Student Complex",
    category: "Mixed-Use & Institutional",
    sector: "Student & Specialist Living",
    summary:
      "Purpose-built student accommodation near the university, with the planning approach carried across to care home design.",
    location: "Selly Oak, Birmingham",
    brief: [
      "Selly Oak has a constant demand for good student housing close to the university and the hospital. The client wanted a purpose-built student scheme on an infill site, with cluster flats, shared social space and a layout that respected the neighbouring streets.",
      "The same client was also exploring care home design and planning for a separate site, so the project drew on a shared understanding of what both building types demand: communal space, careful circulation, strong fire strategies and homely, well-lit rooms.",
    ],
    services: [
      "Student accommodation planning: unit mix, cluster layouts and shared amenity, tested against local policy",
      "Care home design and planning advice for the client's second site, covering room standards, communal space and staff areas",
      "Planning drawings: site plans, floor plans, elevations and sections for the application",
      "Technical drawings developed for construction, including typical room and cluster details",
    ],
    outcome: [
      "The planning drawings set out clearly how the scheme would sit in its context, and the layout gave students comfortable rooms and shared spaces that suit living together.",
      "Because the design team had worked on both student and care accommodation, the client benefited from one consistent approach to circulation, fire safety and communal space across both projects.",
    ],
    tags: [
      "Student accommodation planning",
      "Care home design and planning",
      "Technical drawings",
      "Planning drawings",
    ],
    images: ["/selly-oak-student-1.webp"],
    gradient: "from-navy/10 to-gold/10",
  },
  {
    slug: "edgbaston-community-health-learning-hub",
    title: "Edgbaston Community Health & Learning Hub",
    category: "Mixed-Use & Institutional",
    sector: "Education & Healthcare",
    summary:
      "A shared building bringing a community health clinic and learning spaces under one roof in Edgbaston.",
    location: "Edgbaston, Birmingham",
    brief: [
      "A community partnership wanted to bring a health clinic and adult learning space together in a single building in Edgbaston. The idea was that people visiting for a health appointment could also find out about courses and support on the same trip.",
      "Healthcare and education buildings each have strict technical requirements, from infection control and privacy to acoustics and accessibility. The challenge was to meet both sets of needs in one welcoming building.",
    ],
    services: [
      "Healthcare building design: consulting rooms, waiting areas and clinical support spaces planned for privacy and infection control",
      "Education building design: flexible classrooms, a training room and a community café",
      "BIM modelling services: coordination of structure, services and acoustics in one model",
      "Technical drawings for construction and tender",
      "Building regulations drawings covering accessibility, fire safety and ventilation",
    ],
    outcome: [
      "The BIM model let the team resolve clashes between structure, ventilation and acoustic separation on screen, well before work started on site.",
      "The completed design places the clinic and learning spaces around a shared welcome area, so the two uses support each other. The building regulations drawings were prepared alongside the technical set, giving the contractor one coordinated package.",
    ],
    tags: [
      "Education building design",
      "Healthcare building design",
      "Technical drawings",
      "Building regulations drawings",
      "BIM modelling services",
    ],
    images: ["/edgbaston-hub-1.webp", "/edgbaston-hub-2.webp"],
    gradient: "from-gold/10 to-navy/10",
  },
  {
    slug: "aston-logistics-distribution-park",
    title: "Aston Logistics & Distribution Park",
    category: "Industrial & Strategic",
    sector: "Logistics & Industrial",
    summary:
      "A brownfield site in Aston masterplanned as a modern distribution park with flexible warehouse units.",
    location: "Aston, Birmingham",
    brief: [
      "A landowner in Aston wanted to bring a long-disused industrial site back into productive use as a logistics and distribution park. The site had a complicated history, with uneven ground, old foundations and awkward access, and the client needed a clear picture of what it could take.",
      "The brief was industrial and warehouse design at a strategic scale: a masterplan for the whole site that offered flexible units for different occupiers, with proper lorry circulation, parking and landscaping.",
    ],
    services: [
      "Topographical survey of the whole site to record levels, drainage and existing structures",
      "Masterplanning: unit sizes, yard depths, access and circulation tested against occupier needs",
      "Industrial and warehouse design: unit layouts, loading docks, office pods and mezzanine options",
      "As-built drawings of retained structures and boundaries",
      "Planning drawings for the outline and phased applications",
    ],
    outcome: [
      "The survey and masterplan gave the landowner a realistic view of what the site could deliver, and the flexible unit sizes let the scheme respond to different occupiers.",
      "The planning drawings explained the scheme's access, circulation and landscaping clearly, showing how a former industrial site could be brought back into use in a way that works for its neighbours as well as its occupiers.",
    ],
    tags: [
      "Industrial and warehouse design",
      "Topographical survey",
      "Masterplanning case studies",
      "Planning drawings",
      "As-built drawings",
    ],
    images: ["/aston-logistics-1.webp", "/aston-logistics-2.webp"],
    gradient: "from-navy/10 to-gold/10",
  },
  {
    slug: "sutton-coldfield-heritage-barns-estate",
    title: "Sutton Coldfield Heritage Barns & Estate",
    category: "Heritage & Rural",
    sector: "Historic Buildings & Rural Schemes",
    summary:
      "A listed barn group and estate buildings near Sutton Coldfield, refurbished and converted into homes.",
    location: "Sutton Coldfield",
    brief: [
      "An estate on the edge of Sutton Coldfield included a group of historic barns, some of them listed, that had fallen out of agricultural use and were deteriorating. The owners wanted to secure their future by converting them into homes, without losing what makes them special.",
      "This called for a sensitive approach to listed building refurbishment and barn conversion design: understanding the buildings first, then finding a new use that respected their structure, materials and setting.",
    ],
    services: [
      "Measured building survey of every barn, recording timber frames, brickwork, roof structures and openings",
      "Concept design services: options for dividing the barns into homes while keeping the open volumes and original openings",
      "Barn conversion design: layouts that work with the existing frame rather than against it",
      "Listed building refurbishment: repair strategies and details for historic fabric, prepared for listed building consent",
      "Floor plans and elevations, existing and proposed, with annotated records of what is retained and what is new",
      "3D visualisation and rendering to explain the proposals to the owners, the conservation officer and the wider estate",
    ],
    outcome: [
      "The detailed survey gave the conservation officer confidence that the proposals were based on a proper understanding of the buildings, and the visuals made it easy to see how the barns' character would be kept.",
      "The scheme gives the historic buildings a secure future as homes, keeping their open roof spaces, timber frames and original openings, and sets a standard for the care of the rest of the estate.",
    ],
    tags: [
      "Listed building refurbishment",
      "Barn conversion design",
      "Measured building survey",
      "Floor plans and elevations",
      "3D visualisation and rendering",
      "Concept design services",
    ],
    images: ["/heritage-barns-1.webp", "/heritage-barns-2.webp"],
    gradient: "from-gold/10 to-navy/10",
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}
