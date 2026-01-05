"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StudentMyEnrollment() {
    const [enrollments, setEnrollments] = useState([]);

    const fetchEnrollments = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("please login again");
                return;
            }
            const res = await fetch("http://127.0.0.1:8000/api/student/enrollments", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || "Failed to fetch enrollments");
            }
            setEnrollments(data.enrollments || []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch enrollments");
        }
    }

    useEffect(() => {
        fetchEnrollments();
    }, []);

    return (
        <>
            <div className="container py-4">
                <ToastContainer position="top-right" autoClose={3000} />
                <h2 className="fw-bold mb-4">My Enrollments</h2>
                {enrollments.length > 0 ? (
                    <div className="row g-4">
                        {enrollments.map((enroll) => (
                            <div key={enroll.id} className="col-12 col-sm-6 col-md-4">
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src={enroll.course?.image
                                            ? `http://127.0.0.1:8000/${enroll.course.image}`
                                            : "/no-image.png"}
                                        className="card-img-top"
                                        style={{ height: "180px", objectFit: "cover" }}
                                        alt={enroll.course?.title || "Course"}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {enroll.course?.title}
                                        </h5>
                                        <p className="text-muted mb-1">
                                            Instructor:{" "}
                                            {enroll.course?.instructor?.name || "N/A"}
                                        </p>
                                        <p className="fw-bold mb-1">
                                            ${enroll.course?.discount_price ??
                                                enroll.course?.price}
                                        </p>
                                        <span className="badge bg-success">
                                            {enroll.payment_status}
                                        </span>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted">
                        You have not enrolled in any courses yet.
                    </p>
                )}

            </div>
        </>
    );
}
