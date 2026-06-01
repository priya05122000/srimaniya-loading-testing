"use client";
import Heading from '@/components/common/Heading';
import Paragraph from '@/components/common/Paragraph';
import Section from '@/components/common/Section';
import Span from '@/components/common/Span';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { ArrowNarrowRight } from "@/components/icons/Icons";
import { getAllCourses } from "@/services/courseService";
import { useSplitTextHeadingAnimation } from '@/hooks/useSplitTextHeadingAnimation';

// --- Types ---
type Course = {
  id: string;
  title: string;
  duration: string;
  description: string;
  eligibility: string;
};

// --- Utility Functions ---
// const stripHtmlAndTrim = (html: string, wordLimit: number = 50): string => {
//   const text = html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/gi, " ");
//   const words = text.split(/\s+/).filter(Boolean);
//   const trimmed = words.slice(0, wordLimit).join(" ");
//   return trimmed + (words.length > wordLimit ? "..." : "");
// };

const stripHtmlAndTrim = (html: string): string => {
  return html
    .replace(/<[^>]+>/g, " ")   // remove HTML tags
    .replace(/&nbsp;/gi, " ")   // remove &nbsp;
    .replace(/\s+/g, " ")       // normalize spaces
    .trim();
};

// --- CourseCard Component (reusable) ---
type CourseCardProps = {
  course: Course;
  idx: number;
  total: number;
};

const createSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/\+/g, "")
    .replace(/\./g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const CourseCard: React.FC<CourseCardProps> = ({ course, idx, total }) => (
  <div
    className={`sticky-card h-full bg-(--blue) z-[${idx + 1}] ${idx === total - 1 ? "pb-16" : ""} ${idx === total - 2 ? "fifth-card" : ""}`}
    data-section
  >
    <div className={`w-full h-full flex flex-col md:flex-row items-start md:items-center  ${idx !== total - 1 ? "border-b border-(--grey-custom)" : ""}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_2fr] xl:grid-cols-[1.5fr_3fr] w-full ">
        {/* Left section */}
        <div className="flex flex-col items-start gap-4 sm:border-r border-(--grey-custom) py-8 pr-5">
          <div className="flex items-start" >
            <hr className="w-10 min-w-12 border-t border-(--grey-custom) mt-3 mr-3" />
            <div>
              <div className="flex items-start gap-2">
                <Paragraph size="lg" className="font-bold text-(--yellow)">{String(idx + 1).padStart(2, "0")}</Paragraph>
                <Paragraph size="lg" className="font-bold text-(--white-custom) ">{course.title}</Paragraph>
              </div>
              <Span className="border border-(--yellow) text-(--yellow) rounded-full px-4 py-1 mt-4 inline-block">{course.duration}</Span>
            </div>
          </div>
        </div>
        {/* Right section */}
        <div className="flex flex-col gap-2 sm:pl-6 py-8">
          <div className="w-full">
            <div className="flex items-center gap-2">
              <div className="text-(--white-custom)">
                {/* <Paragraph size='xl' className="font-semibold ">Description: </Paragraph>{" "} */}
                <Paragraph size='base' className=" text-justify line-clamp-5 leading-relaxed ">{stripHtmlAndTrim(course.description)}</Paragraph>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-5">
              <div className="text-(--white-custom) text-lg sm:text-xl lg:text-2xl">
                <Paragraph size='lg' className="font-semibold ">Eligibility: </Paragraph>{" "}
                <p className="text-base mt-4 text-justify leading-relaxed" dangerouslySetInnerHTML={{ __html: course.eligibility }} />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            {/* <Link href={`/courses?course=${course.id}`} aria-label={`View details for ${course.title}`}>
              <button
                className="border border-white hover:bg-white rounded-full p-2 flex items-center justify-center transition-all duration-200 w-12 h-6 cursor-pointer"
                aria-label={`View details for ${course.title}`}
              >
                <ArrowNarrowRight className="font-normal text-(--white-custom) text-2xl hover:text-(--blue) " />
              </button>
            </Link> */}
            <Link
              href="/courses"
              scroll={false}
              onClick={() => {
                sessionStorage.setItem(
                  "scrollToCourse",
                  createSlug(course.title)
                );
              }}
              className="border border-white hover:bg-white rounded-full p-2 flex items-center justify-center transition-all duration-200 w-12 h-6 cursor-pointer"
              aria-label={`View details for ${course.title}`}
            >
              <ArrowNarrowRight aria-label={`View details for ${course.title}`} className="text-(--white-custom) text-2xl hover:text-(--blue)" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main Courses Component ---
const Courses: React.FC = () => {
  const coursesRef = useRef<HTMLDivElement | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  // SplitText animation refs
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);



  useSplitTextHeadingAnimation({
    trigger: coursesRef,
    first: paragraphRef,
    second: headingRef,
    delay: 0.3,
    enabled: true,
  });

  useEffect(() => {
    if (!courses.length) return;
    const width = window.innerWidth;
    if (width < 640) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let cleanup: (() => void) | undefined;
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const cards = gsap.utils.toArray<HTMLElement>(".sticky-card");
      cards.forEach((card, idx) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top top+=80",
          end: () => {
            if (idx === cards.length - 2) {
              return width >= 640 && width < 1024
                ? `+=${card.offsetHeight * 0.8}`
                : `+=${card.offsetHeight * 0.9}`;
            } else if (idx === cards.length - 1) {
              return `+=${card.offsetHeight * 0.05}`;
            }
            return `+=${card.offsetHeight}`;
          },
          pin: true,
          pinSpacing: false,
          id: `card-${idx}`,
        });
      });
      cleanup = () => ScrollTrigger.getAll().forEach((t) => t.kill());
    })();

    return () => cleanup?.();
  }, [courses.length]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const result = await getAllCourses();
        setCourses(result?.data || []);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    }
    fetchCourses();
  }, []);

  useEffect(() => {
    if (!courses.length) return;
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.refresh();
    })();
  }, [courses]);

  useEffect(() => {
    const handleResize = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={coursesRef}>
      <div className="bg-(--blue) relative py-10 sm:py-20" data-section>
        <Section>
          <div className='lg:px-10 xl:px-20'>
            {/* Header */}
            <div className="mb-12 text-end">
              <Paragraph ref={paragraphRef} size="lg" className="text-(--white-custom) font-bold courses-title ">
                Courses
              </Paragraph>
              <h3 ref={headingRef} className="text-(--white-custom) font-jakarta text-3xl sm:text-4xl lg:text-5xl font-bold mt-1 leading-tight uppercase  courses-academic-title">
                Our Academic <br /> Programs
              </h3>
            </div>
            {/* Sticky Overlap Cards */}
            <div className="relative">
              {courses.map((course, idx) => (
                <CourseCard key={course.id} course={course} idx={idx} total={courses.length} />
              ))}
            </div>
          </div>

        </Section>
      </div>
    </div>

  );
};

export default Courses;
