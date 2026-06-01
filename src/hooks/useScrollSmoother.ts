"use client";

import { useEffect } from "react";

export function useScrollSmoother(
  smootherRef: React.RefObject<HTMLDivElement>
) {
  useEffect(() => {
    if (!smootherRef.current || window.innerWidth < 1024) return;
    let smoother: { kill: () => void } | null = null;
    (async () => {
      const gsap = (await import("gsap")).default;
      const { default: ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { default: ScrollSmoother } = await import("gsap/ScrollSmoother");
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
      const prev = ScrollSmoother.get();
      if (prev) prev.kill();
      smoother = ScrollSmoother.create({
        smooth: 4,
        effects: true,
        wrapper: smootherRef.current!,
        content: smootherRef.current!.querySelector(".smoother-content"),
      });
      ScrollTrigger.refresh();
    })();
    return () => smoother?.kill();
  }, [smootherRef]);
}
