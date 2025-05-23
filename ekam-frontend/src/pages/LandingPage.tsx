import React from 'react';

const LandingPage = () => {
    return (
        <div className="landing-page bg-gray-100 min-h-screen flex flex-col">
            <header className="landing-header bg-blue-600 text-white text-center p-16">
                <h1 className="text-4xl font-bold">Welcome to Ekam Apartments</h1>
                <p className="text-lg mt-4">Your dream home awaits</p>
                <button className="cta-button mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200">
                    <a href='/properties' className="text-blue-600 hover:text-blue-800 transition duration-300">
                        Explore Now
                    </a> 
                </button>
            </header>
            <section className="features-section py-16 px-6 bg-white">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Ekam Apartments?</h2>
                <div className="features grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="feature text-center p-6 border rounded-lg shadow-sm hover:shadow-md">
                        <h3 className="text-xl font-semibold text-blue-600">Modern Design</h3>
                        <p className="text-gray-600 mt-4">Experience contemporary living with state-of-the-art architecture.</p>
                    </div>
                    <div className="feature text-center p-6 border rounded-lg shadow-sm hover:shadow-md">
                        <h3 className="text-xl font-semibold text-blue-600">Prime Location</h3>
                        <p className="text-gray-600 mt-4">Located in the heart of the city with easy access to everything.</p>
                    </div>
                    <div className="feature text-center p-6 border rounded-lg shadow-sm hover:shadow-md">
                        <h3 className="text-xl font-semibold text-blue-600">Luxurious Amenities</h3>
                        <p className="text-gray-600 mt-4">Enjoy a range of premium facilities for a comfortable lifestyle.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;