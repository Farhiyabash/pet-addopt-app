import React, { useEffect, useState } from 'react';
import { fetchAdoptionRequests, deleteAdoptionRequest, updateAdoptionRequest } from '../services/AdoptionRequestService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdoptionRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId] = useState(28); // Replace with the actual logged-in user's ID
    const [updatingRequestId, setUpdatingRequestId] = useState(null);
    const [updatedMessage, setUpdatedMessage] = useState('');

    useEffect(() => {
        const getRequests = async () => {
            try {
                const data = await fetchAdoptionRequests();
                setRequests(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getRequests();
    }, []);

    const notify = (message) => toast(message);

    const handleDelete = async (id) => {
        try {
            await deleteAdoptionRequest(id);
            setRequests(requests.filter((request) => request.id !== id));
            notify('Adoption request deleted successfully!');
        } catch (err) {
            console.error('Failed to delete request:', err);
            notify('Failed to delete request.');
        }
    };

    const handleUpdate = async (id) => {
        const updatedData = { message: updatedMessage, status: "Updated status" }; // Customize as needed
        try {
            const updatedRequest = await updateAdoptionRequest(id, updatedData);
            setRequests(requests.map(request => (request.id === id ? updatedRequest : request)));
            notify('Adoption request updated successfully!');
            setUpdatingRequestId(null);
            setUpdatedMessage('');
        } catch (err) {
            console.error('Failed to update request:', err);
            notify('Failed to update request.');
        }
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-danger">Error: {error}</div>;

    // Filter requests to show only those belonging to the logged-in user
    const filteredRequests = requests.filter(request => request.user_id === userId);

    return (
        <div className="container mt-4">
            <ToastContainer />
            <h2>Adoption Requests</h2>
            <ul className="list-group">
                {filteredRequests.map((request) => (
                    <li key={request.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <p><strong>Message:</strong> {request.message}</p>
                            <p><strong>Status:</strong> {request.status}</p>
                        </div>
                        <div>
                            <button className="btn btn-warning btn-sm me-2" onClick={() => {
                                setUpdatingRequestId(request.id);
                                setUpdatedMessage(request.message); // Pre-fill message for editing
                            }}>Update</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(request.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {updatingRequestId && (
                <div className="mt-4">
                    <h3>Update Request</h3>
                    <input
                        type="text"
                        className="form-control"
                        value={updatedMessage}
                        onChange={(e) => setUpdatedMessage(e.target.value)}
                        placeholder="Enter new message"
                    />
                    <button className="btn btn-primary mt-2" onClick={() => handleUpdate(updatingRequestId)}>Submit Update</button>
                    <button className="btn btn-secondary mt-2 ms-2" onClick={() => setUpdatingRequestId(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default AdoptionRequests;
