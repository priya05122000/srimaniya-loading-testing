"use client";

import React from "react";
import Heading from "@/components/common/Heading";
import Section from "@/components/common/Section";
import Paragraph from "@/components/common/Paragraph";
import ParagraphList from "@/components/common/ParagraphList";
import Link from "next/link";

interface Course {
  id: number;
  title: string;
  duration?: string;
  category?: string;
}

const COURSE_CATEGORIES = [
  { key: "diploma", label: "Diploma Courses" },
  { key: "pathway course", label: "Pathway Course" },
  { key: "degree course", label: "Degree Course" },
  { key: "post grade course", label: "Post Grade Course" },
];

const Table = ({ courses }: { courses: Course[] }) => {

  const getCoursesByCategory = (category: string) =>
    courses.filter((c) => c.category?.toLowerCase() === category);

  const createSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/\+/g, "")
      .replace(/\s+/g, "-");

  return (
    <Section className="py-10 sm:py-16 bg-(--blue)" data-section>
      <h2 className="sr-only">All Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {COURSE_CATEGORIES.map(({ key, label }, idx) => {
          const filteredCourses = getCoursesByCategory(key);
          const borderClasses = [
            idx < 3 ? "md:border-r" : "",
            idx !== 3 ? "border-b" : "",
            idx === 2 ? "md:border-b-0 xl:border-r" : "",
            idx === 0 ? "xl:border-b-0" : "",
            idx === 1 ? "xl:border-b-0 md:border-r-0 xl:border-r" : "",
            "border-(--black-custom) px-0 md:px-6 py-4 md:py-4 xl:py-0"
          ].join(" ");

          return (
            <div className={borderClasses} key={key}>

              <Paragraph size="xl" className="text-white py-4 font-bold">
                {label}
              </Paragraph>

              {filteredCourses.length === 0 ? (
                <Paragraph size="base" className="text-(--grey)">
                  No courses found.
                </Paragraph>
              ) : (
                <ParagraphList size="base" className="list-square">
                  {filteredCourses.map((course) => (
                    <li key={course.id}>
                      {/* <Link
                        href={`/courses?course=${createSlug(course.title)}`}
                        className="cursor-pointer"
                      >
                        {course.title}
                      </Link> */}
                      <Link
                        href={`/courses#${createSlug(course.title)}`}
                        className="cursor-pointer"
                      >
                        {course.title}
                      </Link>
                      {course.duration && (
                        <span className="text-xs text-(--grey)">
                          {" "}
                          ({course.duration})
                        </span>
                      )}
                    </li>
                  ))}
                </ParagraphList>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default Table;