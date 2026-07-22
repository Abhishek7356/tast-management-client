import Loader from "./Loader";
import { deleteTask } from "../services/taskService";

const TaskTable = ({ tasks, loading, reload, onEdit }) => {

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this task?")) return;

        try {

            await deleteTask(id);

            reload();

        } catch (error) {
            alert(error.response?.data?.message || "Failed to delete");
        }

    };

    if (loading) return <Loader />;

    return (
        <table className="table table-bordered table-hover">
            <thead className="table-dark">
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th width="170">Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="text-center">
                            No tasks found
                        </td>
                    </tr>

                ) : (
                    tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td>
                                {new Date(task.created_at).toLocaleDateString()}
                            </td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#taskModal"
                                    onClick={() => onEdit(task)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(task.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default TaskTable;