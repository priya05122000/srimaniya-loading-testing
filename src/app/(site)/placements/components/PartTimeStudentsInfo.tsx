"use client";
import Heading from "@/components/common/Heading";
import React, { useState } from "react";
import { useRef } from "react";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";
import Section from "@/components/common/Section";
import Span from "@/components/common/Span";
import Image from "next/image";

type Placement = {
  id: string;
  name: string;
  course: string;
  designation: string;
  company: string;
  location: string;
  salary: string;
  batch_year: string;
  profile_photo: string;
  status?: boolean;
};

// Reusable constants
const ITEMS_PER_PAGE = 12;
const PLACEHOLDER_IMAGE = "/about-us/profile.webp";

// Salary formatter for reuse
const formatSalary = (salary?: string) => {
  if (!salary || salary === "0" || salary === "0.00") return null;
  return salary.endsWith(".00") ? salary.slice(0, -3) : salary;
};

// Student Card component for reuse
const StudentCard: React.FC<{ placement: Placement }> = ({ placement }) => (
  <li>
    <article className="placement relative h-55 sm:h-50 flex flex-row bg-(--white-custom) shadow-[15px_15px_60px_rgba(0,0,0,0.01)] p-4 overflow-hidden">
      <figure className="relative w-62.5 h-full m-0">
        <Image
          src={placement.profile_photo ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${placement.profile_photo}` : PLACEHOLDER_IMAGE}
          className="absolute top-0 image-tag left-0 w-full h-full object-cover object-top"
          alt={`${placement.name} — part-time placement as ${placement.designation} at ${placement.company}`}
          width={300}
          height={150}
          style={{ objectFit: "cover" }}
          unoptimized
        />
      </figure>
      <div className="w-full flex flex-col justify-center items-start px-4">
        <h3 className="text-(--dark) text-base lg:text-lg leading-[1em] uppercase font-bold font-inter">
          {placement.name.length > 15
            ? placement.name.slice(0, 15) + "..."
            : placement.name}
        </h3>
        <p className="text-sm font-inter text-(--dark) capitalize mt-1">
          {placement.company}
        </p>
        <dl className="text-sm font-inter text-(--dark) mt-2 space-y-0.5">
          <div>
            <dt className="inline font-bold">Placement: </dt>
            <dd className="inline ml-0">{placement.designation}</dd>
          </div>
          <div>
            <dt className="inline font-bold">Course: </dt>
            <dd className="inline ml-0">
              {placement.course}
              {placement.batch_year && ` ( ${placement.batch_year} )`}
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

const PartTimeStudentsInfo: React.FC<{ initialData?: Placement[] }> = ({
  initialData = [],
}) => {
  const partPlacementRef = useRef<HTMLDivElement | null>(null);
  const [placementData] = useState<Placement[]>(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useSplitTextHeadingAnimation({
    trigger: partPlacementRef,
    first: headingRef,
    enabled: placementData.length > 0,
    delay: 0.3,
  });

  // Pagination logic
  const totalPages = Math.ceil(placementData.length / ITEMS_PER_PAGE);
  const paginatedData = placementData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section
      ref={partPlacementRef}
      className="bg-(--blue)"
      data-section
      aria-labelledby="part-time-placements-heading"
    >
      <Section className="py-10 sm:py-20 overflow-hidden">
        <Heading
          ref={headingRef}
          level={2}
          id="part-time-placements-heading"
          className="text-3xl sm:text-4xl lg:text-5xl text-(--white-custom) uppercase leading-tight"
        >
          Part Time Placements
        </Heading>
        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 py-10 list-none pl-0">
          {paginatedData.map((placement) => (
            <StudentCard key={placement.id} placement={placement} />
          ))}
        </ul>
        {/* Pagination Controls */}
        <nav
          className="flex justify-end items-center gap-4 mt-4"
          aria-label="Part time placements pagination"
        >
          <button
            className="px-3 py-1 bg-(--white-custom) cursor-pointer text-(--blue)"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <Span className="text-(--white-custom)" aria-current="page">
            Page {currentPage} of {totalPages}
          </Span>
          <button
            className="px-3 py-1 bg-(--white-custom) cursor-pointer text-(--blue)"
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

export default PartTimeStudentsInfo;
