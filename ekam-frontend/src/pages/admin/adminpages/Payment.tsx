import React, { useEffect, useState } from 'react';
import api from '../../../api/axios';

type Tenant = {
    id: number;
    name: string;
    email: string;
    paymentStatus: string;
};

const Payment: React.FC = () => {
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchTenants = async () => {
        const res = await api.get('/tenants');
        return res.data;
    };

    const confirmPayment = async (tenantId: number, confirmed: boolean) => {
        const res = await api.patch(`/tenants/${tenantId}/payment`, {
            paymentStatus: confirmed ? 'confirmed' : 'pending',
        });
        return res.data;
    };

    const sendEmail = async (tenantId: number) => {
        const res = await api.post(`/tenants/${tenantId}/send-email`);
        return res.data;
    };

    const loadTenants = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchTenants();
            setTenants(data);
        } catch {
            setError('Failed to load tenants');
        }
        setLoading(false);
    };

    useEffect(() => {
        loadTenants();
        // eslint-disable-next-line
    }, []);

    const handleCheckboxChange = async (checked: boolean, tenant: Tenant) => {
        setActionLoading(tenant.id);
        try {
            await confirmPayment(tenant.id, checked);
            if (checked) {
                await sendEmail(tenant.id);
                alert('Payment confirmed and email sent');
            } else {
                alert('Payment status set to pending');
            }
            await loadTenants();
        } catch {
            alert('Action failed');
        }
        setActionLoading(null);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Tenant Payments</h2>
            {error && <div className="text-red-600 mb-4">{error}</div>}
            <div className="overflow-x-auto rounded shadow bg-white">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Tenant Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Payment Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="text-center py-8">
                                    <span className="text-blue-600">Loading...</span>
                                </td>
                            </tr>
                        ) : tenants.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-8">
                                    No tenants found.
                                </td>
                            </tr>
                        ) : (
                            tenants.map((tenant) => (
                                <tr key={tenant.id}>
                                    <td className="px-6 py-4">{tenant.name}</td>
                                    <td className="px-6 py-4">{tenant.email}</td>
                                    <td className="px-6 py-4">
                                        {tenant.paymentStatus === 'confirmed' ? (
                                            <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded">
                                                Confirmed
                                            </span>
                                        ) : (
                                            <span className="inline-block px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                checked={tenant.paymentStatus === 'confirmed'}
                                                disabled={actionLoading === tenant.id}
                                                onChange={async (e) => {
                                                    if (e.target.checked) {
                                                        await handleCheckboxChange(true, tenant);
                                                    } else {
                                                        if (
                                                            window.confirm(
                                                                'Are you sure you want to set payment as pending?'
                                                            )
                                                        ) {
                                                            await handleCheckboxChange(false, tenant);
                                                        }
                                                    }
                                                }}
                                                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm">
                                                {tenant.paymentStatus === 'confirmed'
                                                    ? 'Paid'
                                                    : 'Mark as Paid'}
                                            </span>
                                            {tenant.paymentStatus === 'confirmed' && (
                                                <svg
                                                    className="w-5 h-5 text-green-500 ml-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Payment;