import React, { useEffect, useState } from "react";
import api from "../../../api/axios";

// Define the type for a request
interface TenantRequest {
    id: string;
    unit: string;
    description: string;
    status: string;
    createdAt: string;
}

const Requests: React.FC = () => {
    const [requests, setRequests] = useState<TenantRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true);
            try {
                // Correct endpoint and Axios usage
                const { data } = await api.get("/maintenance", { withCredentials: true });
                setRequests(
                    data.data.map((req: any) => ({
                        id: req._id,
                        unit:
                            req.unitId && typeof req.unitId === "object"
                                ? req.unitId.houseNumber || req.unitId.name || req.unitId._id
                                : req.unitId || "N/A",
                        description: req.description,
                        status: req.status,
                        createdAt: new Date(req.createdAt).toLocaleDateString(),
                    }))
                );
            } catch (error) {
                setRequests([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Maintenance Requests</h1>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow w-full md:w-max">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Unit</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date Submitted</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {requests.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                        No requests found.
                                    </td>
                                </tr>
                            ) : (
                                requests.map((req) => (
                                    <tr key={req.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{req.unit}</td>
                                        <td className="px-6 py-4">{req.description}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    req.status === "closed"
                                                        ? "bg-green-100 text-green-800"
                                                        : req.status === "in progress"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{req.createdAt}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Requests;