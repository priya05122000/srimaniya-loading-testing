"use client";

import React, { useEffect, useRef, memo } from "react";
import Image from "next/image";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";
import Paragraph from "@/components/common/Paragraph";
import Heading from "@/components/common/Heading";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";

// --- Types & Constants ---
export type Feature = {
  number: string;
  title: string;
};

export const features: Feature[] = [
  { number: "01", title: "Internship from Day 1 with stipend" },
  { number: "02", title: "100% Placement Support" },
  { number: "03", title: "Affordable Fees with Flexible Payment Options" },
  { number: "04", title: "Strong Hotel Legacy Since 1984 - career opportunity" },
];

// --- Feature Card Components ---
const FeatureCard: React.FC<{ feature: Feature; idx: number }> = memo(({ feature, idx }) => (
  <div className="min-h-[250px]">
    <div
      className="flex flex-col justify-end items-end bg-cover bg-center relative w-full h-full overflow-hidden will-change-transform group"
      style={{ backgroundImage: `url('/home/commitment-bg-${idx + 1}.webp')` }}
    >
      <div
        className="absolute inset-0 z-0 transition-all duration-300 group-hover:opacity-0"
        style={{
          backgroundImage: `url('/home/commitment-bg-${idx + 1}.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(10px) brightness(0.8)",
          transform: "scale(1.05)",
        }}
      />
      <div className="absolute inset-0 z-20 pointer-events-none transition-all duration-300 group-hover:opacity-0 bg-no-repeat bg-[url('/designs/noise.svg')] bg-cover" />
      <div className="relative z-30 flex flex-col items-end justify-start h-full p-6 sm:p-8 gap-4 text-(--white-custom) w-10/12 lg:w-2/3 group">
        <div className="transition-all duration-300 ease-in-out rounded-lg">
          <Heading
            level={5}
            className="mb-1 font-semibold transition-colors duration-300 ease-in-out bg-(--blue) p-2"
          >
            {feature.number}
          </Heading>
        </div>
        <div className="transition-all duration-300 ease-in-out rounded-lg">
          <Heading
            level={6}
            className="text-end font-semibold leading-snug transition-colors duration-300 ease-in-out group-hover:text-white px-2 py-1 group-hover:backdrop-blur-md group-hover:bg-white/6 group-hover:drop-shadow-2xl group-hover:text-shadow-lg"
          >
            {feature.title}
          </Heading>
        </div>
      </div>
    </div>
  </div>
));
FeatureCard.displayName = "FeatureCard";

const MobileFeatureCard: React.FC<{ feature: Feature; idx: number }> = memo(({ feature, idx }) => (
  <div>

    {/* Mobile: Show all features in a single image with a list */}
    {idx === 0 && (
      <div className="flex flex-col justify-end items-center bg-cover bg-center relative w-full h-full overflow-hidden will-change-transform group">
        <div
          className="absolute inset-0 z-0 transition-all duration-300 group-hover:opacity-0"
          style={{
            backgroundImage: `url('/home/commitment-bg-1.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(10px) brightness(0.8)",
            transform: "scale(1.05)",
          }}
        />
        <div className="absolute inset-0 z-20 pointer-events-none transition-all duration-300 group-hover:opacity-0 bg-no-repeat bg-[url('/designs/noise.svg')] bg-cover" />
        <div className="relative z-30 flex flex-col justify-center h-full px-6 sm:px-8 pt-10 pb-20 text-(--white-custom) w-full sm:w-2/3 group gap-4">
          {features.map((f) => (
            <div
              key={f.number}
              className="transition-all duration-300 ease-in-out bg-(--white-custom) border-l-6 border-(--yellow) text-(--blue) mb-2 last:mb-0 px-2 py-1"
            >
              <Paragraph size="base" className="font-semibold leading-snug text-start">
                {f.title}
              </Paragraph>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
));
MobileFeatureCard.displayName = "MobileFeatureCard";

// --- Main Component ---
const CommitmentBanner: React.FC = () => {
  const { setLoading } = useGlobalLoader();
  const logoRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const splitTextTriggerRef = useRef<HTMLDivElement | null>(null);

  // GSAP SplitText Animation
  useSplitTextHeadingAnimation({
    trigger: splitTextTriggerRef,
    first: paragraphRef,
    second: headingRef,
    delay: 0.3,
    enabled: true,
  });

  // Rotating Logo Animation
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastRenderedRotation: number | null = null;
    let ticking = false;
    const animate = () => {
      const rotation = (lastScrollY * 0.2) % 360;
      if (
        logoRef.current &&
        (lastRenderedRotation === null || Math.abs(rotation - lastRenderedRotation) > 0.5)
      ) {
        logoRef.current.style.transform = `rotate(${rotation}deg)`;
        logoRef.current.style.willChange = "transform";
        lastRenderedRotation = rotation;
      }
      requestAnimationFrame(animate);
    };
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          lastScrollY = window.scrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    requestAnimationFrame(animate);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="partners-bg" ref={splitTextTriggerRef}>
      <div className="w-full relative mb-15 lg:mb-28 flex flex-col">
        <div className="bg-(--blue) px-6 sm:px-8 py-10 flex flex-col items-end" data-section>
          <Paragraph ref={paragraphRef} size="lg" className="msg-text-scroll text-end mt-1">
            Sri Maniya Institute of Hotel Management
          </Paragraph>
          <Heading ref={headingRef} level={4} className="text-(--white-custom) text-right leading-tight commitment-title uppercase ">
            Our commitment to build your trust
          </Heading>
        </div>
        <div className="relative hidden lg:grid grid-cols-1 lg:grid-cols-4 flex-1 min-h-[60vh] sm:min-h-[400px] xl:min-h-[420px]">
          {features.map((feature, idx) => (
            <FeatureCard key={feature.number} feature={feature} idx={idx} />
          ))}
        </div>
        <div className="relative grid grid-cols-1 lg:hidden">
          {features.map((feature, idx) => (
            <MobileFeatureCard key={feature.number} feature={feature} idx={idx} />
          ))}
        </div>
        <div className="absolute bottom-0 left-6 sm:left-8 lg:left-1/6 translate-x-0 translate-y-1/2 z-30">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-44 lg:h-44 flex items-center justify-center will-change-transform aspect-square">
            <div ref={logoRef} id="rotating-logo" className="absolute inset-0 aspect-square">
              <Image
                src="/designs/rotate.svg"
                alt="Rotating Ring"
                fill
                className="object-contain image-tag"
                priority
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-10 aspect-square">
              <Image
                src="/logos/sri-maniya-institute-logo.png"
                alt="Sri Maniya Institute"
                width={120}
                height={120}
                className="object-contain image-tag w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitmentBanner;
