import React, { useState, useEffect } from 'react';

type Lease = {
    id: string | number;
    tenant: string;
    property: string;
    startDate: string;
    endDate: string;
};

const LeasesPage = () => {
    const [leases, setLeases] = useState<Lease[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchLeases();
    }, []);

    const handleLeaseAction = (leaseId: any, action: string) => {
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