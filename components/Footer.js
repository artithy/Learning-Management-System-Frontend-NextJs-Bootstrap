import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <>
            <footer className="bg-dark text-white py-4 mt-5">
                <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <p className="mb-2 mb-md-0">&copy; 2025 TT's Education. All rights reserved.</p>
                    <div className="d-flex gap-3">
                        <Facebook size={20} className="text-white" />
                        <Twitter size={20} className="text-white" />
                        <Linkedin size={20} className="text-white" />
                        <Instagram size={20} className="text-white" />

                    </div>

                </div>
            </footer>
        </>
    );
}