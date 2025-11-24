"use client";

import { useEffect, useRef, useState } from "react";
import { getAllPartners } from "@/services/partnerService";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";
import Section from "@/components/common/Section";
import Paragraph from "@/components/common/Paragraph";
import Heading from "@/components/common/Heading";
import Image from "next/image";

import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { Splide } from "@splidejs/splide";

interface Partner {
  logo_url: string;
  name: string;
  website_url: string;
}

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const { setLoading } = useGlobalLoader();
  const splideRef = useRef<HTMLDivElement | null>(null);

  /**
   * Fetch partners + preload images for smooth scroll
   */
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAllPartners();
        const data = result?.data || [];
        setPartners(data);

        await preloadImages(data);
      } catch (err) {
        console.error("Failed to fetch partners:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  /**
   * Preload image URLs before rendering slider
   */
  const preloadImages = (partners: Partner[]) => {
    const promises = partners.map((p) => {
      const img = new window.Image();
      img.src = `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${p.logo_url}`;
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    });
    return Promise.all(promises);
  };

  /**
   * Initialize Splide AFTER partners have been loaded
   */
  useEffect(() => {
    if (!splideRef.current || partners.length === 0) return;

    const splide = new Splide(splideRef.current, {
      type: "loop",
      drag: "free",
      focus: "center",
      pagination: false,
      arrows: false,
      gap: "2rem",
      perPage: 6,
      autoScroll: {
        speed: 1.5,
        pauseOnHover: false,
        pauseOnFocus: false,
      },
      breakpoints: {
        1024: { perPage: 4 },
        768: { perPage: 3 },
        480: { perPage: 2 },
      },
    });

    splide.mount({ AutoScroll });

    return () => {
      splide.destroy();
    };
  }, [partners]);

  return (
    <div className="partners-bg">
      <Section className="py-10 sm:py-20">
        <div className="lg:px-20">
          <Paragraph
            size="lg"
            className="text-(--blue) font-bold partners-title"
          >
            Recruitment Partners
          </Paragraph>

          <Heading
            level={4}
            className="text-(--blue) uppercase mt-2 partners-explore-title"
          >
            Explore Our <br /> Placement Partners
          </Heading>

          <div className="brands_list-wrapper relative overflow-hidden mt-10">
            <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-10 bg-[linear-gradient(to_right,#EEECEA_0%,rgba(255,255,255,0)_10%,rgba(255,255,255,0)_90%,#EEECEA_100%)]" />

            <div className="splide" ref={splideRef}>
              <div className="splide__track">
                <ul className="splide__list">
                  {partners.map((partner, index) => (
                    <li
                      key={index}
                      className="splide__slide bg-(--white-custom) h-32  shadow-sm flex items-center justify-center"
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${partner.logo_url}`}
                        alt={partner.name}
                        width={200}
                        height={100}
                        className="object-contain h-full p-4 opacity-80 hover:opacity-100 transition"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
