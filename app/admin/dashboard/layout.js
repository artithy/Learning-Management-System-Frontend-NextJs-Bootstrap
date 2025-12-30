"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboardLayout({ children }) {
    const router = useRouter();
    const logout = () => {
        localStorage.removeItem("token");
        router.push("/admin/login");
        alert("Logout successful");
    }

    return (
        <>
            <div className="d-flex min-vh-100 bg-light">
                <aside className="bg-white shadow p-4" style={{ width: 260 }}>
                    <h4 className="fw-bold text-primary mb-4">
                        Admin Panel
                    </h4>

                    <nav className="nav flex-column gap-2">
                        <Link className="nav-link" href="/admin/dashboard">Dashboard Home</Link>
                        <Link className="nav-link" href="/admin/dashboard/category">Add Category</Link>
                        <Link className="nav-link" href="/admin/dashboard/add-course">Add Course</Link>
                        <Link className="nav-link" href="/admin/dashboard/course-list">All Courses</Link>
                        <Link className="nav-link" href="/admin/dashboard/enrollments">All Enrollments</Link>

                    </nav>

                    <button className="btn btn-danger w-100 mt-4" onClick={logout}>
                        Logout
                    </button>
                </aside>

                <main className="flex-grow-1 p-4">
                    {children}
                </main>
            </div>

        </>
    )
}