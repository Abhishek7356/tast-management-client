import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskTable from "../components/TaskTable";
import TaskForm from "../components/TaskForm";
import Pagination from "../components/Pagination";
import { getTasks } from "../services/taskService";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [showForm, setShowForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const loadTasks = async () => {
        try {
            setLoading(true);

            const { data } = await getTasks({
                page,
                limit: 5,
                search: debouncedSearch,
                status,
            });

            setTasks(data.data);
            setTotalPages(data.pagination.totalPages);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, [page, debouncedSearch, status]);


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);

    }, [search]);


    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="fw-bold mb-1">
                            Task Manager
                        </h2>
                        <p className="text-muted mb-0">
                            Manage your tasks efficiently
                        </p>
                    </div>
                    <button
                        className="btn btn-primary px-4 shadow-sm"
                        onClick={() => {
                            setSelectedTask(null);
                            setShowForm(true);
                        }}
                    >
                        + Add Task
                    </button>
                </div>
                <div className="card shadow-sm mb-4">
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-8">
                                <input
                                    className="form-control form-control-lg"
                                    placeholder="Search tasks..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setPage(1);
                                    }}
                                />
                            </div>
                            <div className="col-md-4">
                                <select
                                    className="form-select form-select-lg"
                                    value={status}
                                    onChange={(e) => {
                                        setStatus(e.target.value);
                                        setPage(1);
                                    }}
                                >
                                    <option value="">
                                        All Status
                                    </option>
                                    <option value="Pending">
                                        Pending
                                    </option>
                                    <option value="In Progress">
                                        In Progress
                                    </option>
                                    <option value="Completed">
                                        Completed
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                {showForm && (
                    <TaskForm
                        task={selectedTask}
                        reload={loadTasks}
                        onClose={() => {
                            setShowForm(false);
                            setSelectedTask(null);
                        }}
                    />

                )}
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="fw-bold mb-3">
                            Tasks
                        </h5>
                        <TaskTable
                            tasks={tasks}
                            loading={loading}
                            reload={loadTasks}
                            onEdit={(task) => {
                                setSelectedTask(task);
                                setShowForm(true);
                            }}
                        />

                    </div>
                </div>
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                />
            </div>
        </>
    );
};

export default Dashboard;