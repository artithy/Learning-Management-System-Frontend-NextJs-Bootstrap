"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
export default function CategoryPage() {

    const [name, setName] = useState("");
    const [allCategories, setAllCategories] = useState([]);
    const [editId, setEditId] = useState(null);
    const [token, setToken] = useState(null);



    const fetchCategories = async () => {
        if (!token) return;

        const res = await fetch("http://127.0.0.1:8000/api/categories", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        setAllCategories(Array.isArray(data) ? data : []);
    };

    useEffect(() => {
        const t = localStorage.getItem("token");
        if (t) {
            setToken(t);
        }
    }, []);

    useEffect(() => {
        if (token) {
            fetchCategories();
        }
    }, [token]);




    const resetForm = () => {
        setEditId(null);
        setName("");
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!name) {
            return toast.error("Category name required");
        }
        if (allCategories.some(
            (cat) => cat.name.toLowerCase() === name.toLowerCase()
        )) {
            return toast.error("Category already exists");
        }
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name }),
            });
            if (res.ok) {
                toast.success("Category added successfully");
                resetForm();
                fetchCategories();
            } else {
                toast.error("Failed to save category");
            }
        } catch {
            toast.error("Failed to add categories");
        }
    };

    const updateCategory = async (e) => {
        e.preventDefault();
        if (!name || !editId) {
            return toast.error("Category name required");
        }
        try {
            await fetch(`http://127.0.0.1:8000/api/updateCategories/${editId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name }),
            });
            toast.success("Category updated successfully");
            resetForm();
            fetchCategories();
        } catch {
            toast.error("Failed to update categories");
        }
    }

    const deleteCategory = async (id) => {
        try {
            await fetch(`http://127.0.0.1:8000/api/deleteCategories/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Category deleted successfully");
            fetchCategories();
        } catch {
            toast.error("Failed to delete category");
        }
    }
    return (
        <>
            <div className="container py-4">
                <ToastContainer position="top-right" autoClose={3000} />
                <div className="card shadow-lg p-4">
                    <h3 className="fw-bold text-center text-primary mb-4">
                        {editId ? "Update Category" : "Add Category"}
                    </h3>
                    <form onSubmit={editId ? updateCategory : handleAdd} className="row g-2 mb-4">
                        <div className="col-md-8">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Category Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="col-md-4 d-flex gap-2">
                            <button className="btn btn-primary w-100">
                                {editId ? "Update" : "Add"}
                            </button>

                            {editId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="btn btn-secondary w-100"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>

                    <h5 className="fw-semibold mb-3 text-secondary">
                        All Categories
                    </h5>

                    {allCategories.length > 0 ? (
                        <ul className="list-group">
                            {allCategories.map((cat) => (
                                <li
                                    key={cat.id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <span className="fw-medium">
                                        {cat.name}
                                    </span>

                                    <div className="d-flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditId(cat.id);
                                                setName(cat.name);
                                            }}
                                            className="btn btn-sm btn-warning"
                                        >
                                            Edit
                                        </button>
                                        <button className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                deleteCategory(cat.id)
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>

                                </li>
                            ))}
                        </ul>
                    ) :
                        <p className="text-muted text-center py-4">No categories available</p>
                    }

                </div>
            </div >
        </>
    )
}