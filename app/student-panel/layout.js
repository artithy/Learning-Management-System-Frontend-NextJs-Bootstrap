import StudentToper from "@/components/student/StudentToper";


export default function StudentPanelLayout({ children }) {
    return (
        <>
            <html>
                <body>
                    <StudentToper />
                    {children}
                </body>
            </html>
        </>
    );
}