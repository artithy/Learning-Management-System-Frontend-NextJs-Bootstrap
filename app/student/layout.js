import Navbar from '@/components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function StudentLayout({ children }) {
    return (
        <html>
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    )
}