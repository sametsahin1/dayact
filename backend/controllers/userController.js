const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Activity = require('../models/Activity');
const Log = require('../models/Log');

// Register user
const registerUser = async (req, res) => {
    try {
        console.log('Register attempt:', {
            body: req.body,
            headers: req.headers
        });

        const { email, password } = req.body;

        if (!email || !password) {
            console.log('Missing fields:', { email: !!email, password: !!password });
            return res.status(400).json({ 
                message: 'Please add all fields',
                received: { email, password: password ? '[HIDDEN]' : undefined }
            });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log('User already exists:', email);
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            email,
            password: hashedPassword,
        });

        if (user) {
            console.log('User created successfully:', {
                id: user._id,
                email: user.email
            });
            
            res.status(201).json({
                _id: user.id,
                email: user.email,
                token: generateToken(user._id),
            });
        }
    } catch (error) {
        console.error('Register Error:', {
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({ 
            message: 'Server Error', 
            error: error.message,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'abc123', {
        expiresIn: '30d',
    });
};

// Kullanıcı Girişi
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                email: user.email,
                totalPoints: user.totalPoints,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Geçersiz kullanıcı bilgileri' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get user data
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error('GetMe Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update user points
const updatePoints = async (userId, points) => {
    try {
        const user = await User.findById(userId);
        user.totalPoints += points;
        await user.save();
        return user.totalPoints;
    } catch (error) {
        console.error('Update Points Error:', error);
        throw error;
    }
};

// Complete activity ve update points
const completeActivity = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        const { quantity = 1 } = req.body;
        const pointsToAdd = activity.type === 'positive' ? 
            activity.points * quantity : 
            -activity.points * quantity;

        // Update user points
        const newTotalPoints = await updatePoints(req.user.id, pointsToAdd);

        // Create log
        await Log.create({
            user: req.user.id,
            activity: activity._id,
            points: pointsToAdd,
            quantity,
            type: activity.type
        });

        res.json({ 
            activityId: activity._id,
            pointsEarned: pointsToAdd,
            newTotalPoints,
            quantity
        });
    } catch (error) {
        console.error('Complete Activity Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    completeActivity
}; 