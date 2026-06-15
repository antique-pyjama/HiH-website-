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
  title: "Muslim-friendly walking tours in Hamburg",
  description:
    "Book warm, respectful guided walking tours in Hamburg with halal-conscious recommendations, family-friendly pacing, and prayer-break awareness.",
  pathname: "/",
});

export default function Home() {
  const faqPreview = homepageContent.faqPreviewCount;

  const organisationSchema = {
    "@context": "https://schema.org",
    "@type": "TouristInformationCenter",
    name: siteSettings.siteName,
    url: siteSettings.domain,
    description: siteSettings.description,
    email: siteSettings.contactEmail,
    telephone: siteSettings.contactPhone,
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
        tertiaryCta={{
          href: homepageContent.hero.tertiaryCtaHref,
          label: homepageContent.hero.tertiaryCtaLabel,
        }}
        imageSrc={homepageContent.hero.image}
        imageAlt={homepageContent.hero.imageAlt}
        asideLabel={homepageContent.hero.asideLabel}
        asideValue={homepageContent.hero.asideValue}
        highlights={homepageContent.hero.highlights}
        metrics={homepageContent.hero.metrics}
      />

      <ContentSection tone="muted" className="overflow-hidden">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="relative mx-auto w-full max-w-[500px] lg:mx-0">
            {/* TODO: Replace editorial placeholder artwork with verified founder photography of Hamburg routes. */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-panel shadow-soft">
              <Image
                src={homepageContent.intro.image}
                alt={homepageContent.intro.imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <div className="absolute -bottom-6 left-6 rounded-[1.7rem] bg-primary px-5 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-white shadow-soft">
              Family-aware pacing
            </div>
          </div>

          <div className="max-w-2xl lg:pl-10">
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
                <div
                  key={stat.label}
                  className="rounded-[1.6rem] border border-white/60 bg-white/80 px-6 py-5 shadow-soft"
                >
                  <p className="font-heading text-3xl font-extrabold tracking-tight text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm uppercase tracking-[0.2em] text-foreground-soft">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection
        eyebrow="Why travellers trust us"
        title="Walking tours designed for comfort, clarity, and local insight"
        description={homepageContent.positioning}
      >
        <TrustPoints points={homepageContent.trustPoints} />
      </ContentSection>

      <ContentSection
        tone="sand"
        eyebrow="How booking works"
        title="A simple path from curiosity to confirmed tour request"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              step: "01",
              title: "Compare routes",
              description:
                "Browse Muslim-friendly Hamburg tours with clear notes on pacing, meeting points, languages, and what is included.",
            },
            {
              step: "02",
              title: "Choose a time slot",
              description:
                "Pick your preferred date, time, number of guests, and any family or Muslim-friendly preferences that matter for your group.",
            },
            {
              step: "03",
              title: "Review and confirm",
              description:
                "See a full booking summary before sending your request. Your booking is saved immediately, while payment and confirmation email integrations are prepared for the next launch step.",
            },
          ].map((item) => (
            <article key={item.step} className="tonal-card rounded-[2rem] px-7 py-8">
              <p className="font-heading text-4xl font-extrabold tracking-tight text-secondary">
                {item.step}
              </p>
              <h3 className="mt-5 text-2xl font-bold tracking-tight text-primary">{item.title}</h3>
              <p className="mt-4 text-base leading-7 text-foreground-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        id="featured-tours"
        eyebrow="Featured tours"
        title="Choose a route that fits your pace, interests, and travel style"
        description="From old town orientation to halal-conscious food planning and private family options, each route is built to make city discovery feel more comfortable."
        action={
          <CTAButton href="/tours" variant="tertiary" eventName="view_all_tours_click">
            View all walking tours
          </CTAButton>
        }
      >
        <TourGrid tours={featuredTours} />
      </ContentSection>

      <ContentSection
        tone="muted"
        eyebrow="What makes it different"
        title="Muslim-friendly details are part of the planning, not an afterthought"
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

      <ContentSection tone="forest">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow text-white/70">{homepageContent.testimonial.attribution}</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {homepageContent.testimonial.title}
            </h2>
            <blockquote className="mt-6 max-w-3xl text-xl leading-9 text-white/82">
              “{homepageContent.testimonial.quote}”
            </blockquote>
          </div>
          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <p className="eyebrow text-secondary">Ready to plan?</p>
            <h3 className="mt-4 text-3xl font-bold tracking-tight text-primary">
              Book directly or ask first
            </h3>
            <p className="mt-4 text-base leading-7 text-foreground-muted">
              Start with the booking page if you already know your route, or use contact if you
              want help choosing between public, private, or family-friendly options.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <CTAButton href="/booking" variant="primary">
                Book a Muslim-Friendly Tour
              </CTAButton>
              <CTAButton href="/contact" variant="secondary">
                Ask a question first
              </CTAButton>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection
        id="faq-preview"
        eyebrow="Questions, answered"
        title="Everything most guests want to know before booking"
        description="Clear expectations help travellers feel comfortable before they commit to a route, especially when preferences around food, prayer, or family pacing matter."
        action={
          <CTAButton href="/information" variant="secondary">
            View full information
          </CTAButton>
        }
      >
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <FAQAccordion items={homepageContent.faqPreview.slice(0, faqPreview)} />
          <div className="rounded-[2rem] bg-primary px-8 py-10 text-white shadow-soft">
            <p className="eyebrow text-white/70">Need a tailored answer?</p>
            <h3 className="mt-4 text-3xl font-bold tracking-tight">
              Tell us your dates, group style, and preferences before you reserve.
            </h3>
            <p className="mt-5 max-w-md text-base leading-7 text-white/78">
              We can help with private tours, family pacing, prayer-break awareness, halal-conscious
              planning, and general route fit before you confirm.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <CTAButton
                href="/booking"
                variant="secondary"
                className="border-white/25 text-white hover:bg-white/10"
              >
                Choose a time slot
              </CTAButton>
              <CTAButton
                href="/contact"
                variant="primary"
                className="bg-white text-primary hover:bg-white/90"
                eventName="homepage_contact_click"
              >
                Contact the team
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
              Receive tour updates, Muslim-friendly city notes, and seasonal halal recommendations.
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
