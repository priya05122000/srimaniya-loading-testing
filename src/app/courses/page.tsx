import type { Metadata } from "next";
import CoursesPage from "./CoursesPage";
import { getAllCourses } from "@/services/courseService";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://srimaniyainstitute.in";

const slugToTitle = (slug?: string) => {
  if (!slug) return null;
  return slug
    .replace(/-/g, " ")
    .replace(/\band\b/g, "&")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const courseParam = params.course;

  const slug =
    typeof courseParam === "string"
      ? courseParam
      : Array.isArray(courseParam)
        ? courseParam[0]
        : undefined;

  const readableTitle = slugToTitle(slug);

  const canonical = slug
    ? `${BASE_URL}/courses?course=${slug}`
    : `${BASE_URL}/courses`;

  return {
    alternates: { canonical },
    title: readableTitle
      ? `${readableTitle} Course | Sri Maniya Institute`
      : "Apply Online Hotel Management Courses | Sri Maniya Institute",
    description:
      "Explore Sri Maniya hospitality courses offering hands-on hotel management training, expert faculty guidance, and industry-ready skills for strong careers.",
  };
}

export default async function Page() {
  const result = await getAllCourses(); // ✅ SSR FETCH
  const courses = result?.data || [];

  return <CoursesPage courses={courses} />;
}