import React, { useEffect, useState } from "react";
import { Course } from "@/types";
import Paragraph from "@/components/common/Paragraph";
import Span from "@/components/common/Span";
import Link from "next/link";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

type CourseCardProps = {
  course: Course;
  idx: number;
  total: number;
};

const stripHtmlAndTrim = (html: string, wordLimit: number = 50): string => {
  // Remove HTML tags and &nbsp; entities
  const text = html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/gi, " ");
  const words = text.split(/\s+/).filter(Boolean);
  const trimmed = words.slice(0, wordLimit).join(" ");
  return trimmed + (words.length > wordLimit ? "..." : "");
};

const CourseCard: React.FC<CourseCardProps> = ({ course, idx, total }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  return (
    <div
      className={`sticky-card h-full bg-(--blue) z-[${idx + 1}] ${
        idx === total - 1 ? "pb-16" : ""
      } ${idx === total - 2 ? "fifth-card" : ""}`}
      data-section
    >
      <div
        className={`w-full h-full flex flex-col md:flex-row items-start md:items-center  ${
          idx !== total - 1 ? "border-b border-(--grey-custom)" : ""
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_2fr] xl:grid-cols-[1.5fr_3fr] w-full ">
          {/* Left section */}
          <div className="flex flex-col items-start gap-4 sm:border-r border-(--grey-custom) py-8 pr-5">
            <div className="flex items-start">
              <hr className="w-10 min-w-12 border-t border-(--grey-custom) mt-3 mr-3" />
              <div>
                <div className="flex items-start gap-2">
                  <Paragraph size="lg" className="font-bold text-(--yellow)">
                    {String(idx + 1).padStart(2, "0")}
                  </Paragraph>
                  <Paragraph
                    size="lg"
                    className="font-bold text-(--white-custom) "
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
          {/* Right section */}
          <div className="flex flex-col gap-2 sm:pl-6 py-8">
            <div className="w-full">
              <div className="flex items-center gap-2">
                <div className="text-(--white-custom)">
                  {/* <Paragraph size='xl' className="font-semibold ">Description: </Paragraph>{" "} */}
                  <Paragraph
                    size="base"
                    className=" text-justify leading-relaxed "
                  >
                    {stripHtmlAndTrim(course.description ?? "")}
                  </Paragraph>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-5">
                <div className="text-(--white-custom) text-lg sm:text-xl lg:text-2xl">
                  <Paragraph size="lg" className="font-semibold ">
                    Eligibility:{" "}
                  </Paragraph>{" "}
                  {mounted && (
                    <p
                      className="text-base mt-4 text-justify leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: course.eligibility ?? "",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Link
                href={`/courses?course=${course.id}`}
                aria-label={`View details for ${course.title}`}
              >
                <button
                  className="border border-white hover:bg-white rounded-full p-2 flex items-center justify-center transition-all duration-200 w-12 h-6 cursor-pointer"
                  aria-label={`View details for ${course.title}`}
                >
                  <HiOutlineArrowNarrowRight className="font-normal text-(--white-custom) text-2xl hover:text-(--blue) " />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
