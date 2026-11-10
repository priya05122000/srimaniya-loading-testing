"use client";

import React, { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

/* ------------------------------------------------------------------ */
/* pdf.js loading (client only, lazy, shared between all previews)     */
/* ------------------------------------------------------------------ */

let pdfjsPromise: Promise<typeof import("pdfjs-dist")> | null = null;

const loadPdfjs = () => {
  if (!pdfjsPromise) {
    pdfjsPromise = import("pdfjs-dist").then((pdfjs) => {
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url
      ).toString();
      return pdfjs;
    });
  }
  return pdfjsPromise;
};

// One download per URL: the card thumbnail and the viewer reuse it.
const documentCache = new Map<string, Promise<PDFDocumentProxy>>();

const loadDocument = (url: string) => {
  let cached = documentCache.get(url);
  if (!cached) {
    cached = loadPdfjs()
      .then((pdfjs) => pdfjs.getDocument({ url }).promise)
      .catch((error) => {
        documentCache.delete(url);
        throw error;
      });
    documentCache.set(url, cached);
  }
  return cached;
};

// Keep canvases within what mobile browsers can allocate.
const MAX_CANVAS_SIDE = 4096;

/* ------------------------------------------------------------------ */
/* Single page                                                         */
/* ------------------------------------------------------------------ */

type PageProps = {
  doc: PDFDocumentProxy;
  pageNumber: number;
  boxWidth: number;
  boxHeight: number;
  fit: "width" | "contain";
  zoom: number;
};

const PdfPage: React.FC<PageProps> = ({
  doc,
  pageNumber,
  boxWidth,
  boxHeight,
  fit,
  zoom,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    let renderTask: { cancel: () => void; promise: Promise<void> } | null = null;

    const render = async () => {
      const page = await doc.getPage(pageNumber);
      if (cancelled || !canvasRef.current) return;

      const base = page.getViewport({ scale: 1 });
      let cssScale = boxWidth / base.width;
      if (fit === "contain" && boxHeight > 0) {
        cssScale = Math.min(cssScale, boxHeight / base.height);
      }
      cssScale *= zoom;

      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      let renderScale = cssScale * dpr;
      const largestSide = Math.max(base.width, base.height) * renderScale;
      if (largestSide > MAX_CANVAS_SIDE) {
        renderScale *= MAX_CANVAS_SIDE / largestSide;
      }

      const viewport = page.getViewport({ scale: renderScale });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = `${Math.floor(base.width * cssScale)}px`;
      canvas.style.height = `${Math.floor(base.height * cssScale)}px`;

      renderTask = page.render({ canvasContext: context, viewport });
      try {
        await renderTask.promise;
      } catch {
        // Render cancelled (zoom / resize / unmount) — ignore.
      }
    };

    render().catch(() => {
      /* page failed — parent shows the fallback on document errors */
    });

    return () => {
      cancelled = true;
      renderTask?.cancel();
    };
  }, [doc, pageNumber, boxWidth, boxHeight, fit, zoom]);

  return <canvas ref={canvasRef} className="block mx-auto bg-white shadow-sm" />;
};

/* ------------------------------------------------------------------ */
/* Preview                                                             */
/* ------------------------------------------------------------------ */

type PdfPreviewProps = {
  url: string;
  /** "first" for thumbnails, "all" for the full viewer. */
  pages?: "first" | "all";
  /** "contain" fits the whole page inside the box; "width" fills the width. */
  fit?: "width" | "contain";
  /** Multiplier on top of the fitted size (viewer zoom). */
  zoom?: number;
  className?: string;
  /** Shown while loading and when the PDF cannot be rendered. */
  fallback?: React.ReactNode;
};

const PdfPreview: React.FC<PdfPreviewProps> = ({
  url,
  pages = "first",
  fit = "width",
  zoom = 1,
  className = "",
  fallback = null,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [failed, setFailed] = useState(false);
  const [box, setBox] = useState({ width: 0, height: 0 });

  // Only start loading once the preview is close to the viewport.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Track the box size so pages are rendered sharp at the displayed size.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const update = () =>
      setBox({ width: node.clientWidth, height: node.clientHeight });
    update();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let active = true;
    setFailed(false);
    loadDocument(url)
      .then((loaded) => active && setDoc(loaded))
      .catch(() => active && setFailed(true));
    return () => {
      active = false;
    };
  }, [isVisible, url]);

  const pageNumbers = doc
    ? pages === "all"
      ? Array.from({ length: doc.numPages }, (_, i) => i + 1)
      : [1]
    : [];

  // In "width" mode the page decides the height; "contain" needs a sized box.
  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {doc && box.width > 0 && !failed ? (
        <div
          className={`flex flex-col gap-3 ${
            fit === "contain" ? "h-full items-center justify-center" : ""
          }`}
        >
          {pageNumbers.map((pageNumber) => (
            <PdfPage
              key={pageNumber}
              doc={doc}
              pageNumber={pageNumber}
              boxWidth={box.width}
              boxHeight={box.height}
              fit={fit}
              zoom={zoom}
            />
          ))}
        </div>
      ) : (
        fallback
      )}
    </div>
  );
};

export default PdfPreview;
