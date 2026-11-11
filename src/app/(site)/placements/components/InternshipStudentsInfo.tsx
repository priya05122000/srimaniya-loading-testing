"use client";
import React, { useState, useEffect, useRef } from "react";
import Heading from "@/components/common/Heading";
import Section from "@/components/common/Section";
import Paragraph from "@/components/common/Paragraph";
import Span from "@/components/common/Span";
import Image from "next/image";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";
import { getAllInternships } from "@/services/internshipService";
import {
  type VerificationDocument,
  getViewableDocuments,
} from "./VerificationBadge";
import DocumentViewerModal from "./DocumentViewerModal";
import PhotoDocumentSlider from "./PhotoDocumentSlider";

export type Internship = {
  id: string;
  name: string;
  course?: string | null;
  batch_year?: string | null;
  designation?: string | null;
  company?: string | null;
  location?: string | null;
  duration?: string | null;
  stipend?: string | null;
  photo_url?: string | null;
  status?: boolean;
  verification_documents?: VerificationDocument[];
};

const ITEMS_PER_PAGE = 12;
const PLACEHOLDER_IMAGE = "/about-us/profile.webp";

const photoSrcFor = (internship: Internship) =>
  internship.photo_url
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${internship.photo_url}`
    : PLACEHOLDER_IMAGE;

// "8000.00" → "8000"; empty / zero → null (not shown)
const formatStipend = (stipend?: string | null) => {
  if (!stipend || Number(stipend) === 0) return null;
  return stipend.endsWith(".00") ? stipend.slice(0, -3) : stipend;
};

const preloadImages = (internships: Internship[]) =>
  Promise.all(
    internships.map((internship) => {
      const img = new window.Image();
      img.src = photoSrcFor(internship);
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    })
  );

// Intern card — same design as the Full Time placement card
const InternCard: React.FC<{
  internship: Internship;
  onOpenDocument: (internship: Internship, index: number) => void;
}> = ({ internship, onOpenDocument }) => {
  // Verified badge is shown only inside the document dialog, not on the card.
  const viewableDocuments = getViewableDocuments(
    internship.verification_documents
  );
  const photoSrc = photoSrcFor(internship);
  const stipend = formatStipend(internship.stipend);

  return (
    <div
      className="placement relative min-h-50 flex flex-row bg-(--blue) shadow-[15px_15px_60px_rgba(0,0,0,0.01)] p-4 overflow-hidden"
      data-section
    >
      <div className="relative w-28 sm:w-32 lg:w-62.5 shrink-0 lg:shrink self-stretch">
        {viewableDocuments.length > 0 ? (
          <PhotoDocumentSlider
            photoSrc={photoSrc}
            photoAlt="Hospitality internship at Sri Maniya Institute"
            alumniName={internship.name}
            documents={viewableDocuments}
            onOpenDocument={(index) => onOpenDocument(internship, index)}
          />
        ) : (
          <Image
            src={photoSrc}
            className="absolute top-0 image-tag left-0 w-full h-full object-cover object-top"
            alt="Hospitality internship at Sri Maniya Institute"
            width={300}
            height={150}
            style={{ objectFit: "cover" }}
            unoptimized
          />
        )}
      </div>
      <div className="w-full min-w-0 wrap-break-word flex flex-col justify-center items-start px-4">
        <Paragraph
          size="lg"
          className="text-(--white-custom) leading-tight uppercase font-bold line-clamp-2"
          title={internship.name}
        >
          {internship.name}
        </Paragraph>
        {internship.company && (
          <div>
            <Span className="message text-(--white-custom) capitalize">
              {internship.company}
            </Span>
          </div>
        )}
        {internship.designation && (
          <div className="mt-2">
            <Span className="message text-(--white-custom)">
              <b>Role : </b> {internship.designation}
            </Span>
          </div>
        )}
        {internship.course && (
          <div>
            <Span className="message text-(--white-custom)">
              <b>Course : </b> {internship.course}{" "}
              {internship.batch_year && `(${internship.batch_year})`}
            </Span>
          </div>
        )}
        {internship.duration && (
          <div>
            <Span className="message text-(--white-custom)">
              <b>Duration : </b> {internship.duration}
            </Span>
          </div>
        )}
        {stipend && (
          <div>
            <Span className="message text-(--white-custom)">
              <b>Stipend : </b> Rs. {stipend} / month
            </Span>
          </div>
        )}
      </div>
    </div>
  );
};

const InternshipStudentsInfo: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewer, setViewer] = useState<{
    internship: Internship;
    index: number;
  } | null>(null);

  const openDocument = (internship: Internship, index: number) =>
    setViewer({ internship, index });
  const closeViewer = React.useCallback(() => setViewer(null), []);

  useSplitTextHeadingAnimation({
    trigger: sectionRef,
    first: headingRef,
    enabled: internships.length > 0,
    delay: 0.3,
  });

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await getAllInternships();
        const data: Internship[] = res?.data ?? [];
        const active = data.filter((internship) => internship?.status);
        setInternships(active);
        await preloadImages(active);
      } catch (err) {
        console.error("Failed to fetch internships:", err);
      }
    };
    fetchInternships();
  }, []);

  // No internships yet → don't render an empty section.
  if (internships.length === 0) return null;

  const totalPages = Math.ceil(internships.length / ITEMS_PER_PAGE);
  const paginatedData = internships.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div ref={sectionRef}>
      <Section className="py-10 sm:py-20 bg-(--grey-custom) overflow-hidden">
        <Heading
          ref={headingRef}
          level={4}
          className="text-(--blue) uppercase block internship-students-info leading-tight"
        >
          Internships
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 py-10">
          {paginatedData.map((internship) => (
            <InternCard
              key={internship.id}
              internship={internship}
              onOpenDocument={openDocument}
            />
          ))}
        </div>
        {totalPages > 1 && (
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
        )}
      </Section>

      <DocumentViewerModal
        open={viewer !== null}
        onClose={closeViewer}
        alumniName={viewer?.internship.name ?? ""}
        alumniPhoto={viewer ? photoSrcFor(viewer.internship) : undefined}
        designation={viewer?.internship.designation ?? undefined}
        documents={getViewableDocuments(
          viewer?.internship.verification_documents
        )}
        initialIndex={viewer?.index ?? 0}
      />
    </div>
  );
};

export default InternshipStudentsInfo;
