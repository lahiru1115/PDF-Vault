import mongoose from 'mongoose';

const pdfSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    iv: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Pdf = mongoose.model('Pdf', pdfSchema);

export default Pdf;
