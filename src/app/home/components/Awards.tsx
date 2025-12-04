"use client";

import React, { useRef, useEffect, useState, useContext } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import Section from "@/components/common/Section";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";
import { getAllAwards } from "@/services/awardService";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";

// --- Types ---
type Award = {
  id: string;
  name: string;
  subtitle: string;
  recipient_name: string;
  description: string;
  award_year: string;
  status?: boolean;
};

// --- Reusable Award Table Row ---
const AwardTableRow: React.FC<{ award: Award }> = ({ award }) => (
  <tr className="border-b border-grey-custom last:border-b-0">
    <td className="py-4 sm:pr-8 font-semibold text-(--white-custom) whitespace-nowrap text-left align-top text-sm md:text-base">
      {award.recipient_name}
    </td>
    <td className="py-4 pr-8 text-(--white-custom) leading-relaxed text-left align-top text-sm md:text-base">
      <span className="text-justify" dangerouslySetInnerHTML={{ __html: award.description }} />
    </td>
    <td className="py-4 font-semibold text-(--white-custom) text-right align-top whitespace-nowrap text-sm md:text-base">
      {award.award_year}
    </td>
  </tr>
);

// --- Reusable Award Mobile Card ---
const AwardMobileCard: React.FC<{ award: Award }> = ({ award }) => (
  <div className="award-mobile-card border-b border-grey-custom last:border-b-0 py-4">
    <Paragraph size="xl" className="font-semibold text-(--white-custom) mb-1">
      {award.recipient_name}
    </Paragraph>
    <Paragraph size="lg" className="text-(--white-custom) mb-2">
      <span dangerouslySetInnerHTML={{ __html: award.description }} />
    </Paragraph>
    <Paragraph size="xl" className="text-(--white-custom) text-right font-semibold">
      {award.award_year}
    </Paragraph>
  </div>
);

// --- Register Plugin ---
gsap.registerPlugin(ScrollTrigger);

export default function Awards() {
  const awardsRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  const [awards, setAwards] = useState<Award[]>([]);
  const { setLoading } = useGlobalLoader();

  // Add state for mobile "Read More"
  const [showAllMobile, setShowAllMobile] = useState(false);

  useSplitTextHeadingAnimation({
    trigger: awardsRef,
    first: paragraphRef,
    second: headingRef,
    delay: 0.3,
    enabled: awards.length > 0,
  });

  useEffect(() => {
    let isMounted = true;
    async function fetchAwards() {
      try {
        const result = await getAllAwards();
        if (result?.status && Array.isArray(result.data)) {
          const activeAwards = result.data.filter((award: Award) => award?.status === true);
          if (isMounted) setAwards(activeAwards);
        } else {
          if (isMounted) setAwards([]);
        }
      } catch (err) {
        console.error("Failed to fetch awards:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAwards();
    return () => { isMounted = false; };
  }, [setLoading]);

  useEffect(() => {
    const section = awardsRef.current;
    const left = leftRef.current;

    if (!section || !left) return;

    // 🟢 Only enable pinning for desktop screens
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top+=80", // pin starts when section top hits 100px from viewport top
        end: "bottom bottom-=200", // ends near bottom of section
        pin: left,
        pinSpacing: false, // no extra blank space after unpin
        scrub: true,
      });
    });

    return () => {
      mm.revert(); // cleanup on unmount
    };
  }, []);

  return (
    <div className="bg-(--blue)" data-section ref={awardsRef}>
      <Section className="relative py-10 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] sm:gap-10">
          {/* Left Title (GSAP Sticky) */}
          <div ref={leftRef}>
            <Paragraph
              ref={paragraphRef}
              size="lg"
              className="text-(--white-custom) font-bold awards-title"
            >
              Awards
            </Paragraph>
            <Heading
              ref={headingRef}
              level={4}
              className="honors-title text-(--white-custom) uppercase leading-tight mt-1"
            >
              Honors <br className="hidden lg:block" /> and{" "}
              <br className="hidden lg:block" /> Recognition
            </Heading>
          </div>

          {/* Right Side Awards List */}
          <div>
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto hide-scrollbar will-change-transform">
              <table className="min-w-full w-full text-left border-y border-grey-custom border-collapse">
                <tbody>
                  {awards.map((award) => (
                    <AwardTableRow key={award.id} award={award} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="block sm:hidden mt-8">
              {(showAllMobile ? awards : awards.slice(0, 4)).map((award) => (
                <AwardMobileCard key={award.id} award={award} />
              ))}
              {/* Read More Button */}
              {!showAllMobile && awards.length > 4 && (
                <button
                  type="button"
                  className="mt-4 px-2 py-2 text-(--white-custom) underline font-semibold"
                  onClick={() => setShowAllMobile(true)}
                >
                  Read More
                </button>
              )}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
