"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CourseGrid({ showCategories = true, showEnrolledOnly = false }) {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const fetchCourses = async () => {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/courses/public");
            setCourses(await res.json());
        } catch {
            toast.error("Failed to load courses");
        }
    }

    const fetchCategories = async () => {
        if (!showCategories) return;
        try {
            const res = await fetch("http://127.0.0.1:8000/api/categories/public");
            setCategories(await res.json());
        } catch {
            toast.error("Failed to load categories");
        }
    }

    const fetchEnrolledCourses = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://127.0.0.1:8000/api/student/enrollments", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            const data = await res.json();
            setEnrolledCourses(data.enrollments.map(enrollment => enrollment.course_id));
        } catch {

        }
    }

    useEffect(() => {
        fetchCourses();
        fetchCategories();
        if (showEnrolledOnly) {
            fetchEnrolledCourses();
        }
    }, []);

    const handleError = async (course) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://127.0.0.1:8000/api/create_payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
                body: JSON.stringify({
                    course_id: course.id,
                    amount: course.discount_price || course.price,
                }),
            });
            const data = await res.json();
            if (data.payment_url) {
                window.location.href = data.payment_url;
            } else {
                toast.error("Payment Failed");
            }
        } catch {
            toast.error("something went wrong");
        }
    };

    const filteredCourses =
        selectedCategory === "All"
            ? courses
            : courses.filter(course => course.category?.name === selectedCategory);

    return (
        <>
            <div className="container py-5">
                <ToastContainer />
                {showCategories && (
                    <div className="mb-4 d-flex gap-2 flex-wrap">
                        <button
                            className={
                                `btn ${selectedCategory === "All"
                                    ? "btn-primary"
                                    : "btn-outline-primary"
                                }`
                            }
                            onClick={() => { setSelectedCategory("All") }}
                        >
                            All
                        </button>

                        {
                            categories.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`btn ${selectedCategory === cat.name
                                        ? "btn-primary"
                                        : "btn-outline-primary"
                                        }`}
                                    onClick={() => { setSelectedCategory(cat.name) }}
                                >
                                    {cat.name}
                                </button>
                            ))
                        }
                    </div>
                )}
            </div>

            <div className="row g-4">
                {filteredCourses.map(course => (
                    <div key={course.id} className="col-12 col-sm-6 col-md-3">
                        <div className="card h-100 shadow-sm">
                            {
                                course.image ? (
                                    <img
                                        src={`http://127.0.0.1:8000/${course.image}`}
                                        className="card-img-top"
                                        style={{ height: "180px", objectFit: "cover" }}
                                    />
                                ) : (
                                    <div className="bg-secondary text-white text-center p-5">
                                        No Image
                                    </div>
                                )}


                            <div className="card-body d-flex flex-column">
                                <h5>{course.title}</h5>
                                <p className="small text-muted">
                                    Category: {course.category?.name}
                                </p>
                                <p className="fw-bold">
                                    {course.discount_price ? (
                                        <>
                                            <span className="text-danger text-decoration-line-through me-2">
                                                ${course.price}
                                            </span>
                                            <span className="text-success">
                                                ${course.discount_price}
                                            </span>
                                        </>
                                    ) : (
                                        `$${course.price}`
                                    )}
                                </p>
                            </div>

                            <div className="mt-auto d-flex justify-content-between">
                                <Link
                                    href={`/courses/${course.id}`}
                                    className="btn btn-sm btn-primary"
                                >
                                    Details
                                </Link>

                                <Button
                                    onClick={() => handleError(course)}
                                    disabled={enrolledCourses.includes(course.id)}
                                    className="btn btn-sm btn-success">

                                    {enrolledCourses.includes(course.id)
                                        ? "Enrolled"
                                        : "Enroll"
                                    }

                                </Button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );

}