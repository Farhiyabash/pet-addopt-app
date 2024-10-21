import React, { useState } from 'react';
import { createAdoptionRequest } from '../services/AdoptionRequestService';
import Alert from './Alert';

const AdoptionRequestForm = () => {
    const [petId, setPetId] = useState('');
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            const response = await createAdoptionRequest({ petId, userId, message });
            setStatus(response.status);
            setSuccess(true);
            setPetId('');
            setUserId('');
            setMessage('');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="adoption-request-form card p-4 shadow">
            <h2>Submit an Adoption Request</h2>
            {error && <Alert message={error} type="danger" />}
            {success && <Alert message="Adoption request submitted successfully!" type="success" />}
            {status && <p className={`status-${status.toLowerCase()}`}>Status: {status}</p>}

            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label htmlFor="petId" className="form-label">Pet ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="petId"
                        value={petId}
                        onChange={(e) => setPetId(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="userId" className="form-label">User ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                        className="form-control"
                        id="message"
                        rows="3"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit Request</button>
            </form>
        </div>
    );
};

export default AdoptionRequestForm;
