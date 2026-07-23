import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const Register = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/dashboard");
        }
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!formData.name || !formData.email || !formData.password) {
            return setError("All fields are required");
        }

        try {
            setLoading(true);

            await register(formData);

            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 pt-5">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6 d-none d-md-block">
                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/011/432/528/small/enter-login-and-password-registration-page-on-screen-sign-in-to-your-account-creative-metaphor-login-page-mobile-app-with-user-page-flat-illustration-vector.jpg"
                        alt="Task Manager"
                        className="img-fluid rounded"
                    />
                </div>
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-body p-4">
                            <h3 className="text-center mb-4">
                                Register
                            </h3>
                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Name
                                    </label>
                                    <input
                                        className="form-control"
                                        placeholder="Enter your name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Email
                                    </label>
                                    <input
                                        className="form-control"
                                        placeholder="Enter your email"
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Password
                                    </label>
                                    <input
                                        className="form-control"
                                        placeholder="Enter your password"
                                        type="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button
                                    className="btn btn-success w-100"
                                    disabled={loading}
                                >
                                    {loading ? "Registering..." : "Register"}
                                </button>
                            </form>
                            <p className="text-center mt-3">
                                Already have an account?{" "}
                                <Link to="/">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;