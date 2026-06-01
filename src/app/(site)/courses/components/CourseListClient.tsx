"use client";

import { useEffect } from "react";

const CourseListClient = ({ courses }: { courses: any[] }) => {

  useEffect(() => {
    const course = sessionStorage.getItem("scrollToCourse");

    if (!course || courses.length === 0) return;

    let attempts = 0;

    const scrollToCourse = async () => {
      const el = document.getElementById(`course-${course}`);
      const { ScrollSmoother } = await import("gsap/ScrollSmoother");
      const smoother = ScrollSmoother.get();

      if (el && smoother) {
        smoother.scrollTo(el, true, "top 80");
        sessionStorage.removeItem("scrollToCourse");
      } else if (attempts < 50) {
        attempts++;
        setTimeout(scrollToCourse, 100);
      }
    };

    setTimeout(scrollToCourse, 500);

  }, [courses]);

  return null;
};

export default CourseListClient;