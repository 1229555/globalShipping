const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { userid, password, admintype } = req.body;

    if (!userid || !password || !admintype) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ userid });
        if (existingUser) {
            return res.status(409).json({ message: 'User ID already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            userid,
            password: hashedPassword,
            admintype,
        });

        await newUser.save();
        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const loginUser = async (req, res) => {
    const { userid, password } = req.body;

    if (!userid || !password) {
        return res.status(400).json({ message: 'User ID and password are required' });
    }

    try {
        const user = await User.findOne({ userid });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(404).json({ message: 'User not found or invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, '1234', { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { userid: user.userid, admintype: user.admintype },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
