// import { getAllBanners } from "@/services/banner";
import { getAllBanners } from "@/services/bannerService";
import HeroClient from "./HeroClient";

export interface Banner {
  image_desktop: string;
  image_tab: string;
  image_phone: string;
  title: string;
  sub_title: string;
  button_text?: string;
  is_active: boolean;
  category: string;
}


const Hero = async () => {
  try {
    const result = await getAllBanners();
    const data: Banner[] = Array.isArray(result?.data) ? result.data : [];
    const banners = data.filter(
      (b) => b && b.is_active && typeof b.category === 'string' && b.category.includes("Events")
    );
    if (!banners.length) {
      console.warn("No active event banners found in HeroServer.", { data });
    }
    return <HeroClient banners={banners} />;
  } catch (error) {
    console.error("Error rendering HeroServer:", error);
    return <div style={{color: 'red', padding: 20}}>Failed to load hero section. Please try again later.</div>;
  }
};

export default Hero;
