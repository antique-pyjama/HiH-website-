import type { Metadata } from "next";
import { siteSettings } from "@/lib/content";

type BuildMetadataOptions = {
  title: string;
  description: string;
  pathname: string;
};

export function buildMetadata({
  title,
  description,
  pathname,
}: BuildMetadataOptions): Metadata {
  const url = `${siteSettings.domain}${pathname}`;

  return {
    title,
    description,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteSettings.siteName,
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${siteSettings.siteName} preview image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
