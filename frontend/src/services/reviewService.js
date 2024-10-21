import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your API base URL

// Get All Reviews
export const getReviews = async (token) => {
    const response = await axios.get(`${API_URL}/reviews`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

// Create a Review
export const createReview = async (reviewData, token) => {
    const response = await axios.post(`${API_URL}/reviews`, reviewData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

// Update a Review
export const updateReview = async (id, reviewData, token) => {
    const response = await axios.put(`${API_URL}/reviews/${id}`, reviewData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

// Delete a Review
export const deleteReview = async (id, token) => {
    const response = await axios.delete(`${API_URL}/reviews/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};