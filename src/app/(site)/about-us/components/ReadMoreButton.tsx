"use client";
import React from "react";

/**
 * Nudges the scrollable story container down by one line. Targets the
 * server-rendered `.our-story-scroll` element so the story text can stay
 * in a server component.
 */
const ReadMoreButton: React.FC = () => {
  const handleReadMore = () => {
    const el = document.querySelector<HTMLElement>(".our-story-scroll");
    if (!el) return;
    const lineHeight = parseInt(getComputedStyle(el).lineHeight) || 24;
    el.scrollBy({ top: lineHeight, behavior: "smooth" });
  };

  return (
    <button
      className="text-end italic underline cursor-pointer hidden sm:block"
      onClick={handleReadMore}
      type="button"
    >
      Read More
    </button>
  );
};

export default ReadMoreButton;
