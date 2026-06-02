
import React, { FC } from "react";
import Section from "@/components/common/Section";
import CourseListPaginated from "./CourseListPaginated";

interface Course {
  id: number;
  title: string;
  duration: string;
  description: string;
  opportunities: string;
  eligibility: string;
  syllabus: string;
}

const CourseList: FC<{ courses: Course[] }> = ({ courses }) => {
  return (
    <Section className="w-full relative">
      <CourseListPaginated courses={courses} />
    </Section>
  );
};

export default CourseList;
