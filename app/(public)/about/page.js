import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
    return (<>

        <div className="bg-light">
            <section className="py-5 "
                style={{ background: "linear-gradient(to right, #eff6ff, #dbeafe" }}
            >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 mb-4 mb-lg-0">
                            <h1 className="display-5 fw-bold mb-4">
                                TT's Education
                            </h1>
                            <p className="text-muted fs-5">
                                TT's Education is a premier online learning platform dedicated to empowering learners worldwide.
                                Our mission is to provide accessible, high-quality courses that equip students with practical skills
                                and knowledge required in today’s competitive environment. Through interactive lessons, real-world
                                projects, and guidance from experienced instructors, students can confidently develop expertise in
                                various fields, from programming and web development to design and digital marketing.
                            </p>
                        </div>

                        <div className="col-lg-5 text-center mt-5">

                            <div className=" rounded-4 ">
                                <Image
                                    src="/AboutPage.png"
                                    alt="TT's Education online learning platform"
                                    width={430}
                                    height={430}
                                    className="img-fluid rounded-4"
                                />

                            </div>
                        </div>
                    </div>

                </div>
            </section >


            <section className="py-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100 text-center border-0 shadow">
                                <div className="card-body">
                                    <h5 className="fw-bold mb-2">Our Mission</h5>
                                    <p className="text-muted">
                                        To deliver accessible, engaging, and practical online courses that empower learners to achieve their dreams.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card h-100 text-center border-0 shadow">
                                <div className="card-body">
                                    <h5 className="fw-bold mb-2">Our Vision</h5>
                                    <p className="text-muted">
                                        To be a global leader in online education, providing knowledge and skills that shape the future of learners worldwide.
                                    </p>
                                </div>

                            </div>
                        </div>


                        <div className="col-md-4">
                            <div className="card h-100 text-center border-0 shadow">
                                <div className="card-body">
                                    <h5 className="fw-bold mb-2">Our Values</h5>
                                    <p className="text-muted">
                                        Integrity, Excellence, Innovation, and Support in every learning experience we provide.
                                    </p>

                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </section>
        </div >

    </>);
}