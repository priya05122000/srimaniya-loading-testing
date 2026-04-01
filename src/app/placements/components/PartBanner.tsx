"use client";
import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";

import { toast } from "react-toastify";
import { createAppoinmentRequest } from "@/services/appoinmentRequestService";
import { getAllCourses } from "@/services/courseService";
import Heading from "@/components/common/Heading";
import { getAllBanners } from "@/services/bannerService";
import CommonEnquiryFields from "@/components/enquiry-validation/CommonEnquiryFields";
import { validateEnquiryFormWithToast } from '@/components/enquiry-validation/enquiryFormValidation';
import { AutofillSuppressionFields } from "@/components/enquiry-validation/CommonEnquiryFields";

import { useEnquiryForm } from '@/components/enquiry-validation/useEnquiryForm';

interface CourseOption {
  id: number;
  title: string;
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

// Reusable constants for Swiper config and form initial state
const SWIPER_CONFIG = {
  spaceBetween: 0,
  effect: "fade" as const,
  grabCursor: true,
  loop: true,
  navigation: false,
  pagination: { clickable: true },
  autoplay: { delay: 3000, disableOnInteraction: false },
  modules: [EffectFade, Navigation, Pagination, Autoplay],
  className: "partBannerSwiper h-[250px] ",
};

// Helper: Preload images (reusable)
const preloadImages = (banners: Banner[]) => {
  return Promise.all(
    banners.flatMap((banner) => {
      const urls = [banner.image_desktop, banner.image_tab, banner.image_phone];
      return urls.map((imgUrl) => {
        const img = new window.Image();
        img.src = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${imgUrl}`;
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      });
    })
  );
};

export default function PartBanner() {
  const [courseOptions, setCourseOptions] = useState<CourseOption[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);

  const { formData, handleChange, handleSubmit, loading, error, success, setError, setSuccess } = useEnquiryForm({
    validateForm: validateEnquiryFormWithToast,
    onSubmit: createAppoinmentRequest,
    captchaAction: "placement_form",
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
    if (success) {
      toast.success(success);
      setSuccess(null);
    }
  }, [error, success, setError, setSuccess]);

  useEffect(() => {
    getAllBanners()
      .then((result) => {
        const data = result?.data;
        if (Array.isArray(data) && data.length > 0) {
          const placementBanners = data.filter(
            (banner: Banner) => banner.is_active && banner.category.includes("Placement")
          );
          setBanners(placementBanners);
          preloadImages(placementBanners);
        } else {
          setBanners([]);
        }
      })
      .catch(() => setBanners([]));
  }, []);

  useEffect(() => {
    getAllCourses()
      .then((result) => {
        const data = result?.data || [];
        setCourseOptions(
          data.map((c: CourseOption) => ({ id: c.id, title: c.title }))
        );
      })
      .catch(() => setCourseOptions([]));
  }, []);

  return (
    <div className="relative lg:h-[calc(100vh-80px)] grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] overflow-hidden">
      <Swiper key={banners.length} {...SWIPER_CONFIG}>
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[250px] sm:h-[calc(100vh-80px)]">
              <picture>
                <source
                  media="(min-width:1024px)"
                  srcSet={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${banner.image_desktop}`}
                />
                <source
                  media="(min-width:640px)"
                  srcSet={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${banner.image_tab}`}
                />
                <img
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${banner.image_phone}`}
                  alt={banner.title || `Banner ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </picture>
              <div className="absolute right-6 bottom-10 md:right-8 md:bottom-16 w-2/3 md:w-1/2 xl:w-1/3 z-30 flex flex-col items-end gap-4 text-(--white-custom) group">
                <div data-section className="absolute inset-0 bg-(--blue-overlay-medium) -z-10" />
                <div className="absolute inset-0 transition-all duration-300 backdrop-blur-xs -z-10" />
                <div className="absolute inset-0 bg-[url('/designs/noise.svg')] bg-cover bg-no-repeat pointer-events-none -z-10" />
                <div className="px-4 py-2 sm:py-4 ">
                  {banner.title && (
                    <Heading
                      level={6}
                      className="text-end font-bold leading-snug transition-colors duration-300 ease-in-out uppercase "
                    >
                      {banner.title}
                    </Heading>
                  )}
                  {banner.button_text && (
                    <p
                      className="text-end font-semibold leading-snug transition-colors duration-300 ease-in-out "
                      style={{ fontSize: '1.125rem' }}
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
      <div className="h-full sm:h-[calc(100vh-80px)] overflow-auto">
        <div className="h-full bg-(--blue) p-4 sm:p-6 lg:p-8 flex flex-col justify-evenly " data-section>
          <div className="max-w-full sm:max-w-2xl ml-auto">
            <p className="uppercase text-end hidden xl:block text-3xl sm:text-4xl lg:text-5xl font-bold">
              Join With US
            </p>
            <p className="uppercase text-end block xl:hidden text-2xl sm:text-3xl lg:text-4xl font-bold">
              Join With US
            </p>
          </div>
          <form className="flex flex-col gap-y-2" onSubmit={handleSubmit} autoComplete="off">
            <AutofillSuppressionFields />
            <CommonEnquiryFields
              formData={formData}
              handleChange={handleChange}
              courseOptions={courseOptions.map((course) => ({
                value: String(course.id),
                label: course.title,
              }))}
              loading={loading}
              submitText="Submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
