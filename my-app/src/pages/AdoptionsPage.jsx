import React from 'react';
import AdoptionRequestForm from '../components/AdoptionRequestForm';
import AdoptionRequestList from '../components/AdoptionRequestList';

const AdoptionsPage = () => {
    return (
        <div>
            <h1>Adoption Requests</h1>
            <AdoptionRequestForm />
            <AdoptionRequestList />
        </div>
    );
};

export default AdoptionsPage;
