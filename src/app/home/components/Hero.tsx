"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import Span from "@/components/common/Span";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { getAllBanners } from "@/services/bannerService";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

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

const getResponsiveImage = (banner: Banner, width: number) => {
    if (width < 640) return banner.image_phone;
    if (width < 1024) return banner.image_tab;
    return banner.image_desktop;
};

const Hero = () => {
    const { setLoading } = useGlobalLoader();
    const [banners, setBanners] = useState<Banner[]>([]);
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1024
    );
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                setLoading(true);
                const result = await getAllBanners();
                const data: Banner[] = result?.data || [];
                const filtered = data.filter(
                    (b) => b.is_active && b.category.includes("Events")
                );
                setBanners(filtered);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBanners();
    }, [baseUrl, setLoading]);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
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
            {banners.map((banner, idx) => (
                <SwiperSlide key={idx}>
                    <div
                        className="bg-(--blue) grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr] h-[95vh] sm:h-[calc(85vh-80px)] hero-wrapper will-change-transform"
                        style={{ transform: "translateZ(0)" }}
                    >
                        <div className="border-b sm:border-b-0 sm:border-r border-(--grey-custom) h-full min-h-[300px] relative w-full">
                            <Image
                                src={`${baseUrl}/files/${banner.image_desktop}`}
                                alt={banner.title}
                                width={1920}
                                height={1080}
                                className="object-cover w-full h-full object-top hero-image"
                                priority
                                decoding="async"
                                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 100vw, 100vw"
                                onLoadingComplete={() => setLoading(false)}
                            />
                            {/* Overlay container */}
                            <div className="absolute right-6 bottom-10 md:right-8 md:bottom-16 w-3/4 sm:w-2/3 xl:w-1/3 z-30 flex flex-col items-end gap-4 text-(--white-custom) group">
                                <div className="absolute inset-0 bg-(--blue-overlay-medium) -z-10 rounded-lg" />
                                <div className="absolute inset-0 transition-all duration-300 backdrop-blur-xs -z-10" />
                                <div className="absolute inset-0 bg-[url('/designs/noise.svg')] bg-cover bg-no-repeat pointer-events-none -z-10" />
                                {banner.button_text && (
                                    <Heading
                                        level={5}
                                        className="text-end font-semibold leading-snug transition-colors duration-300 ease-in-out px-6 sm:px-8 py-4 rounded-lg"
                                    >
                                        {banner.button_text}
                                    </Heading>
                                )}
                            </div>
                        </div>
                        {/* Hero Text Content */}
                        <div className="hero-content flex flex-col justify-center sm:justify-end text-end pl-6 pr-6 py-8 text-(--white-custom) min-h-[250px] sm:min-h-[380px]">
                            <div className="h-full flex sm:items-end">
                                <div>
                                    <div className="flex gap-4 justify-end">
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
                                        <Paragraph size="base" className="mt-4 leading-relaxed hidden sm:block">
                                            {banner.sub_title}
                                        </Paragraph>
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
            ))}
        </Swiper>
    );
};

export default Hero;
