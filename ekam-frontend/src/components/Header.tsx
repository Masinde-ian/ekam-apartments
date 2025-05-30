import React, { useState, useRef, useEffect } from 'react';
import { FaHome, FaUser, FaInfoCircle, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isAuthenticated, isAdmin, logout } = useAuth();
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    return (
        <header className="bg-blue-100 text-gray-700 p-4 top-0 left-0 right-0 z-20 shadow-md">
            <div className="container mx-auto flex justify-between items-center relative">
                {/* Logo */}
                <div className="text-2xl font-bold text-blue-600">
                    Ekam Apartments
                </div>

                {/* Hamburger Menu for Mobile */}
                <div className="md:hidden">
                    <button 
                        onClick={() => setMenuOpen(!menuOpen)} 
                        className="focus:outline-none"
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        <FaBars className="text-2xl" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav 
                    ref={menuRef}
                    className={`fixed md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none transition-all duration-300 ease-in-out z-30
                        ${menuOpen ? 'block' : 'hidden'} md:flex`}
                >
                    <ul className="flex flex-col md:flex-row md:space-x-6">
                        <li>
                            <a 
                                href="/" 
                                className="flex items-center px-4 py-2 hover:text-blue-600 transition-colors"
                                onClick={() => setMenuOpen(false)}
                            >
                                <FaHome className='text-xl mr-2' />
                                <span>Home</span>
                            </a>
                        </li>
                        <li>
                            <a 
                                href="/about" 
                                className="flex items-center px-4 py-2 hover:text-blue-600 transition-colors"
                                onClick={() => setMenuOpen(false)}
                            >
                                <FaInfoCircle className='text-xl mr-2' />
                                <span>About Us</span>
                            </a>
                        </li>

                        {isAuthenticated ? (
                            <>
                                {isAdmin && (
                                    <li>
                                        <a 
                                            href="/admin" 
                                            className="flex items-center px-4 py-2 hover:text-blue-600 transition-colors"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            <FaUser className='text-xl mr-2' />
                                            <span>Admin Dashboard</span>
                                        </a>
                                    </li>
                                )}
                                
                                <li>
                                    <a 
                                        href='/dashboard' 
                                        className="flex items-center px-4 py-2 hover:text-blue-600 transition-colors"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <FaUser className='text-xl mr-2' />
                                        <span>My Profile</span>
                                    </a>
                                </li>

                                <li>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            logout();
                                            setMenuOpen(false);
                                        }}
                                        className="flex items-center w-full px-4 py-2 hover:text-blue-600 transition-colors text-left"
                                    >
                                        <FaSignOutAlt className='text-xl mr-2' />
                                        <span>Logout</span>
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <a 
                                    href="/login" 
                                    className="flex items-center px-4 py-2 hover:text-blue-600 transition-colors"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <FaUser className='text-xl mr-2' />
                                    <span>Login</span>
                                </a>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;