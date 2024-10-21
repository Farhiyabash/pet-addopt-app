import React, { useState } from 'react';
import { createAdoptionRequest } from '../services/AdoptionRequestService';
import './AdoptionRequestForm.css'; // Custom CSS for extra styles
import { Modal, Spinner } from 'react-bootstrap'; // Import Modal and Spinner

const AdoptionRequestForm = () => {
    const [message, setMessage] = useState('');
    const [petId, setPetId] = useState('');
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [loading, setLoading] = useState(false); // Loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); // Set loading state

        try {
            const requestData = { message, pet_id: petId, user_id: userId };
            const response = await createAdoptionRequest(requestData);
            setShowModal(true); // Show modal on successful submission
            setMessage('');
            setPetId('');
            setUserId('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const handleClose = () => setShowModal(false); // Close modal

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
                <button type="submit" className="btn btn-pink w-100">
                    Submit Request
                    {loading && (
                        <Spinner
                            animation="border"
                            role="status"
                            className="ms-2"
                            size="sm"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    )}
                </button>
                {error && <p className="text-danger mt-3 text-center">{error}</p>}
            </form>

            {/* Modal for Submission Confirmation */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-pink">Request Submitted</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <h5>Your adoption request has been successfully submitted!</h5>
                    <p className="text-muted">Thank you for your interest in adopting!</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-pink" onClick={handleClose}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdoptionRequestForm;
