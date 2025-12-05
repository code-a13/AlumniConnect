const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },       // e.g. Software Engineer
    company: { type: String, required: true },     // e.g. Google
    location: { type: String, required: true },    // e.g. Bangalore / Remote
    description: { type: String, required: true }, // Job details
    skills: { type: String, required: true },      // e.g. React, Node.js
    applyLink: { type: String, required: true },   // Google Form or Email
    postedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Links to the User model (Alumni)
        required: true 
    },
    postedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);