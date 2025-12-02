import express from "express";
import { protect } from "../middleware/auth.js";
import { addCar, changeRoleToOwner, deleteCar, getDashboardData, getOwnerCars, toggleCarAvailability, updateUserImage } from "../controllers/ownerController.js";
import { uploadToImageKit } from "../configs/multer.js";
import upload from "../configs/multer.js";

const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, changeRoleToOwner)
ownerRouter.post('/add-car', 
    protect,
    upload.array('images', 5),
    uploadToImageKit,
    addCar
);
ownerRouter.get("/cars", protect, getOwnerCars)
ownerRouter.post("/toggle-car", protect, toggleCarAvailability)
ownerRouter.post("/delete-car", protect, deleteCar)

ownerRouter.get('/dashboard', protect, getDashboardData)
ownerRouter.post('/update-image', upload.single("image"), protect, updateUserImage)

export default ownerRouter;