// tokenUtils.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'; // Update with your backend API URL

// Function to get access token from local storage
export const getAccessToken = () => {
    return localStorage.getItem('token');
};

// Function to get refresh token from local storage
export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};

// Function to set access token in local storage
export const setAccessToken = (token) => {
    localStorage.setItem('token', token);
};

// Function to set refresh token in local storage
export const setRefreshToken = (token) => {
    localStorage.setItem('refreshToken', token);
};

// Function to clear tokens from local storage
export const clearTokens = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
};

// Function to check if access token is expired
export const isTokenExpired = (token) => {
    if (!token) return true; // Token is expired if it doesn't exist
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= tokenPayload.exp * 1000;
};

// Function to refresh the access token
export const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        throw new Error('No refresh token found.');
    }

    try {
        const response = await axios.post(`${API_URL}/refresh`, {}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });
        setAccessToken(response.data.access_token);
        return response.data.access_token; // Return new access token
    } catch (error) {
        clearTokens(); // Clear tokens if refresh fails
        console.error('Token refresh failed:', error.response?.data || error.message);
        throw new Error('Token refresh failed. Please log in again.');
    }
};