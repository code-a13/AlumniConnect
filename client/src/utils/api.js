import axios from 'axios';

// Determine the base URL based on environment
// Ideally use import.meta.env.VITE_API_URL, but let's make it fail-safe for now
const BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api'  // Local Development
  : 'https://alumniconnect-ub5c.onrender.com/api'; // Live Production

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add Token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;