const express = require('express');
const router = express.Router();

// IMPORTANT: Make sure all 4 functions are imported here!
const { 
    register, 
    login, 
    getPendingUsers, 
    approveUser ,
    getAllUsers,
    getAdminStats
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

// Admin Routes (Protected)
router.get('/pending-users', getPendingUsers);
router.put('/approve/:id', approveUser);

module.exports = router;


// ... existing routes ...

// Add these new Admin Routes
router.get('/users', getAllUsers);      // API to get list of students/alumni
router.get('/stats', getAdminStats);    // API for Dashboard counts