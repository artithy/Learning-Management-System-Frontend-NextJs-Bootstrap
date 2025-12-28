import 'bootstrap/dist/css/bootstrap.min.css';
export default function AdminLayout({ children }) {
    return (
        <html>
            <body>
                {children}
            </body>
        </html>
    )
}