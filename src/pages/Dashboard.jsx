import React from 'react'
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h2>Dashboard</h2>

                <h5>Welcome {user?.name}</h5>


            </div>
        </>
    );
}

export default Dashboard