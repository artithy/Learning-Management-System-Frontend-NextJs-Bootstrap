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
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        dob: "",
        gender: ""
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password || !form.phone || !form.address || !form.dob) {
            return toast.error("Please field all the fields");
        }
        if (form.password.length < 6) {
            return toast.error("Password must be at least 6 characters long");
        }

        try {
            const res = await fetch("http://127.0.0.1:8000/api/student/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            localStorage.setItem("token", data.token);
            toast.success("Student registered successfully");
            setTimeout(() => router.push('/student/dashboard'), 1500)
        } catch {
            toast.error("Signup Failed");
        }
    };

    return (
        <>
            <section className="min-vh-100 d-flex align-items-center justify-content-center mt-4" style={{ background: "linear-gradient(to bottom right, #b6dcff, #7fc8ff" }}>
                <div className="container">
                    <div className="row shadow-lg rounded-4 overflow-hidden bg-white">
                        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-primary">
                            <Image
                                src="/studentSignup.png"
                                alt="Student Signup"
                                width={400}
                                height={400}
                                className="img-fluid rounded-4"
                            />
                        </div>

                        <div className="col-md-6 p-4">
                            <h3 className="text-center text-primary fw-bold text-primary">Student Signup </h3>
                            <form onSubmit={handleSubmit} className="d-grid gap-3">
                                <input className="form-control" name="name" placeholder="Enter your name" onChange={handleChange} />
                                <input className="form-control" name="email" placeholder="Enter your email" onChange={handleChange} />
                                <input className="form-control" type="password" name="password" placeholder="Enter your password" onChange={handleChange} />
                                <input className="form-control" name="phone" placeholder="Enter your mobile number" onChange={handleChange} />
                                <input className="form-control" name="address" placeholder="Enter your address" onChange={handleChange} />
                                <input className="form-control" type="date" name="dob" placeholder="Enter your Birth date" onChange={handleChange} />

                                <select className="form-select" name="gender" onChange={handleChange}>
                                    <option value="">
                                        Select Gender
                                    </option>

                                    <option value="male">
                                        Male
                                    </option>

                                    <option value="female">
                                        Female
                                    </option>

                                    <option value="other">
                                        Other
                                    </option>

                                </select>

                                <button className="btn btn-primary">Signup</button>

                            </form>

                            <p className="text-center mt-3">
                                Already registered? <Link href="/student/login">Login</Link>
                            </p>

                        </div>

                    </div>

                </div>
                <ToastContainer />

            </section>

        </>
    )
}