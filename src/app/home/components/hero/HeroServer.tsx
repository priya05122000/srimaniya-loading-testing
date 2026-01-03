import { getAllBanners } from "@/services/bannerService";
import HeroClient from "./HeroClient";
import { Banner } from "@/types";

export default async function HeroServer() {
  const result = await getAllBanners();
  const banners = (Array.isArray(result?.data) ? result.data : []).filter(
    (b : Banner) => b?.is_active && b.category?.includes("Events")
  );

  if (!banners.length) return null;

  return <HeroClient banners={banners} />;
}
