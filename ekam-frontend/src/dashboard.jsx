import React from "react";
import "./dashboard.css";

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Apartment Management Dashboard</h1>
            </header>
            <main className="dashboard-main">
                <section className="dashboard-card">
                    <h2><a href="/residents">Residents</a></h2>
                    <p>View and manage resident information.</p>
                </section>
                <section className="dashboard-card">
                    <h2><a href="/maintenance">Maintenance Requests</a></h2>
                    <p>Track and resolve maintenance issues.</p>
                </section>
                <section className="dashboard-card">
                    <h2><a href="/payments">Payments</a></h2>
                    <p>Monitor and process rent payments.</p>
                </section>
                <section className="dashboard-card">
                    <h2><a href="/announcements">Announcements</a></h2>
                    <p>Post and manage community announcements.</p>
                </section>
            </main>
            <footer className="dashboard-footer">
                <p>&copy; 2023 Apartment Management Inc.</p>
            </footer>
        </div>
    );
};

export default Dashboard;