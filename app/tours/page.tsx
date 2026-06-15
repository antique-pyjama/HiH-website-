import { CTAButton } from "@/components/CTAButton";
import { ContentSection } from "@/components/ContentSection";
import { TourGrid } from "@/components/TourGrid";
import { buildMetadata } from "@/lib/metadata";
import { activeTours } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Tours",
  description:
    "Explore all active Muslim-friendly walking tours from Halal in Hamburg, with clear route details and an easy booking flow.",
  pathname: "/tours",
});

export default function ToursPage() {
  return (
    <>
      <ContentSection
        eyebrow="Tours"
        title="Choose from Muslim-friendly walking tours across Hamburg"
        description="Compare public, private, family-friendly, and halal-conscious routes with clear pricing, meeting points, languages, and booking-ready details."
        headingLevel="h1"
        action={
          <CTAButton href="/booking" variant="primary">
            Book a Tour
          </CTAButton>
        }
      />
      <ContentSection tone="muted" className="pt-0">
        <TourGrid tours={activeTours} />
      </ContentSection>
    </>
  );
}
