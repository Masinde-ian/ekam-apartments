import React from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
            <div className="p-4 text-2xl font-bold border-b border-gray-700">
                Ekam Dashboard
            </div>
            <nav className="flex-1 p-4">
                <ul className="space-y-4">
                    <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer">
                        <FaHome />
                        <span>Home</span>
                    </li>
                    <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer">
                        <FaUser />
                        <span>Profile</span>
                    </li>
                    <li className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md cursor-pointer">
                        <FaCog />
                        <span>Settings</span>
                    </li>
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-700">
                <button className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-md w-full">
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;