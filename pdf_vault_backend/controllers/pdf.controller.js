import fs from 'fs';
import crypto from 'crypto';
import Pdf from '../models/Pdf.model.js';
import logger from '../config/logger.config.js';

export const uploadPdf = async (req, res) => {
    const { title } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        const pdfPath = req.file.path;
        const pdfBuffer = fs.readFileSync(pdfPath);

        const algorithm = 'aes-256-cbc';
        const key = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        const encryptedPdfBuffer = Buffer.concat([cipher.update(pdfBuffer), cipher.final()]);

        const newPdf = new Pdf({
            user: req.user.id,
            title,
            path: pdfPath + '.enc',
            key: key.toString('hex'),
            iv: iv.toString('hex'),
        });

        await newPdf.save();

        fs.writeFileSync(pdfPath + '.enc', encryptedPdfBuffer);

        fs.unlinkSync(pdfPath);

        logger.info('PDF uploaded and encrypted successfully');
        res.status(201).json({ message: 'PDF uploaded successfully', pdf: newPdf });
    } catch (error) {
        logger.error('Error uploading PDF:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const listPdfs = async (req, res) => {
    try {
        const pdfs = await Pdf.find({ user: req.user.id });
        logger.info('PDFs fetched successfully');
        res.status(200).json(pdfs);
    } catch (error) {
        logger.error('Error fetching PDFs:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getPdf = async (req, res) => {
    try {
        const pdf = await Pdf.findById(req.params.id);
        if (!pdf) {
            logger.error('PDF not found');
            return res.status(404).json({ message: 'PDF not found' });
        }

        const encryptedPdfBuffer = fs.readFileSync(pdf.path);

        const algorithm = 'aes-256-cbc';
        const key = Buffer.from(pdf.key, 'hex');
        const iv = Buffer.from(pdf.iv, 'hex');
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        const decryptedPdfBuffer = Buffer.concat([decipher.update(encryptedPdfBuffer), decipher.final()]);

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `inline; filename=${pdf._id}.pdf`,
            'Content-Length': decryptedPdfBuffer.length
        });

        res.send(decryptedPdfBuffer);

        logger.info('PDF viewed and decrypted successfully');
    } catch (error) {
        logger.error('Error viewing PDF:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
