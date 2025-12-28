"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function AdminSignup() {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.password) {
            return toast.error("please fill all the fields");
        }

        if (form.password.length < 6) {
            return toast.error("Password must be at least 6 characters")
        }

        try {
            const res = await fetch("http://127.0.0.1:8000/api/admin/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            localStorage.setItem("token", data.token);
            toast.success("Admin registered succcessfully");

            setTimeout(() => router.push("/admin/dashboard"), 1500);
        } catch {
            toast.error("Signup failed");
        }
    };

    return (
        <>
            <section className="min-vh-100 d-flex align-items-center justify-content-center " style={{ background: "linear-gradient(to bottom right, #b6dcff, #7fc8ff" }}>
                <div className="card shadow-lg p-4" style={{ maxWidth: 420, width: "100%" }}>
                    <h3 className="text-center text-primary fw-bold mb-4">Admin Signup</h3>
                    <form className="d-grid gap-3" onSubmit={handleSubmit}>
                        <input className="form-control" name="name" placeholder="Name" onChange={handleChange} />
                        <input className="form-control" name="email" placeholder="Email" onChange={handleChange} />
                        <input className="form-control" type="password" name="password" placeholder="Password" onChange={handleChange} />
                        <button className="btn btn-primary">Signup</button>
                    </form>

                    <p className="text-center mt-3">
                        Already registered? <Link href="/admin/login">Login</Link>

                    </p>

                </div>
                <ToastContainer />

            </section>
        </>
    )
}