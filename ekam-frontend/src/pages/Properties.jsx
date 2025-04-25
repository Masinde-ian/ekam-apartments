import React from 'react';

const Properties = () => {
    const properties = [
        { id: 1, name: 'Property 1', location: 'Location 1', price: '$1000' },
        { id: 2, name: 'Property 2', location: 'Location 2', price: '$2000' },
        { id: 3, name: 'Property 3', location: 'Location 3', price: '$3000' },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1>Properties</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {properties.map((property) => (
                    <div
                        key={property.id}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '16px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <h2>{property.name}</h2>
                        <p><strong>Location:</strong> {property.location}</p>
                        <p><strong>Price:</strong> {property.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Properties;