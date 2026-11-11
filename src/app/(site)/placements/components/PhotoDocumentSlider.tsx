"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import PdfPreview from "@/components/common/PdfPreview";
import { ArrowLeft, ArrowRight, ZoomIn } from "@/components/icons/Icons";
import {
  type VerificationDocument,
  documentUrl,
  isPdfDocument,
} from "./VerificationBadge";

type PhotoDocumentSliderProps = {
  /**
   * The student's real photo. Pass null when there is none: the slider then
   * shows only the documents (starting with the PDF) instead of a placeholder.
   */
  photoSrc: string | null;
  photoAlt: string;
  alumniName: string;
  /** Verified documents that have a file. */
  documents: VerificationDocument[];
  /** Opens the full viewer at this document index. */
  onOpenDocument: (index: number) => void;
};

type Slide =
  | { kind: "photo"; src: string }
  | { kind: "document"; doc: VerificationDocument; docIndex: number };

const AUTOPLAY_MS = 4000;
const TRANSITION_MS = 500;
const SWIPE_THRESHOLD_PX = 30;

const arrowClass =
  "flex items-center justify-center w-5 h-5 bg-(--blue-overlay-light) text-(--white-custom) text-[11px] cursor-pointer hover:bg-(--blue) transition-colors";

/**
 * Student photo (if any) + verification documents as one endless slider,
 * filling the card's existing photo column so the card keeps its original size.
 *
 * Endless loop without rewinding: a copy of the first slide sits after the
 * last one. Moving forward onto the copy is animated, then the track jumps
 * (without animation) back to the real first slide, which looks identical.
 */
const PhotoDocumentSlider: React.FC<PhotoDocumentSliderProps> = ({
  photoSrc,
  photoAlt,
  alumniName,
  documents,
  onOpenDocument,
}) => {
  const slides: Slide[] = [
    ...(photoSrc ? [{ kind: "photo" as const, src: photoSrc }] : []),
    ...documents.map((doc, docIndex) => ({
      kind: "document" as const,
      doc,
      docIndex,
    })),
  ];
  const realCount = slides.length;
  // A single slide (e.g. no photo + one PDF) does not slide at all.
  const looping = realCount > 1;
  // 0..realCount, where realCount is the copy of the first slide at the end.
  const [position, setPosition] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const moving = useRef(false);
  const pointerStartX = useRef<number | null>(null);
  const swiped = useRef(false);

  const activeIndex = position % realCount;

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const next = useCallback(() => {
    if (moving.current || realCount < 2) return;
    if (reducedMotion) {
      setPosition((p) => (p + 1) % realCount);
      return;
    }
    moving.current = true;
    setAnimate(true);
    setPosition((p) => p + 1);
  }, [realCount, reducedMotion]);

  const prev = useCallback(() => {
    if (moving.current || realCount < 2) return;
    if (reducedMotion) {
      setPosition((p) => (p - 1 + realCount) % realCount);
      return;
    }
    moving.current = true;
    if (position === 0) {
      // Jump silently to the photo copy, then slide back one step.
      setAnimate(false);
      setPosition(realCount);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          setPosition(realCount - 1);
        })
      );
    } else {
      setAnimate(true);
      setPosition((p) => p - 1);
    }
  }, [position, realCount, reducedMotion]);

  const onTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    moving.current = false;
    if (position === realCount) {
      // Landed on the photo copy → snap to the real photo.
      setAnimate(false);
      setPosition(0);
    }
  };

  // Safety net: if a transitionend is ever missed, unlock after the duration.
  useEffect(() => {
    if (!moving.current) return;
    const timer = window.setTimeout(() => {
      moving.current = false;
      if (position === realCount) {
        setAnimate(false);
        setPosition(0);
      }
    }, TRANSITION_MS + 100);
    return () => window.clearTimeout(timer);
  }, [position, realCount]);

  // Autoplay forward (paused on hover / focus, off for reduced motion).
  useEffect(() => {
    if (paused || reducedMotion || realCount < 2) return;
    const timer = window.setTimeout(next, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [position, paused, reducedMotion, realCount, next]);

  // Swipe on touch devices.
  const onPointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
    swiped.current = false;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return;
    const delta = e.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(delta) > SWIPE_THRESHOLD_PX) {
      swiped.current = true;
      if (delta < 0) next();
      else prev();
    }
  };

  const openDocument = (index: number) => {
    // A swipe that ends on a document slide must not also open it.
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    onOpenDocument(index);
  };

  const renderSlide = (slide: Slide, key: string, isActive: boolean) => {
    if (slide.kind === "photo") {
      return (
        <div
          key={key}
          className="relative w-full h-full shrink-0"
          aria-hidden={!isActive}
        >
          <Image
            src={slide.src}
            className="absolute top-0 image-tag left-0 w-full h-full object-cover object-top"
            alt={photoAlt}
            width={300}
            height={150}
            style={{ objectFit: "cover" }}
            unoptimized
            draggable={false}
          />
        </div>
      );
    }

    const { doc, docIndex } = slide;
    const url = documentUrl(doc.file_url as string);
    const name =
      doc.verification_label || doc.document_type || "Verification document";
    return (
      <button
        key={key}
        type="button"
        onClick={() => openDocument(docIndex)}
        className="relative w-full h-full shrink-0 bg-white cursor-zoom-in"
        aria-label={`View ${name} document of ${alumniName}`}
        aria-hidden={!isActive}
        tabIndex={isActive ? 0 : -1}
      >
        {isPdfDocument(doc.file_url) ? (
          <PdfPreview
            url={url}
            pages="first"
            fit="contain"
            className="h-full p-1"
            fallback={
              <span className="flex h-full items-center justify-center text-xs font-semibold font-inter text-(--blue)">
                PDF
              </span>
            }
          />
        ) : (
          <Image
            src={url}
            alt={`${name} — ${alumniName}`}
            fill
            sizes="(min-width: 1024px) 250px, 128px"
            className="object-contain p-1"
            unoptimized
            draggable={false}
          />
        )}
        <span className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 bg-(--blue-overlay-light) text-(--white-custom) text-[11px]">
          <ZoomIn />
        </span>
      </button>
    );
  };

  return (
    <div
      className="absolute inset-0 overflow-hidden touch-pan-y"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (pointerStartX.current = null)}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${alumniName} photo and verification documents`}
    >
      <div
        className="flex h-full"
        style={{
          transform: `translateX(-${position * 100}%)`,
          // Duration must be 0 for the silent jump, or the browser's default
          // `transition-property: all` would animate the rewind.
          transition:
            animate && !reducedMotion
              ? `transform ${TRANSITION_MS}ms ease-out`
              : "none",
        }}
        onTransitionEnd={onTransitionEnd}
      >
        {/* Photo (if any) first, then the verification documents */}
        {slides.map((slide, index) =>
          renderSlide(
            slide,
            slide.kind === "photo" ? "photo" : `doc-${slide.doc.id}`,
            activeIndex === index
          )
        )}

        {/* Copy of the first slide for the seamless loop */}
        {looping && renderSlide(slides[0], "loop-copy", false)}
      </div>

      {/* Small arrows, both in the bottom-right corner */}
      {looping && (
      <div className="absolute bottom-1 right-1 z-10 flex gap-0.5">
        <button
          type="button"
          onClick={prev}
          className={arrowClass}
          aria-label="Previous slide"
        >
          <ArrowLeft />
        </button>
        <button
          type="button"
          onClick={next}
          className={arrowClass}
          aria-label="Next slide"
        >
          <ArrowRight />
        </button>
      </div>
      )}
    </div>
  );
};

export default PhotoDocumentSlider;
