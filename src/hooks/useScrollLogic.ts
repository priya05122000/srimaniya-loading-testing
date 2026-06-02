import { useEffect, useRef } from "react";

export function useScrollLogic(
  setScrollProgress: React.Dispatch<React.SetStateAction<number>>,
  setShowBackToTop: React.Dispatch<React.SetStateAction<boolean>>,
  setIsBlueSection: React.Dispatch<React.SetStateAction<boolean>>
) {
  const sectionsCacheRef = useRef<Element[]>([]);

  useEffect(() => {
    const cacheSections = () => {
      sectionsCacheRef.current = Array.from(
        document.querySelectorAll("[data-section]")
      );
    };

    // Cache after DOM settles, then re-cache on resize
    const cacheTimer = setTimeout(cacheSections, 500);
    window.addEventListener("resize", cacheSections, { passive: true });

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
        setShowBackToTop(scrollTop > 500);

        const buttonY = window.innerHeight - 80;
        const buttonX = window.innerWidth - 80;
        const onBlue = sectionsCacheRef.current.some((section) => {
          const rect = section.getBoundingClientRect();
          return (
            buttonX >= rect.left &&
            buttonX <= rect.right &&
            buttonY >= rect.top &&
            buttonY <= rect.bottom
          );
        });
        setIsBlueSection(onBlue);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      clearTimeout(cacheTimer);
      window.removeEventListener("resize", cacheSections);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [setScrollProgress, setShowBackToTop, setIsBlueSection]);
}
