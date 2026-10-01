import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CredentialsBar } from "@/components/home/CredentialsBar";
import { AboutSnapshot } from "@/components/home/AboutSnapshot";
import { CoreServices } from "@/components/home/CoreServices";
import { ProcessSection } from "@/components/home/ProcessSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Stats } from "@/components/home/Stats";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { TestimonialsExpanded } from "@/components/home/TestimonialsExpanded";
import { FAQPreview } from "@/components/home/FAQPreview";
import { CTABanner } from "@/components/home/CTABanner";
import { ConsultationStrip } from "@/components/home/ConsultationStrip";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: canonical("/") },
  title: "Hanif Design & Consultancy — Design Consultancy in Birmingham",
  description: "Trusted planning and design support for residential projects in Birmingham. Planning applications, building regulations support, design drawings, and development guidance.",
  openGraph: {
    title: "Hanif Design & Consultancy — Design Consultancy in Birmingham",
    description: "Trusted planning and design support for residential projects in Birmingham.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hanif Design & Consultancy",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CredentialsBar />
      <AboutSnapshot />
      <CoreServices />
      <ProcessSection />
      <FeaturedProjects />
      <Stats />
      <IndustriesSection />
      <WhyChooseUs />
      <TestimonialsExpanded />
      <FAQPreview />
      <CTABanner />
      <ConsultationStrip />
    </>
  );
}