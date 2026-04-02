"use client";

import CommonImage from "@/components/common/CommonImage";
import React, { useEffect, useState } from "react";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import Span from "@/components/common/Span";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";
import dynamic from "next/dynamic";

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

const Swiper = dynamic(() => import("swiper/react").then((m) => m.Swiper), {
  ssr: false,
});

const HeroClient = ({ banners }: { banners: Banner[] }) => {
  const { setLoading } = useGlobalLoader();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!Array.isArray(banners) || banners.length === 0) {
    return (
      <div style={{ color: "orange", padding: 20 }}>
        No banners to display. Please check your data source or API.
      </div>
    );
  }

  return (
    <Swiper
      spaceBetween={30}
      effect="fade"
      speed={600}
      grabCursor
      loop={true}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      modules={[EffectFade, Pagination, Autoplay]}
    // className="mySwiper"
    >
      {banners.map((banner, idx) => (
        <SwiperSlide key={idx}>
          <div
            className="bg-(--blue) grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr] h-[95vh] sm:h-[calc(90vh-80px)] hero-wrapper will-change-transform"
            style={{ transform: "translateZ(0)" }}
          >
            <div className="border-b sm:border-b-0 sm:border-r border-(--grey-custom) h-full min-h-75 relative w-full">
              <CommonImage
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${banner.image_desktop}`}
                alt={banner.title}
                type="hero"
                className="object-cover w-full h-full object-top hero-image"
                priority={idx === 0}
              />
              {/* Overlay container */}
              <div className="absolute right-6 bottom-10 md:right-8 md:bottom-16 w-3/4 sm:w-2/3 lg:w-2/4 xl:w-1/3 z-30 flex flex-col items-end gap-4 text-(--white-custom) group">
                <div className="absolute inset-0 bg-(--blue-overlay-medium) -z-10 rounded-lg" />
                <div className="absolute inset-0 transition-all duration-300 backdrop-blur-xs -z-10" />
                <div className="absolute inset-0 bg-[url('/designs/noise.svg')] bg-cover bg-no-repeat pointer-events-none -z-10" />
                {banner.button_text && (
                  <p

                    className="text-end text-xl sm:text-2xl lg:text-3xl jakarta-heading font-semibold leading-snug transition-colors duration-300 ease-in-out px-6 sm:px-8 py-4 rounded-lg"
                  >
                    {banner.button_text}
                  </p>
                )}
              </div>
            </div>
            {/* Hero Text Content */}
            <div className="hero-content flex flex-col justify-center sm:justify-end text-end pl-6 pr-6 py-8 text-(--white-custom) min-h-62.5 sm:min-h-95">
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
                    <Paragraph
                      size="base"
                      className="mt-4 leading-relaxed hidden sm:block"
                    >
                      {banner.sub_title}
                    </Paragraph>
                  )}
                  {banner.sub_title && (
                    <Span className="mt-4 leading-relaxed block sm:hidden">
                      {banner.sub_title}
                    </Span>
                  )}
                  <p
                    className="leading-tight jakarta-heading text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 animate-text hero-title hidden xl:block"
                  >
                    {banner.title}
                  </p>
                  <p
                    className="leading-tight jakarta-heading text-2xl sm:text-3xl lg:text-4xl font-bold mt-4 animate-text hero-title block xl:hidden"
                  >
                    {banner.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroClient;
