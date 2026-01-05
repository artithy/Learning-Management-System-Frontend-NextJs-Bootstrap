"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentTopber from "@/components/student/StudentTopber";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function StudentPanelLayout({ children }) {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/student/login");
        }
    }, [router]);

    return (
        <>
            <html>
                <body>
                    <StudentTopber />
                    <main className="pt-5">{children}</main>
                </body>
            </html>
        </>
    );
}