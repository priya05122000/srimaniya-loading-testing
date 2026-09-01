"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Banner } from "@/types";
import BannerForm from "../subComponents/BannerForm";
import Image from "next/image";

const SWIPER_CONFIG = {
  spaceBetween: 0,
  effect: "fade" as const,
  grabCursor: true,
  loop: true,
  navigation: false,
  pagination: { clickable: true },
  autoplay: { delay: 3000, disableOnInteraction: false },
  modules: [EffectFade, Pagination, Autoplay],
  className: "partBannerSwiper h-[250px] sm:h-full",
};

export default function PartBanner({ banners }: { banners: Banner[] }) {
  return (
    <section
      aria-label="Placement enquiry"
      className="relative sm:h-[calc(100vh-80px)] grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] overflow-hidden"
    >
      {banners.length === 0 ? (
        <Swiper className="h-62.5 sm:h-full" />
      ) : (
        <Swiper key={banners.length} {...SWIPER_CONFIG}>
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <picture>
                  <source
                    media="(min-width:1024px)"
                    srcSet={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${banner.image_desktop}`}
                  />
                  <source
                    media="(min-width:640px)"
                    srcSet={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${banner.image_tab}`}
                  />
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${banner.image_phone}`}
                    alt={banner.title || `Banner ${index + 1}`}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                  />
                </picture>
                <div className="absolute right-6 bottom-10 md:right-8 md:bottom-16 w-2/3 md:w-1/2 xl:w-1/3 z-30 flex flex-col items-end gap-4 text-(--white-custom) group">
                  <div
                    data-section
                    className="absolute inset-0 bg-(--blue-overlay-medium) -z-10"
                  />
                  <div className="absolute inset-0 transition-all duration-300 backdrop-blur-xs -z-10" />
                  <div className="absolute inset-0 bg-[url('/designs/noise.svg')] bg-cover bg-no-repeat pointer-events-none -z-10" />
                  <div className="px-4 py-2 sm:py-4 ">
                    {banner.title && (
                      <p className="text-end font-bold leading-snug transition-colors duration-300 ease-in-out uppercase text-xl sm:text-2xl lg:text-3xl font-jakarta">
                        {banner.title}
                      </p>
                    )}
                    {banner.button_text && (
                      <p
                        className="text-end font-semibold leading-snug transition-colors duration-300 ease-in-out "
                        style={{ fontSize: "1.125rem" }}
                      >
                        {banner.button_text}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="h-full sm:h-[calc(100vh-80px)] overflow-auto">
        <div
          className="h-full bg-(--blue) p-4 sm:p-6 lg:p-8 flex flex-col justify-evenly "
          data-section
        >
          <div className="max-w-full sm:max-w-2xl ml-auto">
            <p className="uppercase font-jakarta text-end text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold">
              Join With US
            </p>
          </div>
          <BannerForm />
        </div>
      </div>
    </section>
  );
}
