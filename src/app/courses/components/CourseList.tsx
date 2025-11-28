"use client";

import React, { FC, ReactNode, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Section from "@/components/common/Section";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import CollapsibleHTML from "@/components/common/CollapsibleHTML";

import { ScrollSmoother } from "gsap/ScrollSmoother";
import { GoDownload } from "react-icons/go";
import { getAllCourses } from "@/services/courseService";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";

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

// Reusable Course Row for desktop
const CourseRow: FC<CourseRowProps> = ({
  label,
  children,
  highlight = false,
  id,
  title,
  duration,
}) => (
  <tr className="align-top">
    <td className="pr-4 flex items-start gap-2 md:pr-10 xl:pr-20 py-10  w-full sm:w-[260px] min-w-[180px] ">
      <div className="w-12 shrink-0 hidden md:flex flex-col items-center">
        <hr className="border-(--grey-custom) w-full mt-4" />
      </div>
      {highlight && id !== undefined ? (
        <div className="flex items-baseline justify-center gap-2 ">
          <Heading level={5} className="text-(--dark) flex items-center justify-center">
            {id.toString().padStart(2, "0")}
          </Heading>
          <Paragraph size="xl" className="text-(--dark) flex items-center justify-center font-bold">
            Course
          </Paragraph>
        </div>
      ) : (
        <Paragraph size="xl" className="text-(--dark) font-bold">
          {label}
        </Paragraph>
      )}
    </td>
    <td className="text-(--dark) pl-8 border-l border-(--grey-custom) py-10  ">
      {highlight && title && duration ? (
        <Heading level={6} className="text-(--dark) md:w-[75%] xl:w-[80%] ">
          {title}
          <span className="text-(--grey-light-custom) text-xl font-normal">
            &nbsp;- ({duration})
          </span>
        </Heading>
      ) : (
        children
      )}
    </td>
  </tr>
);

// Reusable Course Row for mobile
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
        <div className="flex items-center gap-2">
          <Heading level={5} className="text-(--dark)">
            {id.toString().padStart(2, "0")}
          </Heading>
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
        <Heading level={6} className="text-(--dark)">
          {title}
          <span className="text-(--grey) text-base font-normal">
            &nbsp;- ({duration})
          </span>
        </Heading>
      ) : (
        children
      )}
    </div>
  </div>
);

const useScrollToCourse = (courses: Course[], searchParams: ReturnType<typeof useSearchParams>) => {
  useEffect(() => {
    if (!searchParams) return;
    const targetId = searchParams.get("course");
    if (!targetId) return;
    const timer = setTimeout(() => {
      const targetElement = document.getElementById(`course-${targetId}`);
      if (!targetElement) return;
      if (window.innerWidth >= 768) {
        const smoother = ScrollSmoother.get();
        if (smoother) {
          smoother.scrollTo(targetElement, true, "top 80");
        } else {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        const elementY = targetElement.getBoundingClientRect().top + window.scrollY;
        const headerOffset = 80;
        window.scrollTo({ top: elementY - headerOffset, behavior: "smooth" });
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [courses, searchParams]);
};

const useFetchCourses = (setCourses: React.Dispatch<React.SetStateAction<Course[]>>, setLoading: (loading: boolean) => void) => {
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const result = await getAllCourses();
        setCourses(result?.data || []);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("Failed to fetch courses");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [setLoading, setCourses]);
};

const CourseList: FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const { setLoading } = useGlobalLoader();
  const searchParams = useSearchParams();

  useScrollToCourse(courses, searchParams);
  useFetchCourses(setCourses, setLoading);

  return (
    <Section className="w-full relative">
      <div className="sm:pr-2">
        {courses.map((course, index) => (
          <div
            key={course.id}
            id={`course-${course.id}`}
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
                      href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/syllabus/${course.syllabus}`}
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
                    href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/syllabus/${course.syllabus}`}
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
