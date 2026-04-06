"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ScrollSmoother } from "gsap/ScrollSmoother";

interface Course {
  id: number;
  title: string;
}

const CourseListClient = ({ courses }: { courses: Course[] }) => {

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!searchParams || courses.length === 0) return;

    const targetId = searchParams.get("course");
    if (!targetId) return;

    const createSlug = (text: string) =>
      text.toLowerCase().trim().replace(/&/g, "and").replace(/\+/g, "").replace(/\s+/g, "-");

    const validSlugs = courses.map((c) => createSlug(c.title));

    if (!validSlugs.includes(targetId)) {
      router.replace("/courses");
      return;
    }

    const timer = setTimeout(() => {
      const targetElement = document.getElementById(`course-${targetId}`);
      if (!targetElement) return;
      if (window.innerWidth >= 768) {
        const smoother = ScrollSmoother.get();
        if (smoother) {
          smoother.scrollTo(targetElement, true, "top 80");
        } else {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        const elementY = targetElement.getBoundingClientRect().top + window.scrollY;
        const headerOffset = 80;
        window.scrollTo({ top: elementY - headerOffset, behavior: "smooth" });
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [courses, searchParams]);

  return null
}

export default CourseListClient
