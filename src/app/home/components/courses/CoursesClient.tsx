"use client";
import Heading from '@/components/common/Heading';
import Paragraph from '@/components/common/Paragraph';
import Section from '@/components/common/Section';
import React, { useEffect, useRef, useState } from 'react'
import { useGlobalLoader } from '@/providers/GlobalLoaderProvider';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplitTextHeadingAnimation } from '@/hooks/useSplitTextHeadingAnimation';
import { Course } from '@/types';
import CourseCard from './CourseCard';

interface CoursesProps {
  courses: Course[];
}

const Courses: React.FC<CoursesProps> = ({ courses }) => {
  const coursesRef = useRef<HTMLDivElement | null>(null);
  const { loading, setLoading } = useGlobalLoader();

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

  useGSAP(() => {
    if (loading || !courses.length) return;
    const width = window.innerWidth;
    if (width < 640) return;
    const cards = gsap.utils.toArray<HTMLElement>(".sticky-card");
    cards.forEach((card, idx) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top top+=80",
        end: () => {
          if (idx === cards.length - 2) {
            if (width >= 640 && width < 1024) {
              return `+=${card.offsetHeight * 0.8}`;
            }
            return `+=${card.offsetHeight * 0.9}`;
          } else if (idx === cards.length - 1) {
            if (width >= 640 && width < 1024) {
              return `+=${card.offsetHeight * 0.05}`;
            }
            return `+=${card.offsetHeight * 0.05}`;
          }
          return `+=${card.offsetHeight}`;
        },
        pin: true,
        pinSpacing: false,
        id: `card-${idx}`,
      });
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [loading, courses.length]);

  useEffect(() => {
    if (!loading && courses.length) {
      ScrollTrigger.refresh();
    }
  }, [courses, loading]);

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={coursesRef}>
      <div className="bg-(--blue) relative py-10 sm:py-20" data-section>
        <Section>
          <div className='lg:px-10 xl:px-20'>
            {/* Header */}
            <div className="mb-12 text-end">
              <Paragraph ref={paragraphRef} size="lg" className="text-(--white-custom) font-bold courses-title">
                Courses
              </Paragraph>
              <Heading ref={headingRef} level={4} className="text-(--white-custom) mt-1 leading-tight uppercase  courses-academic-title">
                Our Academic <br /> Programs
              </Heading>
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
