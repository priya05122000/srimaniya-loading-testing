import { useEffect } from "react";

interface FooterRevealProps {
  pathname: string;
  setShowOnlyFooter: React.Dispatch<React.SetStateAction<boolean>>;
  setFooterVisible: React.Dispatch<React.SetStateAction<boolean>>;
  suppressRef: React.RefObject<boolean>;
}

export function useFooterReveal({
  pathname,
  setShowOnlyFooter,
  setFooterVisible,
  suppressRef,
}: FooterRevealProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (
      window.innerWidth < 1024 ||
      pathname === "/" ||
      window.location.hash === "#enquire-form"
    ) {
      suppressRef.current = false;
      setShowOnlyFooter(false);
      setFooterVisible(true);
      return;
    }
    suppressRef.current = true;
    setFooterVisible(true);
    setShowOnlyFooter(true);
    const t1 = setTimeout(async () => {
      const { default: ScrollSmoother } = await import("gsap/ScrollSmoother");
      const footer = document.getElementById("footer");
      const smoother = ScrollSmoother.get();
      if (footer && smoother) {
        smoother.scrollTo(footer, false);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setShowOnlyFooter(false);
            smoother.scrollTo(0, true);
            setTimeout(() => {
              suppressRef.current = false;
            }, 1000);
          });
        });
      } else if (footer) {
        footer.scrollIntoView({ behavior: "auto" });
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setShowOnlyFooter(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => {
              suppressRef.current = false;
            }, 600);
          });
        });
      }
    }, 50);
    return () => {
      clearTimeout(t1);
      suppressRef.current = false;
    };
  }, [pathname, setShowOnlyFooter, setFooterVisible, suppressRef]);
}
