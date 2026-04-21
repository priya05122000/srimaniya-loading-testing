"use client";

import { useEffect } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const CourseListClient = ({ courses }: { courses: any[] }) => {

  useEffect(() => {
    const course = sessionStorage.getItem("scrollToCourse");

    if (!course || courses.length === 0) return;

    let attempts = 0;

    const scrollToCourse = () => {
      const el = document.getElementById(`course-${course}`);
      const smoother = ScrollSmoother.get();

      if (el && smoother) {
        smoother.scrollTo(el, true, "top 80");

        // ✅ clear after use
        sessionStorage.removeItem("scrollToCourse");
      } else if (attempts < 50) {
        attempts++;
        setTimeout(scrollToCourse, 100);
      }
    };

    // 🔥 wait for full render + GSAP
    setTimeout(scrollToCourse, 500);

  }, [courses]);

  return null;
};

export default CourseListClient;