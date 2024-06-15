import { Router } from 'express';
import authRoutes from '../routes/auth.routes.js';
import pdfRoutes from '../routes/pdf.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/pdf', pdfRoutes);

export default router;
