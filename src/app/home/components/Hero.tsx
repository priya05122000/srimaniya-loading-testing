"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { getAllBanners } from "@/services/bannerService";
import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import { FiArrowRight } from "react-icons/fi";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";
import Span from "@/components/common/Span";

interface HeroProps {
    hideLogo?: boolean;
}

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

// Utility to get all image URLs for banners (reusable)
const getBannerImageUrls = (banners: Banner[], baseUrl: string): string[] =>
    banners.flatMap(banner => [
        `${baseUrl}/files/${banner.image_desktop}`,
        `${baseUrl}/files/${banner.image_tab}`,
        `${baseUrl}/files/${banner.image_phone}`
    ]);

// Preload images with timeout and cache busting (reusable)
const preloadImages = async (urls: string[], timeout = 10000): Promise<void> => {
    await Promise.all(urls.map(url =>
        new Promise<void>(resolve => {
            const img = new window.Image();
            img.src = url.includes('?') ? `${url}&t=${Date.now()}` : `${url}?t=${Date.now()}`;
            img.onload = img.onerror = () => resolve();
            setTimeout(resolve, timeout);
        })
    ));
};

const getResponsiveImage = (banner: Banner, windowWidth: number): string => {
    if (windowWidth < 640) return banner.image_phone;
    if (windowWidth < 1024) return banner.image_tab;
    return banner.image_desktop;
};

const Hero: React.FC<HeroProps> = ({ hideLogo = false }) => {
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1024
    );
    const [banners, setBanners] = useState<Banner[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const { setLoading } = useGlobalLoader();
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    // Window resize handler
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Fetch banners and preload images
    useEffect(() => {
        const fetchAndPreload = async () => {
            try {
                const result = await getAllBanners();
                const data = result?.data || [];
                const filtered = data.filter((b: Banner) => b.is_active && b.category.includes("Events"));
                setBanners(filtered);
                if (filtered.length > 0 && baseUrl) {
                    const urls = getBannerImageUrls(filtered, baseUrl);
                    await preloadImages(urls);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setImagesLoaded(true);
            }
        };
        fetchAndPreload();
    }, [baseUrl]);

    // Hide loader when images are loaded
    useEffect(() => {
        if (banners.length > 0 && imagesLoaded) setLoading(false);
    }, [banners, imagesLoaded, setLoading]);

    return (
        <div data-section>
            <Swiper
                key={banners.length}
                spaceBetween={30}
                effect="fade"
                grabCursor
                loop={true}
                navigation={false}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                modules={[EffectFade, Navigation, Pagination, Autoplay]}
                className="mySwiper"
            >
                {banners.map((banner, idx) => {
                    const imageSrc = `${baseUrl}/files/${getResponsiveImage(banner, windowWidth)}`;
                    return (
                        <SwiperSlide key={idx}>
                            <div className="bg-(--blue) grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr] h-[95vh] sm:h-[calc(100vh-80px)]" data-section>
                                <div className="border-b sm:border-b-0 sm:border-r border-(--grey-custom) h-full min-h-[300px] relative w-full">
                                    <Image
                                        src={imageSrc}
                                        alt={banner.title}
                                        fill
                                        className="object-cover object-top"
                                        priority
                                        unoptimized
                                    />
                                    {/* Overlay container positioned at bottom-right */}
                                    <div className="absolute right-6 bottom-10 md:right-8 md:bottom-16 w-3/4 sm:w-2/3 xl:w-1/3 z-30 flex flex-col items-end gap-4 text-(--white-custom) group">
                                        <div data-section className="absolute inset-0 bg-(--blue-overlay-medium) -z-10 rounded-lg" />
                                        <div className="absolute inset-0 transition-all duration-300 backdrop-blur-xs -z-10" />
                                        <div className="absolute inset-0 bg-[url('/designs/noise.svg')] bg-cover bg-no-repeat pointer-events-none -z-10" />
                                        {banner.button_text && (
                                            <Heading
                                                level={6}
                                                className="text-end font-semibold leading-snug transition-colors duration-300 ease-in-out px-6 sm:px-8 py-4 rounded-lg"
                                            >
                                                {banner.button_text}
                                            </Heading>
                                        )}
                                    </div>
                                </div>
                                <div className="hero-content flex flex-col justify-center sm:justify-end text-end pl-6 sm:pl-6 pr-6 py-8 text-(--white-custom) min-h-[250px] sm:min-h-[380px]">
                                    <div className="h-full flex sm:items-end ">
                                        <div>
                                            <div className=" flex gap-4 justify-end">
                                                <Link href="/registration-form">
                                                    <button className="relative flex justify-center items-center gap-1 rounded-full bg-(--blue) overflow-hidden cursor-pointer border border-(--yellow) group transition-all duration-300 px-3 py-1">
                                                        <span className="relative z-20 text-center no-underline w-full text-(--yellow) text-base transition-all duration-300 group-hover:text-(--blue)">
                                                            Enquire Now
                                                        </span>
                                                        <span className="absolute left-0 top-0 w-full h-0 bg-(--yellow) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
                                                        <FiArrowRight className="text-(--yellow) z-20 transition-all duration-300 group-hover:text-(--blue)" />
                                                    </button>
                                                </Link>
                                            </div>
                                            {banner.sub_title && (
                                                <Paragraph size="base" className="mt-4 leading-relaxed hidden sm:block">{banner.sub_title}</Paragraph>
                                            )}
                                            {banner.sub_title && (
                                                <Span className="mt-4 leading-relaxed block sm:hidden">{banner.sub_title}</Span>
                                            )}
                                            <Heading
                                                level={4}
                                                className="leading-tight mt-4 animate-text hero-title hidden xl:block"
                                            >
                                                {banner.title}
                                            </Heading>
                                            <Heading
                                                level={5}
                                                className="leading-tight mt-4 animate-text hero-title block xl:hidden"
                                            >
                                                {banner.title}
                                            </Heading>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default Hero;