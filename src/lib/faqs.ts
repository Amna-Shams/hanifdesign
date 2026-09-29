export interface FaqItem {
  q: string;
  a: string;
}

/**
 * Canonical FAQ content. Kept in one place so the homepage preview and the
 * full FAQ page can never drift apart.
 */
export const FAQS: readonly FaqItem[] = [
  {
    q: "Do I need planning permission for my extension?",
    a: "Many extensions fall under permitted development rights and don't require full planning permission. However, this depends on factors like property type, location, size, and previous alterations. We offer a free initial assessment to determine your route.",
  },
  {
    q: "How long does a planning application take?",
    a: "Householder applications typically take 8 weeks. Full planning applications take 13 weeks. Complex or major applications can take 16 weeks or more. Pre-application advice adds 3-4 weeks but often reduces the overall timeline by avoiding delays.",
  },
  {
    q: "What's the difference between planning permission and building regulations?",
    a: "Planning permission controls land use and appearance. Building regulations ensure structural safety, fire safety, energy efficiency, and accessibility. Most projects need both — they're separate applications to different council departments.",
  },
  {
    q: "How much does a planning application cost?",
    a: "Council fees are set nationally: £206 for householder and £462 for full planning. Our professional fees vary by project complexity — typically £1,500–£5,000 for householder, more for complex schemes. We provide fixed-fee quotes after an initial consultation.",
  },
  {
    q: "What happens if my application is refused?",
    a: "You can appeal (typically within 6 months for written representations). We review the refusal reasons, advise on your prospects, and can represent you. Our appeal success rate exceeds 70%. Alternatively, we can redesign and resubmit.",
  },
  {
    q: "Do I need a Design & Access Statement?",
    a: "They're required for major applications (10+ dwellings or 1,000+ sqm), listed building consent, and most conservation area proposals. Even where it isn't mandatory, a well-written statement strengthens your case by demonstrating policy compliance.",
  },
  {
    q: "Can you help with listed buildings or conservation areas?",
    a: "Yes. These require listed building consent (separate from planning permission) and often conservation area consent. We work regularly with heritage assets and bring in specialist consultants where needed.",
  },
  {
    q: "What is a Certificate of Lawfulness?",
    a: "A formal legal document confirming that existing or proposed development is lawful. There are two types: Existing Use (for works done 4+ years ago) and Proposed Use (for certainty before you build). It's often essential for mortgages and property sales.",
  },
  {
    q: "Do you offer fixed fees?",
    a: "Yes, for most standard services: householder applications, permitted development checks, lawful development certificates, and pre-application advice. More complex work such as appeals and major applications is quoted individually.",
  },
  {
    q: "What areas do you cover?",
    a: "Primarily Birmingham, Solihull, Sandwell, Dudley, Walsall, and Wolverhampton. We also work across the wider West Midlands and occasionally nationally for repeat clients. Local knowledge is our strength.",
  },
];
