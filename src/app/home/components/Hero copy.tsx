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

interface HeroProps {
    hideLogo?: boolean;
}

interface Banner {
    image_desktop: string;
    image_tab: string;
    image_phone: string;
    title: string;
    sub_title: string;
    button_text?: string;
    is_active: boolean;
    category: string;
}

const Hero: React.FC<HeroProps> = ({ hideLogo = false }) => {
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1024
    );

    const [banners, setBanners] = useState<Banner[]>([]);
    const { setLoading } = useGlobalLoader();

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getAllBanners();
                const data = result?.data;

                const filtered = data.filter((b: Banner) => b.is_active);
                const events = filtered.filter((b: Banner) =>
                    b.category.includes("Events")
                );

                setBanners(events);

                // 🔥 Preload images before hiding loader
                await preloadImages(events);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false); // Hide loader only now
            }
        }
        fetchData();
    }, []);

    // 🔥 Preload images function
    const preloadImages = (banners: Banner[]) => {
        const promises = banners.map((banner, idx) => {
            const img = new window.Image();
            // Preload all variants for best experience
            const sources = [banner.image_desktop, banner.image_tab, banner.image_phone];
            sources.forEach(src => {
                const preloadImg = new window.Image();
                preloadImg.src = `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${src}`;
            });
            img.src = `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${banner.image_desktop}`;
            return new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve;
            });
        });
        return Promise.all(promises);
    };

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
                    let imageSrc = banner.image_desktop;
                    if (windowWidth < 640) imageSrc = banner.image_phone;
                    else if (windowWidth < 1024) imageSrc = banner.image_tab;

                    return (
                        <SwiperSlide key={idx}>
                            <div className="bg-(--blue) grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr] h-[95vh] sm:h-[calc(100vh-80px)]">
                                <div className="border-b sm:border-b-0 sm:border-r border-(--grey-custom) h-full min-h-[300px] relative w-full">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${imageSrc}`}
                                        alt={banner.title}
                                        fill
                                        className="object-cover object-top"
                                        unoptimized
                                    />
                                    {/* Overlay container positioned at bottom-right */}
                                    <div className="absolute right-6 bottom-10 md:right-8 md:bottom-16 w-3/4 sm:w-2/3 xl:w-1/3 z-30 flex flex-col items-end gap-4 text-(--white-custom) group">
                                        <div className="absolute inset-0 bg-(--blue-overlay-medium) -z-10 rounded-lg" />
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

                                <div className="hero-content  flex flex-col justify-center sm:justify-end text-end pl-6 sm:pl-6 pr-6 py-8 text-(--white-custom) min-h-[300px] sm:min-h-[380px]">
                                    <div className="h-full flex sm:items-end ">
                                        <div>
                                            <div className="mb-4 flex gap-4 justify-end">
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
                                                <Paragraph size="base">{banner.sub_title}</Paragraph>
                                            )}
                                            <Heading
                                                level={4}
                                                className="leading-tight mt-8 animate-text hero-title hidden xl:block"
                                            >
                                                {banner.title}
                                            </Heading>
                                            <Heading
                                                level={5}
                                                className="leading-tight mt-8 animate-text hero-title block xl:hidden"
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
