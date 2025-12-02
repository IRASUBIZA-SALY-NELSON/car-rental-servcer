import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

// Load environment variables
dotenv.config();

const seedUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing users
    await User.deleteMany({});

    // Create a test user
    const hashedPassword = await bcrypt.hash('nelson', 10);
    
    const user = new User({
      name: 'nelson',
      email: 'nelson@gmail.com',
      password: hashedPassword,
      role: 'user'
    });

    await user.save();
    console.log('User seeded successfully');
    
    // Create a test owner
    const owner = new User({
      name: 'nelson',
      email: 'nelson@gmail.com',
      password: await bcrypt.hash('nelson', 10),
      role: 'owner'
    });

    await owner.save();
    console.log('Owner seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding user:', error);
    process.exit(1);
  }
};

seedUser();