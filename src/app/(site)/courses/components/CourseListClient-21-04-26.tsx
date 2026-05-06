"use client";

import { useEffect } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const CourseListClient = ({ courses }: { courses: any[] }) => {

  const scrollToHash = () => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    let attempts = 0;

    const tryScroll = () => {
      const el = document.getElementById(`course-${hash}`);

      if (el) {
        const smoother = ScrollSmoother.get();

        if (smoother) {
          smoother.scrollTo(el, true, "top 80");
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else if (attempts < 10) {
        // 🔥 retry until element is ready
        attempts++;
        setTimeout(tryScroll, 100);
      }
    };

    tryScroll();
  };

  useEffect(() => {
    if (courses.length === 0) return;

    // ✅ initial load
    scrollToHash();

    // ❗ Next.js Link doesn't trigger properly → listen manually
    const onClick = () => {
      setTimeout(scrollToHash, 200);
    };

    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [courses]);

  return null;
};

export default CourseListClient;