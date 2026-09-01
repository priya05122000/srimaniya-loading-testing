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
    <section
      className="partners-bg"
      ref={partnersRef}
      aria-labelledby="recruitment-partners-heading"
    >
      <Section className="py-10 sm:py-20  ">
        <div className="lg:px-10 xl:px-20">
          <Heading
            ref={headingRef}
            level={2}
            id="recruitment-partners-heading"
            className="text-3xl sm:text-4xl lg:text-5xl text-(--blue) uppercase our-recruitment-partners leading-tight"
          >
            Our recruitment partners
          </Heading>
          <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 xl:gap-10 w-full h-auto pt-10 list-none pl-0">
            {partners.map((partner, i) => (
              <li
                className="relative overflow-hidden flex p-2 items-center justify-center bg-(--white-custom) shadow-2xl border border-blue-custom"
                key={i}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${partner.logo_url}`}
                  alt={
                    partner.name
                      ? `${partner.name} — recruitment partner of Sri Maniya Institute of Hotel Management`
                      : "Recruitment partner of Sri Maniya Institute of Hotel Management"
                  }
                  className="object-contain image-tag h-32 w-32"
                  loading="lazy"
                  width={120}
                  height={120}
                  unoptimized
                />
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </section>
  );
};

export default PartPlacementPartners;
