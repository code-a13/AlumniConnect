const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTER LOGIC
exports.register = async (req, res) => {
    try {
        // Receive all new fields
        const { 
            name, email, password, role, 
            department, batch, rollNumber, currentCompany, jobRole 
        } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create User (With Strict Approval Logic)
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            isApproved: false, // Always pending initially
            department,
            batch,
            // Save these only if they exist
            rollNumber: role === 'Student' ? rollNumber : undefined, 
            currentCompany: role === 'Alumni' ? currentCompany : undefined, 
            jobRole: role === 'Alumni' ? jobRole : undefined
        });

        await user.save();

        res.status(201).json({ message: "Registration successful! Wait for Admin approval." });

    } catch (error) {
        console.error("Register Error:", error); // Log error to terminal
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 2. LOGIN LOGIC
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

        if (user.isApproved === false) {
            return res.status(403).json({ message: "Your account is pending Admin approval." });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.status(200).json({ 
            token, 
            user: { 
                id: user._id, 
                name: user.name, 
                role: user.role,
                department: user.department 
            } 
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// 3. GET PENDING USERS (For Admin)
exports.getPendingUsers = async (req, res) => {
    try {
        const users = await User.find({ isApproved: false }).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// 4. APPROVE USER
exports.approveUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.isApproved = true;
        await user.save();

        res.json({ message: "User approved successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// 5. GET ALL USERS (For Directory)
exports.getAllUsers = async (req, res) => {
    try {
        const { role } = req.query; 
        const users = await User.find({ role }).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// 6. GET STATS (For Dashboard)
exports.getAdminStats = async (req, res) => {
    try {
        const studentCount = await User.countDocuments({ role: 'Student' });
        const alumniCount = await User.countDocuments({ role: 'Alumni' });
        const pendingCount = await User.countDocuments({ isApproved: false });
        
        res.json({
            students: studentCount,
            alumni: alumniCount,
            pending: pendingCount
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};