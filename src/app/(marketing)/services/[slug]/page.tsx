import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/constants";
import { canonical } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/ui/JsonLd";
import { ServiceDetail } from "./ServiceDetail";
import { InteriorVisualisation } from "./InteriorVisualisation";
import { ExteriorRendering } from "./ExteriorRendering";
import { ServiceSalesPage } from "./ServiceSalesPage";
import { SALES_CONTENT } from "./serviceSalesContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

/** Search metadata per service, where the generic title and description undersell the page. */
const SEO: Record<string, { title: string; description: string; keywords: string[] }> = {
  "3d-visualisation": {
    title: "3D Visualisation & Rendering Services",
    description:
      "Photorealistic 3D visualisation and CGI rendering for designers, developers and homeowners: 2D plan to 3D image, interior and exterior visuals, property marketing, virtual staging and animation. Working with clients across England.",
    keywords: [
      "3D visualisation",
      "3D visualisation services",
      "3D rendering services",
      "CGI rendering",
      "2D plan to 3D image",
      "plan-based 3D modelling",
      "investor-ready visuals",
      "photorealistic CGI",
      "property CGI",
      "photomontage CGI",
      "off-plan marketing",
      "England",
    ],
  },
  "interior-visualisation": {
    title: "Interior Visualisation & 3D Interior Rendering",
    description:
      "Interior rendering and room design visuals for interior designers, developers and homeowners. Kitchen, bedroom, bathroom and commercial interior CGI, produced from your plans. Working across England.",
    keywords: [
      "interior rendering",
      "interior visualisation",
      "room design visuals",
      "residential interior CGI",
      "commercial interior visuals",
      "kitchen CGI",
      "bedroom interior rendering",
      "bathroom CGI",
      "designer pitch imagery",
      "England",
    ],
  },
  "virtual-staging": {
    title: "Virtual Staging for Vacant Properties",
    description:
      "Virtual home staging that turns photographs of empty rooms into furnished, market-ready images, with lighting and colour matched to the original photo. Domestic and commercial. Working across England.",
    keywords: [
      "virtual home staging",
      "vacant property furnishing",
      "empty room transformation",
      "photo-matched lighting and colour",
      "digitally dressed rooms",
      "domestic and commercial staging",
      "England",
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
      `${service.short} Working with clients across England.`,
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
      ) : service.slug === "exterior-rendering" ? (
        <ExteriorRendering />
      ) : SALES_CONTENT[service.slug] ? (
        <ServiceSalesPage content={SALES_CONTENT[service.slug]} />
      ) : (
        <ServiceDetail service={service} />
      )}
    </>
  );
}
