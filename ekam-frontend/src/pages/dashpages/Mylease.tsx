import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';

type Lease = {
    id: string;
    propertyAddress: string;
    startDate: string;
    endDate: string;
    rentAmount: number;
    status: string;
};

const fetchLeaseById = async (leaseId: string): Promise<Lease | null> => {
    try {
        const response = await api.get(`/leases/${leaseId}`, { 
            withCredentials: true,
        });
        if (response.status !== 200) return null;
        return response.data;
    } catch {
        return null;
    }
};

const Mylease: React.FC = () => {
    const { leaseId } = useParams<{ leaseId: string }>();
    const [lease, setLease] = useState<Lease | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (leaseId) {
            fetchLeaseById(leaseId).then(data => {
                setLease(data);
                setLoading(false);
            });
        }
    }, [leaseId]);

    if (loading) return <div>Loading lease details...</div>;
    if (!lease) return <div>Lease not found or you do not have access.</div>;

    return (
        <div>
            <h2>My Lease Details</h2>
            <p><strong>Lease ID:</strong> {lease.id}</p>
            <p><strong>Property Address:</strong> {lease.propertyAddress}</p>
            <p><strong>Start Date:</strong> {lease.startDate}</p>
            <p><strong>End Date:</strong> {lease.endDate}</p>
            <p><strong>Rent Amount:</strong> ${lease.rentAmount}</p>
            <p><strong>Status:</strong> {lease.status}</p>
        </div>
    );
};

export default Mylease;