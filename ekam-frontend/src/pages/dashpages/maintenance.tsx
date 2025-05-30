import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const MaintenanceRequest = () => {
    const [units, setUnits] = useState<{ _id: string; houseNumber: string }[]>([]);
    const [formData, setFormData] = useState({
        unitId: '',
        description: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const res = await api.get('/units');
                setUnits(res.data);
            } catch {
                setUnits([]);
            }
        };
        fetchUnits();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await api.post('/maintenance', {
                unitId: formData.unitId,
                description: formData.description,
            });
            setSubmitted(true);
        } catch (err: any) {
            setError('Failed to submit maintenance request.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return <h2 className="text-center text-2xl font-semibold mt-10">Thank you! Your maintenance request has been submitted.</h2>;
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-10">
            <h1 className="text-2xl font-bold mb-6 text-center">Maintenance Request</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="unitId" className="block text-sm font-medium text-gray-700">Unit:</label>
                    <select
                        id="unitId"
                        name="unitId"
                        value={formData.unitId}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">Select your unit</option>
                        {units.map((unit) => (
                            <option key={unit._id} value={unit._id}>
                                {unit.houseNumber}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                {error && <div className="text-red-600 mb-2">{error}</div>}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {loading ? "Submitting..." : "Submit Request"}
                </button>
            </form>
        </div>
    );
};

export default MaintenanceRequest;