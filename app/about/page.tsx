import Image from "next/image";
import { CTAButton } from "@/components/CTAButton";
import { ContentSection } from "@/components/ContentSection";
import { TrustPoints } from "@/components/TrustPoints";
import { buildMetadata } from "@/lib/metadata";
import { homepageContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "About Halal in Hamburg",
  description:
    "Learn how Halal in Hamburg designs warm, Muslim-friendly walking tours with local insight, comfort, and respectful planning.",
  pathname: "/about",
});

export default function AboutPage() {
  return (
    <>
      <ContentSection
        eyebrow="About us"
        title="A modern Hamburg tour brand built around clarity, care, and cultural ease"
        description="Halal in Hamburg exists for Muslim travellers who want the richness of the city without navigating uncertainty around food, atmosphere, or prayer spaces."
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
              We are Sofiane and Momar, two young Muslims who grew up in a city we love and care
              for: Hamburg. Two years ago, we decided that we wanted change in our city and a more
              thoughtful way for Muslim travellers to experience it.
            </p>
            <p>
              What many people do not know is that Hamburg is becoming more and more Muslim
              friendly: more mosques, more halal food, and more attractions that make the port city
              feel genuinely welcoming.
            </p>
            <p>
              Our goal is to show you the hidden gems of our city. Hamburg deserves a better
              introduction than nightlife-heavy itineraries or vague food recommendations. As true
              locals, we want to show you worthwhile attractions, beautiful sites, parks, and
              peaceful neighborhoods instead of tourist traps.
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection
        tone="muted"
        eyebrow="How we work"
        title="Local care, real context, and mindful planning"
        description="We want every guest to feel welcomed, informed, and introduced to Hamburg with honesty rather than hype."
      >
        <TrustPoints points={homepageContent.trustPoints} />
      </ContentSection>

      <ContentSection
        tone="sand"
        eyebrow="What we want to show"
        title="The best parts of the city we grew up in"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="tonal-card rounded-[2rem] p-7">
            <h3 className="text-2xl font-bold tracking-tight text-primary">Hidden gems</h3>
            <p className="mt-4 leading-7 text-foreground-muted">
              We want to show you the parts of Hamburg that deserve your time, not just the places
              that appear on a quick tourist checklist.
            </p>
          </article>
          <article className="tonal-card rounded-[2rem] p-7">
            <h3 className="text-2xl font-bold tracking-tight text-primary">
              Peaceful neighborhoods
            </h3>
            <p className="mt-4 leading-7 text-foreground-muted">
              Alongside the better-known sights, we love sharing beautiful areas, parks, and calmer
              corners of the city that give a fuller picture of Hamburg life.
            </p>
          </article>
          <article className="tonal-card rounded-[2rem] p-7">
            <h3 className="text-2xl font-bold tracking-tight text-primary">
              Worthwhile attractions
            </h3>
            <p className="mt-4 leading-7 text-foreground-muted">
              We are keen on showing you what is actually worth visiting, instead of building tours
              around beer culture or overpriced attractions that miss the soul of the city.
            </p>
          </article>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Next step" title="See routes, compare formats, and reserve with confidence">
        <div className="rounded-[2rem] bg-primary px-8 py-10 text-white shadow-soft">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <p className="max-w-2xl text-lg leading-8 text-white/78">
              If you already know the style of experience you want, head straight to the tours or
              booking page. If not, the contact page is ready for private-group and custom route
              questions.
            </p>
            <div className="flex flex-wrap gap-4">
              <CTAButton href="/tours" variant="primary" className="bg-white text-primary hover:bg-white/90">
                View Tours
              </CTAButton>
              <CTAButton href="/booking" variant="secondary" className="border-white/25 text-white hover:bg-white/10">
                Book a Tour
              </CTAButton>
            </div>
          </div>
        </div>
      </ContentSection>
    </>
  );
}
