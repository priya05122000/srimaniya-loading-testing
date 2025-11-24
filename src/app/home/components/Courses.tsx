"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

// Components
import Section from "@/components/common/Section";
import Paragraph from "@/components/common/Paragraph";
import Heading from "@/components/common/Heading";
import Span from "@/components/common/Span";

// Hooks & Providers
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";
import { useGSAP } from "@gsap/react";

// Services
import { getAllCourses } from "@/services/courseService";

// Animation
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ANIMATIONS } from "@/components/Animations";

// Icons
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

// Types
type Course = {
  id: string;
  title: string;
  duration: string;
  description: string;
  eligibility: string;
};

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Courses = () => {
  const { setLoading, loading } = useGlobalLoader();
  const [courses, setCourses] = useState<Course[]>([]);

  // -----------------------------------------
  // 1) Get courses
  // -----------------------------------------
  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await getAllCourses();
        const data = response?.data || [];
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  // -----------------------------------------
  // 2) GSAP Sticky ScrollTrigger
  // -----------------------------------------
  useGSAP(
    () => {
      if (loading || !courses.length) return;

      const width = window.innerWidth;
      if (width < 640) return; // Skip for mobile

      const cards = gsap.utils.toArray<HTMLElement>(".course-card");

      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top top+=80",
          pin: true,
          pinSpacing: false,
          id: `course-card-${index}`,
          end: () => {
            const height = card.offsetHeight;

            // Last two card adjustments
            if (index === cards.length - 2) {
              return width < 1024 ? `+=${height * 0.8}` : `+=${height * 0.9}`;
            }
            if (index === cards.length - 1) {
              return `+=${height * 0.05}`;
            }

            return `+=${height}`;
          },
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { dependencies: [loading, courses] }
  );

  // -----------------------------------------
  // 3) HTML Cleaner - trims to 50 words
  // -----------------------------------------
  const trimHTML = (html: string, limit = 50) => {
    const plain = html.replace(/<[^>]+>/g, " ");
    const words = plain.split(/\s+/).filter(Boolean);
    const trimmed = words.slice(0, limit).join(" ");
    return trimmed + (words.length > limit ? "..." : "");
  };

  return (
    <div className="bg-(--blue) py-10 sm:py-20">
      <Section>
        {/* Section Header */}
        <header className="text-end mb-12">
          <Paragraph size="lg" className="text-(--white-custom) font-bold">
            Courses
          </Paragraph>
          <Heading level={4} className="text-(--white-custom) uppercase mt-2 leading-tight">
            Our Academic <br /> Programs
          </Heading>
        </header>

        {/* Sticky Course Cards */}
        <div className="relative will-change-transform">
          {courses.map((course, idx) => (
            <div
              key={course.id}
              className={`course-card bg-(--blue) h-full z-[${idx + 1}] ${idx === courses.length - 1 ? "pb-16" : ""
                }`}
            >
              <div
                className={`w-full flex flex-col md:flex-row items-start gap-8 ${idx !== courses.length - 1
                  ? "border-b border-(--grey-custom)"
                  : ""
                  }`}
              >
                {/* Left Column */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_2fr] xl:grid-cols-[1.5fr_3fr] w-full">
                  <div className="flex flex-col gap-4 py-8 pr-5 border-r border-(--grey-custom)">
                    <div className="flex items-start" {...ANIMATIONS.fadeUp}>
                      <hr className="w-10 border-t border-(--grey-custom) mt-3 mr-3" />

                      <div>
                        <div className="flex items-start gap-2">
                          <Paragraph
                            size="xl"
                            className="font-bold text-(--yellow)"
                          >
                            {String(idx + 1).padStart(2, "0")}
                          </Paragraph>

                          <Paragraph
                            size="xl"
                            className="font-bold text-(--white-custom)"
                          >
                            {course.title}
                          </Paragraph>
                        </div>

                        <Span className="border border-(--yellow) text-(--yellow) rounded-full px-4 py-1 mt-4 inline-block">
                          {course.duration}
                        </Span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-2 sm:pl-6 py-8">
                    <div className="w-full xl:w-2xl" {...ANIMATIONS.fadeUp}>
                      {/* Description */}
                      <Paragraph size="xl" className="font-semibold text-(--white-custom)">
                        Description:
                      </Paragraph>
                      <p
                        className="text-base text-justify mt-2"
                        dangerouslySetInnerHTML={{
                          __html: trimHTML(course.description),
                        }}
                      />

                      {/* Eligibility */}
                      <Paragraph
                        size="xl"
                        className="font-semibold text-(--white-custom) mt-5"
                      >
                        Eligibility:
                      </Paragraph>
                      <p
                        className="text-base text-justify mt-2"
                        dangerouslySetInnerHTML={{ __html: course.eligibility }}
                      />
                    </div>

                    {/* CTA Button */}
                    <div className="flex justify-end mt-4">
                      <Link href={`/courses?course=${course.id}`}>
                        <button className="border border-white rounded-full p-2 flex items-center justify-center w-12 h-6 hover:bg-white transition-all duration-200">
                          <HiOutlineArrowNarrowRight className="text-(--white-custom) text-2xl hover:text-(--blue)" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Courses;
