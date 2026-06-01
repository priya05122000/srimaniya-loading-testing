import { getAllBanners } from "@/services/bannerService";
import dynamic from "next/dynamic";
import { Banner } from "@/types";

const HeroClient = dynamic(() => import("./HeroClient"), {
  loading: () => <div className="h-[95vh] bg-(--blue)" />,
});

export default async function HeroServer() {
  const result = await getAllBanners();
  const banners = (Array.isArray(result?.data) ? result.data : []).filter(
    (b : Banner) => b?.is_active && b.category?.includes("Events")
  );

  if (!banners.length) return null;

  return <HeroClient banners={banners} />;
}
