import { ContentSection } from "@/components/ContentSection";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Impressum",
  description:
    "Placeholder impressum page for Halal in Hamburg. Replace with founder-provided legal company information before launch in Germany.",
  pathname: "/impressum",
});

export default function ImpressumPage() {
  return (
    <ContentSection
      eyebrow="Legal"
      title="Impressum"
      description="This placeholder page is included for MVP completeness and should be updated with the founder’s official business details before launch."
      headingLevel="h1"
    >
      <div className="tonal-card max-w-3xl rounded-[2rem] p-8 text-base leading-8 text-foreground-muted">
        {/* TODO: Replace with the official legal entity name, address, registration, and responsible person. */}
        <p>
          Halal in Hamburg
          <br />
          Hamburg, Germany
          <br />
          Email: hello@halalinhamburg.com
        </p>
        <p className="mt-6">
          Official provider information, VAT details, and responsible person details must be
          inserted here before public launch.
        </p>
      </div>
    </ContentSection>
  );
}
