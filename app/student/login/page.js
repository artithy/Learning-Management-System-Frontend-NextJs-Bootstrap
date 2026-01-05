"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StudentSignup() {
    const router = useRouter();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            return toast.error("Please field all the fields");
        }

        try {
            const res = await fetch("http://127.0.0.1:8000/api/student/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            localStorage.setItem("token", data.token);
            localStorage.setItem("student_data", JSON.stringify(data.student));
            toast.success("Login successfully");


            setTimeout(() => router.push('/student-panel'), 1500)
        } catch {
            toast.error("Login Failed");
        }
    };

    return (
        <>
            <section className="min-vh-100 d-flex align-items-center justify-content-center mt-4" style={{ background: "linear-gradient(to bottom right, #b6dcff, #7fc8ff" }}>
                <div className="container">
                    <div className="row shadow-lg rounded-4 overflow-hidden bg-white">
                        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-primary p-4">
                            <Image
                                src="/studentLogin.png"
                                alt="Student Login Illustration"
                                width={400}
                                height={400}
                                className="img-fluid rounded-4"
                            />
                        </div>


                        <div className="col-md-6 p-4 mt-5">
                            <h3 className="text-center text-primary fw-bold text-primary">Student Signup </h3>
                            <form onSubmit={handleSubmit} className="d-grid gap-3">
                                <input className="form-control" name="email" placeholder="Enter your email" onChange={handleChange} />
                                <input className="form-control" type="password" name="password" placeholder="Enter your password" onChange={handleChange} />
                                <button className="btn btn-primary">Login</button>

                            </form>

                            <p className="text-center mt-3">
                                Don’t have an account? <Link href="/student/register">Signup</Link>
                            </p>

                        </div>

                    </div>

                </div>
                <ToastContainer />

            </section>

        </>
    )
}