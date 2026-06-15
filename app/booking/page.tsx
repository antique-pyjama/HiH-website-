import { BookingPageClient } from "@/components/BookingPageClient";
import { ContentSection } from "@/components/ContentSection";
import { buildMetadata } from "@/lib/metadata";
import { activeTours } from "@/lib/content";

type BookingPageProps = {
  searchParams: Promise<{
    tour?: string;
  }>;
};

export const metadata = buildMetadata({
  title: "Book a Muslim-friendly walking tour",
  description:
    "Choose your Halal in Hamburg walking tour, select a date and time slot, add preferences, and save your booking request.",
  pathname: "/booking",
});

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const { tour } = await searchParams;

  return (
    <>
      <ContentSection
        eyebrow="Booking"
        title="Book your Muslim-friendly Hamburg walking tour"
        description="Select a route, choose a time slot, and tell us how to make the experience more comfortable for you. Booking requests are now stored securely, while online payments and automatic email confirmations are still waiting for provider integration."
        headingLevel="h1"
      />
      <ContentSection tone="muted" className="pt-0">
        <BookingPageClient tours={activeTours} initialTourSlug={tour} />
      </ContentSection>
    </>
  );
}
