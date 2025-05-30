import React, { useEffect, useState } from "react";
import api from "../../../api/axios";

interface Lease {
    id: string;
    tenantName: string;
    propertyAddress: string;
    startDate: string;
    endDate: string;
    rentAmount: number;
    status: string;
}

const Leases: React.FC = () => {
    const [leases, setLeases] = useState<Lease[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Form state for adding a lease
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        tenantName: "",
        propertyAddress: "",
        startDate: "",
        endDate: "",
        rentAmount: "",
        status: "Active",
    });
    const [formError, setFormError] = useState<string | null>(null);
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        fetchLeases();
    }, []);

    const fetchLeases = async () => {
        try {
            setLoading(true);
            const response = await api.get("/leases");
            setLeases(response.data);
        } catch (err: any) {
            setError("Failed to fetch leases.");
        } finally {
            setLoading(false);
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddLease = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        setFormLoading(true);
        try {
            // Adjust payload as needed for your backend
            const payload = {
                tenantName: form.tenantName,
                propertyAddress: form.propertyAddress,
                startDate: form.startDate,
                endDate: form.endDate,
                rentAmount: Number(form.rentAmount),
                status: form.status,
            };
            await api.post("/leases", payload);
            setShowForm(false);
            setForm({
                tenantName: "",
                propertyAddress: "",
                startDate: "",
                endDate: "",
                rentAmount: "",
                status: "Active",
            });
            fetchLeases();
        } catch (err: any) {
            setFormError("Failed to add lease.");
        } finally {
            setFormLoading(false);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-64 text-lg">Loading leases...</div>;
    if (error) return <div className="flex justify-center items-center h-64 text-red-500">{error}</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Leases</h1>
            <button
                className="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
                onClick={() => setShowForm((v) => !v)}
            >
                {showForm ? "Cancel" : "Add Lease"}
            </button>
            {showForm && (
                <form
                    onSubmit={handleAddLease}
                    className="mb-8 bg-gray-50 p-6 rounded shadow max-w-xl"
                >
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Tenant Name</label>
                        <input
                            type="text"
                            name="tenantName"
                            value={form.tenantName}
                            onChange={handleFormChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Property Address</label>
                        <input
                            type="text"
                            name="propertyAddress"
                            value={form.propertyAddress}
                            onChange={handleFormChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={form.startDate}
                            onChange={handleFormChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={form.endDate}
                            onChange={handleFormChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Rent Amount</label>
                        <input
                            type="number"
                            name="rentAmount"
                            value={form.rentAmount}
                            onChange={handleFormChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Status</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleFormChange}
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                            <option value="Terminated">Terminated</option>
                        </select>
                    </div>
                    {formError && <div className="text-red-500 mb-2">{formError}</div>}
                    <button
                        type="submit"
                        disabled={formLoading}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
                    >
                        {formLoading ? "Adding..." : "Add Lease"}
                    </button>
                </form>
            )}
            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Tenant</th>
                            <th className="py-3 px-6 text-left">Property</th>
                            <th className="py-3 px-6 text-left">Start Date</th>
                            <th className="py-3 px-6 text-left">End Date</th>
                            <th className="py-3 px-6 text-left">Rent Amount</th>
                            <th className="py-3 px-6 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leases.map((lease, idx) => (
                            <tr
                                key={lease.id}
                                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                            >
                                <td className="py-3 px-6">{lease.tenantName}</td>
                                <td className="py-3 px-6">{lease.propertyAddress}</td>
                                <td className="py-3 px-6">{lease.startDate}</td>
                                <td className="py-3 px-6">{lease.endDate}</td>
                                <td className="py-3 px-6">
                                    <span className="font-medium text-green-700">
                                        ${lease.rentAmount.toLocaleString()}
                                    </span>
                                </td>
                                <td className="py-3 px-6">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            lease.status === "Active"
                                                ? "bg-green-100 text-green-800"
                                                : lease.status === "Pending"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {lease.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leases;