import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/Badge";
import { CTAButton } from "@/components/CTAButton";
import { ContentSection } from "@/components/ContentSection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { activeTours, getTourBySlug, siteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

type TourDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return activeTours.map((tour) => ({
    slug: tour.slug,
  }));
}

export async function generateMetadata({ params }: TourDetailPageProps) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    return buildMetadata({
      title: "Tour not found",
      description: "The requested Halal in Hamburg tour could not be found.",
      pathname: `/tours/${slug}`,
    });
  }

  return buildMetadata({
    title: tour.title,
    description: tour.shortDescription,
    pathname: `/tours/${tour.slug}`,
  });
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.shortDescription,
    provider: {
      "@type": "Organization",
      name: siteSettings.siteName,
    },
    image: [`${siteSettings.domain}${tour.heroImage}`],
    touristType: tour.audience.join(", "),
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: tour.basePrice,
      url: `${siteSettings.domain}${tour.bookingUrl}`,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ContentSection className="pb-16 pt-6 sm:pb-20">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              {tour.category.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
            <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-primary sm:text-6xl">
              {tour.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-foreground-muted">
              {tour.shortDescription}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Duration", value: tour.duration },
                { label: "Price", value: tour.priceFrom },
                { label: "Meeting point", value: tour.meetingNeighborhood },
                { label: "Group size", value: tour.maxGroupSize },
              ].map((fact) => (
                <div key={fact.label} className="rounded-[1.5rem] bg-surface-low px-5 py-5">
                  <p className="eyebrow text-secondary">{fact.label}</p>
                  <p className="mt-2 text-lg font-bold tracking-tight text-primary">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="glass-panel rounded-[2rem] p-4 sm:p-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
              {/* TODO: Replace placeholder art with founder-supplied route photography once verified. */}
              <Image
                src={tour.heroImage}
                alt={tour.heroImageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 35vw, 100vw"
                priority
              />
            </div>
            <div className="space-y-4 px-2 pb-2 pt-6">
              <CTAButton
                href={tour.bookingUrl}
                variant="primary"
                className="w-full justify-center"
                eventName="tour_detail_booking_click"
                eventPayload={{ tour: tour.slug }}
              >
                Choose a time slot
              </CTAButton>
              <CTAButton href="/contact" variant="secondary" className="w-full justify-center">
                Ask a question first
              </CTAButton>
              <p className="text-sm leading-6 text-foreground-soft">
                Your booking request is saved before payment. Card payments continue through secure
                Stripe Checkout; pay-on-arrival requests are confirmed manually.
              </p>
            </div>
          </aside>
        </div>
      </ContentSection>

      <ContentSection tone="muted" eyebrow="Overview" title="What to expect on this route">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <article className="tonal-card rounded-[2rem] p-8">
              <h2 className="text-2xl font-bold tracking-tight text-primary">Summary</h2>
              <p className="mt-5 text-base leading-8 text-foreground-muted">
                {tour.fullDescription}
              </p>
            </article>
            <article className="tonal-card rounded-[2rem] p-8">
              <h2 className="text-2xl font-bold tracking-tight text-primary">
                Muslim-friendly features
              </h2>
              <ul className="mt-5 space-y-3 text-base leading-8 text-foreground-muted">
                {tour.muslimFriendlyFeatures.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="tonal-card rounded-[2rem] p-8">
              <h2 className="text-2xl font-bold tracking-tight text-primary">Route highlights</h2>
              <ul className="mt-5 space-y-3 text-base leading-8 text-foreground-muted">
                {tour.routeHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
          <div className="space-y-6">
            <article className="rounded-[2rem] bg-panel p-8">
              <h2 className="text-2xl font-bold tracking-tight text-primary">Included</h2>
              <ul className="mt-5 space-y-3 text-base leading-7 text-foreground-muted">
                {tour.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-[2rem] bg-panel p-8">
              <h2 className="text-2xl font-bold tracking-tight text-primary">Excluded</h2>
              <ul className="mt-5 space-y-3 text-base leading-7 text-foreground-muted">
                {tour.excluded.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-[2rem] bg-panel p-8">
              <h2 className="text-2xl font-bold tracking-tight text-primary">Languages</h2>
              <ul className="mt-5 space-y-3 text-base leading-7 text-foreground-muted">
                {tour.languages.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-[2rem] bg-panel p-8">
              <h2 className="text-2xl font-bold tracking-tight text-primary">Who it&apos;s for</h2>
              <ul className="mt-5 space-y-3 text-base leading-7 text-foreground-muted">
                {tour.audience.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </ContentSection>

      {tour.faq.length > 0 ? (
        <ContentSection tone="sand" eyebrow="FAQ" title="Before you reserve">
          <FAQAccordion items={tour.faq} />
        </ContentSection>
      ) : null}

      <ContentSection eyebrow="Ready to book?" title="Review your slot and booking preferences">
        <div className="rounded-[2rem] bg-primary px-8 py-10 text-white shadow-soft">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-lg leading-8 text-white/76">
                Choose a date, time, guest count, and any Muslim-friendly preferences such as
                prayer-break information, halal food recommendations, or private tour needs.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 lg:justify-end">
              <CTAButton
                href={tour.bookingUrl}
                variant="primary"
                className="bg-white text-primary hover:bg-white/90"
                eventName="tour_detail_bottom_booking_click"
                eventPayload={{ tour: tour.slug }}
              >
                Go to booking page
              </CTAButton>
              <CTAButton
                href="/contact"
                variant="secondary"
                className="border-white/25 text-white hover:bg-white/10"
              >
                Contact us first
              </CTAButton>
            </div>
          </div>
        </div>
      </ContentSection>
    </>
  );
}
