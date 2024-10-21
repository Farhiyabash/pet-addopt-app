import React, { useState } from 'react';
import { loginUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css'; // Use the same CSS file for consistent styling
import { Modal, Spinner } from 'react-bootstrap'; // Import Modal and Spinner from Bootstrap
import Confetti from 'react-confetti'; // Import confetti package

const LoginPage = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(''); // Success message
    const [error, setError] = useState(''); // Error message
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const navigate = useNavigate();

    const isStrongPassword = (password) => {
        // Regular expression for a strong password
        const strongPasswordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongPasswordPattern.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isStrongPassword(password)) {
            setError('Password must be at least 8 characters long, contain letters, numbers, and special characters.');
            return;
        }

        const credentials = { email, password };
        setLoading(true);

        try {
            const data = await loginUser(credentials);
            localStorage.setItem('access_token', data.accessToken);
            localStorage.setItem('refresh_token', data.refreshToken);
            setIsAuthenticated(true); // Set authenticated state to true
            
            // Show success message and modal
            setSuccess('🎉🌸 Successfully logged in! Welcome back! 🌸🎉'); // Add emojis
            setError('');
            setShowModal(true);
            setTimeout(() => {
                navigate('/pets'); // Redirect to the pets page after modal is shown
            }, 3000); // Adjust the time as needed (3000 ms = 3 seconds)
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please check your credentials.');
            setSuccess('');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => setShowModal(false); // Close modal

    return (
        <div className="signup-container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Login to Your Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <small className="text-danger">{error}</small>} {/* Display password error */}
                    </div>
                    <button type="submit" className="btn btn-pink btn-block w-100 mt-3" disabled={loading}>
                        {loading ? (
                            <Spinner animation="border" role="status" size="sm" />
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>
                {success && <div className="alert alert-success mt-3">{success}</div>}
            </div>

            {/* Modal for Successful Login */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-pink">Login Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <h5>{success}</h5>
                    <p className="text-muted">You will be redirected to your pets shortly.</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-pink" onClick={handleClose}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>

            {/* Confetti effect */}
            {showModal && <Confetti />}
        </div>
    );
};

export default LoginPage;
