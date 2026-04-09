import { ContentSection } from "@/components/ContentSection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { buildMetadata } from "@/lib/metadata";
import { homepageContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "FAQ and information",
  description:
    "Read practical booking, halal suitability, and on-tour information for Halal in Hamburg before reserving.",
  pathname: "/information",
});

export default function InformationPage() {
  return (
    <>
      <ContentSection
        eyebrow="Information"
        title="Practical guidance before you reserve"
        description="This page keeps the MVP lean while still answering the essentials: how tours are vetted, how booking works, and what guests can expect on the day."
        headingLevel="h1"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="tonal-card rounded-[2rem] p-7">
            <p className="eyebrow text-secondary">Halal suitability</p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-primary">
              Clear notes, not vague promises
            </h2>
            <p className="mt-4 leading-7 text-foreground-muted">
              Each tour includes halal suitability notes, meal context where relevant, and space to
              flag your own requirements before the experience begins.
            </p>
          </article>
          <article className="tonal-card rounded-[2rem] p-7">
            <p className="eyebrow text-secondary">Booking flow</p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-primary">
              Direct FareHarbor links for speed
            </h2>
            <p className="mt-4 leading-7 text-foreground-muted">
              There is no custom booking engine in v1. All reserve buttons send guests directly to
              the relevant FareHarbor booking link.
            </p>
          </article>
          <article className="tonal-card rounded-[2rem] p-7">
            <p className="eyebrow text-secondary">Who it suits</p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-primary">
              Visitors who want culture without friction
            </h2>
            <p className="mt-4 leading-7 text-foreground-muted">
              These tours are designed for first-time travellers, couples, families, and thoughtful
              city explorers looking for a calmer alternative to nightlife tourism.
            </p>
          </article>
        </div>
      </ContentSection>

      <ContentSection tone="muted" eyebrow="FAQ" title="Common questions">
        <FAQAccordion items={homepageContent.faqPreview} />
      </ContentSection>
    </>
  );
}
