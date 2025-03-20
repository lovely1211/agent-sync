const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Authenticate user and generate JWT token
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Password doesn't match" });
        }

        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET_KEY, 
            { expiresIn: '10d' }
        );

        res.json({ 
            token, 
            user: {
            id: user._id,
            email: user.email
        } });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};
