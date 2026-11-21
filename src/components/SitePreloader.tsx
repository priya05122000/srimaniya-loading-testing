"use client";

import { useEffect, useRef, useState } from "react";
import GlobalLoader from "@/components/GlobalLoader";
import { isSiteRevealed, markSiteRevealed, PRELOADER_SEEN_KEY } from "@/lib/site-reveal";

// Show the loader at least this long so it doesn't just flash on fast loads.
const MIN_SHOW_MS = 2000;
// Never hold the site longer than this. The window "load" event can take 30s+
// (videos, maps, third-party scripts), so the loader always fades by 3 seconds.
const MAX_WAIT_MS = 3000;
const FADE_MS = 700;

/**
 * Full-screen first-load loader (same behaviour as the Beach Hotel site).
 * Server-rendered so it covers the page from the very first paint; the inline
 * boot script in app/layout.tsx decides whether it plays (first load this
 * session) or is hidden by CSS.
 *
 * Fades out once the page has fully loaded (window "load": images, fonts,
 * scripts) and the minimum time has passed — whichever is later.
 */
export default function SitePreloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"active" | "fading" | "done">("active");

  useEffect(() => {
    // Skipped this session — the boot script already hid it via CSS.
    if (isSiteRevealed()) {
      setPhase("done");
      return;
    }

    const overlay = overlayRef.current;
    let cancelled = false;

    // Keep the hidden page from scrolling underneath.
    const block = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    overlay?.addEventListener("wheel", block, { passive: false });
    overlay?.addEventListener("touchmove", block, { passive: false });

    const minTime = new Promise<void>((resolve) =>
      setTimeout(resolve, Math.max(0, MIN_SHOW_MS - performance.now()))
    );
    const pageReady = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });
    // Measured from page start, so slow JS loading doesn't add to the wait.
    const cap = new Promise<void>((resolve) =>
      setTimeout(resolve, Math.max(0, MAX_WAIT_MS - performance.now()))
    );

    Promise.race([Promise.all([minTime, pageReady]), cap]).then(() => {
      if (cancelled) return;

      if (!window.location.hash) window.scrollTo(0, 0);
      document.documentElement.classList.remove("preloading");
      try {
        sessionStorage.setItem(PRELOADER_SEEN_KEY, "1");
      } catch {
        // Storage blocked (private mode etc.) — loader just plays again next load.
      }
      setPhase("fading");
      // Fire now so heading animations play as the loader fades away.
      markSiteRevealed();
    });

    return () => {
      cancelled = true;
      overlay?.removeEventListener("wheel", block);
      overlay?.removeEventListener("touchmove", block);
    };
  }, []);

  useEffect(() => {
    if (phase !== "fading") return;
    const t = setTimeout(() => setPhase("done"), FADE_MS + 50);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      id="site-preloader"
      ref={overlayRef}
      aria-live="polite"
      role="status"
      aria-label="Loading"
      className={`fixed inset-0 z-9999 transition-opacity duration-700 ease-out ${
        phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <GlobalLoader />
    </div>
  );
}
