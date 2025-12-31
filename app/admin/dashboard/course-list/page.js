"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CourseList() {
    const [courses, setCourses] = useState([]);
    const fetchCourses = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://127.0.0.1:8000/api/courses", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const data = await res.json();
            setCourses(Array.isArray(data) ? data : []);
        } catch {
            toast.error("Failed to fetch course")
        }
    }
    useEffect(() => {
        fetchCourses();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure want to delete this course?")) { return; }
        try {
            const token = localStorage.getItem("token");
            await fetch(`http://127.0.0.1:8000/api/deleteCourses/${id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Course deleted successfully");
            fetchCourses();
        } catch {
            toast.error("Failed to delete course");
        }
    }

    return (
        <>
            <div className="container py-4">
                <ToastContainer position="top-right" autoClose={3000} />
                <h3 className="text-center text-primary fw-bold mb-4">
                    Course List
                </h3>

                <div className="d-none d-md-block table-responsive">
                    <table className="table table-bordered table-hover align-middle">
                        <thead className="table-primary text-center">
                            <tr>
                                <th>Table</th>
                                <th>Instructor</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Lessons</th>
                                <th>Duration</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {courses.length > 0 ? (
                                courses.map((course) => (
                                    <tr key={course.id}>
                                        <td>{course.title}</td>
                                        <td>{course.instructor_name || "-"}</td>
                                        <td>{course.category?.name || "-"}</td>
                                        <td>{course.price}</td>
                                        <td>{course.total_lessons}</td>
                                        <td>{course.duration}</td>
                                        <td className="text-center">
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(course.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center text-muted py-4">
                                        No courses available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>

                <div className="d-md-none">
                    {
                        courses.length > 0 ? (
                            courses.map((course) => (
                                <div className="card mb-3 shadow-sm" key={course.id}>
                                    <div className="card-body">
                                        <h5 className="fw-bold text-primary">
                                            {course.title}
                                        </h5>
                                        <p className="mb-1">
                                            <strong>Instructor:</strong>{" "}
                                            {course.instructor_name || "-"}
                                        </p>
                                        <p className="mb-1">
                                            <strong>Category:</strong>{" "}
                                            {course.category?.name || "-"}
                                        </p>
                                        <p className="mb-1">
                                            <strong>Price:</strong> {course.price}
                                        </p>
                                        <p className="mb-1">
                                            <strong>Lessons:</strong>{" "}
                                            {course.total_lessons}
                                        </p>
                                        <p className="mb-1">
                                            <strong>Duration:</strong>{" "}
                                            {course.duration}
                                        </p>

                                        <button
                                            onClick={() => handleDelete(course.id)}
                                            className="btn btn-danger btn-sm w-100"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted">
                                No course available
                            </p>
                        )
                    }

                </div>
            </div >
        </>
    );
}