
import React, { FC, ReactNode } from "react";

import Link from "next/link";
import Section from "@/components/common/Section";
import Paragraph from "@/components/common/Paragraph";
import CollapsibleHTML from "@/components/common/CollapsibleHTML";
import { Download } from "@/components/icons/Icons";
import CourseListClient from "./CourseListClient";


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

const CourseList: FC<{ courses: Course[] }> = ({ courses }) => {
  const createSlug = (text: string) =>
    text.toLowerCase().trim().replace(/&/g, "and").replace(/\+/g, "").replace(/\s+/g, "-");

  return (
    <Section className="w-full relative">

      <CourseListClient courses={courses} />

      <div className="sm:pr-2">
        {courses.map((course, index) => (
          <div
            key={course.id}
            id={`course-${createSlug(course.title)}`}
            className="border-b border-(--grey-custom)"
          >
            <CourseRow
              label="Course"
              highlight
              id={String(index + 1).padStart(2, "0")}
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
        ))}
      </div>
    </Section>
  );
};

export default CourseList;
