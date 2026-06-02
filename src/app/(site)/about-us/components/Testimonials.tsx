"use client"
import LeftSpaceGridSection from '@/components/common/LeftSpaceGridSection'
import Paragraph from '@/components/common/Paragraph';
import Span from '@/components/common/Span';
import { useSplitTextHeadingAnimation } from '@/hooks/useSplitTextHeadingAnimation';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import type { Swiper as SwiperType } from 'swiper';
import { getAllTestimonials } from '@/services/testimonialService';
import { Star, ArrowLongLeft, ArrowLongRight } from '@/components/icons/Icons';

type Testimonial = {
  id: string | number;
  name: string;
  designation: string;
  message: string;
  photo_url: string;
  rating: number;
  status: boolean;
};

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => (
  <div className="px-3">
    <div className="bg-(--blue) p-6 h-84 flex flex-col justify-between shadow-lg" data-section>
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 overflow-hidden mr-4">
          <Image
            src={testimonial.photo_url ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${testimonial.photo_url}` : "/about-us/profile.webp"}
            alt="Student testimonial at Sri Maniya Institute"
            width={48}
            height={48}
            className="object-cover w-full h-full image-tag"
            unoptimized
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
          <Star key={i} className="text-(--yellow)" aria-label="Star rating" />
        ))}
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const testimonialRef = useRef<HTMLDivElement | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [mounted, setMounted] = useState(false);

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
      try {
        const result = await getAllTestimonials();
        const testimonialsData = result?.data || [];
        setTestimonials(testimonialsData.filter((t: Testimonial) => t.status));
      } catch (error: unknown) {
        if (typeof error === "object" && error !== null && "message" in error) {
          console.error("Error fetching testimonials:", (error as { message?: string }).message);
        } else {
          console.error("Error fetching testimonials:", error);
        }
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div ref={testimonialRef}>
      <LeftSpaceGridSection className="py-10 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_2fr] gap-4">
          <div className="flex flex-col gap-10 justify-center">
            <div>
              <Paragraph ref={paragraphRef} size="lg" className="text-(--blue) font-bold testimonials-title">
                Testimonials
              </Paragraph>
              <h3 ref={headingRef} className="text-(--blue) font-jakarta text-3xl sm:text-4xl lg:text-5xl font-bold uppercase testimonials-subtitle leading-tight">
                More than <br /> 2000 happy students <br /> trust us
              </h3>
            </div>
          </div>
          <div className="overflow-hidden flex flex-col justify-end">
            <Swiper
              modules={[Autoplay]}
              slidesPerView={1}
              spaceBetween={0}
              loop={testimonials.length > 1}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              breakpoints={{
                768: { slidesPerView: 1 },
                1024: { slidesPerView: 2 },
                1280: { slidesPerView: 3 },
              }}
              onSwiper={(swiper) => { swiperRef.current = swiper; }}
              className="-ml-4 -mr-4 lg:-mr-20 cursor-grab"
            >
              {testimonials.map((testimonial, idx) => (
                <SwiperSlide key={idx}>
                  <TestimonialCard testimonial={testimonial} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="flex flex-col items-end mt-4 px-0 sm:px-8">
          <Span className="text-(--blue)">Prev/Nxt</Span>
          <div className="flex items-center space-x-4">
            <button
              className="text-2xl text-(--blue) focus:outline-none cursor-pointer"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous"
              type="button"
            >
              <ArrowLongLeft aria-label="Previous testimonial" />
            </button>
            <button
              className="text-2xl text-(--blue) focus:outline-none cursor-pointer"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next"
              type="button"
            >
              <ArrowLongRight aria-label="Next testimonial" />
            </button>
          </div>
        </div>
      </LeftSpaceGridSection>
    </div>
  );
};

export default Testimonials;
