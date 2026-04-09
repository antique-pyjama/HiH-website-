import { ContentSection } from "@/components/ContentSection";
import { buildMetadata } from "@/lib/metadata";
import { legalContent } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Read the privacy policy placeholder and data-handling overview for Halal in Hamburg.",
  pathname: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const document = legalContent.privacyPolicy;

  return (
    <ContentSection
      eyebrow="Legal"
      title={document.title}
      description={document.intro}
      headingLevel="h1"
    >
      <div className="space-y-6">
        {document.sections.map((section) => (
          <article key={section.heading} className="tonal-card max-w-4xl rounded-[2rem] p-8">
            <h2 className="text-2xl font-bold tracking-tight text-primary">{section.heading}</h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-foreground-muted">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </ContentSection>
  );
}
