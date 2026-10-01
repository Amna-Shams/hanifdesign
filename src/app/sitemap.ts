import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/constants";
import { PROJECTS } from "@/lib/projects";
import { SITE_URL as BASE_URL } from "@/lib/site";

/**
 * Routes that change rarely get a lower priority / yearly cadence. The legal
 * pages (/privacy, /terms, /cookies) are deliberately noindex, so they are left
 * out of the sitemap rather than listed and then refused.
 */
const LOW_FREQUENCY = new Set(["/sitemap"]);

const STATIC_ROUTES = [
  "",
  "/about",
  "/services",
  "/projects",
  "/faq",
  "/contact",
  "/quote",
  "/sitemap",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => {
    const isLow = LOW_FREQUENCY.has(route);
    return {
      url: `${BASE_URL}${route}`,
      lastModified: now,
      changeFrequency: isLow ? "yearly" : "weekly",
      priority: route === "" ? 1 : isLow ? 0.5 : 0.8,
    };
  });

  // Service and project routes are derived from the canonical catalogues, so
  // this file can never list a page that does not exist.
  const serviceEntries: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const projectEntries: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...serviceEntries, ...projectEntries];
}
