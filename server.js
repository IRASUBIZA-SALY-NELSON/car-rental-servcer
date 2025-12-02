import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import multer, { uploadToImageKit } from './configs/multer.js';
import path from 'path';
import { fileURLToPath } from 'url';
import Car from './models/Car.js'; // Make sure this import exists

const app = express();

// Database connection
await connectDB();
console.log('✅ Database Connected');

// Middleware
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
console.log('📂 Serving static files from:', path.join(process.cwd(), 'uploads'));

// Routes
app.get('/', (req, res) => {
  console.log('🌐 Root route accessed');
  res.send("Server is running");
});

// Get all cars
app.get('/api/cars', async (req, res) => {
  try {
    console.log('🚗 Fetching cars...');
    const cars = await Car.find({});
    console.log(`✅ Found ${cars.length} cars`);
    res.json(cars);
  } catch (error) {
    console.error('❌ Error fetching cars:', error.message);
    res.status(500).json({ error: 'Failed to fetch cars', details: error.message });
  }
});

// Other routes
app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/bookings', bookingRouter);

app.post('/api/owner/add-car', 
    multer.array('images', 5),
    uploadToImageKit,
    (req, res) => {
        try {
            if (!req.uploadedFiles || req.uploadedFiles.length === 0) {
                throw new Error('No files were uploaded');
            }
            
            console.log('✅ Files uploaded to ImageKit:', req.uploadedFiles);
            res.json({ 
                success: true, 
                files: req.uploadedFiles 
            });
        } catch (error) {
            console.error('Upload error:', error);
            res.status(500).json({ 
                success: false, 
                error: error.message || 'Failed to process upload' 
            });
        }
    }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Access the server at: http://localhost:${PORT}`);
});