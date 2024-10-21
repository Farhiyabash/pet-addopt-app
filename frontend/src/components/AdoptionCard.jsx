// src/components/AdoptionCard.jsx

import React from 'react';

const AdoptionCard = ({ adoption }) => {
    const { id, petId, userId, status } = adoption;

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h5 className="card-title">Request ID: {id}</h5>
                <p className="card-text">Pet ID: {petId}</p>
                <p className="card-text">User ID: {userId}</p>
                <p className={`card-text text-${status === 'approved' ? 'success' : status === 'declined' ? 'danger' : 'warning'}`}>
                    Status: {status}
                </p>
            </div>
        </div>
    );
};

export default AdoptionCard;
