"use client";

import React, { useEffect, useState } from "react";
interface Course {
  id: number;
  title: string;
  duration?: string;
  category?: string;
}
import { getAllCourses } from "@/services/courseService";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";
import Heading from "@/components/common/Heading";
import Section from "@/components/common/Section";
import Paragraph from "@/components/common/Paragraph";
import ParagraphList from "@/components/common/ParagraphList";
import Link from "next/link";

// Reusable constants for course categories
const COURSE_CATEGORIES = [
  { key: "diploma", label: "Diploma Courses" },
  { key: "pathway course", label: "Pathway Course" },
  { key: "degree course", label: "Degree Course" },
  { key: "post grade course", label: "Post Grade Course" },
];

const Table = () => {
  const { setLoading } = useGlobalLoader();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const result = await getAllCourses();
        setCourses(result.data);
      } catch (error: unknown) {
        const message = (error && typeof error === "object" && "message" in error)
          ? (error as { message?: string }).message
          : "Failed to fetch courses";
        console.error(message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [setLoading]);

  // Helper to filter courses by category
  const getCoursesByCategory = (category: string) =>
    courses.filter((c) => c.category?.toLowerCase() === category);

  return (
    <Section className="py-10 sm:py-16 bg-(--blue)" data-section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {COURSE_CATEGORIES.map(({ key, label }, idx) => {
          const filteredCourses = getCoursesByCategory(key);
          const borderClasses = [
            idx < 3 ? "md:border-r" : "",
            idx !== 3 ? "border-b" : "", // last column no border-b
            idx === 2 ? "md:border-b-0 lg:border-r" : "", // degree course
            idx === 0 ? "lg:border-b-0" : "", // diploma
            idx === 1 ? "lg:border-b-0 md:border-r-0 lg:border-r" : "", // pathway
            "border-(--black-custom) px-0 md:px-6 py-4 md:py-4 lg:py-0"
          ].join(" ");
          return (
            <div className={borderClasses} key={key}>
              <Heading level={6} className="text-white py-4">{label}</Heading>
              {filteredCourses.length === 0 ? (
                <Paragraph size="base" className="text-(--grey)">No courses found.</Paragraph>
              ) : (
                <ParagraphList size="base" className="list-square">
                  {filteredCourses.map((course) => (
                    <li key={course.id}>
                      <Link href={`/courses?course=${course.id}`} className="cursor-pointer">
                        {course.title}
                      </Link>
                      {course.duration && (
                        <span className="text-xs text-(--grey)"> ({course.duration})</span>
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
