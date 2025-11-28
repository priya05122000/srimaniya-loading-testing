"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import Section from "@/components/common/Section";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";

// Types
interface Stat {
  value: string;
  label: string;
}

// Reusable constants
const STATS: Stat[] = [
  { value: "250", label: "Placement Partners" },
  { value: "750", label: "Placements" },
  { value: "800", label: "Part Time Placements" },
];

const ODOMETER_ANIMATION = {
  duration: 2,
  delayStep: 0.15,
  ease: "power2.inOut",
  scrollStart: "top 90%",
};

// 🔹 Animated Odometer Number
interface OdometerNumberProps {
  value: number;
}

const OdometerNumber: React.FC<OdometerNumberProps> = ({ value }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const digitHeight =
      wrapperRef.current.querySelector(".digit-span")?.clientHeight || 24;
    const digits = value.toString().split("");
    digits.forEach((digit, i) => {
      const digitContainer = wrapperRef.current?.children[i] as HTMLElement;
      const digitColumn = digitContainer?.querySelector(
        ".digit-column"
      ) as HTMLElement;
      if (!digitColumn) return;
      gsap.set(digitColumn, { y: 0 });
      gsap.to(digitColumn, {
        y: -Number(digit) * digitHeight,
        duration: ODOMETER_ANIMATION.duration,
        delay: i * ODOMETER_ANIMATION.delayStep,
        ease: ODOMETER_ANIMATION.ease,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: ODOMETER_ANIMATION.scrollStart,
          once: false,
        },
      });
    });
  }, [value]);

  return (
    <div ref={wrapperRef} className="flex overflow-hidden tabular-nums">
      {value
        .toString()
        .split("")
        .map((_, idx) => (
          <div
            key={idx}
            className="h-[1em] overflow-hidden relative"
            style={{ lineHeight: "1em", minWidth: "0.6em" }}
          >
            <div className="digit-column flex flex-col">
              {Array.from({ length: 10 }, (_, n) => (
                <span
                  key={n}
                  className="digit-span block h-[1em] leading-[1em]"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

// 🔹 Main Component
const PlacementStats: React.FC = () => (
  <div className="py-10 bg-(--blue)" data-section>
    <Section>
      <div className="grid grid-cols-1 lg:gap-8 message-content">
        <div className="flex flex-col sm:flex-row justify-evenly text-(--white-custom) gap-6 sm:gap-2 py-4 sm:py-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center lg:py-6">
              <Heading level={3} className="hidden sm:flex justify-center">
                <span className="flex items-baseline">
                  <OdometerNumber value={parseInt(stat.value)} />
                  <span className="ml-1">+</span>
                </span>
              </Heading>
              <Heading level={6} className="flex sm:hidden justify-center">
                <span className="flex items-baseline">
                  <OdometerNumber value={parseInt(stat.value)} />
                  <span className="ml-1">+</span>
                </span>
              </Heading>
              <Paragraph
                size="xl"
                className="font-normal hidden sm:block text-center mt-2"
              >
                {stat.label}
              </Paragraph>
              <Paragraph
                size="lg"
                className="font-normal block sm:hidden text-center mt-2"
              >
                {stat.label}
              </Paragraph>
            </div>
          ))}
        </div>
      </div>
    </Section>
  </div>
);

export default PlacementStats;
