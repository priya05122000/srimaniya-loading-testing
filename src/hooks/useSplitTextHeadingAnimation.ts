import { useEffect, useRef } from "react";
import { RefObject } from "react";

type NodeGetter = () => Element | null;
type NodeSource = string | RefObject<HTMLElement | null> | NodeGetter;

type UseSplitTextHeadingAnimationProps = {
  trigger: NodeSource;
  first: NodeSource;
  second?: NodeSource;
  enabled?: boolean;
  delay?: number;
};

const resolveNode = (source?: NodeSource): Element | null => {
  if (!source) return null;
  if (typeof source === "string") return document.querySelector(source);
  if (typeof source === "function") return source();
  return source.current ?? null;
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

    const firstNode = resolveNode(first);
    const secondNode = resolveNode(second);
    const triggerNode = resolveNode(trigger);

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

    setup();

    return () => {
      mounted.current = false;
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
    typeof first === "string" || typeof first === "function" ? undefined : first?.current,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    typeof second === "string" || typeof second === "function" ? undefined : second?.current,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    typeof trigger === "string" || typeof trigger === "function" ? undefined : trigger?.current,
  ]);
}