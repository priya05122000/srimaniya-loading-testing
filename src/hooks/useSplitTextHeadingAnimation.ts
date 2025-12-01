import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

type UseSplitTextHeadingAnimationProps = {
  trigger: RefObject<HTMLElement | null> | string;
  first: string | RefObject<HTMLElement | null>;
  second?: string | RefObject<HTMLElement | null>;
  enabled?: boolean;
  delay?: number; // added for customization (default = 0.5s)
};

async function waitForFonts() {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }
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

    // Wait for refs to be attached
    const firstNode = typeof first === "string" ? document.querySelector(first) : first?.current;
    const secondNode = second ? (typeof second === "string" ? document.querySelector(second) : second?.current) : null;
    const triggerNode = typeof trigger === "string" ? document.querySelector(trigger) : trigger?.current;
    if (!firstNode || !triggerNode) return;

    mounted.current = true;

    let splitFirst: SplitText | null = null;
    let splitSecond: SplitText | null = null;
    let tl: gsap.core.Timeline | null = null;
    let st: ScrollTrigger | null = null;

    const run = async () => {
      await waitForFonts();
      if (!mounted.current) return;

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerNode,
          start: "top 85%",
          end: "bottom 0%",
          toggleActions: "play none none none",
        },
      });

      st = tl.scrollTrigger as ScrollTrigger;

      // FIRST TEXT
      if (firstNode) {
        const split = new SplitText(firstNode, { type: "lines", linesClass: "line" });
        splitFirst = split;
        tl.from(
          split.lines,
          {
            yPercent: 100,
            opacity: 0,
            duration: 2.5,
            ease: "expo.out",
            stagger: 0.15,
          },
          0
        );
      }

      // SECOND TEXT
      if (secondNode) {
        const split = new SplitText(secondNode, { type: "lines", linesClass: "line" });
        splitSecond = split;
        tl.from(
          split.lines,
          {
            yPercent: 100,
            opacity: 0,
            duration: 2.5,
            ease: "expo.out",
            stagger: 0.15,
          },
          delay // starts after custom delay
        );
      }
    };

    run();

    return () => {
      mounted.current = false;

      splitFirst?.revert();
      splitSecond?.revert();
      tl?.kill();
      st?.kill();
    };
    // rerun when enabled, delay, or DOM nodes change
  }, [enabled, delay, first, second, trigger, (typeof first === "string" ? undefined : first?.current), (typeof second === "string" ? undefined : second?.current), (typeof trigger === "string" ? undefined : trigger?.current)]);
}
