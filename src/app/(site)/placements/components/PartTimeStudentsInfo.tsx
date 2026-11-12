"use client";
import Heading from "@/components/common/Heading";
import React, { useState } from "react";
import { useRef } from "react";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";
import Section from "@/components/common/Section";
import Paragraph from "@/components/common/Paragraph";
import { useEffect } from "react";
import { getAllPlacements } from "@/services/placementService";
import Span from "@/components/common/Span";
import Image from "next/image";
import {
  type VerificationDocument,
  getViewableDocuments,
} from "./VerificationBadge";
import DocumentViewerModal from "./DocumentViewerModal";
import PhotoDocumentSlider from "./PhotoDocumentSlider";

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
  verification_documents?: VerificationDocument[];
};

// Reusable constants
const ITEMS_PER_PAGE = 12;
const PLACEHOLDER_IMAGE = "/about-us/student-profile-placeholder.webp";

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
      img.src = p.profile_photo ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${p.profile_photo}` : PLACEHOLDER_IMAGE;
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    })
  );
};

const photoSrcFor = (placement: Placement) =>
  placement.profile_photo
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${placement.profile_photo}`
    : PLACEHOLDER_IMAGE;

// Student Card component for reuse
const StudentCard: React.FC<{
  placement: Placement;
  onOpenDocument: (placement: Placement, index: number) => void;
}> = ({ placement, onOpenDocument }) => {
  // Verified badge is shown only inside the document dialog, not on the card.
  const viewableDocuments = getViewableDocuments(placement.verification_documents);
  const photoSrc = photoSrcFor(placement);

  return (
  <div className="placement relative min-h-50 flex flex-row bg-(--white-custom) shadow-[15px_15px_60px_rgba(0,0,0,0.01)] p-4 overflow-hidden">
    <div className="relative w-28 sm:w-32 lg:w-62.5 shrink-0 lg:shrink self-stretch">
      {viewableDocuments.length > 0 ? (
        <PhotoDocumentSlider
          photoSrc={placement.profile_photo ? photoSrc : null}
          photoAlt="Hotel management placement at Sri Maniya Institute"
          alumniName={placement.name}
          documents={viewableDocuments}
          onOpenDocument={(index) => onOpenDocument(placement, index)}
        />
      ) : (
        <Image
          src={photoSrc}
          className="absolute top-0 image-tag left-0 w-full h-full object-cover object-top"
          alt="Hotel management placement at Sri Maniya Institute"
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
          <Paragraph
            size="lg"
            className="text-(--dark) leading-tight uppercase font-bold line-clamp-2"
            title={placement.name}
          >
            {placement.name}
          </Paragraph>
        </div>
      </div>
      <div>
        <Span className="message text-(--dark) capitalize">
          {placement.company}
        </Span>
      </div>
      <div className="mt-2">
        <Span className="message text-(--dark)"><b>Placement :</b> {placement.designation}</Span>
      </div>
      <div>
        <Span className="message text-(--dark)"><b>Course : </b> {placement.course}{placement.batch_year && ` ( ${placement.batch_year} )`}</Span>
      </div>
      {formatSalary(placement.salary) && (
        <div>
          <Span className="message text-(--dark)"><b>Salary : </b> Rs. {formatSalary(placement.salary)}</Span>
        </div>
      )}
    </div>
  </div>
  );
};

const PartTimeStudentsInfo = () => {
  const partPlacementRef = useRef<HTMLDivElement | null>(null);
  const [placementData, setPlacementData] = useState<Placement[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const [viewer, setViewer] = useState<{
    placement: Placement;
    index: number;
  } | null>(null);

  const openDocument = (placement: Placement, index: number) =>
    setViewer({ placement, index });
  const closeViewer = React.useCallback(() => setViewer(null), []);

  useSplitTextHeadingAnimation({
    trigger: partPlacementRef,
    first: headingRef,
    enabled: placementData.length > 0,
    delay: 0.3,
  });

  useEffect(() => {
    const fetchPlacement = async () => {
      try {
        const res = await getAllPlacements();
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

  // Pagination logic
  const totalPages = Math.ceil(placementData.length / ITEMS_PER_PAGE);
  const paginatedData = placementData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div ref={partPlacementRef} className="bg-(--blue)" data-section>
      <Section className="py-10 sm:py-20 overflow-hidden">
        <Heading
          ref={headingRef}
          level={4}
          className="text-(--white-custom) uppercase leading-tight"
        >
          Part Time Placements
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
            className="px-3 py-1 bg-(--white-custom) cursor-pointer text-(--blue)"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <Span className="text-(--white-custom)">
            Page {currentPage} of {totalPages}
          </Span>
          <button
            className="px-3 py-1 bg-(--white-custom) cursor-pointer text-(--blue)"
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
        alumniPhoto={viewer ? photoSrcFor(viewer.placement) : undefined}
        designation={viewer?.placement.designation}
        documents={getViewableDocuments(viewer?.placement.verification_documents)}
        initialIndex={viewer?.index ?? 0}
      />
    </div>
  );
};

export default PartTimeStudentsInfo;
