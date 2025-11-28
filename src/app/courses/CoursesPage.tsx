import React, { Suspense } from "react";
import Header from "./components/Header";
import Table from "./components/Table";
import CourseList from "./components/CourseList";

export default function CoursesPage() {
    return (
        <div>
            <Header />
            <Table />
            <Suspense fallback={<div>Loading courses...</div>}>
                <CourseList />
            </Suspense>
        </div>
    );
}
