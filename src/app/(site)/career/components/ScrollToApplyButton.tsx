"use client";
import React from "react";
import { ArrowNarrowRight } from "@/components/icons/Icons";

const scrollToApplyNow = () => {
  const el = document.getElementById("apply-now-section");
  if (!el) return;
  const targetY = el.getBoundingClientRect().top + window.pageYOffset - 80;
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  const duration = 800;
  let startTime: number | null = null;

  function easeInOutQuad(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function animateScroll(currentTime: number) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutQuad(progress);
    window.scrollTo(0, startY + distance * ease);
    if (progress < 1) requestAnimationFrame(animateScroll);
  }

  requestAnimationFrame(animateScroll);
};

const ScrollToApplyButton: React.FC = () => (
  <button
    className="border-2 border-dark-custom rounded-full p-2 flex items-center justify-center transition-all duration-200 w-12 h-6 cursor-pointer"
    onClick={scrollToApplyNow}
    aria-label="Scroll to Apply Now"
  >
    <ArrowNarrowRight
      aria-label="Scroll to Apply Now"
      className="font-normal text-(--dark) text-2xl"
    />
  </button>
);

export default ScrollToApplyButton;
