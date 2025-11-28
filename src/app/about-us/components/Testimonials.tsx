"use client"
import Heading from '@/components/common/Heading';
import LeftSpaceGridSection from '@/components/common/LeftSpaceGridSection'
import Paragraph from '@/components/common/Paragraph';
import Span from '@/components/common/Span';
import { useSplitTextHeadingAnimation } from '@/hooks/useSplitTextHeadingAnimation';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { CgArrowLongLeft, CgArrowLongRight } from 'react-icons/cg';
import { IoStarSharp } from 'react-icons/io5';
import Slider, { Settings as SlickSettings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllTestimonials } from '@/services/testimonialService';
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";

type Testimonial = {
  id: string | number;
  name: string;
  designation: string;
  message: string;
  photo_url: string;
  rating: number;
};

const baseSliderSettings: SlickSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  lazyLoad: "ondemand",
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } },
  ],
};

// Reusable Testimonial Card
interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => (
  <div className="px-3">
    <div className="bg-(--blue) p-6 h-80 flex flex-col justify-between shadow-lg" data-section>
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 overflow-hidden mr-4">
          <Image
            src={testimonial.photo_url ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${testimonial.photo_url}` : "/about-us/profile.webp"}
            alt={testimonial.name}
            width={48}
            height={48}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="text-(--white-custom)">
          <Paragraph size="lg" className="font-semibold">
            {testimonial.name}
          </Paragraph>
          <Span>{testimonial.designation}</Span>
        </div>
      </div>
      <div className="flex-1 text-(--white-custom)">
        <div
          className="mb-2 font-light text-base text-justify"
          dangerouslySetInnerHTML={{ __html: testimonial.message }}
        />
      </div>
      <div className="flex mt-4 space-x-1">
        {[...Array(testimonial.rating)].map((_, i) => (
          <IoStarSharp key={i} className="text-(--yellow)" />
        ))}
      </div>
    </div>
  </div>
);

// Helper: Preload images (reusable)
const preloadImages = (testimonials: Testimonial[]) => {
  return Promise.all(
    testimonials.map((t) => {
      const img = new window.Image();
      img.src = t.photo_url ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${t.photo_url}` : "/about-us/profile.webp";
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    })
  );
};

const useResponsiveSliderSettings = (base: SlickSettings) => {
  const [settings, setSettings] = useState<SlickSettings>(base);
  useEffect(() => {
    const updateSettings = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSettings({ ...base, slidesToShow: 1 });
      } else if (width < 1024) {
        setSettings({ ...base, slidesToShow: 1 });
      } else if (width < 1280) {
        setSettings({ ...base, slidesToShow: 2 });
      } else {
        setSettings(base);
      }
    };
    updateSettings();
    window.addEventListener("resize", updateSettings);
    return () => window.removeEventListener("resize", updateSettings);
  }, [base]);
  return settings;
};

const Testimonials: React.FC = () => {
  const sliderRef = useRef<Slider | null>(null);
  const testimonialRef = useRef<HTMLDivElement | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const { setLoading } = useGlobalLoader();
  const [mounted, setMounted] = useState(false);
  const settings = useResponsiveSliderSettings(baseSliderSettings);

  // SplitText animation refs
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  useSplitTextHeadingAnimation({
    trigger: testimonialRef,
    first: paragraphRef,
    second: headingRef,
    delay: 0.3,
    enabled: mounted && testimonials.length > 0,
  });

  useEffect(() => {
    setMounted(true);
    const fetchTestimonials = async () => {
      setLoading(true);
      try {
        const result = await getAllTestimonials();
        const testimonialsData = result?.data || [];
        setTestimonials(testimonialsData);
        await preloadImages(testimonialsData);
      } catch (error: unknown) {
        if (typeof error === "object" && error !== null && "message" in error) {
          console.error("Error fetching testimonials:", (error as { message?: string }).message);
        } else {
          console.error("Error fetching testimonials:", error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, [setLoading]);

  return (
    <div ref={testimonialRef}>

      <LeftSpaceGridSection className="py-10 sm:py-20" >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_2fr] gap-4 ">
          <div className="flex flex-col gap-10 justify-center">
            <div>
              <Paragraph ref={paragraphRef} size="lg" className="text-(--blue) font-bold testimonials-title">
                Testimonials
              </Paragraph>
              <Heading ref={headingRef} level={4} className="text-(--blue) uppercase testimonials-subtitle leading-tight">
                More than <br /> 2000 happy students <br /> trust us
              </Heading>
            </div>
          </div>
          <div className="overflow-hidden flex flex-col justify-end cursor-grab">
            <Slider ref={sliderRef} {...settings} className="-ml-4 -mr-4 lg:-mr-20">
              {testimonials.map((testimonial, idx) => (
                <TestimonialCard key={idx} testimonial={testimonial} />
              ))}
            </Slider>
          </div>
        </div>
        <div className="flex flex-col items-end mt-4 px-0 sm:px-8">
          <Span className="text-(--blue)">Prev/Nxt</Span>
          <div className="flex items-center space-x-4">
            <button
              className="text-2xl text-(--blue) focus:outline-none cursor-pointer"
              onClick={() => sliderRef.current?.slickPrev()}
              aria-label="Previous"
              type="button"
            >
              <CgArrowLongLeft />
            </button>
            <button
              className="text-2xl text-(--blue) focus:outline-none cursor-pointer"
              onClick={() => sliderRef.current?.slickNext()}
              aria-label="Next"
              type="button"
            >
              <CgArrowLongRight />
            </button>
          </div>
        </div>
      </LeftSpaceGridSection>
    </div>
  );
};

export default Testimonials;