// src/services/AdoptionRequestService.js

import axios from 'axios';
import { getAccessToken, isTokenExpired, refreshAccessToken } from '../utils/tokenUtils';

const API_URL = 'http://127.0.0.1:5000/adoption-requests'; // Update with your backend API URL

// Fetch all adoption requests
export const fetchAdoptionRequests = async () => {
    const token = getAccessToken();

    if (!token || isTokenExpired(token)) {
        await refreshAccessToken();
    }

    try {
        const newToken = getAccessToken(); // Get new token if refreshed
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${newToken}` },
        });
        return response.data; // Return adoption requests data
    } catch (error) {
        console.error('Failed to fetch adoption requests:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch adoption requests');
    }
};

// Create a new adoption request
export const createAdoptionRequest = async (requestData) => {
    const token = getAccessToken();

    if (!token || isTokenExpired(token)) {
        await refreshAccessToken();
    }

    try {
        const newToken = getAccessToken(); // Get new token if refreshed
        const response = await axios.post(API_URL, requestData, {
            headers: { Authorization: `Bearer ${newToken}` },
        });
        return response.data; // Return the created adoption request data
    } catch (error) {
        console.error('Failed to create adoption request:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to create adoption request');
    }
};

// Update an adoption request
export const updateAdoptionRequest = async (id, requestData) => {
    const token = getAccessToken();

    if (!token || isTokenExpired(token)) {
        await refreshAccessToken();
    }

    try {
        const newToken = getAccessToken(); // Get new token if refreshed
        const response = await axios.put(`${API_URL}/${id}`, requestData, {
            headers: { Authorization: `Bearer ${newToken}` },
        });
        return response.data; // Return the updated adoption request data
    } catch (error) {
        console.error('Failed to update adoption request:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to update adoption request');
    }
};

// Delete an adoption request
export const deleteAdoptionRequest = async (id) => {
    const token = getAccessToken();

    if (!token || isTokenExpired(token)) {
        await refreshAccessToken();
    }

    try {
        const newToken = getAccessToken(); // Get new token if refreshed
        await axios.delete(`${API_URL}/${id}`, {
            headers: { Authorization: `Bearer ${newToken}` },
        });
    } catch (error) {
        console.error('Failed to delete adoption request:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to delete adoption request');
    }
};
