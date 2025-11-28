"use client";
import React, { useState, useEffect, useRef } from "react";
import Heading from "@/components/common/Heading";
import Section from "@/components/common/Section";
import Paragraph from "@/components/common/Paragraph";
import Span from "@/components/common/Span";
import Image from "next/image";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";
import { useGlobalLoader } from "@/providers/GlobalLoaderProvider";
import "swiper/css";
import "swiper/css/navigation";
import { getAllAlumniStories } from "@/services/alumniStoryService";

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

// Helper: Preload images (reusable)
const preloadImages = (placements: Placement[]) => {
  return Promise.all(
    placements.map((p) => {
      const img = new window.Image();
      img.src = p.photo_url ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${p.photo_url}` : PLACEHOLDER_IMAGE;
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    })
  );
};

// Student Card component for reuse
const StudentCard: React.FC<{ placement: Placement }> = ({ placement }) => (
  <div className="placement relative h-[220px] sm:h-[200px] flex flex-row bg-(--blue) shadow-[15px_15px_60px_rgba(0,0,0,0.01)] p-4 overflow-hidden" data-section>
    <div className="relative w-[250px] h-full">
      <Image
        src={placement.photo_url ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${placement.photo_url}` : PLACEHOLDER_IMAGE}
        className="absolute top-0 left-0 w-full h-full object-cover object-top"
        alt={placement.name}
        width={300}
        height={150}
        style={{ objectFit: "cover" }}
        unoptimized
      />
    </div>
    <div className="w-full flex flex-col justify-center items-start px-4">
      <div className="top flex justify-center">
        <div className="userDetails flex flex-col">
          <Paragraph
            size="lg"
            className="text-(--white-custom) leading-[1em] uppercase font-bold"
          >
            {placement.name.length > 15
              ? placement.name.slice(0, 15) + "..."
              : placement.name}
          </Paragraph>
        </div>
      </div>
      <div>
        <Span className="message text-(--white-custom) capitalize">
          {placement.company}
        </Span>
      </div>
      <div className="mt-2">
        <Span className="message text-(--white-custom)"><b>Placement : </b> {placement.designation}</Span>
      </div>
      <div>
        <Span className="message text-(--white-custom)"><b>Course : </b> {placement.course} {placement.batch_year && `(${placement.batch_year})`}</Span>
      </div>
      {formatSalary(placement.salary) && (
        <div>
          <Span className="message text-(--white-custom)"><b>Salary : </b> Rs. {formatSalary(placement.salary)}</Span>
        </div>
      )}
    </div>
  </div>
);

const PlacedStudentsInfo: React.FC = () => {
  const fullPlacementRef = useRef<HTMLDivElement | null>(null);
  const [placementData, setPlacementData] = useState<Placement[]>([]);
  const { setLoading } = useGlobalLoader();
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useSplitTextHeadingAnimation({
    trigger: fullPlacementRef,
    first: headingRef,
    enabled: placementData.length > 0,
    delay: 0.3,
  });

  useEffect(() => {
    const fetchPlacement = async () => {
      setLoading(true);
      try {
        const res = await getAllAlumniStories();
        const data: Placement[] = res?.data ?? [];
        const filtered = data.filter((story) => story?.status);
        setPlacementData(filtered);
        await preloadImages(filtered);
      } catch (err) {
        console.error("Failed to fetch placement stories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlacement();
  }, [setLoading]);

  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(placementData, ITEMS_PER_PAGE);

  return (
    <div ref={fullPlacementRef}>
      <Section className="py-10 sm:py-20">
        <Heading
          ref={headingRef}
          level={4}
          className="text-(--blue) uppercase block placed-students-info leading-tight"
        >
          Full Time Placements
        </Heading>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 py-10">
          {paginatedData.map((placement) => (
            <StudentCard key={placement.id} placement={placement} />
          ))}
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-end items-center gap-4 mt-4">
          <button
            className="px-3 py-1 bg-(--blue) cursor-pointer text-(--white-custom)"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <Span className="text-(--dark)">
            Page {currentPage} of {totalPages}
          </Span>
          <button
            className="px-3 py-1 bg-(--blue) cursor-pointer text-(--white-custom)"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </Section>
    </div>
  );
};

export default PlacedStudentsInfo;
