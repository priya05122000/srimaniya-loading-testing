"use client"
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import Section from "@/components/common/Section";
import Span from "@/components/common/Span";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";
import { useGSAP } from "@gsap/react";
import { getAllSiteInfo } from "@/services/siteInfoService";

// Types

type SiteInfo = {
  student_count: string;
  staff_count: string;
  placement_count: string;
};

type Stat = {
  value: string;
  label: string;
};

// OdometerNumber Component
const OdometerNumber = ({ value }: { value: number }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (!wrapperRef.current) return;
  //   const digitHeight =
  //     wrapperRef.current.querySelector(".digit-span")?.clientHeight || 24;
  //   const digits = value.toString().split("");
  //   digits.forEach((digit, i) => {
  //     const digitContainer = wrapperRef.current?.children[i] as HTMLElement;
  //     if (!digitContainer) return;
  //     const digitColumn = digitContainer.querySelector(
  //       ".digit-column"
  //     ) as HTMLElement;
  //     if (!digitColumn) return;
  //     gsap.set(digitColumn, { y: 0 }); // reset
  //     gsap.to(digitColumn, {
  //       y: -Number(digit) * digitHeight, // move exact pixel distance
  //       duration: 2,
  //       delay: i * 0.15,
  //       ease: "power2.inOut",
  //       scrollTrigger: {
  //         trigger: wrapperRef.current,
  //         start: "top 85%",
  //         once: true,
  //       },
  //     });
  //   });
  // }, [value]);


  useEffect(() => {
    if (!wrapperRef.current) return;

    const el = wrapperRef.current;
    let hasAnimated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          hasAnimated = true;
          animateDigits();
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);

    function animateDigits() {
      const digitHeight =
        el.querySelector(".digit-span")?.clientHeight || 24;
      const digits = value.toString().split("");

      digits.forEach((digit, i) => {
        const digitContainer = el.children[i] as HTMLElement;
        if (!digitContainer) return;
        const digitColumn = digitContainer.querySelector(".digit-column") as HTMLElement;
        if (!digitColumn) return;

        gsap.set(digitColumn, { y: 0 });
        gsap.to(digitColumn, {
          y: -Number(digit) * digitHeight,
          duration: 2,
          delay: i * 0.15,
          ease: "power2.inOut",
        });
      });
    }

  }, [value]);


  return (
    <div
      ref={wrapperRef}
      className="flex overflow-hidden tabular-nums"
      style={{
        gap: 0,
        letterSpacing: 0,
        fontVariantNumeric: "tabular-nums",
        lineHeight: "1",
      }}
    >
      {value
        .toString()
        .split("")
        .map((digit, idx) => (
          <div
            key={idx}
            className="h-[1em] overflow-hidden relative"
            style={{
              display: "inline-block",
              margin: 0,
              padding: 0,
            }}
          >
            <div className="digit-column flex flex-col">
              {Array.from({ length: 10 }, (_, n) => (
                <span
                  key={n}
                  className="digit-span block h-[1em]"
                  style={{
                    margin: 0,
                    padding: 0,
                    lineHeight: "1em",
                  }}
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

// AboutStats Component
const AboutStats = () => {
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);
  const { setLoading } = useGlobalLoader();
  const aboutStatsRef = useRef(null);


  useGSAP(() => {
    // Heading animation
    const split = SplitText.create(".sri-maniya-institute-heading", {
      type: "chars",
    });
    gsap.to(split.chars, {
      opacity: 1,
      color: "#0b2351",
      y: 0,
      ease: "power2.in",
      stagger: 0.08,
      duration: 2, // Added duration to slow down animation
      scrollTrigger: {
        trigger: ".message-content",
        start: "top center",
        end: "bottom center",
        // scrub: true,
        scrub: 0.001,

      },
    });
    // AboutStats title animation (same as hero-title)
    const aboutSplit = SplitText.create(".aboutstats-title", {
      type: "chars",
    });
    gsap.from(aboutSplit.chars, {
      x: 150,
      opacity: 0,
      duration: 0.7,
      ease: "power4",
      stagger: 0.04,
      scrollTrigger: {
        trigger: ".aboutstats-title",
        start: "top 90%",
        once: true,
      },
    });
  }, { scope: aboutStatsRef });

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAllSiteInfo();
        const data = result?.data || [];
        if (Array.isArray(data) && data.length > 0) {
          setSiteInfo(data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch Data:", err);
      } finally {
        setLoading(false);
      }
    }
    setTimeout(fetchData, 100);
  }, []);

  // Only create stats if siteInfo is loaded
  const stats: Stat[] = siteInfo
    ? [
      { value: siteInfo.student_count, label: "Alumni" },
      { value: siteInfo.placement_count, label: "Placements" },
      { value: siteInfo.staff_count, label: "Placement Partners" },
    ]
    : [];

  return (
    <Section className="py-10 sm:py-20" ref={aboutStatsRef}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_5fr] lg:gap-8 message-content  lg:px-20">
        {/* Stats Column */}
        <div className="flex count-wrapper lg:flex-col flex-row justify-between sm:justify-around lg:justify-evenly items-start md:items-start text-(--blue) sm:gap-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center lg:text-left w-full lg:py-6 lg:border-b border-(--grey-custom)"
            >
              <Heading level={3} className="hidden lg:block">
                <span className="flex items-baseline">
                  <OdometerNumber value={parseInt(stat.value)} />
                  <span className="ml-1">+</span>
                </span>
              </Heading>
              <Heading level={4} className="block lg:hidden">
                <span className="flex items-baseline justify-center lg:justify-start">
                  <OdometerNumber value={parseInt(stat.value)} />
                  <span className="ml-1">+</span>
                </span>
              </Heading>
              <Paragraph size="lg" className="font-normal hidden sm:block">
                {stat.label}
              </Paragraph>
              <Paragraph size="base" className="font-normal block sm:hidden">
                {stat.label}
              </Paragraph>
            </div>
          ))}
        </div>
        {/* About Content Column */}
        <div className="border-b lg:border-b-0 lg:border-l border-(--grey-custom) lg:pl-8">
          <div className="text-(--blue)">
            <Paragraph size="lg" className="font-bold tracking-wide mb-2">
              Learn Hospitality the Professional Way, Build a Career that Travels the World.
            </Paragraph>
            <div className="text-justify">
              <Paragraph size="lg" className="mb-4 text-(--dark)">
                Recognized as one of Tamil Nadu’s top hospitality institutes, Sri Maniya transforms passionate individuals into industry-ready professionals through strong academics and real-world training.
              </Paragraph>
              <Paragraph size="lg" className="mb-4 text-(--dark)">
                <strong>
                  Affiliated with Manonmaniam Sundaranar University and in collaboration with Alagappa University
                </strong>
                , Sri Maniya Institute of Hotel Management offers premier hospitality programs in Tamilnadu. With hands-on training and real-time exposure, we assure a 100% placement guarantee in top hotels and resorts worldwide.
              </Paragraph>
              <Paragraph size="lg" className="mb-4 text-(--dark)">
                We take pride in being one of the few colleges led by professionals with direct expertise in the hospitality sector. Our training and methodologies adhere to globally recognized standards, ensuring students receive world-class education.
              </Paragraph>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 mt-2 text-(--blue)">
            <Link href="/about-us" className="font-medium transition hover:underline">
              <Span>Read Now</Span>
            </Link>
            <Paragraph size="lg" className="inline-block">
              <GoArrowRight />
            </Paragraph>
          </div>
          <div className="text-(--grey-custom) msg-wrapper text-center lg:text-left">
            <Heading
              level={2}
              className="mt-2 tracking-wider leading-tight uppercase sri-maniya-institute-heading block sm:hidden lg:block"
            >
              Sri Maniya <br className="xl:hidden" /> Institute
            </Heading>
            <Heading
              level={2}
              className="mt-2 tracking-wide leading-tight uppercase sri-maniya-institute-heading hidden sm:block lg:hidden"
            >
              Sri Maniya Institute
            </Heading>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutStats;
