"use client";
import CourseGrid from "@/components/courseGrid";

export default function StudentDashboard() {
    return (
        <>
            <div className="container-fluid bg-light min-vh-100 pt-4">
                <CourseGrid showCategories={true} showEnrolledOnly={true} />
            </div>
        </>
    );
}