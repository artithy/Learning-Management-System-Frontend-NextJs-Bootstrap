"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function AddCourse() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [image, setImage] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [instructor, setInstructor] = useState("");
    const [totalLessons, setTotalLessons] = useState("");
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        const token = localStorage.getItem("token");
        if (!token) { return; }
        try {
            const res = await fetch("http://127.0.0.1:8000/api/categories", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const data = await res.json();
            setCategories(Array.isArray(data) ? data : []);
        } catch {
            toast.error("Failed to load Categories");
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result);
        reader.readAsDataURL(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !price || !categoryId) {
            return toast.error("Please fill required fields")
        }
        const token = localStorage.getItem("token");
        const payload = {
            title,
            description,
            price,
            discount_price: discountPrice,
            duration,
            image,
            category_id: categoryId,
            instructor_name: instructor,
            total_lessons: totalLessons,
        };

        try {
            const res = await fetch("http://127.0.0.1:8000/api/courses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            const data = await res.json();

            if (res.ok) {
                toast.success(data.message || "Course added successfully");

                setTitle("");
                setDescription("");
                setPrice("");
                setDiscountPrice("");
                setDuration("");
                setImage("");
                setCategoryId("");
                setInstructor("");
                setTotalLessons("");
            } else {
                toast.error("Failed to add course");
            }
        } catch {
            toast.error("Course creation failed");
        }
    };
    return (
        <>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="card shadow-lg p-4">
                            <h3 className="text-center text-primary fw-bold mb-4">
                                Add New Course
                            </h3>
                            <form onSubmit={handleSubmit} className="row g-4">

                                <div className="col-12">
                                    <label className="form-label">Course title <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={title}
                                        onChange={(e) => {
                                            setTitle(e.target.value)
                                        }}
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Course title</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={description}
                                        onChange={(e) => {
                                            setDescription(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Category <span className="text-danger">*</span></label>
                                    <select
                                        className="form-select"
                                        value={categoryId}
                                        onChange={(e) => setCategoryId(e.target.value)}
                                    >
                                        <option value="">
                                            Select Category
                                        </option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}

                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Price <span className="text-danger">*</span></label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label"> Discount Price </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={discountPrice}
                                        onChange={(e) => setDiscountPrice(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Duration</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Total Lessons</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={totalLessons}
                                        onChange={(e) => setTotalLessons(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Instructor Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={instructor}
                                        onChange={(e) => setInstructor(e.target.value)}
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="">Thumbnail</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={handleImageChange}
                                    />
                                    {
                                        image && (
                                            <img
                                                src={image}
                                                alt="preview"
                                                className="img-thumbnail mt-2"
                                                style={{ width: 180 }}
                                            />
                                        )
                                    }

                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary w-100">
                                        Add course
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <ToastContainer
                    position="top-right" autoClose={3000}
                />
            </div>
        </>

    );
}
