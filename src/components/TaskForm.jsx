import { useEffect, useState } from "react";
import { createTask, updateTask } from "../services/taskService";

const initialState = {
    title: "",
    description: "",
    status: "Pending",
};

const TaskForm = ({ task, reload, onClose }) => {
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description,
                status: task.status,
            });
        } else {
            setFormData(initialState);
        }
    }, [task]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            return alert("Title is required");
        }

        try {
            setLoading(true);

            if (task) {
                await updateTask(task.id, formData);
            } else {
                await createTask(formData);
            }

            reload();
            setFormData(initialState);
            onClose();

        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card shadow mb-4">
            <div className="card-body">
                <h4 className="mb-3">
                    {task ? "Edit Task" : "Create Task"}
                </h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">
                            Title
                        </label>
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
                        <label className="form-label">
                            Description
                        </label>

                        <textarea
                            name="description"
                            className="form-control"
                            required
                            rows="3"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Status
                        </label>
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
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;