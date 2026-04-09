import { ContentSection } from "@/components/ContentSection";
import { TourGrid } from "@/components/TourGrid";
import { buildMetadata } from "@/lib/metadata";
import { activeTours } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Tours",
  description:
    "Explore all active halal-friendly tours from Halal in Hamburg, with direct FareHarbor booking links and clear trip details.",
  pathname: "/tours",
});

export default function ToursPage() {
  return (
    <>
      <ContentSection
        eyebrow="Tours"
        title="Choose from a focused set of halal-friendly Hamburg experiences"
        description="This MVP keeps the catalogue intentionally lean: a clearer decision path, stronger trust signals, and direct booking links for every active tour."
        headingLevel="h1"
      />
      <ContentSection tone="muted" className="pt-0">
        <TourGrid tours={activeTours} />
      </ContentSection>
    </>
  );
}
