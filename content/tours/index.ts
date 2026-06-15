import customPrivateTour from "./custom-private-tour.json";
import familyPrivateTour from "./family-private-tour.json";
import halalFoodCultureTour from "./halal-food-culture-tour.json";
import harborRiversideTour from "./harbor-riverside-tour.json";
import hamburgOldTownWalk from "./hamburg-old-town-walk.json";
import speicherstadtHafencityWalk from "./speicherstadt-hafencity-walk.json";
import type { Tour } from "../../lib/types";

export const tours: Tour[] = [
  hamburgOldTownWalk as Tour,
  speicherstadtHafencityWalk as Tour,
  harborRiversideTour as Tour,
  halalFoodCultureTour as Tour,
  familyPrivateTour as Tour,
  customPrivateTour as Tour,
];
