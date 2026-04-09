import { TourCard } from "@/components/TourCard";
import { Tour } from "@/lib/types";

type TourGridProps = {
  tours: Tour[];
};

export function TourGrid({ tours }: TourGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {tours.map((tour) => (
        <TourCard key={tour.slug} tour={tour} />
      ))}
    </div>
  );
}
