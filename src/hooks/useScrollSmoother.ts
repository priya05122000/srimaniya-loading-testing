"use client";

import { useEffect } from "react";

export function useScrollSmoother(
  smootherRef: React.RefObject<HTMLDivElement>
) {
  useEffect(() => {
    if (!smootherRef.current || window.innerWidth < 1024) return;
    let smoother: { kill: () => void } | null = null;
    let idleHandle: number | ReturnType<typeof setTimeout> | null = null;

    const init = async () => {
      if (!smootherRef.current) return;
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
    };

    if ("requestIdleCallback" in window) {
      idleHandle = requestIdleCallback(init, { timeout: 2000 });
    } else {
      idleHandle = setTimeout(init, 200);
    }

    return () => {
      if (idleHandle !== null) {
        if ("requestIdleCallback" in window) {
          cancelIdleCallback(idleHandle as number);
        } else {
          clearTimeout(idleHandle as ReturnType<typeof setTimeout>);
        }
      }
      smoother?.kill();
    };
  }, [smootherRef]);
}
