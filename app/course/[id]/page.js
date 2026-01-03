"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CoursePage({ params }) {
    const { id } = useParams();
    const router = useRouter();
    const [course, setCourse] = useState(null);

    const fetchCourse = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/courses/${id}`);
            const data = await res.json();
            setCourse(data);
        } catch {
            toast.error("Failed to fetch course data.");
        }
    }

    useEffect(() => {
        if (id) {
            fetchCourse();
        }
    }, [id]);

    const handleEnroll = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.warning("You must login as a student to make payment");
            router.push("/student/login");
            return;
        }

        try {
            const res = await fetch("http://127.0.0.1:8000/api/create_payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
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
                toast.error("Payment failed");
            }
        } catch {
            toast.error("Something went wrong");
        }
    };


    if (!course) {
        return (
            <>
                <div className="text-center mt-10 text-muted fs-5">
                    Loading Course...
                </div>
            </>
        )
    }

    return (
        <>
            <div className="container py-5 mt-5">
                <ToastContainer position="top-right" autoClose={3000} />
                <div className="row bg-white shadow rounded p-4 g-4">

                    <div className="col-12 col-md-6 text-center">
                        {course.image ? (
                            <img
                                src={`http://127.0.0.1:8000/${course.image}`}
                                alt={course.title}
                                className="img-fluid rounded"
                                style={{ maxHeight: "400px", objectFit: "cover" }}
                            />
                        ) : (
                            <div className="bg-secondary text-white p-5 rounded">No Image</div>
                        )}
                    </div>

                    <div className="col-12 col-md-6 d-flex flex-column justify-content-between">
                        <div>
                            <h2 className="fw-bold mb-3">{course.title}</h2>
                            <p className="fw-semibold">
                                Instructor: {course.instructor_name}
                            </p>
                            <p className="text-muted">
                                Category: {course.category?.name || "N/A"}
                            </p>
                            <h4 className="mb-3">
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
                            </h4>
                            <h5 className="mt-4">Course Description:</h5>
                            <p className="text-muted">
                                {course.description || "No description available."}
                            </p>

                            {course.duration && (
                                <p>
                                    <strong>Duration:</strong> {course.duration}
                                </p>
                            )}

                            {course.total_lessons && (
                                <p>
                                    <strong>Total Lessons:</strong> {course.total_lessons}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                        <button
                            className="btn btn-success px-4 py-2"
                            onClick={handleEnroll}
                        >
                            Enroll Now
                        </button>


                        <button className="btn btn-secondary px-4 py-2"
                            onClick={() => { router.back() }}>
                            Go Back

                        </button>
                    </div>

                </div>

            </div>
        </>
    )
}