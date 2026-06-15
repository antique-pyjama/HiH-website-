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
    <article className="group overflow-hidden rounded-[2rem] bg-panel shadow-soft transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={tour.heroImage}
          alt={tour.heroImageAlt}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(28,28,26,0.5))]" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {tour.category.slice(0, 2).map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
      </div>
      <div className="space-y-5 p-6">
        <div className="space-y-3">
          <h3 className="text-2xl font-bold tracking-tight text-primary">
            <Link href={`/tours/${tour.slug}`} className="transition hover:text-secondary">
              {tour.title}
            </Link>
          </h3>
          <p className="text-base leading-7 text-foreground-muted">{tour.shortDescription}</p>
        </div>

        <div className="grid gap-3 rounded-[1.6rem] bg-surface-low p-4 text-sm text-foreground-muted">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="eyebrow text-secondary">Duration</p>
              <p className="mt-2 text-base font-semibold tracking-tight text-primary">
                {tour.duration}
              </p>
            </div>
            <div>
              <p className="eyebrow text-secondary">Price</p>
              <p className="mt-2 text-base font-semibold tracking-tight text-primary">
                {tour.priceFrom}
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="eyebrow text-secondary">Group size</p>
              <p className="mt-2 text-base font-semibold tracking-tight text-primary">
                {tour.maxGroupSize}
              </p>
            </div>
            <div>
              <p className="eyebrow text-secondary">Languages</p>
              <p className="mt-2 text-base font-semibold tracking-tight text-primary">
                {tour.languages.slice(0, 2).join(" · ")}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.4rem] border border-[rgba(196,200,187,0.32)] bg-white/70 px-4 py-4">
          <p className="text-sm leading-6 text-foreground-muted">
            <span className="font-semibold text-primary">Meeting point:</span> {tour.meetingPoint}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <CTAButton href={`/tours/${tour.slug}`} variant="secondary" className="justify-center">
            View details
          </CTAButton>
          <CTAButton
            href={tour.bookingUrl}
            variant="primary"
            className="justify-center"
            eventName="tour_card_booking_click"
            eventPayload={{ tour: tour.slug }}
          >
            Choose a time slot
          </CTAButton>
        </div>
      </div>
    </article>
  );
}
