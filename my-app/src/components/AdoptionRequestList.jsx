import React, { useEffect, useState } from 'react';
import { fetchAdoptionRequests } from '../services/AdoptionRequestService';

const AdoptionRequestList = () => {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState('');

    const getRequests = async () => {
        try {
            const data = await fetchAdoptionRequests();
            setRequests(data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        getRequests();
    }, []);

    return (
        <div>
            <h2>Adoption Requests</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {requests.map((request) => (
                    <li key={request.id}>
                        <strong>ID:</strong> {request.id} | <strong>Message:</strong> {request.message} | <strong>Status:</strong> {request.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdoptionRequestList;
