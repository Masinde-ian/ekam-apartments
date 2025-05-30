import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

type Notification = {
    _id: string;
    message: string;
    date: string;
};

const PaymentNotifications: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await api.get('/notifications/my');
                setNotifications(res.data);
            } catch (err: any) {
                setError('Failed to fetch notifications.');
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);

    return (
        <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1.5rem', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee' }}>
            <h2>Payment Notifications</h2>
            <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#e6ffed', border: '1px solid #b7eb8f', borderRadius: 6 }}>
                <strong>Payment Confirmed!</strong>
                <p>
                    The admin has seen your payment. In case of any inquiries, contact support or communicate through the maintenance request tab.
                </p>
            </div>
            <h3>Previous Notifications</h3>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : notifications.length === 0 ? (
                <p>No previous notifications.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {notifications.map((notif) => (
                        <li key={notif._id} style={{ marginBottom: '1rem', padding: '0.75rem', background: '#fafafa', borderRadius: 4, border: '1px solid #f0f0f0' }}>
                            <div>{notif.message}</div>
                            <small style={{ color: '#888' }}>{new Date(notif.date).toLocaleDateString()}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PaymentNotifications;