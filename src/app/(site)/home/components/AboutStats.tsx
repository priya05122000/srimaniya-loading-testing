"use client"
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "@/components/icons/Icons";
import Paragraph from "@/components/common/Paragraph";
import Section from "@/components/common/Section";
import Span from "@/components/common/Span";
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

// CountUp: lightweight animated number — single <span>, GSAP interpolates the value
const CountUp: React.FC<{ value: number }> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          const { default: gsap } = await import("gsap");
          gsap.to(obj, {
            val: value,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => { el.textContent = Math.round(obj.val).toString(); },
          });
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);
  return <span ref={ref}>0</span>;
};

// StatBlock: Reusable stat display
const StatBlock: React.FC<{ stat: Stat }> = ({ stat }) => (
  <div className="text-center lg:text-left w-full lg:py-6 lg:border-b border-(--grey-custom)">
    <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-jakarta">
      <span className="flex items-baseline justify-center lg:justify-start">
        <CountUp value={parseInt(stat.value)} />
        <span className="ml-1">+</span>
      </span>
    </span>
    <Paragraph size="base" className="font-normal sm:text-lg">
      {stat.label}
    </Paragraph>
  </div>
);

// AboutStats Component
const AboutStats = () => {
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);

  // SplitText deferred to onEnter — only runs when the section scrolls into view
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let st: any = null;
    (async () => {
      const { default: gsap } = await import("gsap");
      const { SplitText } = await import("gsap/SplitText");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(SplitText, ScrollTrigger);
      st = ScrollTrigger.create({
        trigger: ".message-content",
        start: "top center",
        once: true,
        onEnter: () => {
          const headings = document.querySelectorAll(".sri-maniya-institute-heading");
          headings.forEach((el) => {
            const split = SplitText.create(el, { type: "chars" });
            gsap.to(split.chars, {
              opacity: 1,
              color: "#0b2351",
              ease: "power2.in",
              stagger: 0.08,
              duration: 2,
              scrollTrigger: {
                trigger: ".message-content",
                start: "top center",
                end: "bottom center",
                scrub: true,
              },
            });
          });
        },
      });
    })();
    return () => st?.kill();
  }, []);

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
      }
    }
    fetchData();
  }, []);

  const stats: Stat[] = siteInfo
    ? [
      { value: siteInfo.student_count, label: "Alumni" },
      { value: siteInfo.placement_count, label: "Placements" },
      { value: siteInfo.staff_count, label: "Placement Partners" },
    ]
    : [];

  return (
    <Section className="py-10 sm:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] xl:grid-cols-[1fr_5fr] lg:gap-8 message-content lg:px-20">
        <div className="flex count-wrapper lg:flex-col flex-row justify-between sm:justify-around lg:justify-evenly items-start md:items-start text-(--blue) sm:gap-2">
          {stats.map((stat) => (
            <StatBlock key={stat.label} stat={stat} />
          ))}
        </div>
        <div className="lg:border-b-0 lg:border-l border-(--grey-custom) lg:pl-8">
          <div className="text-(--blue)">
            <Paragraph size="lg" className="font-bold tracking-wide mt-10 lg:mt-0">
              Study Hotel Management in Tamil Nadu and Build a Global Career
            </Paragraph>
            <div className="text-justify">
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
            <Link hrefLang="en" href="/about-us" className="font-medium transition hover:underline">
              <Span>Read Now</Span>
            </Link>
            <Paragraph size="lg" className="inline-block">
              <ArrowRight aria-label="Next" />
            </Paragraph>
          </div>
          <div className="text-(--grey-custom) msg-wrapper text-center lg:text-left">
            <p className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-wider leading-tight uppercase sri-maniya-institute-heading block sm:hidden lg:block font-jakarta">
              Sri Maniya <br className="xl:hidden" /> Institute
            </p>
            <p className="mt-2 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-wide leading-tight uppercase sri-maniya-institute-heading hidden sm:block lg:hidden font-jakarta">
              Sri Maniya Institute
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutStats;
