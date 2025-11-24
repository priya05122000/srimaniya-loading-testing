import { useEffect } from "react";
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
};

async function waitForFonts() {
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }
}

export function useSplitTextHeadingAnimation({
  trigger,
  first,
  second,
  enabled = true,
}: UseSplitTextHeadingAnimationProps) {
  useEffect(() => {
    if (!enabled) return;

    let splitFirst: SplitText | null = null;
    let splitSecond: SplitText | null = null;

    const runAnimation = async () => {
      await waitForFonts();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: typeof trigger === "string" ? trigger : trigger.current,
          start: "top 90%",
          toggleActions: "play reverse play reverse",
        },
      })

      // Animate first text
      if (first) {
        const split = new SplitText(
          typeof first === "string" ? first : first.current,
          { type: "lines, words", linesClass: "line" }
        );
        tl.from(split.lines, {
          yPercent: 100,
          opacity: 0,
          duration: 2.5,
          ease: "expo.out",
          stagger: 0.15,
        }, 0); // Start at time 0
        splitFirst = split;
      }

      // Animate second text after 2 seconds gap from first animation end
      if (second) {
        const split = new SplitText(
          typeof second === "string" ? second : second.current,
          { type: "lines, words", linesClass: "line" }
        );
        // First animation duration: 1.2s, gap: 2s, so start at 3.2s
        tl.from(split.lines, {
          yPercent: 100,
          opacity: 0,
          duration: 2.5,
          ease: "expo.out",
          stagger: 0.15,
        }, 0.5); // Start after first animation + 2s gap
        splitSecond = split;
      }
    };

    runAnimation();

    return () => {
      if (splitFirst) splitFirst.revert();
      if (splitSecond) splitSecond.revert();
    };
  }, [trigger, first, second, enabled]);
}