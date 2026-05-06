import { getAllCountriesServer } from "@/services/serverComponent/countriesServiceServer";
import PlacementMapClient from "./PlacementMapClient";
import { Country } from "@/types";

export default async function PlacementMap() {
  const result = await getAllCountriesServer();
  const placements = Array.isArray(result?.data)
    ? result.data.filter((p: Country) => p.status)
    : [];

  if (!placements.length) return null;

  return <PlacementMapClient placements={placements} />;
}
