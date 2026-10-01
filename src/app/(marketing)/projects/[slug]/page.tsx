import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProjectDetail } from "./ProjectDetail";
import { PROJECTS, type Project } from "@/lib/projects";
import { canonical } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/ui/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function findProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: `${project.summary} A ${project.category.toLowerCase()} planning and design project in ${project.location}, delivered by Hanif Design & Consultancy.`,
    alternates: { canonical: canonical(`/projects/${project.slug}`) },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ]}
      />
      <ProjectDetail project={project} />
    </>
  );
}
