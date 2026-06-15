import { ContactForm } from "@/components/ContactForm";
import { ContentSection } from "@/components/ContentSection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { buildMetadata } from "@/lib/metadata";
import { homepageContent, siteSettings } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Contact Halal in Hamburg",
  description:
    "Send an inquiry, request a private group walking tour, or ask practical Muslim-friendly travel questions before booking.",
  pathname: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <ContentSection
        eyebrow="Contact"
        title="Planning a visit, private group, or custom request?"
        description="Planning to visit Hamburg? Whether as a family, group, individual, or custom request, we welcome you to use the form for questions, early booking support, and general inquiries."
        headingLevel="h1"
      >
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <ContactForm />
          <aside className="space-y-6">
            <div className="rounded-[2rem] bg-primary px-8 py-9 text-white shadow-soft">
              <p className="eyebrow text-white/70">Direct contact</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight">
                A thoughtful reply, not a generic autoresponder
              </h2>
              <div className="mt-6 space-y-4 text-base leading-7 text-white/78">
                <p>
                  <strong className="text-white">Email:</strong> {siteSettings.contactEmail}
                </p>
                <p>
                  <strong className="text-white">Phone:</strong> {siteSettings.contactPhone}
                </p>
                <p>
                  <strong className="text-white">WhatsApp:</strong> {siteSettings.contactWhatsApp}
                </p>
                <p>
                  <strong className="text-white">Base:</strong> {siteSettings.contactLocation}
                </p>
                <p>
                  <strong className="text-white">Response window:</strong> Usually within one
                  business day
                </p>
              </div>
            </div>
            <div className="tonal-card rounded-[2rem] p-8">
              <p className="eyebrow text-secondary">What to include</p>
              <ul className="mt-5 space-y-4 text-base leading-7 text-foreground-muted">
                <li>Your travel dates and group size</li>
                <li>Whether you are booking as a family, group, individual, or private request</li>
                <li>Any accessibility, prayer-break, or halal food preference details we should know</li>
              </ul>
            </div>
          </aside>
        </div>
      </ContentSection>

      <ContentSection tone="muted" eyebrow="Quick answers" title="Frequently asked before guests hit Book Now">
        <FAQAccordion items={homepageContent.faqPreview} />
      </ContentSection>
    </>
  );
}
