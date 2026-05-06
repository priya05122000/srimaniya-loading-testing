import React, { Suspense } from "react";
import Header from "./components/Header";
import Table from "./components/Table";
import CourseList from "./components/CourseList";

export default function CoursesPage({ courses }: { courses: any[] }) {
    return (
        <div>
            <Header />
            <Table courses={courses} />
            <Suspense fallback={<div>Loading courses...</div>}>
                <CourseList courses={courses} />
            </Suspense>
        </div>
    );
}