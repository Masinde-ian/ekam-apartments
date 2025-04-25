import React, { useState, useEffect } from 'react';

const LeasesPage = () => {
    const [leases, setLeases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate fetching lease data from an API
        const fetchLeases = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/leases'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch leases');
                }
                const data = await response.json();
                setLeases(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLeases();
    }, []);

    const handleLeaseAction = (leaseId, action) => {
        // Handle actions like renew, terminate, etc.
        console.log(`Action: ${action} on Lease ID: ${leaseId}`);
    };

    if (loading) {
        return <div>Loading leases...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Leases</h1>
            {leases.length === 0 ? (
                <p>No leases available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tenant</th>
                            <th>Property</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leases.map((lease) => (
                            <tr key={lease.id}>
                                <td>{lease.id}</td>
                                <td>{lease.tenant}</td>
                                <td>{lease.property}</td>
                                <td>{lease.startDate}</td>
                                <td>{lease.endDate}</td>
                                <td>
                                    <button onClick={() => handleLeaseAction(lease.id, 'renew')}>Renew</button>
                                    <button onClick={() => handleLeaseAction(lease.id, 'terminate')}>Terminate</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default LeasesPage;