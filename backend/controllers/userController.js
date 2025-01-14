const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// JWT Token oluşturma
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// Kullanıcı Kaydı
const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Lütfen tüm alanları doldurun' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Bu email zaten kayıtlı' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            email,
            password: hashedPassword,
            totalPoints: 0,
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                email: user.email,
                totalPoints: user.totalPoints,
                token: generateToken(user._id),
            });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
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

module.exports = {
    registerUser,
    loginUser
}; 