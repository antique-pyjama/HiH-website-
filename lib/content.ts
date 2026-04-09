import faqsJson from "@/content/faqs.json";
import homepageJson from "@/content/homepage.json";
import legalJson from "@/content/legal.json";
import siteSettingsJson from "@/content/site-settings.json";
import { tours } from "@/content/tours";
import { FAQItem, HomepageContent, LegalContent, SiteSettings, Tour } from "@/lib/types";

export const siteSettings = siteSettingsJson as SiteSettings;
export const homepageContent = {
  ...(homepageJson as HomepageContent),
  faqPreview: faqsJson as FAQItem[],
};
export const legalContent = legalJson as LegalContent;
export const allTours = tours as Tour[];
export const activeTours = allTours.filter((tour) => tour.active);
export const featuredTours = activeTours.filter((tour) => tour.featured);

export function getTourBySlug(slug: string) {
  return activeTours.find((tour) => tour.slug === slug);
}
