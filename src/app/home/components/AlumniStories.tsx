"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";

import Section from "@/components/common/Section";
import Paragraph from "@/components/common/Paragraph";
import Heading from "@/components/common/Heading";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";

import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import Image from "next/image";
import { BiSolidQuoteLeft } from "react-icons/bi";

import { getAllAlumniStories } from "@/services/alumniStoryService";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";

// Types
export type Alumni = {
  id: string;
  name: string;
  batch_year: number;
  course: string;
  location: string;
  designation: string;
  country: string;
  company: string;
  story: string;
  photo_url: string;
  video_url: string;
  status?: boolean;
};

export type QuoteBlockProps = Pick<
  Alumni,
  | "name"
  | "batch_year"
  | "course"
  | "designation"
  | "company"
  | "country"
  | "story"
  | "location"
  | "photo_url"
  | "video_url"
>;

/* ---------------------------------------------------
    📌 PRELOAD IMAGES FUNCTION (Top-level to avoid hoisting issues)
----------------------------------------------------- */
const preloadImages = (items: Alumni[]) => {
  const promises = items.map((p) => {
    const img = new window.Image();
    img.src = `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${p.photo_url}`;
    return new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve;
    });
  });
  return Promise.all(promises);
};

/* ---------------------------------------------------
    📌 REUSABLE MEDIA COMPONENT
----------------------------------------------------- */
const AlumniMedia: React.FC<{
  photoUrl: string;
  videoUrl?: string;
  name: string;
}> = ({ photoUrl, videoUrl, name }) => {
  const source = `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${photoUrl}`;

  return videoUrl ? (
    <video controls className="w-full h-full object-cover rounded-lg">
      <source
        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${videoUrl}`}
        type="video/mp4"
      />
    </video>
  ) : (
    <Image
      src={source}
      alt={name}
      width={400}
      height={400}
      className="w-full h-full object-cover object-top"
      unoptimized
    />
  );
};

/* ---------------------------------------------------
    📌 QUOTE BLOCK COMPONENT
----------------------------------------------------- */
const QuoteBlock: React.FC<{ alumni: QuoteBlockProps }> = ({ alumni }) => (
  <div
    className="flex-1 bg-(--blue)  py-8 px-6 sm:px-8 xl:px-20 text-(--white-custom) h-full sm:text-end"
    data-section
  >
    <div className="h-full flex flex-col justify-start sm:justify-center ">
      {/* Show AlumniMedia only on mobile */}
      <div className="sm:hidden mb-4 h-24 w-24 ">
        <AlumniMedia
          photoUrl={alumni.photo_url}
          videoUrl={alumni.video_url}
          name={alumni.name}
        />
      </div>
      <Heading level={4} className="uppercase">
        {alumni.name}
      </Heading>
      <Paragraph
        size="lg"
        className="text-(--grey-custom) mt-2"
      >
        {alumni.batch_year} - {alumni.course}
      </Paragraph>
      <Paragraph
        size="lg"
        className="text-(--grey-custom) "
      >
        {alumni.designation} - {alumni.company}
        {alumni.location && `, ${alumni.location}`}
        {alumni.country && `, ${alumni.country}`}
      </Paragraph>
      <div className="flex items-start gap-4 pt-4 sm:pt-8">
        <BiSolidQuoteLeft className="text-9xl text-(--yellow) h-auto" />
        <div className="flex flex-col gap-2 text-(--white-custom)">
          <div
            className="text-sm lg:text-base"
            dangerouslySetInnerHTML={{ __html: alumni.story }}
          />
        </div>
      </div>
    </div>
  </div>
);

/* ---------------------------------------------------
    📌 NAVIGATION BUTTONS
----------------------------------------------------- */
const AlumniNavButtons: React.FC = () => (
  <div className="flex flex-col items-end mt-4 gap-2 z-20 sm:px-10 lg:px-20 xl:px-30">
    <Paragraph size="lg" className="text-(--blue)">
      Prev/Nxt
    </Paragraph>

    <div className="flex gap-2">
      <button className="alumni-prev">
        <HiOutlineArrowNarrowLeft className="border-2 rounded-full text-(--blue) w-12 h-6" />
      </button>

      <button className="alumni-next">
        <HiOutlineArrowNarrowRight className="border-2 rounded-full text-(--blue) w-12 h-6" />
      </button>
    </div>
  </div>
);

/* ---------------------------------------------------
    📌 MAIN COMPONENT
----------------------------------------------------- */
const AlumniStories: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);


  const [alumniData, setAlumniData] = useState<Alumni[]>([]);
  const { setLoading } = useGlobalLoader();

  /* ---------------------------------------------------
      📌 FIXED LOADING LOGIC INSIDE useEffect()
  ----------------------------------------------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await getAllAlumniStories();
        const raw: Alumni[] = res?.data ?? [];

        const active = raw.filter((a) => a.status);
        setAlumniData(active);

        // Preload images before slider shows
        await preloadImages(active);
      } catch (err) {
        console.error("Failed to load alumni stories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setLoading]);

  return (
    <div className="space-y-10 py-10 sm:py-20">
      <Section ref={sectionRef}>
        <div className="sm:px-10 lg:px-20 xl:px-30">
          <Paragraph
            size="lg"
            className="text-(--blue) font-bold alumni-title"
          >
            The Proof
          </Paragraph>
          <Heading
            level={4}
            className="text-(--blue) uppercase mt-2 proof-title"
          >
            Alumni Stories
          </Heading>
        </div>

        <div className="h-[550px] sm:h-[450px] relative mt-10 sm:px-10 lg:px-20 xl:px-30">
          <Swiper
            effect="fade"
            grabCursor
            loop={alumniData.length > 1}
            navigation={{ nextEl: ".alumni-next", prevEl: ".alumni-prev" }}
            modules={[EffectFade, Navigation, Autoplay]}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="mySwiper h-full"
          >
            {alumniData.map((alumni) => (
              <SwiperSlide key={alumni.id}>
                <div
                  className="w-full h-full bg-top relative sm:bg-cover"
                // style={
                //   typeof window !== "undefined" && window.innerWidth < 640
                //     ? {}
                //     : {
                //       backgroundImage: `url('${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${alumni.photo_url}')`,
                //     }
                // }
                >
                  {/* <div className="absolute inset-0 z-10  bg-[#0b2351]/40  sm:block hidden" /> */}
                  <div className="h-full">
                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-[1.5fr_1fr]  h-full items-end  w-full ">
                      <div
                        className={` bg-(--blue) w-full sm:h-full ${typeof window !== "undefined" && window.innerWidth < 640
                          ? "h-[550px] sm:h-[450px]"
                          : ""
                          }`}
                      >
                        <QuoteBlock alumni={alumni} />
                      </div>
                      <div className="hidden will-change-transform sm:flex items-center justify-center h-[350px] md:h-full overflow-hidden relative border-b sm:border-b-0 sm:border-l border-(--grey-custom) ">
                        <AlumniMedia
                          photoUrl={alumni.photo_url}
                          videoUrl={alumni.video_url}
                          name={alumni.name}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
        <AlumniNavButtons />
      </Section>
    </div>
  );
};

export default AlumniStories;
