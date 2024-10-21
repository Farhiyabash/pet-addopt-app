import React from 'react';
import AdoptionRequestForm from '../components/AdoptionRequestForm';
import AdoptionRequestList from '../components/AdoptionRequestCard';

const AdoptionsPage = () => {
    return (
        <div className="container">
            <h1 className="text-center mb-5">Manage Your Adoption Requests</h1>
            <AdoptionRequestForm />
            <hr />
            <AdoptionRequestList />
        </div>
    );
};

export default AdoptionsPage;
