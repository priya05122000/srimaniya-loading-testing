
import React, { FC, ReactNode } from "react";

import Link from "next/link";
import Section from "@/components/common/Section";
import Paragraph from "@/components/common/Paragraph";
import CollapsibleHTML from "@/components/common/CollapsibleHTML";
import { GoDownload } from "react-icons/go";
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

// 🔥 SAME COMPONENT (NO CHANGE)
const CourseRow: FC<CourseRowProps> = ({ label, children, highlight = false, id, title, duration }) => (
  <tr className="align-top">
    <td className="pr-4 flex items-start gap-2 md:pr-10 xl:pr-20 py-10 w-full sm:w-[260px] min-w-[180px]">
      <div className="w-12 shrink-0 hidden md:flex flex-col items-center">
        <hr className="border-(--grey-custom) w-full mt-4" />
      </div>
      {highlight && id !== undefined ? (
        <div className="flex items-baseline justify-center gap-2 ">
          <Paragraph size="xl" className="text-(--dark) flex items-center font-bold justify-center">
            {id.toString().padStart(2, "0")}
          </Paragraph>
          <Paragraph size="lg" className="text-(--dark) flex items-center justify-center font-bold">
            Course
          </Paragraph>
        </div>
      ) : (
        <Paragraph size="lg" className="text-(--dark) font-bold">
          {label}
        </Paragraph>
      )}
    </td>

    <td className="pl-8 border-l py-10">
      {highlight && title && duration ? (
        <h2 className="text-(--dark) text-lg sm:text-xl lg:text-2xl font-bold md:w-[75%] xl:w-[80%] ">
          {title}
          <span className="text-(--grey-light-custom) text-xl font-normal">
            &nbsp;- ({duration})
          </span>
        </h2>
      ) : children}
    </td>
  </tr>
);

const MobileCourseRow: FC<CourseRowProps> = ({
  label,
  children,
  highlight = false,
  id,
  title,
  duration,
}) => (
  <div className="flex items-start gap-4 py-4">
    <div className="min-w-[110px] shrink-0 flex flex-col items-start">
      {highlight && id !== undefined ? (
        <div className="flex items-baseline sm:items-center gap-2">
          <p className="text-(--dark)  text-2xl sm:text-3xl lg:text-4xl font-bold">
            {id.toString().padStart(2, "0")}
          </p>
          <Paragraph size="xl" className="text-(--dark) font-bold">
            Course
          </Paragraph>
        </div>
      ) : (
        <Paragraph size="xl" className="text-(--dark) font-bold">
          {label}
        </Paragraph>
      )}
    </div>
    <div className="flex-1">
      {highlight && title && duration ? (
        <h2 className="text-(--dark) text-xl sm:text-2xl lg:text-3xl font-bold">
          {title}
          <span className="text-(--dark) text-base font-normal">
            &nbsp;- ({duration})
          </span>
        </h2>
      ) : (
        children
      )}
    </div>
  </div>
);

// 🔥 ONLY CHANGE → REMOVE STATE, USE PROPS
const CourseList: FC<{ courses: Course[] }> = ({ courses }) => {


  const createSlug = (text: string) =>
    text.toLowerCase().trim().replace(/&/g, "and").replace(/\+/g, "").replace(/\s+/g, "-");

  return (
    <Section className="w-full relative">

      {/* 👇 client logic */}
      <CourseListClient courses={courses} />

      <div className="sm:pr-2">
        {courses.map((course, index) => (
          <div
            key={course.id}
            // id={`course-${course.id}`}
            id={`course-${createSlug(course.title)}`}
            className="border-b border-(--grey-custom) py-10 sm:py-0"
          >
            {/* Desktop Table View */}
            <table className="w-full hidden sm:block">
              <tbody>
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
                      download
                    >
                      <button className="relative flex justify-center items-center gap-1 rounded-full bg-transparent overflow-hidden cursor-pointer border border-(--blue) group transition-all duration-300 px-3 py-1">
                        <span className="relative gap-x-1 z-20 flex items-center text-center no-underline w-full text-(--blue) text-base transition-all duration-300 group-hover:text-white)">
                          Syllabus <GoDownload />
                        </span>
                        <span className="absolute left-0 top-0 w-full h-0 bg-(--blue) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
                      </button>
                    </Link>
                  </CourseRow>
                )}
              </tbody>
            </table>
            {/* Mobile View */}
            <div className="block sm:hidden overflow-visible">
              <MobileCourseRow
                label="Course"
                highlight
                id={String(index + 1).padStart(2, "0")}
                title={course.title}
                duration={course.duration}
              />
              <MobileCourseRow label="Description">
                <CollapsibleHTML html={course.description} maxHeight={300} />
              </MobileCourseRow>
              <MobileCourseRow label="Opportunity">
                <CollapsibleHTML html={course.opportunities} maxHeight={300} />
              </MobileCourseRow>
              <MobileCourseRow label="Eligibility">
                <CollapsibleHTML html={course.eligibility} maxHeight={300} />
              </MobileCourseRow>
              {course.syllabus && (
                <MobileCourseRow label="Syllabus">
                  <Link
                    href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${course.syllabus}`}
                    target="_blank"
                    download
                  >
                    <button className="relative flex justify-center items-center gap-1 rounded-full bg-transparent overflow-hidden cursor-pointer border border-(--blue) group transition-all duration-300 px-3 py-1">
                      <span className="relative gap-x-1 z-20 flex items-center text-center no-underline w-full text-(--blue) text-base transition-all duration-300 group-hover:text-white">
                        Syllabus <GoDownload />
                      </span>
                      <span className="absolute left-0 top-0 w-full h-0 bg-(--blue) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
                    </button>
                  </Link>
                </MobileCourseRow>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default CourseList;