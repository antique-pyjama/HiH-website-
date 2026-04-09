import Image from "next/image";
import { CTAButton } from "@/components/CTAButton";
import { ContentSection } from "@/components/ContentSection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { HeroSection } from "@/components/HeroSection";
import { NewsletterForm } from "@/components/NewsletterForm";
import { TourGrid } from "@/components/TourGrid";
import { TrustPoints } from "@/components/TrustPoints";
import { buildMetadata } from "@/lib/metadata";
import { featuredTours, homepageContent, siteSettings } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Halal-friendly Hamburg tours for Muslim travellers",
  description:
    "Discover premium halal-vetted food tours, walking tours, and Muslim-friendly city experiences in Hamburg.",
  pathname: "/",
});

export default function Home() {
  const faqPreview = homepageContent.faqPreviewCount;
  const organisationSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteSettings.siteName,
    url: siteSettings.domain,
    description: siteSettings.description,
    email: siteSettings.contactEmail,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hamburg",
      addressCountry: "DE",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homepageContent.faqPreview.slice(0, faqPreview).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <HeroSection
        eyebrow={homepageContent.hero.eyebrow}
        title={homepageContent.hero.title}
        accent={homepageContent.hero.accent}
        description={homepageContent.hero.description}
        primaryCta={{
          href: homepageContent.hero.primaryCtaHref,
          label: homepageContent.hero.primaryCtaLabel,
        }}
        secondaryCta={{
          href: homepageContent.hero.secondaryCtaHref,
          label: homepageContent.hero.secondaryCtaLabel,
        }}
        imageSrc={homepageContent.hero.image}
        imageAlt={homepageContent.hero.imageAlt}
        asideLabel={homepageContent.hero.asideLabel}
        asideValue={homepageContent.hero.asideValue}
      />

      <ContentSection tone="muted" className="overflow-hidden">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative mx-auto w-full max-w-[480px] lg:mx-0">
            {/* TODO: Replace editorial placeholder artwork with founder-approved Hamburg photography. */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-panel">
              <Image
                src={homepageContent.intro.image}
                alt={homepageContent.intro.imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <div className="absolute -bottom-5 right-5 flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-primary text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-soft">
              Vet
            </div>
          </div>
          <div className="max-w-2xl lg:pl-12">
            <p className="eyebrow mb-5 text-secondary">{homepageContent.intro.eyebrow}</p>
            <h2 className="max-w-xl text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
              {homepageContent.intro.title}{" "}
              <span className="text-secondary">{homepageContent.intro.highlight}</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-foreground-muted">
              {homepageContent.intro.description}
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {homepageContent.intro.stats.map((stat) => (
                <div key={stat.label} className="space-y-2 rounded-[1.5rem] bg-panel px-6 py-5">
                  <p className="font-heading text-3xl font-extrabold tracking-tight text-primary">
                    {stat.value}
                  </p>
                  <p className="text-sm uppercase tracking-[0.22em] text-foreground-soft">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection
        id="trust"
        eyebrow="Why travellers trust us"
        title="Muslim-friendly city experiences, checked with care"
        description={homepageContent.positioning}
      >
        <TrustPoints points={homepageContent.trustPoints} />
      </ContentSection>

      <ContentSection
        id="featured-tours"
        tone="default"
        eyebrow="Featured tours"
        title="Verified routes through the Hamburg you actually came to experience"
        description="The MVP begins with three flagship experiences designed to move guests from curiosity to booking in a few clear steps."
        action={
          <CTAButton href="/tours" variant="tertiary" eventName="view_all_tours_click">
            Browse all tours
          </CTAButton>
        }
      >
        <TourGrid tours={featuredTours} />
      </ContentSection>

      <ContentSection
        tone="sand"
        eyebrow="Why book with us"
        title="A calmer alternative to nightlife-first city tourism"
        description={homepageContent.valueSection.description}
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {homepageContent.valueSection.points.map((point) => (
            <article key={point.title} className="tonal-card rounded-[2rem] px-7 py-8">
              <p className="eyebrow mb-4 text-secondary">{point.kicker}</p>
              <h3 className="text-2xl font-bold tracking-tight text-primary">{point.title}</h3>
              <p className="mt-4 text-base leading-7 text-foreground-muted">
                {point.description}
              </p>
            </article>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        id="faq-preview"
        eyebrow="Questions, answered"
        title="Everything guests usually ask before they reserve"
        description="Keep the decision simple: what halal means on tour, who the tours are for, and how booking works."
        action={
          <CTAButton href="/information" variant="secondary">
            View full information
          </CTAButton>
        }
      >
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <FAQAccordion items={homepageContent.faqPreview.slice(0, faqPreview)} />
          <div className="rounded-[2rem] bg-primary px-8 py-10 text-white shadow-soft">
            <p className="eyebrow text-white/70">Need a quick answer?</p>
            <h3 className="mt-4 text-3xl font-bold tracking-tight">
              Share your travel dates and we will guide you to the right experience.
            </h3>
            <p className="mt-5 max-w-md text-base leading-7 text-white/78">
              Ideal for first-time visitors, families, and travellers who want reliable halal
              food guidance without wasting time cross-checking every stop.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <CTAButton
                href="/contact"
                variant="secondary"
                className="border-white/25 text-white hover:bg-white/10"
              >
                Contact us
              </CTAButton>
              <CTAButton
                href={siteSettings.primaryBookingUrl}
                variant="primary"
                className="bg-white text-primary hover:bg-white/90"
                external
                eventName="homepage_primary_booking_click"
              >
                Book with FareHarbor
              </CTAButton>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection tone="forest" className="relative overflow-hidden">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-xl">
            <p className="eyebrow text-white/65">Stay informed</p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Receive new tours, seasonal food finds, and practical Muslim travel notes for
              Hamburg.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/74">
              {siteSettings.newsletterBlurb}
            </p>
          </div>
          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <NewsletterForm />
          </div>
        </div>
      </ContentSection>
    </>
  );
}
