import { useEffect } from "react";
import ScrollSmoother from "gsap/ScrollSmoother";

interface FooterRevealProps {
  loading: boolean;
  pathname: string;
  setShowOnlyFooter: React.Dispatch<React.SetStateAction<boolean>>;
  setFooterVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useFooterReveal({
  loading,
  pathname,
  setShowOnlyFooter,
  setFooterVisible,
}: FooterRevealProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (loading) return;

    if (
      window.innerWidth < 1024 ||
      pathname === "/" ||
      loading ||
      window.location.hash === "#enquire-form"
    ) {
      setShowOnlyFooter(false);
      setFooterVisible(true);
      return;
    }
    setShowOnlyFooter(true);
    setFooterVisible(false);
    const t1 = setTimeout(() => {
      setFooterVisible(true);
      const footer = document.getElementById("footer");
      const smoother = ScrollSmoother.get();
      if (footer && smoother) {
        smoother.scrollTo(footer, false);
      } else if (footer) {
        footer.scrollIntoView({ behavior: "auto" });
      }
      setTimeout(() => {
        setShowOnlyFooter(false);
        setTimeout(() => {
          const footer2 = document.getElementById("footer");
          const smoother2 = ScrollSmoother.get();
          if (footer2 && smoother2) {
            smoother2.scrollTo(0, true);
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }, 100);
      }, 150);
    }, 150);
    return () => {
      if (t1) clearTimeout(t1);
    };
  }, [loading, pathname, setShowOnlyFooter, setFooterVisible]);
}
