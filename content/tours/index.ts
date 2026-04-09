import alsterHalalFoodWalk from "@/content/tours/alster-halal-food-walk.json";
import ottensenBrunchDiscovery from "@/content/tours/ottensen-brunch-discovery.json";
import speicherstadtHeritageWalk from "@/content/tours/speicherstadt-heritage-walk.json";
import { Tour } from "@/lib/types";

export const tours: Tour[] = [
  alsterHalalFoodWalk as Tour,
  ottensenBrunchDiscovery as Tour,
  speicherstadtHeritageWalk as Tour,
];
