import React, { useState } from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaBars } from 'react-icons/fa';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-transparent text-white p-4 fixed top-0 left-0 right-0 z-20 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    Ekam Apartments
                </div>

                {/* Hamburger Menu for Mobile */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
                        <FaBars className="text-2xl" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className={`absolute top-16 left-0 w-full bg-gray-800 md:static md:bg-transparent md:w-auto ${menuOpen ? 'block' : 'hidden'} md:flex`}>
                    <ul className="flex flex-col md:flex-row md:space-x-6">
                        <li className="flex items-center px-4 py-2 hover:text-gray-300">
                            <a href="/" className="flex items-center space-x-2">
                                <FaHome className='text-2xl' />
                                <span>Home</span>
                            </a>
                        </li>
                        <li className="flex items-center px-4 py-2 hover:text-gray-300">
                            <a href="/dashboard" className="flex items-center space-x-2">
                                <FaUser className='text-2xl' />
                                <span>Profile</span>
                            </a>
                        </li>
                        <li className="flex items-center px-4 py-2 hover:text-gray-300">
                            <a href="/settings" className="flex items-center space-x-2">
                                <FaCog className='text-2xl' />
                                <span>Settings</span>
                            </a>
                        </li>
                        <li className="flex items-center px-4 py-2 hover:text-gray-300">
                            <a href="/logout" className="flex items-center space-x-2">
                                <FaSignOutAlt className='text-2xl' />
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
