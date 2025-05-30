import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

type Announcement = {
    _id: string;
    title: string;
    message: string;
    sentAt: string;
    author: string;
};

const AnnouncementPage: React.FC = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                setLoading(true);
                setError(null);
                // Fetch notifications where type is announcement or sent to all tenants
                const res = await api.get('/notifications/announcements'); // Backend should provide this endpoint
                // If your backend returns { data: [...] }
                const data = res.data.data || res.data;
                setAnnouncements(
                    data.map((a: any) => ({
                        _id: a._id,
                        title: a.title,
                        message: a.message,
                        sentAt: new Date(a.sentAt).toLocaleString(),
                        author: a.sentBy?.name || a.sentBy?.email || 'Admin',
                    }))
                );
            } catch (err: any) {
                setError('Failed to fetch announcements.');
            } finally {
                setLoading(false);
            }
        };
        fetchAnnouncements();
    }, []);

    return (
        <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
            <h1>Announcements</h1>
            {loading ? (
                <p>Loading announcements...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : announcements.length === 0 ? (
                <p>No announcements at this time.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {announcements.map(a => (
                        <li key={a._id} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                            <h2 style={{ margin: 0 }}>{a.title}</h2>
                            <p style={{ margin: '0.5rem 0' }}>{a.message}</p>
                            <div style={{ fontSize: '0.9rem', color: '#888' }}>
                                <span>Date: {a.sentAt}</span> | <span>By: {a.author}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AnnouncementPage;