import 'bootstrap/dist/css/bootstrap.min.css';
export default function PublicLayout({ children }) {
    return (
        <>
            <html>
                <body>
                    {children}
                </body>
            </html>
        </>
    );
}
