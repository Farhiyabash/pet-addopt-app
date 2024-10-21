// src/components/AdoptionCard.jsx

import React from 'react';

const AdoptionCard = ({ adoption }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Adoption Request for Pet ID: {adoption.pet_id}</h5>
                <p className="card-text">Message: {adoption.message}</p>
                <p className="card-text">Status: {adoption.status}</p> {/* Adjust based on your API response */}
            </div>
        </div>
    );
};

export default AdoptionCard;
