"use client";
import Section from "@/components/common/Section";
import Image from "next/image";
import React, { useRef } from "react";
import Heading from "@/components/common/Heading";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";

interface Partner {
  logo_url: string;
  name: string;
  website_url: string;
  status: boolean;
}

const PartPlacementPartners: React.FC<{ partners?: Partner[] }> = ({
  partners = [],
}) => {
  const partnersRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useSplitTextHeadingAnimation({
    trigger: partnersRef,
    first: headingRef,
    delay: 0.3,
    enabled: partners.length > 0,
  });

  return (
    <div className="partners-bg" ref={partnersRef}>
      <Section className="py-10 sm:py-20  ">
        <div className="lg:px-10 xl:px-20">
          <Heading
            ref={headingRef}
            level={4}
            className="text-(--blue) uppercase our-recruitment-partners leading-tight"
          >
            Our recruitment partners
          </Heading>
          <div className="grid grid-cols-1 sm:gap-10 pt-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 xl:gap-10 w-full h-auto">
              {partners.map((partner, i) => (
                <div
                  className="relative overflow-hidden flex p-2 items-center justify-center bg-(--white-custom) shadow-2xl border border-blue-custom"
                  key={i}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${partner.logo_url}`}
                    alt="Placement partners of Sri Maniya Institute of Hotel Management"
                    className="object-contain image-tag h-32 w-32 cursor-pointer"
                    loading="lazy"
                    width={120}
                    height={120}
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default PartPlacementPartners;
