import Loader from "./Loader";
import { deleteTask } from "../services/taskService";

const TaskTable = ({ tasks, loading, reload, onEdit }) => {

    const showUserColumn =
        tasks.length > 0 && tasks.some(task => task.user_name);

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
        <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
                <tr>
                    <th>Title</th>

                    {showUserColumn && <th>User</th>}

                    <th>Description</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th width="170">Actions</th>
                </tr>
            </thead>

            <tbody>

                {tasks.length === 0 ? (
                    <tr>
                        <td
                            colSpan={showUserColumn ? 6 : 5}
                            className="text-center"
                        >
                            No tasks found
                        </td>
                    </tr>
                ) : (
                    tasks.map((task) => (
                        <tr key={task.id}>

                            <td>{task.title}</td>

                            {showUserColumn && (
                                <td>
                                    <span className="badge bg-primary">
                                        {task.user_name}
                                    </span>
                                </td>
                            )}

                            <td>{task.description}</td>

                            <td>
                                <span
                                    className={`badge ${
                                        task.status === "Completed"
                                            ? "bg-success"
                                            : task.status === "In Progress"
                                            ? "bg-warning text-dark"
                                            : "bg-secondary"
                                    }`}
                                >
                                    {task.status}
                                </span>
                            </td>

                            <td>
                                {new Date(task.created_at).toLocaleDateString()}
                            </td>

                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
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