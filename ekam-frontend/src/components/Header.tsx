import React from 'react';

const Header = ({ title, subtitle }) => {
    return (
        <header className="bg-gray-100 p-4 text-center border-b-2 border-gray-300">
            <h1 className="m-0 text-2xl text-gray-800">{title}</h1>
            {subtitle && <h2 className="m-0 text-lg text-gray-600">{subtitle}</h2>}
        </header>
    );
};

export default Header;
