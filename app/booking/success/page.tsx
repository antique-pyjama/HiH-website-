import Link from "next/link";
import { ContentSection } from "@/components/ContentSection";
import { buildMetadata } from "@/lib/metadata";

type BookingSuccessPageProps = {
  searchParams: Promise<{
    reference?: string;
    session_id?: string;
  }>;
};

export const metadata = buildMetadata({
  title: "Booking payment received",
  description:
    "Your Halal in Hamburg booking payment has been received through Stripe Checkout.",
  pathname: "/booking/success",
});

export default async function BookingSuccessPage({
  searchParams,
}: BookingSuccessPageProps) {
  const { reference, session_id: sessionId } = await searchParams;

  return (
    <>
      <ContentSection
        eyebrow="Payment received"
        title="Thank you for booking with Halal in Hamburg"
        description="Your booking request has been saved and your card payment was completed through Stripe Checkout. We will review the details and send your final tour confirmation by email."
        headingLevel="h1"
      />
      <ContentSection tone="muted" className="pt-0">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-panel p-8 shadow-soft sm:p-10">
          <p className="eyebrow text-secondary">Booking details</p>
          <div className="mt-6 space-y-4 text-base leading-7 text-foreground-muted">
            <p>
              <strong className="text-primary">Booking reference:</strong>{" "}
              {reference ?? "Shown in your Stripe receipt"}
            </p>
            <p>
              <strong className="text-primary">Stripe session:</strong>{" "}
              {sessionId ?? "Completed securely through Stripe"}
            </p>
            <p>
              Please keep this page or your Stripe receipt for your records. Automatic email
              confirmations are the next integration step; for now, we will confirm manually by
              email after reviewing your booking.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/tours"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-soft transition hover:brightness-105"
            >
              View tours
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-surface-low px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary transition hover:bg-white"
            >
              Contact us
            </Link>
          </div>
        </div>
      </ContentSection>
    </>
  );
}
