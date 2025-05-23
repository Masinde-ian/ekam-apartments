import React from "react";

const Dashboard = () => {
    const user = {
        name: "John Doe",
        apartment: "Apartment 304B",
        leaseEnd: "December 31, 2025",
        maintenanceRequests: 2,
        balanceDue: "$350",
    };

    return (
        <div className="min-h-screen w-screen flex flex-col bg-gray-100">
            <header className="bg-blue-700 text-white py-6 px-8 shadow-md flex flex-col md:flex-row items-center justify-between">
                <h1 className="text-3xl font-bold">Hello, {user.name}</h1>
                <p className="text-sm mt-2 md:mt-0">Welcome back to your apartment portal</p>
            </header>

            <main className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <section className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-2">Apartment Details</h2>
                    <p><strong>Unit:</strong> {user.apartment}</p>
                    <p><strong>Lease Ends:</strong> {user.leaseEnd}</p>
                </section>

                <section className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-2">Maintenance Requests</h2>
                    <p>You have <strong>{user.maintenanceRequests}</strong> active maintenance requests.</p>
                    <a href="/maintenance" className="text-blue-600 hover:underline mt-2 block">View Requests</a>
                </section>

                <section className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-2">Payment Status</h2>
                    <p><strong>Balance Due:</strong> {user.balanceDue}</p>
                    <a href="/payments" className="text-blue-600 hover:underline mt-2 block">Make a Payment</a>
                </section>

                <section className="bg-white rounded-2xl shadow-md p-6 col-span-1 md:col-span-2">
                    <h2 className="text-xl font-semibold mb-2">Profile Settings</h2>
                    <p>Update your personal information and preferences.</p>
                    <a href="/profile" className="text-blue-600 hover:underline mt-2 block">Edit Profile</a>
                </section>

                <section className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-2">Community Announcements</h2>
                    <p>Stay updated with the latest news from management.</p>
                    <a href="/announcements" className="text-blue-600 hover:underline mt-2 block">View Announcements</a>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
