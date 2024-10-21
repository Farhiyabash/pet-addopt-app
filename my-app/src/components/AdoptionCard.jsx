import React from 'react';
import './AdoptionCard.css'; // Custom CSS for extra styles

const AdoptionCard = ({ request }) => {
    return (
        <div className="card adoption-card shadow-sm border-0">
            <div className="card-body">
                <h5 className="card-title text-pink">Request ID: {request.id}</h5>
                <p className="card-text"><strong>Message:</strong> {request.message}</p>
                <p className="card-text">
                    <strong>Status:</strong> 
                    <span className={`badge bg-${request.status === 'Approved' ? 'success' : request.status === 'Pending' ? 'warning' : 'danger'}`}>
                        {request.status}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AdoptionCard;
