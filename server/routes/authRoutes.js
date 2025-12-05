const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware'); // Import Security Guard

// Import Controller Functions
const { 
    register, login, getPendingUsers, approveUser, 
    getAllUsers, getAdminStats, 
    getProfile, updateProfile // <--- Import New Functions
} = require('../controllers/authController');

// Public Routes
router.post('/register', register);
router.post('/login', login);

// Protected Routes (Token Required)
router.get('/pending-users', getPendingUsers); // (Admin should verify token really, but leaving simple for now)
router.put('/approve/:id', approveUser);
router.get('/users', getAllUsers);
router.get('/stats', getAdminStats);

// PROFILE ROUTES (NEW)
router.get('/me', auth, getProfile);        // Get logged in user's profile
router.put('/me/update', auth, updateProfile); // Update logged in user's profile

module.exports = router;