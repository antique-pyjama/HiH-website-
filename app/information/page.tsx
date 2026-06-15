import { ContentSection } from "@/components/ContentSection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { buildMetadata } from "@/lib/metadata";
import { homepageContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "FAQ and information",
  description:
    "Read practical booking, Muslim-friendly, and on-tour information for Halal in Hamburg before reserving.",
  pathname: "/information",
});

export default function InformationPage() {
  return (
    <>
      <ContentSection
        eyebrow="Information"
        title="Practical guidance before you reserve"
        description="Our tours stand out in their personalization. You can let us know your wishes before the visit and we will do our best to realize what we can. Otherwise, let us surprise you with a unique travel experience in our beloved city."
        headingLevel="h1"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="tonal-card rounded-[2rem] p-7">
            <p className="eyebrow text-secondary">Authenticity</p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-primary">
              The real life of Hamburg
            </h2>
            <p className="mt-4 leading-7 text-foreground-muted">
              Our tours are designed to be authentic and personal. We care about your wants and
              needs and want to show you what real life in Hamburg feels like, not just generic
              sights you could find with a simple search.
            </p>
          </article>
          <article className="tonal-card rounded-[2rem] p-7">
            <p className="eyebrow text-secondary">Who our tours suit</p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-primary">
              Welcoming all thoughtful travellers
            </h2>
            <p className="mt-4 leading-7 text-foreground-muted">
              Our tours suit all travellers who want to experience real Hamburg culture. Whether
              Muslim or not, and wherever you are from, we love welcoming guests and designing
              flexible experiences that fit the people joining them.
            </p>
          </article>
          <article className="tonal-card rounded-[2rem] p-7">
            <p className="eyebrow text-secondary">Transparency</p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-primary">
              Honest guidance, carefully checked
            </h2>
            <p className="mt-4 leading-7 text-foreground-muted">
              We are transparent about what we tell you. We are not sheikhs, but two young adult
              Muslims who have spent almost our whole lives in Hamburg. We know where you can pray,
              where you can eat, and what parts of the city are worth seeing. For religious matters,
              we stay in contact with local imams and mosque authorities.
            </p>
          </article>
        </div>
      </ContentSection>

      <ContentSection tone="sand" eyebrow="Benefits" title="Helpful extras for your holiday in Hamburg">
        <div className="tonal-card max-w-4xl rounded-[2rem] p-8">
          <p className="text-lg leading-8 text-foreground-muted">
            Besides the tour itself, we provide free PDFs such as mosque guides and food guides to
            support your wider holiday in Hamburg. The goal is not only to guide one walk, but to
            make the rest of your stay easier too.
          </p>
        </div>
      </ContentSection>

      <ContentSection tone="muted" eyebrow="FAQ" title="Common questions">
        <FAQAccordion items={homepageContent.faqPreview} />
      </ContentSection>
    </>
  );
}
