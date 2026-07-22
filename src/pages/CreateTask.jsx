import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createTask, updateTask } from "../services/taskService";
import Navbar from "../components/Navbar";

const CreateTask = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const task = state;

    const [formData, setFormData] = useState({
        title: task?.title || "",
        description: task?.description || "",
        status: task?.status || "Pending",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            if (task) {
                await updateTask(task.id, formData);
            } else {
                await createTask(formData);
            }

            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">
                <div className="card shadow">
                    <div className="card-body">

                        <h3 className="mb-4">
                            {task ? "Edit Task" : "Create Task"}
                        </h3>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Status</label>
                                <select
                                    name="status"
                                    className="form-select"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary me-2"
                                disabled={loading}
                            >
                                {loading
                                    ? "Saving..."
                                    : task
                                        ? "Update Task"
                                        : "Create Task"}
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate("/dashboard")}
                            >
                                Cancel
                            </button>

                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateTask;