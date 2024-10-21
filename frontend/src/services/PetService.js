import axios from 'axios';
import { getAccessToken, isTokenExpired, refreshAccessToken } from '../utils/tokenUtils';

// Base API URL for pets
const API_URL = 'http://127.0.0.1:5000/pets'; // Ensure this is the correct endpoint

// Fetch all pets
export const fetchPets = async () => {
    const token = getAccessToken();

    // Check if the token is expired and refresh if necessary
    if (!token || isTokenExpired(token)) {
        await refreshAccessToken();
    }

    try {
        const newToken = getAccessToken(); // Get the latest token
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${newToken}` },
        });
        console.log('Fetched pets:', response.data); // Log the response to verify
        return response.data; // Return pets data
    } catch (error) {
        console.error('Failed to fetch pets:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch pets');
    }
};

// Fetch a pet by ID
export const fetchPetById = async (petId) => {
    const token = getAccessToken();

    if (!token || isTokenExpired(token)) {
        await refreshAccessToken();
    }

    try {
        const newToken = getAccessToken();
        const response = await axios.get(`${API_URL}/${petId}`, {
            headers: { Authorization: `Bearer ${newToken}` },
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch pet with ID ${petId}:`, error.response?.data || error.message);
        throw new Error(error.response?.data?.message || `Failed to fetch pet with ID ${petId}`);
    }
};

// Add a new pet
export const addPet = async (petData) => {
    const token = getAccessToken();

    if (!token || isTokenExpired(token)) {
        await refreshAccessToken();
    }

    try {
        const newToken = getAccessToken();
        const response = await axios.post(API_URL, petData, {
            headers: { Authorization: `Bearer ${newToken}` },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to add pet:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to add pet');
    }
};

// Update a pet
export const updatePet = async (petId, petData) => {
    const token = getAccessToken();

    if (!token || isTokenExpired(token)) {
        await refreshAccessToken();
    }

    try {
        const newToken = getAccessToken();
        const response = await axios.put(`${API_URL}/${petId}`, petData, {
            headers: { Authorization: `Bearer ${newToken}` },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to update pet:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to update pet');
    }
};

// Delete a pet
export const deletePet = async (petId) => {
    const token = getAccessToken();

    if (!token || isTokenExpired(token)) {
        await refreshAccessToken();
    }

    try {
        const newToken = getAccessToken();
        await axios.delete(`${API_URL}/${petId}`, {
            headers: { Authorization: `Bearer ${newToken}` },
        });
    } catch (error) {
        console.error('Failed to delete pet:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to delete pet');
    }
};
