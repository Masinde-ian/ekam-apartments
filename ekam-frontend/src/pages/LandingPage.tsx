import React from 'react';
import Properties from './Properties';

const LandingPage = () => {
    return (
        <div className="landing-page bg-gray-100 min-h-screen flex flex-col">
            <header className="landing-header bg-blue-600 text-white text-center px-4 py-10 sm:py-16">
                <h1 className="text-2xl sm:text-4xl font-bold">Welcome to Ekam Apartments</h1>
                <p className="text-base sm:text-lg mt-4">Your dream home awaits</p>
                <button className="cta-button mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200">
                    <a href='#property' className="text-blue-600 hover:text-blue-800 transition duration-300">
                        Explore Now
                    </a> 
                </button>
            </header>
            <section className="features-section py-10 sm:py-16 px-3 sm:px-6 bg-white">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12">Why Choose Ekam Apartments?</h2>
                <div className="features grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
                    <div className="feature text-center p-4 sm:p-6 border rounded-lg shadow-sm hover:shadow-md">
                        <h3 className="text-lg sm:text-xl font-semibold text-blue-600">Modern Design</h3>
                        <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base">Experience contemporary living with state-of-the-art architecture.</p>
                    </div>
                    <div className="feature text-center p-4 sm:p-6 border rounded-lg shadow-sm hover:shadow-md">
                        <h3 className="text-lg sm:text-xl font-semibold text-blue-600">Prime Location</h3>
                        <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base">Located in the heart of the city with easy access to everything.</p>
                    </div>
                    <div className="feature text-center p-4 sm:p-6 border rounded-lg shadow-sm hover:shadow-md">
                        <h3 className="text-lg sm:text-xl font-semibold text-blue-600">Luxurious Amenities</h3>
                        <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base">Enjoy a range of premium facilities for a comfortable lifestyle.</p>
                    </div>
                </div>
                <button className="cta-button mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200">
                    <a href='#property' className="text-blue-600 hover:text-blue-800 transition duration-300">
                        About Us
                    </a> 
                </button>
            </section>
            <section className="cta-section bg-blue-600 text-white text-center py-10 sm:py-16 px-3 sm:px-6" id="property">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to find your new home?</h2>
                <p className="text-base sm:text-lg mb-4 sm:mb-6">Join our community and start living your best life today!</p>
                <Properties/>
            </section>
        </div>
    );
};

export default LandingPage;