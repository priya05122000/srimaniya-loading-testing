"use client";

import React, { useRef, useEffect } from "react";
import Section from "@/components/common/Section";

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
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const digitHeight =
      wrapperRef.current.querySelector(".digit-span")?.clientHeight || 24;
    const digits = value.toString().split("");
    const el = wrapperRef.current;
    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      digits.forEach((digit, i) => {
        const digitContainer = el?.children[i] as HTMLElement;
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
            trigger: el,
            start: ODOMETER_ANIMATION.scrollStart,
            once: false,
          },
        });
      });
    })();
  }, [value]);

  return (
    <span
      ref={wrapperRef}
      className="flex overflow-hidden tabular-nums"
      aria-hidden="true"
    >
      {value
        .toString()
        .split("")
        .map((_, idx) => (
          <span
            key={idx}
            className="h-[1em] overflow-hidden relative"
            style={{ lineHeight: "1em", minWidth: "0.6em" }}
          >
            <span className="digit-column flex flex-col">
              {Array.from({ length: 10 }, (_, n) => (
                <span
                  key={n}
                  className="digit-span block h-[1em] leading-[1em]"
                >
                  {n}
                </span>
              ))}
            </span>
          </span>
        ))}
    </span>
  );
};

// 🔹 Main Component
const PlacementStats: React.FC = () => (
  <section
    className="py-10 bg-(--blue)"
    data-section
    aria-label="Placement statistics"
  >
    <Section>
      <dl className="flex flex-col sm:flex-row justify-evenly text-(--white-custom) gap-6 sm:gap-2 py-4 sm:py-8 message-content m-0">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center lg:py-6">
            <dt className="flex justify-center font-jakarta text-xl sm:text-4xl lg:text-6xl font-bold">
              <span className="flex items-baseline">
                <OdometerNumber value={parseInt(stat.value)} />
                <span className="ml-1">+</span>
              </span>
              <span className="sr-only">{stat.value}+</span>
            </dt>
            <dd className="font-normal text-center mt-2 text-base sm:text-xl lg:text-2xl font-inter ml-0">
              {stat.label}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  </section>
);

export default PlacementStats;
