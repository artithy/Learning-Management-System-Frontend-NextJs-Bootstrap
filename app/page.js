import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="btn btn-primary btn-lg">
        This is home page
      </div>
      <Footer />
    </>
  );
}
