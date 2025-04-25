import React, { useState, useEffect } from 'react';

const TenantsPage = () => {
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTenants = async () => {
            try {
                const response = await fetch('/api/tenants'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch tenants');
                }
                const data = await response.json();
                setTenants(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTenants();
    }, []);

    const handleDelete = async (tenantId) => {
        try {
            const response = await fetch(`/api/tenants/${tenantId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete tenant');
            }
            setTenants(tenants.filter((tenant) => tenant.id !== tenantId));
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading tenants...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Tenants</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">ID</th>
                            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Name</th>
                            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Email</th>
                            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tenants.map((tenant) => (
                            <tr key={tenant.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b text-sm text-gray-700">{tenant.id}</td>
                                <td className="px-4 py-2 border-b text-sm text-gray-700">{tenant.name}</td>
                                <td className="px-4 py-2 border-b text-sm text-gray-700">{tenant.email}</td>
                                <td className="px-4 py-2 border-b text-sm text-gray-700">
                                    <button
                                        onClick={() => handleDelete(tenant.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TenantsPage;