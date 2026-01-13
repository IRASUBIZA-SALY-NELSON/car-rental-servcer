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
    if (!req.files) {
        return next();
    }

    try {
        const uploadedFiles = {};

        // Handle fields (upload.fields)
        if (!Array.isArray(req.files)) {
            const fieldNames = Object.keys(req.files);

            for (const fieldName of fieldNames) {
                const files = req.files[fieldName];
                const uploadPromises = files.map(file => {
                    return new Promise((resolve, reject) => {
                        imagekit.upload({
                            file: file.buffer,
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

                uploadedFiles[fieldName] = await Promise.all(uploadPromises);
            }
        } else {
            // Handle array (upload.array)
            const uploadPromises = req.files.map(file => {
                return new Promise((resolve, reject) => {
                    imagekit.upload({
                        file: file.buffer,
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

            uploadedFiles.array = await Promise.all(uploadPromises);
        }

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
