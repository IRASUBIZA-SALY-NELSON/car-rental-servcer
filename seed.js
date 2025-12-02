import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const seedUser = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB...');

    // Check if user already exists
    const existingUser = await User.findOne({ email: 'nelson@gmail.com' });
    if (existingUser) {
      console.log('User already exists');
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('nelson', salt);

    // Create new user
    const user = new User({
      name: 'Nelson',
      email: 'nelson@gmail.com',
      password: hashedPassword,
      role: 'user'
    });

    await user.save();
    console.log('User created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding user:', error);
    process.exit(1);
  }
};

seedUser();