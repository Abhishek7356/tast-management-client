import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <span className="navbar-brand">
                    Task Manager
                </span>
                <div className="text-white">
                    <span className="me-3">
                        {user?.name} ({user?.role})
                    </span>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;