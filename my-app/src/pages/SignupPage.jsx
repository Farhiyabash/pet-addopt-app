import React, { useState } from 'react';
import { registerUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css'; // Import custom CSS
import { Modal, Spinner } from 'react-bootstrap'; // Import Modal and Spinner from Bootstrap

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const [success, setSuccess] = useState(''); // Success message
    const [error, setError] = useState(''); // Error message
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [passwordError, setPasswordError] = useState(''); // Password error message
    const navigate = useNavigate();

    const isStrongPassword = (password) => {
        // Regular expression for a strong password
        const strongPasswordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongPasswordPattern.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isStrongPassword(password)) {
            setPasswordError('Password must be at least 8 characters long, contain letters, numbers, and special characters.');
            return;
        }

        const userData = { name, email, password };
        setLoading(true); // Start loading

        try {
            await registerUser(userData);
            setSuccess('Congratulations! Your account has been successfully created!'); // Set success message
            setError('');
            setPasswordError(''); // Clear password error

            // Show success modal for 2 seconds before redirecting
            setShowModal(true);
            setTimeout(() => {
                navigate('/login'); // Redirect to login page
            }, 3000); // Adjust the time as needed (3000 ms = 3 seconds)
        } catch (error) {
            console.error('Registration failed:', error);
            setError('This email is already in use. Please try another one.'); // Set error message
            setSuccess(''); // Clear any previous success message
            setPasswordError(''); // Clear password error
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleClose = () => setShowModal(false); // Close modal

    return (
        <div className="signup-container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Create Your Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                            placeholder="Create a strong password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordError(''); // Clear error on input change
                            }}
                            required
                        />
                        {passwordError && <small className="text-danger">{passwordError}</small>}
                    </div>
                    <button type="submit" className="btn btn-pink btn-block w-100 mt-3" disabled={loading}>
                        {loading ? (
                            <Spinner animation="border" role="status" size="sm" />
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                </form>
                {success && <div className="alert alert-success mt-3">{success}</div>}
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </div>

            {/* Modal for Successful Registration */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-pink">Registration Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <h5>{success}</h5>
                    <p className="text-muted">You will be redirected to the login page shortly.</p>
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

export default SignUpPage;
