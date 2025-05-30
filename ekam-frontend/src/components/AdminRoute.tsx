import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Example: get user from localStorage or context
const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

const AdminRoute: React.FC = () => {
    const user = getUser();
    if (!user || user.role !== "admin") {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

export default AdminRoute;