import multer from 'multer';
import imagekit from './imagekit.js';

// Configure multer to use memory storage
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

// Initialize multer
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

// Middleware to handle ImageKit upload
const uploadToImageKit = async (req, res, next) => {
    if (!req.files || req.files.length === 0) {
        return next();
    }

    try {
        const uploadPromises = req.files.map(file => {
            return new Promise((resolve, reject) => {
                imagekit.upload({
                    file: file.buffer, // Use buffer instead of file path
                    fileName: file.originalname,
                    folder: '/car-rental'
                }, (error, result) => {
                    if (error) return reject(error);
                    resolve({
                        url: result.url,
                        fileId: result.fileId,
                        name: result.name
                    });
                });
            });
        });

        const uploadedFiles = await Promise.all(uploadPromises);
        req.uploadedFiles = uploadedFiles;
        next();
    } catch (error) {
        console.error('ImageKit upload error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to upload files to ImageKit',
            details: error.message 
        });
    }
};

export { uploadToImageKit };
export default upload;