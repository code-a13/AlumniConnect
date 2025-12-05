const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const mentorshipRoutes = require('./routes/mentorshipRoutes'); // Properly Imported

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// --- CRITICAL FIX: INCREASE PAYLOAD LIMIT ---
// Default is 100kb. We increase it to 50mb for Base64 Images.
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Middleware
app.use(cors({
  origin: '*', // Allow access from anywhere (Localhost, Vercel, Phone)
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// --- ROUTE CONNECTIONS ---
app.use('/api/auth', authRoutes);       // Auth & Profile
app.use('/api/jobs', jobRoutes);        // Job Portal
app.use('/api/mentorship', mentorshipRoutes); // Mentorship System

// Health Check Route (To see if server is alive)
app.get('/', (req, res) => {
    res.send("AlumniConnect Server is Running with 50MB Upload Limit!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));