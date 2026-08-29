"use client";
import React, { useRef } from "react";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";

interface HeadingAnimatorProps {
  children: React.ReactNode;
  /** CSS selector (scoped to this wrapper) for the first element to split-animate. */
  first: string;
  /** Optional CSS selector for a second element to split-animate. */
  second?: string;
  /** Stagger delay between first and second, in seconds. */
  delay?: number;
  enabled?: boolean;
  className?: string;
}

/**
 * Thin client wrapper that applies the GSAP SplitText heading animation to
 * server-rendered content. The text itself stays in a server component (so it
 * ships in the initial HTML); this only adds the on-scroll animation.
 */
const HeadingAnimator: React.FC<HeadingAnimatorProps> = ({
  children,
  first,
  second,
  delay = 0.3,
  enabled = true,
  className,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useSplitTextHeadingAnimation({
    trigger: () => ref.current,
    // Scope selectors to this wrapper so multiple instances don't collide.
    first: () => ref.current?.querySelector(first) ?? null,
    second: second
      ? () => ref.current?.querySelector(second) ?? null
      : undefined,
    delay,
    enabled,
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default HeadingAnimator;
