import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import { CTAButton } from "@/components/CTAButton";
import { Tour } from "@/lib/types";

type TourCardProps = {
  tour: Tour;
};

export function TourCard({ tour }: TourCardProps) {
  return (
    <article className="overflow-hidden rounded-[2rem] bg-panel shadow-soft">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={tour.heroImage}
          alt={tour.heroImageAlt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="space-y-5 p-6">
        <div className="flex flex-wrap gap-2">
          {tour.category.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-bold tracking-tight text-primary">
            <Link href={`/tours/${tour.slug}`} className="transition hover:text-secondary">
              {tour.title}
            </Link>
          </h3>
          <p className="text-base leading-7 text-foreground-muted">{tour.shortDescription}</p>
        </div>
        <div className="grid gap-3 rounded-[1.5rem] bg-surface-low p-4 text-sm text-foreground-muted sm:grid-cols-2">
          <div>
            <p className="eyebrow text-secondary">Duration</p>
            <p className="mt-2 text-base font-semibold tracking-tight text-primary">
              {tour.duration}
            </p>
          </div>
          <div>
            <p className="eyebrow text-secondary">From</p>
            <p className="mt-2 text-base font-semibold tracking-tight text-primary">
              {tour.priceFrom}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <CTAButton href={`/tours/${tour.slug}`} variant="secondary" className="justify-center">
            View details
          </CTAButton>
          <CTAButton
            href={tour.bookingUrl}
            variant="primary"
            className="justify-center"
            external
            eventName="tour_card_booking_click"
            eventPayload={{ tour: tour.slug }}
          >
            Book now
          </CTAButton>
        </div>
      </div>
    </article>
  );
}
