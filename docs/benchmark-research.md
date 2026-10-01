# Benchmark Research — UK Planning Consultancies

**Date:** 30 September 2026
**Category:** Business / Corporate (B2B professional services)
**Competitors reviewed:** 8

---

## 1. Sites selected

| Site | Positioning | Region | Why selected |
|---|---|---|---|
| [WPS Planning](https://www.wpsplanning.co.uk/) | Independent planning consultants | Horsham, West Sussex | **Closest analogue.** Solo-practitioner tone, 19+ years, "will it get approved?" hook, case studies |
| [Base Planning Consultants](https://baseplanning.uk/) | RTPI chartered member | Exeter + London | **Closest on rigour.** Lists every application type and publishes statutory fees |
| [Polden Planning](https://www.poldenplanning.co.uk/services) | Specialist consultancy | Somerset / South West | Deep technical service list incl. S.73, S.96a, lawful use certificates |
| [Hua Yu Planning](https://huayuplanning.co.uk/) | Planning + architecture | North London | Same dual discipline as us; in-house planners *and* architects |
| [Rodway Planning](https://www.rodwayplanning.co.uk/) | Town planning practice | Shoreham-by-Sea | Segment-led IA: Householder / Commercial / Rural. Very old site (2018 copyright) |
| [planning-consultants.uk](https://planning-consultants.uk/) | National | UK-wide | Publishes an indicative fee range (£500–£10,000+). SEO-led, location pages |
| [Planning Services UK](https://www.planning-services.co.uk/) | National | Glasgow + London | Multi-region variant pages; weak on detail |
| [loftconversionbirmingham.uk](https://loftconversionbirmingham.uk/) | **Direct local competitor** | Birmingham (Selly Oak) | Same city, same service, aggressive "BOOK A FREE CONSULTATION" repetition |

---

## 2. What competitors do well (worth adopting)

1. **Publishing an indicative price range.** planning-consultants.uk states £500–£10,000+; Planning Consultancy Solutions states £450 for a basic pre-app rising to £5,000+. Visitors arrive from "how much does X cost" searches. **We currently publish no fees at all** — only council fees inside the FAQ.
2. **Naming the exact application types.** Base Planning lists Householder / Full / Outline / Prior Approval / Reserved Matters / Listed Building / Lawful Development Certificate by name. This captures long-tail search and sets expectations. Our service pages are broader but less specific.
3. **Leading with a single question.** WPS Planning's entire hero is *"Will it get approved?"* — the exact anxiety of the audience. Our hero leads with credentials ("30+ years, 500+ projects").
4. **A defined, numbered process.** WPS uses 4 steps; we use 4 steps. This is parity, and worth keeping.
5. **Case studies with a stated outcome.** WPS leads with "Planning Appeal Success — Turning a Refusal Into an Approved Permission". Our project pages have real outcome data ("Approved with conditions") but no narrative challenge → result framing.
6. **Segment-led navigation by client type.** Rodway splits Householder / Commercial / Rural as the primary IA. Our "Industries & Client Types" section covers this but is a mid-page section, not top-level navigation.
7. **Publishing statutory fees.** Base Planning quotes £206 householder / £462 full application. Our FAQ does this too — a genuine strength, but buried in the accordion.

## 3. What competitors do badly (avoid)

1. **Keyword-stuffed service pages.** Several sites run a "Planning consultancy solutions" page that repeats the phrase dozens of times and answers a question nobody asked. Obvious SEO gaming; reads as machine-written.
2. **"Free consultation" spam.** loftconversionbirmingham.uk repeats *BOOK A FREE CONSULTATION WITH US TODAY* roughly six times per page alongside two near-identical contact forms. Actively hostile.
3. **Stale copyright years.** Rodway: "© 2018". Planning Services UK: "© 2026 – Designed by Kustom Dezign" — an agency credit left on a live site.
4. **Fake testimonials.** Multiple sites show testimonials with single-name attributions ("— Jenny L."). Not credible for professional services; a regulator or competitor can trivially challenge them.
5. **Broken internal IA.** planning-services.co.uk interleaves "England / Scotland / Wales / N. Ireland" as *Quick Links* directly under the hero. Confusing.
6. **CMS footguns.** Huayu Planning's footer reads "Created for free using WordPress and Kubio". Polden Planning's services page ends "Page updated | Google Sites".
7. **Generic stock photography** and inconsistent type scales — most of these sites would fail our contrast and tap-target checks.
8. **Unverifiable superlatives.** "Hundreds of transformations", "Royal Chartered Planners" (Hua Yu) — claims with no supporting detail.

## 4. Where we are already stronger

- **Accessibility.** Not one competitor publishes a WCAG-conformant site. All of ours pass AA in both themes (1,932 pairs checked, 0 failures).
- **Performance.** No competitor loads under ~200 KB of JS. Ours is route-split and AVIF-first.
- **Privacy.** Several competitors ship analytics and marketing pixels unconditionally. Ours loads zero third-party scripts and consent-gates the one embed.
- **Breadcrumb + structured data.** Base Planning and Rodway have neither. Ours emits ProfessionalService, BreadcrumbList and FAQPage JSON-LD.
- **Honest process.** Competitors promise approval; we publish realistic decision times (8–13 weeks) and outcomes including "Approved with conditions".

## 5. Concrete recommendations (not yet implemented)

Priority order — these are proposals, not changes:

1. **Publish an indicative fee range** on `/services` or `/quote`. Highest-value gap and directly answers the most common pre-enquiry question. Needs the client's real fee schedule.
2. **Lead the hero with the question, not the credentials.** Something like *"Will it get approved?"* with credentials as support. Matches the audience's actual anxiety.
3. **Add a "How much does X cost?" FAQ entry** covering our own consultancy fees, not just council fees.
4. **Name application types explicitly** (Householder, Full, Outline, Prior Approval, Lawful Development Certificate) — improves long-tail SEO and sets scope expectations.
5. **Reframe project pages as case studies** with Challenge → Approach → Outcome. We have the outcome data already.
6. **Consider client-type nav** (Householder / Commercial) alongside the existing industry section.

## 6. Regional finding — address verification

Birmingham City Council's own weekly planning lists (retrieved 30 Sep 2026) confirm the
registered office area is a genuine, active planning corridor — e.g. application
2026/01539/PA, "511 Hagley Road West, Quinton, Birmingham, B32 1HP", a variation of condition
for a two-storey side extension on the same street as the office.

**Resolved:** the client has confirmed that **369 Hagley Road West, Quinton, Birmingham, B32 2AL
is the only location**. The site previously mixed this with "Perry Barr" in seven copy strings
(Hero eyebrow and trust list, CredentialsBar, AboutSnapshot, About page subtitle and origin
sentence). All seven now read Quinton, so the marketing copy and the registered office agree.

Note for future copy: Quinton and Perry Barr are separate wards a few miles apart. Perry Barr
remains a real Birmingham district with its own planning committee, so it may legitimately appear
in a "we also cover…" service-area statement — but it must never be presented as the office
address.

## 7. Sources

- https://www.wpsplanning.co.uk/
- https://baseplanning.uk/
- https://www.poldenplanning.co.uk/services
- https://huayuplanning.co.uk/
- https://www.rodwayplanning.co.uk/
- https://planning-consultants.uk/
- https://planning-consultantservices.co.uk
- https://www.planning-services.co.uk/
- https://loftconversionbirmingham.uk/loft-conversions-selly-oak
- https://www.birmingham.gov.uk/download/downloads/id/31542/planning_applications_received_5_april_to_11_april_2026.pdf (Birmingham City Council weekly list — Perry Barr / Quinton applications)
- https://www.birmingham.gov.uk/planning