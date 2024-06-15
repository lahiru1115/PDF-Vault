import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');
        const formattedDateTime = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;

        const { name, ext } = path.parse(file.originalname);
        const newFileName = `${formattedDateTime}-${name}${ext}`;
        
        cb(null, newFileName);
    }
});

const fileFilter = (req, file, cb) => {
    const filetypes = /pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    }
    cb('Error: File upload only supports the following filetypes - ' + filetypes);
};

const upload = multer({
    storage,
    limits: { fileSize: 5000000 }, // 5MB file size limit
    fileFilter
});

export default upload;
