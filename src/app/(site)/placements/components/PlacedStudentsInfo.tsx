"use client";
import React, { useState, useRef } from "react";
import Heading from "@/components/common/Heading";
import Section from "@/components/common/Section";
import Span from "@/components/common/Span";
import Image from "next/image";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";

// Placement type for reuse
export type Placement = {
  id: string;
  name: string;
  course: string;
  batch_year: string;
  company: string;
  location: string;
  designation: string;
  salary: string;
  photo_url: string;
  status?: boolean;
};

// Reusable constants
const ITEMS_PER_PAGE = 12;
const PLACEHOLDER_IMAGE = "/about-us/profile.webp";

// Pagination hook for reuse
function usePagination<T>(data: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return { currentPage, setCurrentPage, totalPages, paginatedData };
}

// Salary formatter for reuse
const formatSalary = (salary?: string) => {
  if (!salary || salary === "0" || salary === "0.00") return null;
  return salary.endsWith(".00") ? salary.slice(0, -3) : salary;
};

// Student Card component for reuse
const StudentCard: React.FC<{ placement: Placement }> = ({ placement }) => (
  <li>
    <article
      className="placement relative h-55 sm:h-50 flex flex-row bg-(--blue) shadow-[15px_15px_60px_rgba(0,0,0,0.01)] p-4 overflow-hidden"
      data-section
    >
      <figure className="relative w-62.5 h-full m-0">
        <Image
          src={placement.photo_url ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${placement.photo_url}` : PLACEHOLDER_IMAGE}
          className="absolute top-0 image-tag left-0 w-full h-full object-cover object-top"
          alt={`${placement.name} — placed as ${placement.designation} at ${placement.company}`}
          width={300}
          height={150}
          style={{ objectFit: "cover" }}
          unoptimized
        />
      </figure>
      <div className="w-full flex flex-col justify-center items-start px-4">
        <h3 className="text-(--white-custom) text-base lg:text-lg leading-[1em] uppercase font-bold font-inter">
          {placement.name.length > 15
            ? placement.name.slice(0, 15) + "..."
            : placement.name}
        </h3>
        <p className="text-sm font-inter text-(--white-custom) capitalize mt-1">
          {placement.company}
        </p>
        <dl className="text-sm font-inter text-(--white-custom) mt-2 space-y-0.5">
          <div>
            <dt className="inline font-bold">Placement: </dt>
            <dd className="inline ml-0">{placement.designation}</dd>
          </div>
          <div>
            <dt className="inline font-bold">Course: </dt>
            <dd className="inline ml-0">
              {placement.course} {placement.batch_year && `(${placement.batch_year})`}
            </dd>
          </div>
          {formatSalary(placement.salary) && (
            <div>
              <dt className="inline font-bold">Salary: </dt>
              <dd className="inline ml-0">Rs. {formatSalary(placement.salary)}</dd>
            </div>
          )}
        </dl>
      </div>
    </article>
  </li>
);

const PlacedStudentsInfo: React.FC<{ initialData?: Placement[] }> = ({
  initialData = [],
}) => {
  const fullPlacementRef = useRef<HTMLDivElement | null>(null);
  const [placementData] = useState<Placement[]>(initialData);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useSplitTextHeadingAnimation({
    trigger: fullPlacementRef,
    first: headingRef,
    enabled: placementData.length > 0,
    delay: 0.3,
  });

  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(placementData, ITEMS_PER_PAGE);

  return (
    <section ref={fullPlacementRef} aria-labelledby="full-time-placements-heading">
      <Section className="py-10 sm:py-20">
        <Heading
          ref={headingRef}
          level={2}
          id="full-time-placements-heading"
          className="text-3xl sm:text-4xl lg:text-5xl text-(--blue) uppercase block placed-students-info leading-tight"
        >
          Full Time Placements
        </Heading>
        <ul className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 py-10 list-none pl-0">
          {paginatedData.map((placement) => (
            <StudentCard key={placement.id} placement={placement} />
          ))}
        </ul>
        {/* Pagination Controls */}
        <nav className="flex justify-end items-center gap-4 mt-4" aria-label="Full time placements pagination">
          <button
            className="px-3 py-1 bg-(--blue) cursor-pointer text-(--white-custom)"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <Span className="text-(--dark)" aria-current="page">
            Page {currentPage} of {totalPages}
          </Span>
          <button
            className="px-3 py-1 bg-(--blue) cursor-pointer text-(--white-custom)"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </nav>
      </Section>
    </section>
  );
};

export default PlacedStudentsInfo;
