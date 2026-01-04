"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, User, LayoutDashboard, BookOpen } from "lucide-react";

export default function StudentTopber() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/student/login");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow fixed-top">
                <div className="container-fluid">
                    <button
                        className="btn btn-primary fw-semibold d-flex align-items-center gap-2 "
                        onClick={() => router.push("/student/dashboard")}
                    >
                        <LayoutDashboard size={20} />
                        <span className="d-none d-md-inline">Student Dashboard</span>
                    </button>

                    <div className="ms-auto position-relative">
                        <button
                            className="btn btn-light rounded-circle p-1"
                            onClick={() => setOpen(!open)}
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/219/219969.png"
                                alt="profile"
                                width="36"
                                height="36"
                                className="rounded-circle"
                            />
                        </button>

                        {open && (
                            <div className="position-absolute end-0 mt-2 bg-white shadow rounded-3 p-2"
                                style={{ width: "200px", zIndex: 1000 }}>

                                <button
                                    className="dropdown-item d-flex align-items-center gap-2"
                                    onClick={() => router.push("/student/profile")}
                                >
                                    <User size={18} />

                                </button>

                                <hr className="my-2" />

                                <button
                                    className="dropdown-item d-flex align-items-center gap-2 text-danger"
                                    onClick={handleLogout}
                                >
                                    <LogOut size={18} />

                                </button>
                            </div>
                        )}

                    </div>

                </div>

            </nav>
        </>
    )
}