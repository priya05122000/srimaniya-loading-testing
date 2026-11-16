"use client";
import React, { useState, useEffect, useRef } from "react";
import Heading from "@/components/common/Heading";
import Section from "@/components/common/Section";
import Span from "@/components/common/Span";
import Image from "next/image";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";
import { getAllAlumniStories } from "@/services/alumniStoryService";
import {
  type VerificationDocument,
  getViewableDocuments,
} from "./VerificationBadge";
import DocumentViewerModal from "./DocumentViewerModal";
import PhotoDocumentSlider from "./PhotoDocumentSlider";

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
  verification_documents?: VerificationDocument[];
};

// Reusable constants
const ITEMS_PER_PAGE = 12;
const PLACEHOLDER_IMAGE = "/about-us/student-profile-placeholder.webp";

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

// True when a field has real content (not null / empty / only spaces)
const hasText = (value?: string | null) => Boolean(value && value.trim());

// Helper: Preload images (reusable)
const preloadImages = (placements: Placement[]) => {
  return Promise.all(
    placements.map((p) => {
      const img = new window.Image();
      img.src = p.photo_url ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${p.photo_url}` : PLACEHOLDER_IMAGE;
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    })
  );
};

// Student Card component for reuse
const StudentCard: React.FC<{
  placement: Placement;
  onOpenDocument: (placement: Placement, index: number) => void;
}> = ({ placement, onOpenDocument }) => {
  // Verified badge is shown only inside the document dialog, not on the card.
  const viewableDocuments = getViewableDocuments(placement.verification_documents);
  const photoSrc = placement.photo_url
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${placement.photo_url}`
    : PLACEHOLDER_IMAGE;

  return (
    <div className="placement relative min-h-50 flex flex-row bg-(--blue) shadow-[15px_15px_60px_rgba(0,0,0,0.01)] p-4 overflow-hidden" data-section>
      <div className="relative w-28 sm:w-32 lg:w-62.5 shrink-0 lg:shrink self-stretch">
        {viewableDocuments.length > 0 ? (
          <PhotoDocumentSlider
            photoSrc={photoSrc}
            photoAlt="Hospitality placement at Sri Maniya Institute"
            alumniName={placement.name}
            documents={viewableDocuments}
            onOpenDocument={(index) => onOpenDocument(placement, index)}
          />
        ) : (
          <Image
            src={photoSrc}
            className="absolute top-0 image-tag left-0 w-full h-full object-cover object-top"
            alt="Hospitality placement at Sri Maniya Institute"
            width={300}
            height={150}
            style={{ objectFit: "cover" }}
            unoptimized
          />
        )}
      </div>
      <div className="w-full min-w-0 break-words flex flex-col justify-center items-start px-4">
        <div className="top flex justify-center">
          <div className="userDetails flex flex-col">
            <p
            className="font-inter text-[15px] lg:text-base text-(--white-custom) leading-tight uppercase font-bold line-clamp-2"
            title={placement.name}
          >
            {placement.name}
          </p>
          </div>
        </div>
        {hasText(placement.company) && (
          <div>
            <span className="message block font-inter mt-1 text-[13px] leading-relaxed text-(--white-custom) capitalize">
              {placement.company}
            </span>
          </div>
        )}
        {/* Each detail row is shown only when it has data. */}
        <div className="mt-2">
          {hasText(placement.designation) && (
            <div>
              <Span className="message text-(--white-custom)"><b>Placement : </b> {placement.designation}</Span>
            </div>
          )}
          {hasText(placement.course) && (
            <div>
              <Span className="message text-(--white-custom)"><b>Course : </b> {placement.course} {hasText(placement.batch_year) && `(${placement.batch_year})`}</Span>
            </div>
          )}
          {formatSalary(placement.salary) && (
            <div>
              <Span className="message text-(--white-custom)"><b>Salary : </b> Rs. {formatSalary(placement.salary)}</Span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PlacedStudentsInfo: React.FC = () => {
  const fullPlacementRef = useRef<HTMLDivElement | null>(null);
  const [placementData, setPlacementData] = useState<Placement[]>([]);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const [viewer, setViewer] = useState<{
    placement: Placement;
    index: number;
  } | null>(null);

  const openDocument = (placement: Placement, index: number) =>
    setViewer({ placement, index });
  const closeViewer = React.useCallback(() => setViewer(null), []);

  useSplitTextHeadingAnimation({
    trigger: fullPlacementRef,
    first: headingRef,
    enabled: placementData.length > 0,
    delay: 0.3,
  });

  useEffect(() => {
    const fetchPlacement = async () => {
      try {
        const res = await getAllAlumniStories();
        const data: Placement[] = res?.data ?? [];
        const filtered = data.filter((story) => story?.status);
        setPlacementData(filtered);
        await preloadImages(filtered);
      } catch (err) {
        console.error("Failed to fetch placement stories:", err);
      }
    };
    fetchPlacement();
  }, []);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 py-10">
          {paginatedData.map((placement) => (
            <StudentCard
              key={placement.id}
              placement={placement}
              onOpenDocument={openDocument}
            />
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

      <DocumentViewerModal
        open={viewer !== null}
        onClose={closeViewer}
        alumniName={viewer?.placement.name ?? ""}
        alumniPhoto={
          viewer
            ? viewer.placement.photo_url
              ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${viewer.placement.photo_url}`
              : PLACEHOLDER_IMAGE
            : undefined
        }
        designation={viewer?.placement.designation}
        documents={getViewableDocuments(viewer?.placement.verification_documents)}
        initialIndex={viewer?.index ?? 0}
      />
    </div>
  );
};

export default PlacedStudentsInfo;
