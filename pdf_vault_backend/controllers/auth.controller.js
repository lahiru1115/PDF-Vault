import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.model.js';
import logger from '../config/logger.config.js';

dotenv.config();

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            logger.error('User already exists');
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();
        logger.info('User signed up successfully');
        res.status(201).json({ message: 'Signed up successfully' });
    } catch (error) {
        logger.error('Server error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            logger.error('Invalid email');
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logger.error('Invalid password');
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const payload = {
            user: {
                id: user._id,
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                logger.info('User logged in successfully');
                res.json({ token, user: { name: user.name }, message: 'Logged in successfully'});
            }
        );
    } catch (error) {
        logger.error('Server error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getUser = (req, res) => {
    res.json(req.user);
};
