import { CTAButton } from "@/components/CTAButton";
import { ContentSection } from "@/components/ContentSection";

export default function NotFound() {
  return (
    <ContentSection
      eyebrow="Not found"
      title="This page is not available"
      description="The route may have changed, or the tour is no longer active."
      headingLevel="h1"
    >
      <div className="flex flex-wrap gap-4">
        <CTAButton href="/tours" variant="primary">
          Browse tours
        </CTAButton>
        <CTAButton href="/" variant="secondary">
          Return home
        </CTAButton>
      </div>
    </ContentSection>
  );
}
