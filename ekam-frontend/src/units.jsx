import React from "react";

const Units = () => {
    const units = [
        { id: 1, name: "Unit 1", description: "Description for Unit 1" },
        { id: 2, name: "Unit 2", description: "Description for Unit 2" },
        { id: 3, name: "Unit 3", description: "Description for Unit 3" },
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6">Units</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {units.map((unit) => (
                    <div
                        key={unit.id}
                        className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
                    >
                        <h2 className="text-xl font-semibold mb-2">{unit.name}</h2>
                        <p className="text-gray-600">{unit.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Units;