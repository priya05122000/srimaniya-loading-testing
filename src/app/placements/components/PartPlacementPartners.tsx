"use client";
import Section from "@/components/common/Section";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Heading from "@/components/common/Heading";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";
import { getAllPartners } from "@/services/partnerService"; // import your API function
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";

gsap.registerPlugin(ScrollTrigger);

interface Partner {
  logo_url: string;
  name: string;
  website_url: string;
}

// Helper: Preload images (reusable)
const preloadImages = (partners: Partner[]) => {
  return Promise.all(
    partners.map((p) => {
      const img = new window.Image();
      img.src = `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${p.logo_url}`;
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    })
  );
};

const PartPlacementPartners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const partnersRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const { setLoading } = useGlobalLoader();

  useSplitTextHeadingAnimation({
    trigger: partnersRef,
    first: headingRef,
    delay: 0.3,
    enabled: partners.length > 0,
  });

  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true);
      try {
        const result = await getAllPartners();
        const data = result?.data || [];
        setPartners(data);
        await preloadImages(data);
      } catch {
        setPartners([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, [setLoading]);

  const scrollingPartners = [...partners];

  // const handleClick = (url: string) => () => {
  //   window.open(url, "_blank");
  // };

  return (
    <div className="partners-bg" ref={partnersRef}>
      <Section className="py-10 sm:py-20">
        <Heading
          ref={headingRef}
          level={4}
          className="text-(--blue) uppercase our-recruitment-partners leading-tight"
        >
          Our recruitment partners
        </Heading>
        <div className="grid grid-cols-1 sm:gap-10 pt-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-10 w-full h-auto">
            {scrollingPartners.map((partner, i) => (
              <div
                className="relative overflow-hidden flex p-2 items-center justify-center bg-(--white-custom) shadow-2xl border border-blue-custom"
                key={i}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${partner.logo_url}`}
                  alt={partner.name}
                  className="object-contain h-32 w-32 cursor-pointer"
                  loading="lazy"
                  width={120}
                  height={120}
                // onClick={handleClick(partner.website_url)}
                />
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default PartPlacementPartners;
