import React from 'react'

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="container mt-5">
            <h2>Dashboard</h2>

            <h5>Welcome {user?.name}</h5>

            <button
                className="btn btn-danger"
                onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                }}
            >
                Logout
            </button>
        </div>
    );
}

export default Dashboard