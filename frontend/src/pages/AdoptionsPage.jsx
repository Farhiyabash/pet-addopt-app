// src/pages/AdoptionsPage.jsx

import React, { useEffect, useState } from 'react';
import { fetchAdoptionRequests } from '../services/AdoptionRequestService';
import AdoptionRequestForm from '../components/AdoptionRequestForm';
import AdoptionCard from '../components/AdoptionCard';
import './AdoptionsPage.css'; // Import your custom styles

const AdoptionsPage = () => {
    const [adoptionRequests, setAdoptionRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch adoption requests when the component mounts
    useEffect(() => {
        const loadAdoptionRequests = async () => {
            try {
                const requestsData = await fetchAdoptionRequests();
                setAdoptionRequests(requestsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadAdoptionRequests();
    }, []);

    const handleRequestCreated = (newRequest) => {
        setAdoptionRequests([...adoptionRequests, newRequest]);
    };

    // Render loading, error, or the list of adoption requests
    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="adoptions-page">
            <h1 className="text-center">Adoption Requests</h1>
            <div className="row justify-content-center mb-4">
                <div className="col-md-8">
                    <AdoptionRequestForm onRequestCreated={handleRequestCreated} />
                </div>
            </div>
            <h2 className="text-center">My Adoption Requests</h2>
            <div className="row">
                {adoptionRequests.map((request) => (
                    <div key={request.id} className="col-md-4 mb-3">
                        <AdoptionCard adoption={request} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdoptionsPage;
