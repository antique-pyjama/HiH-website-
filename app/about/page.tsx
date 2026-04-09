import Image from "next/image";
import { ContentSection } from "@/components/ContentSection";
import { TrustPoints } from "@/components/TrustPoints";
import { buildMetadata } from "@/lib/metadata";
import { homepageContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "About Halal in Hamburg",
  description:
    "Learn how Halal in Hamburg researches, vets, and designs premium Muslim-friendly tours across Hamburg.",
  pathname: "/about",
});

export default function AboutPage() {
  return (
    <>
      <ContentSection
        eyebrow="About us"
        title="A modern Hamburg tour brand built around clarity, care, and cultural ease"
        description="Halal in Hamburg exists for Muslim travellers who want the richness of the city without navigating uncertainty around food, atmosphere, or suitability."
        headingLevel="h1"
      >
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-panel">
            {/* TODO: Replace with founder portrait or signature Hamburg street photography. */}
            <Image
              src="/images/about-editorial.svg"
              alt="Editorial illustration representing a calm Hamburg concierge-style travel experience"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <div className="max-w-2xl space-y-6 text-lg leading-8 text-foreground-muted">
            <p>
              We designed this company around a simple frustration: too many city experiences force
              Muslim visitors to choose between cultural depth and practical comfort. Hamburg
              deserves a better introduction than nightlife-heavy itineraries or vague food
              recommendations.
            </p>
            <p>
              Our tours pair warm hospitality with deliberate research. We focus on halal-vetted
              dining, clear meeting logistics, realistic pacing, and neighborhoods that reveal
              Hamburg’s architecture, trade history, and everyday texture.
            </p>
            <p>
              The result is a smaller, calmer, more trustworthy kind of city discovery: editorial
              in feel, personal in service, and ready for direct booking as the brand grows.
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection
        tone="muted"
        eyebrow="How we work"
        title="A research-led approach before a tour ever goes live"
        description="Each MVP tour is shaped to help travellers decide quickly and feel reassured before they arrive."
      >
        <TrustPoints points={homepageContent.trustPoints} />
      </ContentSection>

      <ContentSection
        tone="sand"
        eyebrow="Our promise"
        title="Premium without feeling precious"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="tonal-card rounded-[2rem] p-7">
            <h3 className="text-2xl font-bold tracking-tight text-primary">Trust first</h3>
            <p className="mt-4 leading-7 text-foreground-muted">
              We prefer clear expectations over inflated claims, especially when it comes to halal
              suitability and family comfort.
            </p>
          </article>
          <article className="tonal-card rounded-[2rem] p-7">
            <h3 className="text-2xl font-bold tracking-tight text-primary">
              Designed for real visitors
            </h3>
            <p className="mt-4 leading-7 text-foreground-muted">
              Routes, pacing, and stops are chosen for travellers who want substance, beautiful
              neighborhoods, and straightforward logistics.
            </p>
          </article>
          <article className="tonal-card rounded-[2rem] p-7">
            <h3 className="text-2xl font-bold tracking-tight text-primary">
              Built to scale carefully
            </h3>
            <p className="mt-4 leading-7 text-foreground-muted">
              The MVP launches with curated starter experiences and a content structure that can
              grow into founder-managed operations without a heavy CMS.
            </p>
          </article>
        </div>
      </ContentSection>
    </>
  );
}
