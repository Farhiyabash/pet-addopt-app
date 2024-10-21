import React, { useState } from 'react';
import { createAdoptionRequest } from '../services/AdoptionRequestService';

const AdoptionRequestForm = () => {
    const [message, setMessage] = useState('');
    const [petId, setPetId] = useState('');
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const requestData = { message, pet_id: petId, user_id: userId };
            const response = await createAdoptionRequest(requestData);
            alert(`Adoption request created: ${JSON.stringify(response)}`);
            setMessage('');
            setPetId('');
            setUserId('');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Create Adoption Request</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Message:</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Pet ID:</label>
                    <input
                        type="number"
                        value={petId}
                        onChange={(e) => setPetId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>User ID:</label>
                    <input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Request</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default AdoptionRequestForm;
