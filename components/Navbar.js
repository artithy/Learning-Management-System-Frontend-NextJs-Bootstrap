"use client";
import { useState } from "react";
import Link from "next/link";
import { GraduationCap, graduationCap } from "lucide-react";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
                <div className="container">
                    <Link href="/" className="">
                        <GraduationCap className="" />
                        <span className="">TT's Education</span>
                    </Link>

                    <button className="navbar-toggler" type="button" onClick={() => setOpen(!open)}>
                        <span className="navbar-toggler-icon"></span>

                    </button>
                    <div className={`collapse navbar-collapse ${open ? 'show' : ''}`}>
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link href="/" className="nav-link">
                                    Home
                                </Link>

                            </li>

                            <li className="nav-item">
                                <Link href="/about" className="nav-link">
                                    About
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link href="/courses" className="nav-link">
                                    Courses
                                </Link>
                            </li>
                        </ul>

                        <div className="d-flex ms-lg--3">
                            <Link href="/student/login" className="btn btn-primary me-2">Login</Link>
                            <Link href="/student/register" className="btn btn-primary me-2">Signup</Link>

                        </div>


                    </div>

                </div>

            </nav>

        </>
    )
}