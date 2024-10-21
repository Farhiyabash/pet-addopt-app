import React, { useState } from 'react';
import { loginUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated }) => { // Accept setIsAuthenticated as a prop
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = { email, password };
        setLoading(true);

        try {
            const data = await loginUser(credentials);
            localStorage.setItem('access_token', data.accessToken);
            localStorage.setItem('refresh_token', data.refreshToken);
            setIsAuthenticated(true); // Set authenticated state to true
            setSuccess('Successfully logged in!');
            setError('');
            navigate('/pets'); // Redirect to the pets page immediately
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please check your credentials.');
            setSuccess('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container d-flex justify-content-center align-items-center vh-100">
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
                    </div>
                    <button type="submit" className="btn btn-primary btn-block w-100 mt-3" disabled={loading}>
                        {loading ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>
                {success && <div className="alert alert-success mt-3">{success}</div>}
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </div>
        </div>
    );
};

export default LoginPage;
