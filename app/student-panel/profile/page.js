"use client";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StudentProfile() {
    const [student, setStudent] = useState(null);
    const [formData, setFormData] = useState({});
    const [editing, setEditing] = useState(false);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("please login again");
                return;
            }

            const res = await fetch("http://127.0.0.1:8000/api/student/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || "Failed to fetch profile");
                return;
            }
            setStudent(data.student);
            setFormData(data.student);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load profile");
        }
    };
    useEffect(() => {
        fetchProfile();
    }, []);

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://127.0.0.1:8000/api/student/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || "Failed to update profile");
                return;
            }
            setStudent(data.Student);
            setFormData(data.Student);

            setEditing(false);
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update profile");
        }
    };

    if (!student) {
        return <p className="text-center mt-5">Loading...</p>
    }

    return (
        <>
            <div className="container py-5">
                <ToastContainer position="top-right" autoClose={3000} />
                <div className="card shadow mx-auto" style={{ maxWidth: "600px" }}>
                    <div className="card-body">
                        <h3 className="card-title mb-4 fw-bold">My Profile</h3>
                        {["name", "phone", "address", "dob", "gender"].map((field) => (

                            <div className="mb-3" key={field}>
                                <label className="form-label text-capitalize fw-semibold">
                                    {field}
                                </label>
                                {editing ? (
                                    <input
                                        type={field === "dob" ? "date" : "text"}
                                        className="form-control"
                                        value={formData[field] || ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                [field]: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    <p className="form-control-plaintext">
                                        {student[field] || "N/A"}
                                    </p>
                                )}
                            </div>
                        ))}

                        <div className="">
                            {editing ? (
                                <button className="btn btn-success me-2" onClick={handleSave}>
                                    Save
                                </button>
                            ) : (
                                <button className="btn btn-primary" onClick={() => setEditing(true)}>
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}