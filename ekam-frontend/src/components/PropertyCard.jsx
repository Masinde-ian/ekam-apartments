import React from 'react';

const PropertyCard = ({ image, title, location, price }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-200">
            <img className="w-full h-48 object-cover" src={image} alt={title} />
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <p className="text-gray-600">{location}</p>
                <div className="mt-4">
                    <span className="text-lg font-bold text-green-600">${price}</span>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;