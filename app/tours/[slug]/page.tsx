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
    "@type": "Product",
    name: tour.title,
    description: tour.shortDescription,
    brand: siteSettings.siteName,
    image: [`${siteSettings.domain}${tour.heroImage}`],
    category: tour.category.join(", "),
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: tour.priceFrom.replace(/[^\d.]/g, ""),
      url: tour.bookingUrl,
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
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
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
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] bg-surface-low px-5 py-5">
                <p className="eyebrow text-secondary">Duration</p>
                <p className="mt-2 text-xl font-bold tracking-tight text-primary">{tour.duration}</p>
              </div>
              <div className="rounded-[1.5rem] bg-surface-low px-5 py-5">
                <p className="eyebrow text-secondary">From</p>
                <p className="mt-2 text-xl font-bold tracking-tight text-primary">
                  {tour.priceFrom}
                </p>
              </div>
              <div className="rounded-[1.5rem] bg-surface-low px-5 py-5">
                <p className="eyebrow text-secondary">Meeting point</p>
                <p className="mt-2 text-xl font-bold tracking-tight text-primary">
                  {tour.meetingPoint}
                </p>
              </div>
            </div>
          </div>

          <aside className="glass-panel rounded-[2rem] p-4 sm:p-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
              {/* TODO: Swap placeholder art with founder-supplied tour photography for launch assets. */}
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
                external
                eventName="tour_detail_booking_click"
                eventPayload={{ tour: tour.slug }}
              >
                Book now
              </CTAButton>
              <p className="text-sm leading-6 text-foreground-soft">
                Booking is handled externally through FareHarbor for MVP simplicity and operational
                speed.
              </p>
            </div>
          </aside>
        </div>
      </ContentSection>

      <ContentSection tone="muted" eyebrow="Overview" title="What this experience includes">
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
                Halal suitability notes
              </h2>
              <ul className="mt-5 space-y-3 text-base leading-8 text-foreground-muted">
                {tour.halalNotes.map((note) => (
                  <li key={note}>{note}</li>
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

      <ContentSection eyebrow="Need a hand?" title="Prefer to ask first before you book">
        <div className="rounded-[2rem] bg-primary px-8 py-10 text-white shadow-soft">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-lg leading-8 text-white/76">
                Share your dates, family setup, or group questions and we will help you decide
                whether this route is the best fit.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 lg:justify-end">
              <CTAButton
                href="/contact"
                variant="secondary"
                className="border-white/25 text-white hover:bg-white/10"
              >
                Contact us
              </CTAButton>
              <CTAButton
                href={tour.bookingUrl}
                variant="primary"
                className="bg-white text-primary hover:bg-white/90"
                external
                eventName="tour_detail_bottom_booking_click"
                eventPayload={{ tour: tour.slug }}
              >
                Continue to FareHarbor
              </CTAButton>
            </div>
          </div>
        </div>
      </ContentSection>
    </>
  );
}
