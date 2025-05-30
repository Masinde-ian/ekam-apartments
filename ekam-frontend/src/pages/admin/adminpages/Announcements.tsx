import React, { useState } from 'react';
import api from '../../../api/axios'; // Adjust the import path as necessary

const Announcements: React.FC = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);

        try {
            // Axios automatically sets headers and stringifies the body
            const { data } = await api.post('/notifications', { title, message });
            setSuccess('Announcement posted successfully!');
            setTitle('');
            setMessage('');
        } catch (err: any) {
            setError(
                err.response?.data?.error ||
                err.response?.data?.message ||
                err.message ||
                'An error occurred'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">Post New Announcement</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">
                        Message:
                        <textarea
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            required
                            rows={5}
                            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded transition disabled:opacity-50"
                >
                    {loading ? 'Posting...' : 'Post Announcement'}
                </button>
            </form>
            {success && <div className="text-green-600 mt-4 text-center">{success}</div>}
            {error && <div className="text-red-600 mt-4 text-center">{error}</div>}
        </div>
    );
};

export default Announcements;