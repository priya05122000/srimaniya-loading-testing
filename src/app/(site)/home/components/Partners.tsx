"use client";

import { useEffect, useRef, useState } from "react";
import { getAllPartners } from "@/services/partnerService";
import Section from "@/components/common/Section";
import Paragraph from "@/components/common/Paragraph";
import Image from "next/image";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";

interface Partner {
  logo_url: string;
  name: string;
  website_url: string;
}

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);

  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const splitTextTriggerRef = useRef<HTMLDivElement | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useSplitTextHeadingAnimation({
    trigger: splitTextTriggerRef,
    first: paragraphRef,
    second: headingRef,
    delay: 0.3,
    enabled: !!partners.length,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAllPartners();
        setPartners(result?.data || []);
      } catch (err) {
        console.error("Failed to fetch partners:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="partners-bg" ref={splitTextTriggerRef}>
      <Section className="py-10 sm:py-20">
        <div className="lg:px-20">
          <Paragraph
            ref={paragraphRef}
            size="lg"
            className="text-(--blue) font-bold partners-title"
          >
            Top Hotel Placement Partners
          </Paragraph>
          <h2
            ref={headingRef}
            className="text-(--blue) font-jakarta text-3xl sm:text-4xl lg:text-5xl font-bold mt-1 uppercase partners-explore-title leading-tight"
          >
            Explore Our <br /> Global Placement Network
          </h2>

          <div className="brands_list-wrapper relative overflow-hidden mt-10">
            <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-10 bg-[linear-gradient(to_right,#EEECEA_0%,rgba(255,255,255,0)_10%,rgba(255,255,255,0)_90%,#EEECEA_100%)]" />
            <div className="marquee-track">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="bg-(--white-custom) h-32 w-50 shadow-sm flex items-center justify-center shrink-0 mx-4"
                  aria-hidden={index >= partners.length ? "true" : undefined}
                >
                  <Image
                    src={`${baseUrl}/${partner.logo_url}`}
                    alt={
                      index >= partners.length
                        ? ""
                        : "Recruitment partner of Sri Maniya Institute of Hotel Management"
                    }
                    width={200}
                    height={100}
                    className="object-contain image-tag h-full w-full p-4 opacity-80 hover:opacity-100 transition"
                    sizes="200px"
                    placeholder="empty"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
