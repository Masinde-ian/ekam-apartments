import React, { useState } from "react";

const LeaseForm = () => {
    const [formData, setFormData] = useState({
        tenantName: "",
        apartmentNumber: "",
        leaseStartDate: "",
        leaseEndDate: "",
        monthlyRent: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        // Add your form submission logic here
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Lease Form</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="tenantName" className="block text-sm font-medium text-gray-700">
                        Tenant Name
                    </label>
                    <input
                        type="text"
                        id="tenantName"
                        name="tenantName"
                        value={formData.tenantName}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="apartmentNumber" className="block text-sm font-medium text-gray-700">
                        Apartment Number
                    </label>
                    <input
                        type="text"
                        id="apartmentNumber"
                        name="apartmentNumber"
                        value={formData.apartmentNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="leaseStartDate" className="block text-sm font-medium text-gray-700">
                        Lease Start Date
                    </label>
                    <input
                        type="date"
                        id="leaseStartDate"
                        name="leaseStartDate"
                        value={formData.leaseStartDate}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="leaseEndDate" className="block text-sm font-medium text-gray-700">
                        Lease End Date
                    </label>
                    <input
                        type="date"
                        id="leaseEndDate"
                        name="leaseEndDate"
                        value={formData.leaseEndDate}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="monthlyRent" className="block text-sm font-medium text-gray-700">
                        Monthly Rent
                    </label>
                    <input
                        type="number"
                        id="monthlyRent"
                        name="monthlyRent"
                        value={formData.monthlyRent}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default LeaseForm;