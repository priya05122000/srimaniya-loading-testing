import { getAllBanners } from "@/services/bannerService";
import { Banner } from "@/types";
import PartBanner from "./PartBanner";

export default async function PartBannerServer() {
  const result = await getAllBanners();
  const banners = (Array.isArray(result?.data) ? result.data : []).filter(
    (b: Banner) => b?.is_active && b.category?.includes("Placement"),
  );

  return <PartBanner banners={banners} />;
}
