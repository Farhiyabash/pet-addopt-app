import axios from 'axios';
import {
    getAccessToken,
    setAccessToken,
    setRefreshToken,
    refreshAccessToken,
    clearTokens,
    isTokenExpired,
} from '../utils/tokenUtils';

const API_URL = 'http://127.0.0.1:5000'; // Update with your backend API URL

// Register a new user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Return the response data for further use
    } catch (error) {
        console.error('Registration failed:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Registration failed'); // Customize this based on your API
    }
};

// Login a user
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        setAccessToken(response.data.access_token); // Set access token
        setRefreshToken(response.data.refresh_token); // Set refresh token
        return response.data; // Should return access token and refresh token
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Login failed'); // Customize this based on your API
    }
};

// Get user profile
export const getUserProfile = async () => {
    const token = getAccessToken();
    
    if (!token || isTokenExpired(token)) {
        // Token expired or not present, attempt to refresh
        await refreshAccessToken();
    }

    try {
        const newToken = getAccessToken(); // Get new token if refreshed
        const response = await axios.get(`${API_URL}/users/profile`, {
            headers: { Authorization: `Bearer ${newToken}` },
        });
        return response.data; // Return user profile data
    } catch (error) {
        console.error('Failed to fetch user profile:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch user profile'); // Customize this based on your API
    }
};

// Logout function
export const logoutUser = () => {
    clearTokens(); // Clear tokens
    // Redirect to login or homepage
    window.location.href = '/'; // Adjust based on your routing setup
};