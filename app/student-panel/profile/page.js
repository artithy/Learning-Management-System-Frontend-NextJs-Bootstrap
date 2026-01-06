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
}