import { getAllCountries } from "@/services/countriesService";
import PlacementMapClient from "./PlacementMapClient";
import { Country } from "@/types";

export default async function PlacementMap() {
  const result = await getAllCountries();
  const placements = Array.isArray(result?.data)
    ? result.data.filter((p: Country) => p.status)
    : [];

  if (!placements.length) return null;

  return <PlacementMapClient placements={placements} />;
}
