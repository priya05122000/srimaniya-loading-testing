"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { AlumniStory } from "@/types";
import Section from "@/components/common/Section";
import Paragraph from "@/components/common/Paragraph";
import Heading from "@/components/common/Heading";
import { FaQuoteLeft } from "react-icons/fa";

// Position maps
const positionMap = ["-300px", "-180px", "0px", "180px", "300px"];
const scaleMap = ["1", "1.5", "1.25", "1.5", "1"];

type Props = {
  alumniData: AlumniStory[];
};

const AlumniImage = React.memo(
  ({
    alumni,
    index,
    current,
    total,
    setCurrent,
  }: {
    alumni: AlumniStory;
    index: number;
    current: number;
    total: number;
    setCurrent: React.Dispatch<React.SetStateAction<number>>;
  }) => {
    const offset = (index - current + total) % total;

    // Only show 5 visible
    if (offset > 2 && offset < total - 2) return null;

    const posIndex =
      offset === total - 2
        ? 0
        : offset === total - 1
          ? 1
          : offset === 0
            ? 2
            : offset === 1
              ? 3
              : offset === 2
                ? 4
                : 2;

    const position = positionMap[posIndex];
    const scale = scaleMap[posIndex];

    const imageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${alumni.photo_url}`;

    return (
      <div
        className="absolute transition-all duration-500 ease-out cursor-pointer"
        onClick={() => setCurrent(index)}
        style={{
          transform: `translateX(${position}) scale(${scale})`,
          zIndex: posIndex === 2 ? 10 : 1,
        }}
      >
        <div
          className={
            posIndex === 2
              ? "w-24 h-24 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-blue-500"
              : "w-20 h-20 rounded-full overflow-hidden"
          }
        >
          <Image
            src={imageUrl}
            alt={alumni.name}
            width={144}
            height={144}
            unoptimized
            draggable={false}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }
);

export default function AlumniStoriesClient({ alumniData }: Props) {
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);
  const total = alumniData.length;
  const [isMobile, setIsMobile] = useState(false);


  const headingRef = React.useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = React.useRef<HTMLParagraphElement | null>(null);

  // 🔥 Content height animation
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);



  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 3000);

    return () => clearInterval(interval);
  }, [total]);

  if (!mounted) return null;

  const currentAlumni = alumniData[current];

  return (
    <div className="pt-10 sm:pt-20 relative w-full">

      <Section>
        <div>
          <Paragraph
            ref={paragraphRef}
            size="lg"
            className="text-(--blue) font-bold alumni-title"
          >
            The Proof
          </Paragraph>
          <Heading
            ref={headingRef}
            level={4}
            className="text-(--blue) uppercase leading-tight proof-title mt-1"
          >
            Alumni Stories
          </Heading>
        </div>
      </Section>

      <div className="flex justify-center  items-center pt-10  gap-10 mb-4 ">
        <div className="w-full h-px bg-(--grey)" />
        <span className="text-(--blue) text-4xl sm:text-5xl lg:text-6xl font-bold">
          <FaQuoteLeft aria-label="Quote left" style={{ stroke: "var(--yellow)", strokeWidth: 10 }} />
        </span>
        <div className="w-full h-px bg-(--grey)" />
      </div>



      <Section>
        <div className="h-112 sm:h-122 flex flex-col justify-between text-center ">
          {currentAlumni?.story && (
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
              className={`flex  justify-center items-center mb-6 sm:mb-10 relative ${isMobile ? "h-24" : "h-40"
                }`}
            ></div>
          </div>
        </div>

      </Section>

      {/* Slider */}
      {/* <div className="relative flex justify-center items-center h-40">
        {alumniData.map((alumni, index) => (
          <AlumniImage
            key={alumni.id}
            alumni={alumni}
            index={index}
            current={current}
            total={total}
            setCurrent={setCurrent}
          />
        ))}
      </div> */}

      {/* Name */}
      {/* <div className="mt-6">
        <h3 className="font-bold text-lg">{currentAlumni.name}</h3>
        <p className="text-sm text-gray-500">
          {currentAlumni.designation} - {currentAlumni.company}
        </p>
      </div> */}
    </div>
  );
}