import React, { useState } from 'react';
import { createAdoptionRequest } from '../services/AdoptionRequestService';
import './AdoptionRequestForm.css'; // Custom CSS for extra styles

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
        <div className="adoption-form-container p-4 shadow-sm rounded bg-white my-5">
            <h2 className="mb-4 text-center text-pink">Create Adoption Request</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Message:</label>
                    <textarea
                        className="form-control"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Pet ID:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={petId}
                        onChange={(e) => setPetId(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">User ID:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-pink w-100">Submit Request</button>
                {error && <p className="text-danger mt-3 text-center">{error}</p>}
            </form>
        </div>
    );
};

export default AdoptionRequestForm;
