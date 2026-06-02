"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Span from "@/components/common/Span";
import { ArrowLongLeft, ArrowLongRight } from "@/components/icons/Icons";
import type { Blog } from "./EventsBlogs";
import BlogCard from "./EventsBlogCard";

interface EventsBlogsSliderProps {
  blogs: Blog[];
}

const EventsBlogsSlider: React.FC<EventsBlogsSliderProps> = ({ blogs }) => {
  const [navigation, setNavigation] = useState<{
    prevEl: null | HTMLElement;
    nextEl: null | HTMLElement;
  }>({ prevEl: null, nextEl: null });

  return (
    <>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={16}
        slidesPerView={5}
        loop={blogs.length >= 5}
        grabCursor={true}
        navigation={navigation}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {blogs.map((blog, idx) => (
          <SwiperSlide key={blog.id}>
            <BlogCard blog={blog} idx={idx} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex flex-col items-end mt-4 px-0 sm:px-8">
        <Span className="text-(--blue)">Prev/Nxt</Span>
        <div className="flex items-center space-x-4 mt-2">
          <button
            ref={(node) => {
              if (node && navigation.prevEl !== node)
                setNavigation((nav) => ({ ...nav, prevEl: node }));
            }}
            className="text-2xl text-(--blue) focus:outline-none cursor-pointer"
            aria-label="Previous"
            type="button"
          >
            <ArrowLongLeft aria-label="Previous blog" />
          </button>
          <button
            ref={(node) => {
              if (node && navigation.nextEl !== node)
                setNavigation((nav) => ({ ...nav, nextEl: node }));
            }}
            className="text-2xl text-(--blue) focus:outline-none cursor-pointer"
            aria-label="Next"
            type="button"
          >
            <ArrowLongRight aria-label="Next blog" />
          </button>
        </div>
      </div>
    </>
  );
};

export default EventsBlogsSlider;
