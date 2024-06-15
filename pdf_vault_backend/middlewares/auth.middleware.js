import jwt from 'jsonwebtoken';
import logger from '../config/logger.config.js';

const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    
    if (!token) {
        logger.error('No token, authorization denied');
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        logger.info('Token is valid', decoded.user.id);
        req.user = decoded.user;
        next();
    } catch (error) {
        logger.error('Token is not valid:', error);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export default authMiddleware;
