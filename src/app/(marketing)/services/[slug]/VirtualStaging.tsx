import { BadgeCheck, Clock, RefreshCw } from "lucide-react";
import { PlanLayout, type PlanContent } from "./PlanLayout";

/**
 * Virtual Staging service page content. Image paths are placeholders from `public/` —
 * replace them with the real before/after pairs, the 360° panorama and the
 * 3D plan render.
 */
const CONTENT: PlanContent = {
  hero: {
    title: "Virtual Home Staging Services",
    subtitle: "The Ultimate Cutting-Edge Tool for Increasing Real Estate Sales",
    image: "/home-hero.webp",
  },
  ways: {
    title: "6 Ways You Can Sell More Properties Than Ever",
    sub: "With photorealistic virtual home staging services, you get everything you need in one place",
    perks: [
      { icon: Clock, title: "Fast Turnaround Time", text: "Time is money, so we agree a delivery date in the quote and keep to it." },
      { icon: RefreshCw, title: "2 Rounds of Free Revisions", text: "We will improve the images for free twice." },
      { icon: BadgeCheck, title: "Satisfaction Focused", text: "If you are not happy with the result, tell us and we will put it right." },
    ],
  },
  tabs: {
    ariaLabel: "Virtual staging services",
    defaultId: "virtual-staging",
    items: [
      { id: "virtual-staging", label: "Virtual Staging", icon: "sofa", kind: "slider", title: "Virtual Staging", text: "We take a vacant property photo and virtually furnish it, adding warmth and style.", image: "/spacious-loft-conversion-harborne-1.webp", alt: "Empty room beside the same room virtually furnished" },
      { id: "virtual-styling", label: "Virtual Styling", icon: "palette", kind: "slider", title: "Virtual Styling", text: "We restyle a furnished room with new décor, colour and accessories, so it appeals to more buyers.", image: "/new-build-family-home-sutton-coldfield-1.webp", alt: "Furnished room beside the same room restyled" },
      { id: "virtual-renovation", label: "Virtual Renovation", icon: "hammer", kind: "slider", title: "Virtual Renovation", text: "We show how a tired interior could look with new finishes, floors and fittings before any work begins.", image: "/office-to-residential-conversion-city-centre-1.webp", alt: "Dated interior beside the same interior renovated" },
      { id: "exterior-renovation", label: "Exterior Renovation", icon: "house", kind: "slider", title: "Exterior Renovation", text: "We refresh the outside of a property, from the front elevation to the garden and drive.", image: "/two-storey-side-extension-four-oaks-1.webp", alt: "House exterior beside the same exterior renovated" },
      { id: "360-view", label: "360° View", icon: "rotate", kind: "tour", title: "360° View", text: "Let buyers look around a staged room in every direction.", image: "/hmo-development-selly-oak-2.webp", alt: "Panoramic view of a staged room" },
      { id: "3d-plan", label: "3D Plan", icon: "grid", kind: "plan", title: "3D Plan", text: "A furnished 3D floor plan shows the whole layout at a glance, so buyers understand how the home works.", image: "/floorplan-hero.webp", alt: "Furnished 3D floor plan of a home" },
    ],
  },
  solutions: {
    title: "Solutions That Will Boost Your Ads",
    sub: "We create real estate marketing imagery that inspires people and makes them call for viewing appointments. Need proof? Take a look at our work.",
    images: [
      "/spacious-loft-conversion-harborne-1.webp",
      "/new-build-family-home-sutton-coldfield-1.webp",
      "/hmo-development-selly-oak-2.webp",
    ],
    cta: "Portfolio",
    href: "/projects",
  },
  reasons: {
    title: "We Take Real Estate Ad Imagery to the Art Level",
    sub: "Wonder how? Here are 6 reasons we turn vacant photographs into real masterpieces",
    items: [
      ["1. Large Furniture Library", "You get access to our library of furniture and décor, so rooms are staged with pieces that suit the property and the buyer."],
      ["2. Design Experts at Your Service", "Appealing design does more than please the eye: it helps buyers picture themselves in the home. Our designers choose styles to match your target audience."],
      ["3. Responsive Support", "Every minute counts when selling a property, so we reply quickly and agree delivery dates up front. You can ask for changes or add something to the image at any point."],
      ["4. Perfect Lighting and Reflections", "To make the image a buyer's magnet, we match the real light in the space and add careful reflections, so staged furniture sits naturally in the photo."],
      ["5. 100% Photorealistic Materials", "The impact of the image depends on materials. If the picture makes you want to touch the chair upholstery or the cool marble countertop, the buyer will feel it too."],
      ["6. 100% Photorealistic Proportions", "Every piece is scaled to the room, so you never see tiny chairs next to a giant table. Everything in your pictures looks right."],
    ],
    images: [
      "/hmo-development-selly-oak-1.webp",
      "/rear-home-extension-edgbaston-2.webp",
      "/garden-office-studio-bournville-1.webp",
      "/spacious-loft-conversion-harborne-2.webp",
      "/new-build-family-home-sutton-coldfield-2.webp",
      "/two-storey-side-extension-four-oaks-2.webp",
    ],
  },
  workflow: {
    title: "Workflow",
    steps: [
      { title: "1. Set the task", text: "Starting a project is a piece of cake. All you need is to specify a few details and we are ready to go.", list: ["send us a photo", "choose a style", "select furniture"], image: "/garage-conversion-kings-heath-1.webp" },
      { title: "2. Communicate", text: "Communicate easily with the team and track your ongoing tasks using our online platform.", list: ["talk to your project manager", "add corrections", "store results"], image: "/rear-home-extension-edgbaston-1.webp" },
      { title: "3. Use results", text: "Finally, get your show-stopping visuals, which you can use for all your marketing and sales assets.", list: ["on property listings", "on your website", "on social media"], image: "/two-storey-side-extension-four-oaks-1.webp" },
    ],
  },
  impressed: {
    title: "Impressed? And That’s Far From All.",
    sub: "By working with us, you automatically get:",
    items: [
      { lead: "Unlimited online storage", rest: "for your images in our project platform" },
      { lead: "2 free rounds of revisions", tan: true, rest: "— you can come back twice and ask for adjustments to any picture" },
      { lead: "PDF specification", tan: true, rest: "for all the furniture used in the project" },
    ],
  },
  faq: {
    title: "Virtual Staging FAQ",
    sub: "Everything realtors usually ask us about virtual home staging services, prices and turnaround, collected in one place.",
    items: [
      ["How much does virtual staging cost?", "The price depends on the number of images and the level of work. Send us your photos and we will give you a fixed quote."],
      ["Do you stage exteriors too?", "Yes. We can refresh the outside of a property, from the front elevation to the garden and drive."],
      ["How fast will I get the staged photos?", "We agree a delivery date in the quote. Sets of several rooms are produced in parallel."],
      ["Do you work with agencies and photographers?", "Yes. Many of our clients are estate agents and photographers who send us photos for a whole portfolio of properties."],
      ["What do I need to send to start?", "A photo of each room, the style you want, and any furniture you would like us to use. That is enough to begin."],
      ["Do you only do virtual staging?", "No. We also offer virtual styling, virtual renovation, exterior renovation, 360° views and 3D plans."],
      ["Can you stage occupied or furnished homes?", "Yes. We can restyle a furnished room, or remove existing items and stage it afresh."],
      ["Should buyers be told the photos are staged?", "Yes. We recommend labelling staged images clearly, so buyers know what they are looking at. It is also good practice and helps build trust."],
    ],
  },
  contactSubject: "Virtual staging enquiry",
};

export function VirtualStaging() {
  return <PlanLayout content={CONTENT} />;
}
