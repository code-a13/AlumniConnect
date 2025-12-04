const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['Student', 'Alumni', 'Admin'], 
        default: 'Student' 
    },
    isApproved: { type: Boolean, default: false },
    
    // --- NEW FIELDS (Important for Registration) ---
    department: { type: String, required: true }, // e.g., CSE
    batch: { type: String, required: true },      // e.g., 2025
    
    // Optional fields (Only for specific roles)
    rollNumber: { type: String },                 
    currentCompany: { type: String },             
    jobRole: { type: String }                     

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);