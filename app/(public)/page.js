import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="bg-light text-center py-5 mt-5">
        <h1 className="display-4 fw-4 mb-3">Start your learning journey</h1>
        <p className="lead mb-4">Explore a wide range of courses designed to help you achieve your goals</p>

        <Link href="/courses">
          <button className="btn btn-primary btn-lg">
            Explore Courses
          </button>
        </Link>
      </div>

      <div className="container py-5">
        <h2 className="mb-4 fw-bold">Featured Courses</h2>
      </div>

      <div
        className="text-dark text-center p-5 rounded-4 my-5 mx-auto"
        style={{ maxWidth: '900px', backgroundColor: '#cfe2f3' }}
      >
        <h2 className="fw-bold">TT's Education</h2>
        <p className="lead">
          TT's Education provides high-quality online courses that help learners achieve their goals.
          Our platform offers interactive lessons, practical projects, and expert guidance for skill development.
        </p>
        <Link href="/about">
          <button className="btn btn-light mt-3">
            Learn More About Us
          </button>
        </Link>
      </div>

    </>
  );
}
