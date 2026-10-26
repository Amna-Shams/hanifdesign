import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/constants";
import { canonical } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/ui/JsonLd";
import { ServiceDetail } from "./ServiceDetail";
import { InteriorVisualisation } from "./InteriorVisualisation";
import { FloorPlans } from "./FloorPlans";
import { VirtualStaging } from "./VirtualStaging";
import { ExteriorRendering } from "./ExteriorRendering";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

/** Search metadata per service, where the generic title and description undersell the page. */
const SEO: Record<string, { title: string; description: string; keywords: string[] }> = {
  "3d-visualisation": {
    title: "3D Architectural Visualisation & Rendering Services",
    description:
      "Photorealistic 3D visualisation and CGI rendering for architects, designers and developers: interior and exterior visuals, property marketing, virtual staging, VR and animation. Based in Birmingham, working across the UK.",
    keywords: [
      "3D visualisation",
      "3D architectural visualisation",
      "3D rendering services",
      "CGI rendering",
      "interior visualisation",
      "exterior visualisation",
      "property CGI",
      "photomontage CGI",
      "virtual staging",
      "VR and animation",
      "off-plan marketing",
      "Birmingham",
    ],
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((item) => item.slug === slug);

  if (!service) {
    return { title: "Service not found" };
  }

  const seo = SEO[service.slug];

  return {
    title: seo?.title ?? service.label,
    description:
      seo?.description ??
      `${service.short} Based in Birmingham and working across the West Midlands.`,
    ...(seo ? { keywords: seo.keywords } : {}),
    alternates: { canonical: canonical(`/services/${service.slug}`) },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES.find((item) => item.slug === slug);

  if (!service) notFound();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.label, path: `/services/${service.slug}` },
        ]}
      />
      {service.slug === "interior-visualisation" ? (
        <InteriorVisualisation />
      ) : service.slug === "3d-floor-plans" ? (
        <FloorPlans />
      ) : service.slug === "virtual-staging" ? (
        <VirtualStaging />
      ) : service.slug === "exterior-rendering" ? (
        <ExteriorRendering />
      ) : (
        <ServiceDetail service={service} />
      )}
    </>
  );
}
