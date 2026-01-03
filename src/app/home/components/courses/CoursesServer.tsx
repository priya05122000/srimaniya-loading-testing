import { getAllCourses } from "@/services/courseService";
import CoursesClient from "./CoursesClient";

export default async function Courses() {
  const result = await getAllCourses();
  const courses = Array.isArray(result?.data) ? result.data : [];

  if (!courses.length) return null;

  return <CoursesClient courses={courses} />;
}
