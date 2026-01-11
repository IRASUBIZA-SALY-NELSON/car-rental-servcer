import Car from "../models/Car.js";
import User from "../models/User.js";
import Purchase from "../models/Purchase.js";

// API to Create Purchase
export const createPurchase = async (req, res) => {
    try {
        const { _id } = req.user;
        const {
            car,
            fullName,
            email,
            idNumber,
            dateOfBirth,
            deliveryAddress,
            city,
            postalCode,
            country,
            location,
            phoneNumber,
            alternatePhone,
            preferredDeliveryDate,
            insuranceOption,
            warrantyOption,
            financingOption,
            paymentMethod,
            billingAddress,
            termsAccepted,
            privacyAccepted
        } = req.body;

        // Validate required fields
        if (!car || !fullName || !email || !idNumber || !dateOfBirth || !deliveryAddress || !city || !postalCode || !country || !location || !phoneNumber || !preferredDeliveryDate) {
            return res.status(400).json({ success: false, message: "Please fill all required fields" });
        }

        // Check if car exists and is available
        const carData = await Car.findById(car);
        if (!carData) {
            return res.status(404).json({ success: false, message: "Car not found" });
        }

        // Create purchase
        const purchase = await Purchase.create({
            user: _id,
            car,
            fullName,
            email,
            idNumber,
            dateOfBirth,
            deliveryAddress,
            city,
            postalCode,
            country,
            location,
            phoneNumber,
            alternatePhone,
            preferredDeliveryDate,
            insuranceOption,
            warrantyOption,
            financingOption,
            paymentMethod,
            billingAddress,
            termsAccepted,
            privacyAccepted,
            purchasePrice: carData.purchasePrice,
            status: "pending"
        });

        res.json({ success: true, message: "Purchase request submitted successfully!", purchase });

    } catch (error) {
        console.error('Error in createPurchase:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// API to Get User Purchases
export const getUserPurchases = async (req, res) => {
    try {
        const { _id } = req.user;
        
        const purchases = await Purchase.find({ user: _id })
            .populate('car', 'brand model year image')
            .sort({ createdAt: -1 });
            
        res.json({ success: true, purchases });
    } catch (error) {
        console.error('Error in getUserPurchases:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
