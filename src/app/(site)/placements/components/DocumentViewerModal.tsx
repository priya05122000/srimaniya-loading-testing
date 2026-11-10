"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import Paragraph from "@/components/common/Paragraph";
import Span from "@/components/common/Span";
import PdfPreview from "@/components/common/PdfPreview";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Close,
  ExternalLink,
  ZoomIn,
  ZoomOut,
} from "@/components/icons/Icons";
import VerificationBadge, {
  type VerificationDocument,
  documentUrl,
  isPdfDocument,
} from "./VerificationBadge";

type DocumentViewerModalProps = {
  open: boolean;
  onClose: () => void;
  alumniName: string;
  /** Student photo URL shown in the header. */
  alumniPhoto?: string;
  /** Student designation shown in the header. */
  designation?: string;
  documents: VerificationDocument[];
  initialIndex?: number;
};

const ZOOMED_SCALE = 2;

const footerButton =
  "inline-flex items-center gap-2 px-3 py-1 bg-(--blue) text-(--white-custom) cursor-pointer text-sm font-inter disabled:opacity-40 disabled:cursor-not-allowed";

const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  open,
  onClose,
  alumniName,
  alumniPhoto,
  designation,
  documents,
  initialIndex = 0,
}) => {
  const [index, setIndex] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Reset to the requested document each time the viewer opens.
  useEffect(() => {
    if (open) {
      setIndex(initialIndex);
      setZoomed(false);
    }
  }, [open, initialIndex]);

  // Esc / arrow keys + lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, documents.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, documents.length]);

  useEffect(() => setZoomed(false), [index]);

  if (!open || !mounted || documents.length === 0) return null;

  const current = documents[Math.min(index, documents.length - 1)];
  const fileUrl = current.file_url ? documentUrl(current.file_url) : "";
  const isPdf = isPdfDocument(current.file_url);
  const hasMultiple = documents.length > 1;
  const label = current.verification_label?.trim() ?? "";
  const description = label || current.document_type || "Verification document";

  const fallback = (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-(--dark)">
      <Span>Loading document…</Span>
    </div>
  );

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-(--blue-overlay-light) p-3 sm:p-6 animate-modal-overlay"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${alumniName} — ${description}`}
        className="bg-(--white-custom) shadow-lg w-full max-w-4xl max-h-[92vh] flex flex-col animate-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-(--white-custom) border-b border-(--grey) px-4 py-3 sm:px-6 sm:py-4 flex items-start justify-between gap-4">
          {/* items-stretch: the photo takes the full height of the text block */}
          <div className="min-w-0 flex items-stretch gap-3 sm:gap-4">
            {alumniPhoto && (
              <div className="relative shrink-0 w-16 sm:w-20 min-h-20 sm:min-h-24 self-stretch overflow-hidden border border-(--grey) shadow-sm">
                <Image
                  src={alumniPhoto}
                  alt={alumniName}
                  fill
                  sizes="80px"
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
            )}
            <div className="min-w-0 flex flex-col justify-center gap-2">
              <Paragraph
                size="lg"
                className="text-(--blue) leading-tight font-bold wrap-break-word"
              >
                <span className="uppercase">{alumniName}</span>
                {current.document_type?.trim() && (
                  <span className="capitalize"> - {current.document_type.trim()}</span>
                )}
              </Paragraph>
              {(designation || label) && (
                <div className="flex flex-wrap items-center gap-2">
                  {designation && (
                    <span className="inline-flex items-center gap-1.5 border border-(--blue) text-(--blue) px-2 py-1 text-[11px] leading-tight font-semibold uppercase tracking-wide font-inter">
                      <Briefcase className="shrink-0 text-sm" />
                      {designation}
                    </span>
                  )}
                  {label && <VerificationBadge label={label} variant="light" />}
                </div>
              )}
            </div>
          </div>
          <button
            type="button"
            className="shrink-0 text-2xl text-(--blue) cursor-pointer"
            onClick={onClose}
            aria-label="Close"
          >
            <Close aria-label="Close" />
          </button>
        </div>

        {/* Document */}
        <div className="flex-1 min-h-0 overflow-auto bg-(--grey)/40 p-3 sm:p-4">
          <div
            className={zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}
            onClick={() => setZoomed((z) => !z)}
          >
            {isPdf ? (
              <PdfPreview
                key={fileUrl}
                url={fileUrl}
                pages="all"
                fit="width"
                zoom={zoomed ? ZOOMED_SCALE : 1}
                fallback={fallback}
              />
            ) : (
              <Image
                key={fileUrl}
                src={fileUrl}
                alt={`${description} — ${alumniName}`}
                width={1200}
                height={1600}
                unoptimized
                className="block h-auto mx-auto bg-white max-w-none"
                style={{ width: zoomed ? `${ZOOMED_SCALE * 100}%` : "100%" }}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 border-t border-(--grey)">
          <div className="flex items-center gap-3">
            {hasMultiple && (
              <>
                <button
                  type="button"
                  className={footerButton}
                  onClick={() => setIndex((i) => Math.max(i - 1, 0))}
                  disabled={index === 0}
                  aria-label="Previous document"
                >
                  <ArrowLeft />
                </button>
                <Span className="text-(--dark)">
                  {index + 1} / {documents.length}
                </Span>
                <button
                  type="button"
                  className={footerButton}
                  onClick={() =>
                    setIndex((i) => Math.min(i + 1, documents.length - 1))
                  }
                  disabled={index === documents.length - 1}
                  aria-label="Next document"
                >
                  <ArrowRight />
                </button>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className={footerButton}
              onClick={() => setZoomed((z) => !z)}
            >
              {zoomed ? <ZoomOut /> : <ZoomIn />}
              {zoomed ? "Fit" : "Zoom"}
            </button>
            {fileUrl && (
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={footerButton}
              >
                <ExternalLink />
                Open
              </a>
            )}
            <button type="button" className={footerButton} onClick={onClose}>
              <Close />
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DocumentViewerModal;
