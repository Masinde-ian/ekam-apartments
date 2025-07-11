import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with your API base URL

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Example function to make a GET request
export const fetchData = async (endpoint) => {
    try {
        const response = await apiClient.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// Example function to make a POST request
export const postData = async (endpoint, data) => {
    try {
        const response = await apiClient.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

// Example function to make a PUT request
export const updateData = async (endpoint, data) => {
    try {
        const response = await apiClient.put(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
};

// Example function to make a DELETE request
export const deleteData = async (endpoint) => {
    try {
        const response = await apiClient.delete(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
};