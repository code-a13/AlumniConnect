const User = require('../models/User');
const Job = require('../models/Job'); // IMPORTED FOR STATS
const Mentorship = require('../models/Mentorship'); // IMPORTED FOR STATS
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTER LOGIC
exports.register = async (req, res) => {
    try {
        const { 
            name, email, password, role, 
            department, batch, rollNumber, currentCompany, jobRole 
        } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name, email, password: hashedPassword, role,
            isApproved: false, // Strict Admin Approval
            department, batch, 
            rollNumber: role === 'Student' ? rollNumber : undefined,
            currentCompany: role === 'Alumni' ? currentCompany : undefined,
            jobRole: role === 'Alumni' ? jobRole : undefined
        });

        await user.save();
        res.status(201).json({ message: "Registration successful! Wait for Admin approval." });

    } catch (error) {
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
                id: user._id, name: user.name, role: user.role,
                department: user.department, profileImage: user.profileImage
            } 
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// 3. GET DASHBOARD STATS (Dynamic & Role Based)
exports.getDashboardStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const role = req.user.role;

        // Common Stat: Total Active Jobs
        const jobCount = await Job.countDocuments() || 0;

        let stats = {};

        if (role === 'Student') {
            // Student sees: Active Jobs & My Requests
            const myMentorships = await Mentorship.countDocuments({ studentId: userId });
            stats = {
                card1: { label: "Active Jobs", value: jobCount },
                card2: { label: "My Mentorships", value: myMentorships },
                card3: { label: "Events", value: 3 }
            };
        } else if (role === 'Alumni') {
            // Alumni sees: Total Students & Active Jobs
            const studentCount = await User.countDocuments({ role: 'Student' });
            stats = {
                card1: { label: "Total Students", value: studentCount },
                card2: { label: "Active Jobs", value: jobCount },
                card3: { label: "Events", value: 3 }
            };
        } else {
            // Admin sees everything
            const userCount = await User.countDocuments();
            stats = {
                card1: { label: "Total Users", value: userCount },
                card2: { label: "Total Jobs", value: jobCount },
                card3: { label: "Pending Approvals", value: 0 }
            };
        }

        res.json(stats);

    } catch (error) {
        console.error("Stats Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// 4. UPDATE PROFILE (With Image Persistence)
exports.updateProfile = async (req, res) => {
    try {
        const { name, bio, skills, about, location, socialLinks, department, batch, rollNumber, currentCompany, jobRole, profileImage } = req.body;
        
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { 
                $set: { 
                    name, bio, skills, about, location, socialLinks,
                    department, batch, rollNumber, currentCompany, jobRole,
                    profileImage // Saves the image to DB
                } 
            },
            { new: true, runValidators: true }
        ).select('-password');

        res.json({ message: "Profile Updated Successfully!", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 5. GET MY PROFILE
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// 6. GET ALL USERS (Directory)
exports.getAllUsers = async (req, res) => {
    try {
        const { role } = req.query; 
        const users = await User.find({ role }).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// 7. GET PENDING USERS (Admin)
exports.getPendingUsers = async (req, res) => {
    try {
        const users = await User.find({ isApproved: false }).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// 8. APPROVE USER (Admin)
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

// 9. GET ADMIN STATS
exports.getAdminStats = async (req, res) => {
    try {
        const studentCount = await User.countDocuments({ role: 'Student' });
        const alumniCount = await User.countDocuments({ role: 'Alumni' });
        const pendingCount = await User.countDocuments({ isApproved: false });
        res.json({ students: studentCount, alumni: alumniCount, pending: pendingCount });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};