import React, { useEffect, useState } from 'react';
import { fetchAdoptionRequests } from '../services/AdoptionRequestService';
import AdoptionCard from './AdoptionCard'; // Importing the card component
import './AdoptionRequestList.css'; // Custom CSS for list styling

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
        <div className="adoption-request-list-container">
            <h2 className="mb-4">Adoption Requests</h2>
            {error && <p className="text-danger">{error}</p>}
            <div className="row">
                {requests.map((request) => (
                    <div className="col-md-4 mb-4" key={request.id}>
                        <AdoptionCard request={request} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdoptionRequestList;
