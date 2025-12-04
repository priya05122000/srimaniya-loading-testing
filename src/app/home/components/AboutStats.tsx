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

// OdometerNumber: Animated number display (reusable)
const OdometerNumber: React.FC<{ value: number }> = ({ value }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
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
      const digitHeight = el.querySelector(".digit-span")?.clientHeight || 24;
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
      style={{ gap: 0, letterSpacing: 0, fontVariantNumeric: "tabular-nums", lineHeight: "1" }}
    >
      {value
        .toString()
        .split("")
        .map((digit, idx) => (
          <div
            key={idx}
            className="h-[1em] overflow-hidden relative"
            style={{ display: "inline-block", margin: 0, padding: 0 }}
          >
            <div className="digit-column flex flex-col">
              {Array.from({ length: 10 }, (_, n) => (
                <span
                  key={n}
                  className="digit-span block h-[1em]"
                  style={{ margin: 0, padding: 0, lineHeight: "1em" }}
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

// StatBlock: Reusable stat display
const StatBlock: React.FC<{ stat: Stat }> = ({ stat }) => (
  <div className="text-center lg:text-left w-full lg:py-6 lg:border-b border-(--grey-custom)">
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
);

// AboutStats Component
const AboutStats = () => {
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);
  const { setLoading } = useGlobalLoader();

  useGSAP(() => {
    // Heading animation for all variants (mobile & desktop)
    const headings = document.querySelectorAll('.sri-maniya-institute-heading');
    headings.forEach((el) => {
      const split = SplitText.create(el, { type: 'chars' });
      gsap.to(split.chars, {
        opacity: 1,
        color: '#0b2351',
        ease: 'power2.in',
        stagger: 0.08,
        duration: 2,
        scrollTrigger: {
          trigger: '.message-content',
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      });
    });
    // AboutStats title animation
    const aboutSplit = SplitText.create('.aboutstats-title', { type: 'chars' });
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
  });

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
  }, []); // Fix: useEffect dependency array should be constant

  // Only create stats if siteInfo is loaded
  const stats: Stat[] = siteInfo
    ? [
      { value: siteInfo.student_count, label: "Alumni" },
      { value: siteInfo.placement_count, label: "Placements" },
      { value: siteInfo.staff_count, label: "Placement Partners" },
    ]
    : [];

  return (
    <Section className="py-10 sm:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_5fr] lg:gap-8 message-content  lg:px-20">
        {/* Stats Column */}
        <div className="flex count-wrapper lg:flex-col flex-row justify-between sm:justify-around lg:justify-evenly items-start md:items-start text-(--blue) sm:gap-2">
          {stats.map((stat) => (
            <StatBlock key={stat.label} stat={stat} />
          ))}
        </div>
        {/* About Content Column */}
        <div className="lg:border-b-0 lg:border-l border-(--grey-custom) lg:pl-8">
          <div className="text-(--blue)">
            <Paragraph size="lg" className="font-bold tracking-wide mt-10 lg:mt-0 ">
              Study Hotel Management in Tamil Nadu and Build a Global Career
            </Paragraph>
            <div className="text-justify ">
              <Paragraph size="base" className="mt-4 text-(--dark) leading-relaxed">
                Recognized as a leading hotel management institute in Tamil Nadu, Sri Maniya Institute equips passionate individuals with strong academics and practical training to become industry-ready professionals.
              </Paragraph>
              <Paragraph size="base" className="mt-4 text-(--dark) leading-relaxed">
                <strong>
                  Affiliated with Manonmaniam Sundaranar University and collaborating with Alagappa University
                </strong>
                , Sri Maniya Institute of Hotel Management stands as a premier hotel management institute in Tamil Nadu. The institute delivers top-notch hospitality programs enriched with practical training and hands-on exposure, ensuring a 100% placement guarantee in leading hotels and resorts worldwide.
              </Paragraph>
              <Paragraph size="base" className="mt-4 text-(--dark) leading-relaxed">
                We take pride in being among the select few hotel management institutes led by seasoned professionals with hands-on experience in the hospitality industry. Our teaching methods and training programs align with internationally accepted standards, guaranteeing students an education of global caliber.
              </Paragraph>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 mt-4 text-(--blue)">
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
              className="mt-4 tracking-wider leading-tight uppercase sri-maniya-institute-heading block sm:hidden lg:block"
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
