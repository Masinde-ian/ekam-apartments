import React, { useState } from 'react';
import api from '../api/axios'; // Make sure the path is correct for your project
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        setError('');
        setLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            setLoading(false);
            navigate('/dashboard'); // Redirect after login
        } catch (err: any) {
            setLoading(false);
            setError(
                err.response?.data?.message ||
                'Login failed. Please check your credentials.'
            );
        }
    };

    return (
        <div className="max-w-md max-h-fit mb-1.5 mx-auto mt-12 p-6 border border-gray-300 rounded-lg shadow-md text-center">
            <h2 className="text-2xl text-gray-600 font-semibold mb-6">Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="mb-4 text-left">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mb-4 text-left">
                    <label htmlFor="password" className="block text-sm font-medium text-blue-700">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full text-gray-700 px-3 py-2 border border-blue-200 bg-blue-50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                        placeholder="Enter your password"
                    />
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;