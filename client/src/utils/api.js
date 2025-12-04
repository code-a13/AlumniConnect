import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // This points to your Backend
    headers: {
        'Content-Type': 'application/json'
    }
});

// Automatically add Token to every request if we are logged in
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;