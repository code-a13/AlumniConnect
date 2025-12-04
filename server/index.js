const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Make sure this is imported
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();

// --- CORS FIX START ---
app.use(cors({
  origin: '*', // Allow access from ANYWHERE (Phone, Laptop, Vercel)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow these actions
  credentials: true
}));
// --- CORS FIX END ---

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Simple Route to check if server is alive
app.get('/', (req, res) => {
    res.send("AlumniConnect Server is Running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));