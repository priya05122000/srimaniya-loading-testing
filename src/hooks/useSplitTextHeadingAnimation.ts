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
          trigger: typeof trigger === "string" ? trigger : trigger.current,
          start: "top 85%",
          end: "bottom 0%",
          toggleActions: "play none none none",
          // toggleActions: "play reverse play reverse",
        },
      });

      st = tl.scrollTrigger as ScrollTrigger;

      // FIRST TEXT
      if (first) {
        const split = new SplitText(
          typeof first === "string" ? first : first.current,
          { type: "lines", linesClass: "line" }
        );
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
      if (second) {
        const split = new SplitText(
          typeof second === "string" ? second : second.current,
          { type: "lines, words", linesClass: "line" }
        );
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

    // only rerun when enabled changes
  }, [enabled, delay]);
}
