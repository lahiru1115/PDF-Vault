import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { signup, login, getUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/getUser', authMiddleware, getUser);

export default router;
