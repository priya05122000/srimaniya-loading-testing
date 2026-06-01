import { useEffect } from "react";

export function useScrollLogic(
  setScrollProgress: React.Dispatch<React.SetStateAction<number>>,
  setShowBackToTop: React.Dispatch<React.SetStateAction<boolean>>,
  setIsBlueSection: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
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

        const blueSections = document.querySelectorAll("[data-section]");
        const buttonY = window.innerHeight - 80;
        const buttonX = window.innerWidth - 80;
        const onBlue = Array.from(blueSections).some((section) => {
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
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [setScrollProgress, setShowBackToTop, setIsBlueSection]);
}
