import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    idNumber: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    alternatePhone: {
        type: String
    },
    preferredDeliveryDate: {
        type: String,
        required: true
    },
    insuranceOption: {
        type: String,
        default: 'basic'
    },
    warrantyOption: {
        type: String,
        default: '1year'
    },
    financingOption: {
        type: Boolean,
        default: false
    },
    paymentMethod: {
        type: String,
        default: 'bank_transfer'
    },
    billingAddress: {
        type: String
    },
    termsAccepted: {
        type: Boolean,
        required: true
    },
    privacyAccepted: {
        type: Boolean,
        required: true
    },
    purchasePrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;
