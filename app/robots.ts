import type { MetadataRoute } from "next";
import { siteSettings } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteSettings.domain}/sitemap.xml`,
    host: siteSettings.domain,
  };
}
