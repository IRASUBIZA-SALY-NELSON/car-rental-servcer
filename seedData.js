import mongoose from 'mongoose';
import Car from './models/Car.js';
import Booking from './models/Booking.js';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const seedSampleData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Get the owner user
    const owner = await User.findOne({ email: 'owner@gmail.com' });

    if (!owner) {
      console.log('Owner not found. Please run seed.js first.');
      return;
    }

    // Clear existing cars and bookings
    await Car.deleteMany({});
    await Booking.deleteMany({});

    console.log('Database cleared successfully');

    console.log('Sample data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedSampleData();
