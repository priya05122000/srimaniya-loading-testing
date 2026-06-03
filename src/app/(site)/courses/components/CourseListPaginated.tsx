"use client";

import React, { FC, ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Paragraph from "@/components/common/Paragraph";
import CollapsibleHTML from "@/components/common/CollapsibleHTML";
import { Download } from "@/components/icons/Icons";

const COURSES_PER_PAGE = 6;

interface Course {
  id: number;
  title: string;
  duration: string;
  description: string;
  opportunities: string;
  eligibility: string;
  syllabus: string;
}

interface CourseRowProps {
  label: string;
  children?: ReactNode;
  highlight?: boolean;
  id?: number | string;
  title?: string;
  duration?: string;
}

const createSlug = (text: string) =>
  text.toLowerCase().trim().replace(/&/g, "and").replace(/\+/g, "").replace(/\s+/g, "-");

const CourseRow: FC<CourseRowProps> = ({ label, children, highlight = false, id, title, duration }) => (
  <div className="flex items-start gap-2 py-4 sm:py-10">
    <div className="min-w-27.5 sm:min-w-45 sm:w-65 shrink-0 pr-4 md:pr-10 xl:pr-20 flex items-start gap-2">
      <div className="w-12 shrink-0 hidden md:flex flex-col items-center">
        <hr className="border-(--grey-custom) w-full mt-4" />
      </div>
      {highlight && id !== undefined ? (
        <div className="flex items-baseline justify-center gap-2">
          <p className="text-(--dark) font-jakarta text-2xl sm:text-xl font-bold">
            {id.toString().padStart(2, "0")}
          </p>
          <Paragraph size="xl" className="text-(--dark) font-bold">
            Course
          </Paragraph>
        </div>
      ) : (
        <Paragraph size="lg" className="text-(--dark) font-bold">
          {label}
        </Paragraph>
      )}
    </div>
    <div className="flex-1 sm:pl-8 sm:border-l">
      {highlight && title && duration ? (
        <h3 className="text-(--dark) text-xl lg:text-2xl font-jakarta font-bold md:w-[75%] xl:w-[80%]">
          {title}
          <span className="text-(--grey-light-custom) sm:text-xl text-base font-normal">
            &nbsp;- ({duration})
          </span>
        </h3>
      ) : children}
    </div>
  </div>
);

const CourseListPaginated: FC<{ courses: Course[] }> = ({ courses }) => {
  const totalPages = Math.ceil(courses.length / COURSES_PER_PAGE);
  const [page, setPage] = useState(1);

  // On mount: jump to the page that contains the sessionStorage target course
  useEffect(() => {
    const slug = sessionStorage.getItem("scrollToCourse");
    if (!slug || courses.length === 0) return;
    const idx = courses.findIndex((c) => createSlug(c.title) === slug);
    if (idx !== -1) {
      setPage(Math.floor(idx / COURSES_PER_PAGE) + 1);
    }
  }, [courses]);

  // After page settles: scroll to the target course element
  useEffect(() => {
    const slug = sessionStorage.getItem("scrollToCourse");
    if (!slug || courses.length === 0) return;

    let attempts = 0;
    const scrollToCourse = async () => {
      const el = document.getElementById(`course-${slug}`);
      const { ScrollSmoother } = await import("gsap/ScrollSmoother");
      const smoother = ScrollSmoother.get();

      if (el && smoother) {
        smoother.scrollTo(el, true, "top 80");
        sessionStorage.removeItem("scrollToCourse");
      } else if (attempts < 50) {
        attempts++;
        setTimeout(scrollToCourse, 100);
      }
    };

    setTimeout(scrollToCourse, 500);
  }, [page, courses]);

  const paginated = courses.slice((page - 1) * COURSES_PER_PAGE, page * COURSES_PER_PAGE);

  return (
    <div className="sm:pr-2">
      {paginated.map((course, index) => {
        const globalIndex = (page - 1) * COURSES_PER_PAGE + index;
        return (
          <div
            key={course.id}
            id={`course-${createSlug(course.title)}`}
            className="border-b border-(--grey-custom)"
          >
            <CourseRow
              label="Course"
              highlight
              id={String(globalIndex + 1).padStart(2, "0")}
              title={course.title}
              duration={course.duration}
            />
            <CourseRow label="Description">
              <CollapsibleHTML html={course.description} maxHeight={300} />
            </CourseRow>
            <CourseRow label="Opportunity">
              <CollapsibleHTML html={course.opportunities} maxHeight={300} />
            </CourseRow>
            <CourseRow label="Eligibility">
              <CollapsibleHTML html={course.eligibility} maxHeight={300} />
            </CourseRow>
            {course.syllabus && (
              <CourseRow label="Syllabus">
                <Link
                  href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${course.syllabus}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <button className="relative flex justify-center items-center gap-1 rounded-full bg-transparent overflow-hidden cursor-pointer border border-(--blue) group transition-all duration-300 px-3 py-1">
                    <span className="relative gap-x-1 z-20 flex items-center text-center no-underline w-full text-(--blue) text-base transition-all duration-300 group-hover:text-white">
                      Syllabus <Download aria-label="Download syllabus" />
                    </span>
                    <span className="absolute left-0 top-0 w-full h-0 bg-(--blue) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
                  </button>
                </Link>
              </CourseRow>
            )}
          </div>
        );
      })}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 py-10">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-5 py-2 rounded-full border border-(--blue) text-(--blue) text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-(--blue) hover:text-white transition-all duration-300"
          >
            ← Previous
          </button>
          <span className="text-(--dark) text-sm font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-5 py-2 rounded-full border border-(--blue) text-(--blue) text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-(--blue) hover:text-white transition-all duration-300"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseListPaginated;
