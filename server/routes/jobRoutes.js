const express = require('express');
const router = express.Router();
const { postJob, getAllJobs } = require('../controllers/jobController');
const auth = require('../middleware/authMiddleware'); // Import Security Guard

// Protected Routes (Token Required)
router.post('/create', auth, postJob); // Only logged in users can post
router.get('/all', auth, getAllJobs);  // Only logged in users can view

module.exports = router;