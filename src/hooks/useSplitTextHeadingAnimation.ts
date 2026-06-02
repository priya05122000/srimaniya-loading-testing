import { useEffect, useRef } from "react";
import { RefObject } from "react";

type UseSplitTextHeadingAnimationProps = {
  trigger: RefObject<HTMLElement | null> | string;
  first: string | RefObject<HTMLElement | null>;
  second?: string | RefObject<HTMLElement | null>;
  enabled?: boolean;
  delay?: number;
};

async function waitForFonts() {
  if (document.fonts?.ready) await document.fonts.ready;
}

export function useSplitTextHeadingAnimation({
  trigger,
  first,
  second,
  enabled = true,
  delay = 0.5,
}: UseSplitTextHeadingAnimationProps) {
  const mounted = useRef(true);

  useEffect(() => {
    if (!enabled) return;

    const firstNode = typeof first === "string" ? document.querySelector(first) : first?.current;
    const secondNode = second
      ? typeof second === "string"
        ? document.querySelector(second)
        : second?.current
      : null;
    const triggerNode =
      typeof trigger === "string" ? document.querySelector(trigger) : trigger?.current;

    if (!firstNode || !triggerNode) return;

    mounted.current = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let stInstance: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let splitFirst: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let splitSecond: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let tl: any = null;

    const setup = async () => {
      await waitForFonts();
      if (!mounted.current) return;

      const { default: gsap } = await import("gsap");
      const { SplitText } = await import("gsap/SplitText");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(SplitText, ScrollTrigger);

      // Defer SplitText layout work until the element actually enters the viewport.
      // Previously, new SplitText() ran immediately on mount for every component,
      // forcing 25+ simultaneous layout reflows.
      stInstance = ScrollTrigger.create({
        trigger: triggerNode,
        start: "top 85%",
        once: true,
        onEnter: () => {
          if (!mounted.current) return;

          tl = gsap.timeline({
            onComplete: () => {
              splitFirst?.revert();
              splitSecond?.revert();
            },
          });

          if (firstNode) {
            splitFirst = new SplitText(firstNode, { type: "lines", linesClass: "line" });
            tl.from(splitFirst.lines, {
              yPercent: 100,
              opacity: 0,
              duration: 2.5,
              ease: "expo.out",
              stagger: 0.15,
            }, 0);
          }

          if (secondNode) {
            splitSecond = new SplitText(secondNode, { type: "lines", linesClass: "line" });
            tl.from(splitSecond.lines, {
              yPercent: 100,
              opacity: 0,
              duration: 2.5,
              ease: "expo.out",
              stagger: 0.15,
            }, delay);
          }
        },
      });
    };

    let idleHandle: number | ReturnType<typeof setTimeout> | null = null;

    if ("requestIdleCallback" in window) {
      idleHandle = requestIdleCallback(setup, { timeout: 2000 });
    } else {
      idleHandle = setTimeout(setup, 200);
    }

    return () => {
      mounted.current = false;
      if (idleHandle !== null) {
        if ("requestIdleCallback" in window) {
          cancelIdleCallback(idleHandle as number);
        } else {
          clearTimeout(idleHandle as ReturnType<typeof setTimeout>);
        }
      }
      splitFirst?.revert();
      splitSecond?.revert();
      tl?.kill();
      stInstance?.kill();
    };
  }, [
    enabled,
    delay,
    first,
    second,
    trigger,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    typeof first === "string" ? undefined : first?.current,
    typeof second === "string" ? undefined : second?.current,
    typeof trigger === "string" ? undefined : trigger?.current,
  ]);
}
