import React from 'react';

const Properties = () => {
    const properties = [
        { id: 1, name: 'Bedsitter', location: 'Location 1', price: '6500' },
        { id: 2, name: '1 Bedroom', location: 'Location 2', price: '10000' },
        { id: 3, name: '2 Bedroom', location: 'Location 3', price: '13000' },
    ];

    const colors = [
        "bg-gradient-to-tr from-purple-400 to-purple-700",
        "bg-gradient-to-tr from-blue-400 to-blue-700",
        "bg-gradient-to-tr from-pink-400 to-pink-700",
        "bg-gradient-to-tr from-green-400 to-green-700",
        "bg-gradient-to-tr from-yellow-400 to-yellow-600",
        "bg-gradient-to-tr from-indigo-400 to-indigo-700",
    ];

    return (
        <div className="p-2 sm:p-5 font-sans bg-gray-100 min-h-screen w-full flex flex-col items-center">
            <h1 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 sm:mb-8 tracking-tight">Our Properties</h1>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 w-full max-w-6xl">
                {properties.map((property, idx) => (
                    <div
                        key={property.id}
                        className="border border-gray-200 rounded-2xl p-0 bg-white shadow-xl hover:shadow-2xl transform transition-transform duration-200 hover:scale-105 cursor-pointer flex flex-col overflow-hidden"
                    >
                        {/* Colored image placeholder */}
                        <div className={`h-32 sm:h-40 w-full ${colors[idx % colors.length]} flex items-center justify-center`}>
                            <span className="text-white text-3xl sm:text-4xl font-bold opacity-80 drop-shadow-lg">
                                {property.name.charAt(0)}
                            </span>
                        </div>
                        <div className="p-4 sm:p-6 flex flex-col flex-1">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{property.name}</h2>
                            <p className="text-gray-500 mb-1 flex items-center text-sm sm:text-base">
                                <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                <strong>Location:</strong>&nbsp;{property.location}
                            </p>
                            <p className="text-gray-700 text-base sm:text-lg mt-2 mb-4">
                                <strong>Price:</strong>&nbsp;
                                <span className="text-purple-700 font-semibold text-lg sm:text-xl">Ksh {property.price}</span>
                            </p>
                            <button className="mt-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition text-sm sm:text-base">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Properties;