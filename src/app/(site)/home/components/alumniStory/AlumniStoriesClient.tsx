"use client";
import React, { useEffect, useState } from "react";
import Section from "@/components/common/Section";
import { FaQuoteLeft } from "react-icons/fa";
import Paragraph from "@/components/common/Paragraph";
import Heading from "@/components/common/Heading";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import Image from "next/image";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";
import { AlumniStory } from "@/types";

// Utility: Get visible alumni for carousel (reusable)
// const getVisibleAlumni = (
//   alumniData: AlumniStory[],
//   current: number,
//   isMobile: boolean
// ): (AlumniStory | undefined)[] => {
//   const total = alumniData.length;
//   if (isMobile) {
//     // Only show the current alumni on mobile
//     return [alumniData[current]];
//   }
//   return Array.from(
//     { length: 5 },
//     (_, i) => alumniData[(current + i - 2 + total) % total]
//   );
// };

const getVisibleAlumni = (
  alumniData: AlumniStory[],
  current: number,
  isMobile: boolean,
): AlumniStory[] => {
  const total = alumniData.length;

  if (!total) return [];

  if (isMobile || total <= 1) {
    return [alumniData[current]];
  }

  // Only render available items
  const visibleCount = Math.min(total, 5);

  const offset = Math.floor(visibleCount / 2);

  return Array.from({ length: visibleCount }, (_, i) => {
    return alumniData[(current + i - offset + total) % total];
  });
};

// Utility: Position and scale maps for carousel (reusable)
const positionMap = ["-300px", "-180px", "0px", "180px", "300px"] as const;
const scaleMapLg = ["1", "1.5", "1.25", "1.5", "1"] as const;
// const scaleMapMd = ["1", "1.5", "1.25", "1.5", "1"] as const;

interface AlumniImageProps {
  alumni?: AlumniStory;
  idx: number;
  onClick: () => void;
}

const AlumniImage = React.memo(
  ({ alumni, idx, onClick }: AlumniImageProps) => (
    <div
      className="absolute transition-all duration-500 ease-out cursor-pointer"
      onClick={onClick}
      style={{
        transform: `translateX(${positionMap[idx]}) scale(${scaleMapLg[idx]})`,
        zIndex: idx === 2 ? 10 : 1,
        willChange: "transform, opacity",
      }}
    >
      <div
        className={
          idx === 2
            ? "w-24 h-24 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-(--blue) shadow-lg"
            : "w-24 h-24 sm:w-20 sm:h-20 rounded-full overflow-hidden"
        }
      >
        {alumni?.photo_url ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${alumni.photo_url}`}
            alt={`${alumni.name}, alumni of Sri Maniya Institute of Hotel Management`}
            width={idx === 2 ? 144 : 80}
            height={idx === 2 ? 144 : 80}
            className={`w-full h-full object-cover object-top pointer-events-none image-tag ${
              idx === 2 ? "" : "border-2 border-(--yellow)"
            }`}
            draggable={false}
            style={{ borderRadius: "9999px" }}
            unoptimized
          />
        ) : (
          <div className="w-full h-full" />
        )}
      </div>
    </div>
  ),
  (prev, next) => {
    return prev.alumni?.id === next.alumni?.id && prev.idx === next.idx;
  },
);

AlumniImage.displayName = "AlumniImage";

const AlumniStories = ({ alumniData }: { alumniData: AlumniStory[] }) => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const total = alumniData.length;
  const [isMobile, setIsMobile] = useState(false);

  const headingRef = React.useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = React.useRef<HTMLParagraphElement | null>(null);
  const alumniRef = React.useRef<HTMLDivElement | null>(null);

  useSplitTextHeadingAnimation({
    trigger: alumniRef,
    first: paragraphRef,
    second: headingRef,
    delay: 0.3,
    enabled: !!alumniData.length,
  });

  // Touch swipe handlers for mobile
  const touchStartX = React.useRef<number | null>(null);
  const touchEndX = React.useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > 40) {
        if (diff > 0)
          nextSlide(); // swipe left
        else prevSlide(); // swipe right
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    // Responsive check for mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isHovered || total <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, total]);

  const goTo = (steps: number) =>
    setCurrent((prev) => (prev + steps + total) % total);
  const prevSlide = () => goTo(-1);
  const nextSlide = () => goTo(1);

  if (!alumniData.length) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>Loading...</div>
    );
  }

  const visible = React.useMemo(
    () => getVisibleAlumni(alumniData, current, isMobile),
    [alumniData, current, isMobile],
  );
  const currentAlumni = alumniData[current];

  return (
    mounted && (
      <div ref={alumniRef}>
        <div className="pt-10 sm:pt-20 relative w-full">
          <Section>
            <div>
              <Paragraph
                ref={paragraphRef}
                size="lg"
                className="text-(--blue) font-bold alumni-title"
              >
                Student Success Stories
              </Paragraph>
              <h3
                ref={headingRef}
                className="text-(--blue) font-jakarta text-3xl sm:text-4xl lg:text-5xl font-bold uppercase leading-tight proof-title mt-1"
              >
                Alumni Testimonials
              </h3>
              {/* <Paragraph
                ref={paragraphRef}
                size="lg"
                className="text-(--blue) font-bold alumni-title"
              >
                The Proof
              </Paragraph>
              <h2
                ref={headingRef}
                className="text-(--blue) text-3xl sm:text-4xl lg:text-5xl font-bold uppercase leading-tight proof-title mt-1"
              >
                Alumni Stories
              </h2> */}
            </div>
          </Section>
          <div className="flex justify-center  items-center pt-10  gap-10 mb-4 ">
            <div className="w-full h-px bg-(--grey)" />
            <span className="text-(--blue) text-4xl sm:text-5xl lg:text-6xl font-bold">
              <FaQuoteLeft
                aria-label="Quote Icon"
                style={{ stroke: "var(--yellow)", strokeWidth: 10 }}
              />
            </span>
            <div className="w-full h-px bg-(--grey)" />
          </div>
          <Section>
            <div className="h-122.5 sm:h-122.5 flex flex-col justify-between text-center ">
              {currentAlumni && mounted && (
                <>
                  <span className="text-xs block sm:hidden  font-semibold leading-relaxed  text-(--blue)">
                    <span
                      dangerouslySetInnerHTML={{ __html: currentAlumni.story }}
                    />
                  </span>
                  <Paragraph
                    size="lg"
                    className="max-w-3xl hidden sm:block mx-auto font-semibold leading-relaxed  text-(--blue)"
                  >
                    <span
                      dangerouslySetInnerHTML={{ __html: currentAlumni.story }}
                    />
                  </Paragraph>
                </>
              )}
              <div>
                <div
                  className={`flex  justify-center items-center mb-6 sm:mb-10 relative ${
                    isMobile ? "h-24" : "h-40"
                  }`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  {...(isMobile
                    ? {
                        onTouchStart: handleTouchStart,
                        onTouchMove: handleTouchMove,
                        onTouchEnd: handleTouchEnd,
                      }
                    : {})}
                >
                  {visible.map((alumni, idx) => (
                    <AlumniImage
                      key={alumni?.id}
                      alumni={alumni}
                      idx={isMobile ? 2 : idx}
                      onClick={() => {
                        if (isMobile) return; // No click navigation on mobile images
                        if (idx === 1) goTo(-1);
                        if (idx === 0) goTo(-2);
                        if (idx === 3) goTo(1);
                        if (idx === 4) goTo(2);
                      }}
                    />
                  ))}
                </div>
                {currentAlumni && (
                  <div className="flex flex-col sm:flex-row justify-center items-center sm:items-baseline gap-2 mb-1">
                    <Paragraph size="xl" className="font-bold text-(--blue)">
                      {currentAlumni.name}
                    </Paragraph>
                    <Paragraph size="base" className="text-(--dark)">
                      ({currentAlumni.batch_year} batch - {currentAlumni.course}
                      )
                    </Paragraph>
                  </div>
                )}
                {currentAlumni && (
                  <Paragraph size="base" className="  text-(--dark) mb-6">
                    {currentAlumni.designation} - {currentAlumni.company}
                    {currentAlumni.location
                      ? `, ${currentAlumni.location}`
                      : ""}
                    {currentAlumni.country ? `, ${currentAlumni.country}` : ""}
                  </Paragraph>
                )}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={prevSlide}
                    className="border border-(--blue)   text-2xl text-(--blue)  hover:bg-(--blue) hover:text-white    rounded-full p-2 flex items-center justify-center transition-all duration-200 w-12 h-6 cursor-pointer"
                    aria-label="Previous"
                  >
                    <HiOutlineArrowNarrowLeft aria-label="Previous Slide" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="border border-(--blue)   text-2xl text-(--blue)  hover:bg-(--blue) hover:text-white    rounded-full p-2 flex items-center justify-center transition-all duration-200 w-12 h-6 cursor-pointer"
                    aria-label="Next"
                  >
                    <HiOutlineArrowNarrowRight aria-label="Next Slide" />
                  </button>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    )
  );
};

export default AlumniStories;
