import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Static/Sidebar/Sidebar";
import Navbar from "./Components/Static/Navbar/Navbar";
import React from "react";

const Dashboard = React.memo(() => {
    return <div className="dashboard-container">
        <div className="left-side">
            <Sidebar />
        </div>
        <div className="right-side">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    </div>
})

export default Dashboard;