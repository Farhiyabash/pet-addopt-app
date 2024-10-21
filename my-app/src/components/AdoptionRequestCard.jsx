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
        <div className="adoption-request-list-container container my-5">
            <h2 className="text-center mb-4 text-pink">Adoption Requests</h2>
            {error && <p className="text-danger text-center">{error}</p>}
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