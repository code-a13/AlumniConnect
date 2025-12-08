import axios from 'axios';

// 1. Define the Root Server URL (For Socket.io)
// This points to the main server, NOT the /api route
const SERVER_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000'  
  : 'https://alumniconnect-ub5c.onrender.com'; 

// 2. Define the API URL (For Axios HTTP calls)
const API_URL = `${SERVER_URL}/api`;

const api = axios.create({
  baseURL: API_URL,
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

// Export SERVER_URL so Chat.jsx and Mentorship.jsx can use it
export { SERVER_URL }; 
export default api;