import express from 'express';
import upload from '../config/multer.config.js';
import { uploadPdf, listPdfs, getPdf } from '../controllers/pdf.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/uploadPdf', authMiddleware, upload.single('file'), uploadPdf);
router.get('/listPdfs', authMiddleware, listPdfs);
router.get('/getPdf/:id', authMiddleware, getPdf);

export default router;
