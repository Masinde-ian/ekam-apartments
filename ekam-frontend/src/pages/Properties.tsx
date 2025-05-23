import React from 'react';

const Properties = () => {
    const properties = [
        { id: 1, name: 'Bedsitter', location: 'Location 1', price: '6500' },
        { id: 2, name: '1 Bedroom', location: 'Location 2', price: '10000' },
        { id: 3, name: '2 Bedroom', location: 'Location 3', price: '13000' },
    ];

    return (
        <div className="p-5 font-sans bg-gray-100 h-screen w-screen flex flex-col p-14">
            <h1 className="text-center text-2xl font-bold text-gray-800 mb-5">Properties</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {properties.map((property) => (
                <div
                key={property.id}
                className="border border-gray-200 rounded-lg p-5 bg-white shadow-md hover:shadow-lg transform transition-transform duration-200 hover:scale-105 cursor-pointer"
                >
                <h2 className="text-xl font-semibold text-gray-800 mb-3">{property.name}</h2>
                <p className="text-gray-600 mb-1">
                    <strong>Location:</strong> {property.location}
                </p>
                <p className="text-gray-600">
                    <strong>Price:</strong> {property.price}
                </p>
                </div>
            ))}
            </div>
        </div>
    );
};

export default Properties;