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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((item) => item.slug === slug);

  if (!service) {
    return { title: "Service not found" };
  }

  return {
    title: service.label,
    description: `${service.short} Based in Birmingham and working across the West Midlands.`,
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
