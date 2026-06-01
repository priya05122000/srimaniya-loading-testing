import { useEffect } from "react";

interface FooterRevealProps {
  pathname: string;
  setShowOnlyFooter: React.Dispatch<React.SetStateAction<boolean>>;
  setFooterVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useFooterReveal({
  pathname,
  setShowOnlyFooter,
  setFooterVisible,
}: FooterRevealProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (
      window.innerWidth < 1024 ||
      pathname === "/" ||
      window.location.hash === "#enquire-form"
    ) {
      setShowOnlyFooter(false);
      setFooterVisible(true);
      return;
    }
    setShowOnlyFooter(true);
    setFooterVisible(false);
    const t1 = setTimeout(async () => {
      setFooterVisible(true);
      const { default: ScrollSmoother } = await import("gsap/ScrollSmoother");
      const footer = document.getElementById("footer");
      const smoother = ScrollSmoother.get();
      if (footer && smoother) {
        smoother.scrollTo(footer, false);
      } else if (footer) {
        footer.scrollIntoView({ behavior: "auto" });
      }
      setTimeout(() => {
        setShowOnlyFooter(false);
        setTimeout(async () => {
          const { default: ScrollSmoother2 } = await import("gsap/ScrollSmoother");
          const footer2 = document.getElementById("footer");
          const smoother2 = ScrollSmoother2.get();
          if (footer2 && smoother2) {
            smoother2.scrollTo(0, true);
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }, 10);
      }, 10);
    }, 10);
    return () => {
      if (t1) clearTimeout(t1);
    };
  }, [pathname, setShowOnlyFooter, setFooterVisible]);
}
