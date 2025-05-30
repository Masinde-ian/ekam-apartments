import React from "react";
import { Link, Outlet } from "react-router-dom";

const Admin = () => {
    const admin = {
        name: "Admin User",
        role: "Administrator",
    };

    return (
        <div className="min-h-screen w-full flex flex-col bg-gray-100">
            <header className="bg-purple-800 text-white py-4 px-4 md:px-8 shadow-md flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center md:text-left">
                    Welcome, {admin.name} <span className="text-sm font-normal">({admin.role})</span>
                </h1>
                <nav className="w-full md:w-auto">
                    <ul className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-6 text-base sm:text-lg md:text-xl font-bold">
                        <li>
                            <Link to="units" className="hover:underline">
                                Units
                            </Link>
                        </li>
                        <li>
                            <Link to="tenants" className="hover:underline">
                                Tenants
                            </Link>
                        </li>
                        <li>
                            <Link to="payments" className="hover:underline">
                                Payments
                            </Link>
                        </li>
                        <li>
                            <Link to="announcements" className="hover:underline">
                                Announcements
                            </Link>
                        </li>
                        <li>
                            <Link to="requests" className="hover:underline">
                                Maintenance
                            </Link>
                        </li>
                        <li>
                            <Link to="leases" className="hover:underline">
                                Leases
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <main className="flex-1 p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 text-black">
                <Outlet />
            </main>
        </div>
    );
};

export default Admin;