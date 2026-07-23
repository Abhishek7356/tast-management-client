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

                <div className="d-flex gap-2 mb-3">

                    <input
                        className="form-control"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />

                    <select
                        className="form-select"
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                            setPage(1);
                        }}
                    >
                        <option value="">All</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>

                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setSelectedTask(null);
                            setShowForm(true);
                        }}
                    >
                        Add Task
                    </button>

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

                <TaskTable
                    tasks={tasks}
                    loading={loading}
                    reload={loadTasks}
                    onEdit={(task) => {
                        setSelectedTask(task);
                        setShowForm(true);
                    }}
                />

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