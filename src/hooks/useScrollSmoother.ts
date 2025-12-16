import { useEffect } from "react";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";

export function useScrollSmoother(
  loading: boolean,
  smootherRef: React.RefObject<HTMLDivElement>
) {
  useEffect(() => {
    if (!loading && smootherRef.current && window.innerWidth >= 1024) {
      const prevSmoother = ScrollSmoother.get();
      if (prevSmoother) prevSmoother.kill();
      const smoother = ScrollSmoother.create({
        smooth: 4,
        effects: true,
        wrapper: smootherRef.current,
        content: smootherRef.current.querySelector(".smoother-content"),
      });
      ScrollTrigger.refresh();
      return () => smoother.kill();
    }
  }, [loading, smootherRef]);
}
