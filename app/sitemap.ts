import type { MetadataRoute } from "next";
import { activeTours, siteSettings } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/tours",
    "/about",
    "/contact",
    "/information",
    "/privacy-policy",
    "/terms-and-conditions",
    "/impressum",
  ];

  return [
    ...staticPages.map((pathname) => ({
      url: `${siteSettings.domain}${pathname}`,
      lastModified: new Date(),
      changeFrequency: (pathname === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: pathname === "" ? 1 : 0.7,
    })),
    ...activeTours.map((tour) => ({
      url: `${siteSettings.domain}/tours/${tour.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];
}
