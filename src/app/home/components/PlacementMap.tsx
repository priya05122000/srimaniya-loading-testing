"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { motion } from "framer-motion";
import Paragraph from "@/components/common/Paragraph";
import Heading from "@/components/common/Heading";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";

import { useEffect, useState } from "react";
import { getAllCountries } from "@/services/countriesService";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

type Placement = {
  flag_img: string;
  max_ctc: string;
  name: string;
  placement_count: string;
};

type Flag = {
  img: string;
  placement: string;
  ctc: string;
  position: string;
  size: string;
};

const flags: Flag[] = [
  {
    img: "/map/India.png",
    placement: "100 student placed",
    ctc: "CTC Upto 1lac CSD+",
    position:
      "top-[42%] lg:top-[40%] right-[27%] lg:right-[27%] xl:right-[27%]",
    size: "w-12 h-12 xl:w-14 xl:h-14",
  },
  {
    img: "/map/Singapore.png",
    placement: "100 student placed",
    ctc: "CTC Upto 1lac CSD+",
    position: "bottom-[40%] xl:bottom-[36%] right-[18.5%] xl:right-[18%]",
    size: "w-10 h-10 xl:w-12 xl:h-12",
  },
  {
    img: "/map/dubai.png",
    placement: "100 student placed",
    ctc: "CTC Upto 1lac CSD+",
    position: "top-[40%] lg:top-[40%] left-[60%]",
    size: "w-8 h-8 xl:w-10 xl:h-10",
  },
  {
    img: "/map/mauritius.png",
    placement: "100 student placed",
    ctc: "CTC Upto 1lac CSD+",
    position: "bottom-[25%] lg:bottom-[25%] right-[34%]",
    size: "w-12 h-12 xl:w-14 xl:h-14",
  },
  {
    img: "/map/maldives.png",
    placement: "100 student placed",
    ctc: "CTC Upto 1lac CSD+",
    position: "top-[55%] lg:top-[55%] right-[29%]",
    size: "w-8 h-8 xl:w-10 xl:h-10",
  },
];

const FlagPin: React.FC<Flag> = ({ img, placement, ctc, position, size }) => (
  <div className={`absolute ${position} flex flex-col items-start z-20`}>
    <div className="relative group cursor-pointer">
      <div
        className={`${size} rounded-full overflow-hidden  shadow-lg flex items-center justify-center bg-white`}
      >
        <Image
          src={img}
          alt={placement + " Flag"}
          width={100}
          height={100}
          className="w-full h-full object-cover image-tag"
        />
      </div>
      <Paragraph className="absolute top-10 left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-(--blue) text-(--white-custom) px-5 py-3 shadow min-w-[200px] text-start font-bold border-(--yellow) border pointer-events-none">
        <span className="block">{placement}</span>
        <span>{ctc}</span>
      </Paragraph>
    </div>
  </div>
);

const formatCTC = (ctc: string) => {
  if (!ctc) return "";
  // Remove trailing .00 if present
  if (ctc.endsWith(".00")) {
    return ctc.slice(0, -3);
  }
  return ctc;
};

const PlacementCard: React.FC<Placement> = ({
  flag_img,
  max_ctc,
  name,
  placement_count,
}) => (
  <div className="flex items-center space-x-4 p-4 hover:shadow-sm transition-shadow">
    <div className="w-20 h-12 relative shrink-0">
      <Image
        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${flag_img}`}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, 80px"
        className="rounded-md object-cover image-tag"
      />
    </div>
    <div>
      <Paragraph size="lg" className="text-xl font-bold text-(--blue)">
        {name}
      </Paragraph>
      {max_ctc && (
        <Paragraph /* {...ANIMATIONS.fadeZoomIn} */ className="text-(--dark)">
          {formatCTC(max_ctc)} CTC
        </Paragraph>
      )}
      {placement_count && (
        <Paragraph /* {...ANIMATIONS.fadeZoomIn} */ className="text-(--dark)">
          {placement_count} + students placed
        </Paragraph>
      )}
    </div>
  </div>
);

const PlacementMap = () => {
  const parentRef = useRef<HTMLDivElement | null>(null); // Add parent ref
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const horizontalWrapperRef = useRef<HTMLDivElement>(null);

  // ✅ Use useGSAP instead of useEffect
  useGSAP(
    () => {
      const wrapper = horizontalWrapperRef.current;
      const scrollSection = horizontalScrollRef.current;
      if (!wrapper || !scrollSection) return;

      const tween = gsap.to(wrapper, {
        x: () => -(wrapper.scrollWidth - window.innerWidth),
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: scrollSection,
        start: "top top+=80",
        end: () => `+=${wrapper.scrollWidth - window.innerWidth}`,
        pin: scrollSection,
        animation: tween,
        scrub: true,
        invalidateOnRefresh: true,
        markers: false,
        anticipatePin: 1, // Add this line
      });

      // refresh when images load
      const images = scrollSection.querySelectorAll("img");
      let loaded = 0;
      images.forEach((img) => {
        if (img.complete) {
          loaded++;
        } else {
          img.addEventListener("load", () => {
            loaded++;
            if (loaded === images.length) {
              ScrollTrigger.refresh();
            }
          });
        }
      });
      if (loaded === images.length) {
        ScrollTrigger.refresh();
      }
    },
    { scope: horizontalScrollRef } // ✅ Scoped only to this component
  );

  // Enable split text animation for headings
  useSplitTextHeadingAnimation({
    trigger: parentRef,
    first: ".placement-title",
    second: ".connecting-title",
  });

  const [placements, setPlacements] = useState<Placement[]>([]);
  const { setLoading } = useGlobalLoader();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const results = await getAllCountries();
        const data = results.data;
        setPlacements(data);
      } catch (error: unknown) {
        if (typeof error === "object" && error !== null && "message" in error) {
          console.error(
            (error as { message?: string }).message ||
            "Failed to fetch countries"
          );
        } else {
          console.error("Failed to fetch countries");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, [setLoading]);

  return (
    <div ref={parentRef} className="relative">
      {/* Mobile version */}
      <div className="block sm:hidden">
        <motion.div className="relative z-10 w-full h-full flex flex-col justify-center p-6">
          <div className="relative z-10 ">
            <div className="mb-10 sm:mb-14">
              <Paragraph
                size="lg"
                className="text-(--blue) font-bold placement-title"
              >
                Our Placement
              </Paragraph>
              <Heading
                level={4}
                className="text-(--blue) leading-tight uppercase mt-2 connecting-title"
              >
                Connecting <br /> Talent to <br /> Global Brands
              </Heading>
            </div>
            <Paragraph
              size="lg"
              className="mb-2 text-(--dark) w-[90%] xl:w-[85%]"
            // {...ANIMATIONS.fadeZoomIn}
            >
              Each pin on this map represents the global destinations where our talented graduates have embarked on successful careers. Every flag marks a prestigious international partner that welcomes our alumni to the world stage.
            </Paragraph>
          </div>
        </motion.div>
      </div>

      {/* Desktop version with horizontal scroll */}
      <main>
        <section
          ref={horizontalScrollRef}
          className="overflow-hidden relative h-[90vh] sm:h-[calc(100vh-80px)]"
        >
          <div
            ref={horizontalWrapperRef}
            className="w-fit flex flex-nowrap horizontal-wrapper pl-6 sm:pl-[30%]"
          >
            {/* Background map */}
            <div className="shrink-0 h-[90vh] sm:h-[calc(100vh-80px)] flex items-center m-0 relative">
              <Image
                src="/home/map.png"
                alt="Placement Map Background"
                width={2400}
                height={1200}
                className="h-full w-auto object-contain image-tag"
                priority
              />
              <div>
                {flags.map((flag, idx) => (
                  <FlagPin key={idx} {...flag} />
                ))}
              </div>
            </div>

            {/* Placement list */}
            <div className="shrink-0 m-0 px-6 sm:px-8 lg:px-16 h-[90vh] sm:h-[calc(100vh-80px)] flex items-center">
              <div>
                <div className="mb-8">
                  <Heading level={6} className="text-(--blue) font-bold">
                    International Placement
                  </Heading>
                </div>
                <div className="flex flex-col lg:gap-2">
                  {placements.map((placement, idx) => (
                    <PlacementCard key={idx} {...placement} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Overlay text */}
          <div className="absolute top-0 left-0 h-full w-[40%] items-center hidden sm:flex">
            <motion.div className="relative z-10 h-full flex flex-col justify-center p-6">
              <motion.div
                className="absolute left-0 top-0 h-full w-full z-0"
                style={{
                  backdropFilter: "blur(16px)",
                  maskImage:
                    "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.8), rgba(0,0,0,0))",
                  WebkitMaskImage:
                    "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.8), rgba(0,0,0,0))",
                }}
              />
              <div className="relative z-10 pl-6 sm:pl-8">
                <div className="mb-10">
                  <Paragraph
                    size="lg"
                    className="text-(--blue) font-bold placement-title"
                  >
                    Our Placement
                  </Paragraph>
                  <Heading
                    level={4}
                    className="text-(--blue) leading-tight uppercase mt-2 connecting-title"
                  >
                    Connecting <br /> Talent to <br /> Global Brands
                  </Heading>
                </div>
                <Paragraph
                  size="base"
                  className="mb-2 text-(--dark) w-[90%] xl:w-[70%] leading-relaxed"
                // {...ANIMATIONS.fadeZoomIn}
                >
                  Each pin on this map represents the global destinations where our talented graduates have embarked on successful careers. Every flag marks a prestigious international partner that welcomes our alumni to the world stage.
                </Paragraph>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PlacementMap;
