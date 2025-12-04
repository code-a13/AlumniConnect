import axios from 'axios';

// 1. POINT TO LIVE RENDER SERVER (Not Localhost)
// This fixes the mobile login issue immediately.
const api = axios.create({
    baseURL: 'https://alumniconnect-ub5c.onrender.com/api', 
    headers: {
        'Content-Type': 'application/json'
    }
});

// 2. TOKEN INTERCEPTOR (The Security Stamp)
// Automatically adds the "Authorization" header to every request if you are logged in.
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;