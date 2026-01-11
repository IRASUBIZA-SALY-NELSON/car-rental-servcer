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

    // Add sample cars
    const cars = [
      {
        brand: 'Toyota',
        model: 'Hilux',
        carNumber: '1',
        year: 2022,
        category: 'Pickup Truck',
        seating_capacity: 4,
        fuel_type: 'Diesel',
        transmission: 'Manual',
        pricePerDay: 45000,
        purchasePrice: 15000000,
        location: 'Kigali',
        description: 'Modified Toyota Hilux in excellent condition',
        isAvailable: true,
        owner: owner._id,
        images: ['https://ik.imagekit.io/1pb8aecil/car1a.jpg'],
        image: 'https://ik.imagekit.io/1pb8aecil/car1a.jpg'
      },
      {
        brand: 'Honda',
        model: 'Civic',
        carNumber: '2',
        year: 2023,
        category: 'Sedan',
        seating_capacity: 5,
        fuel_type: 'Petrol',
        transmission: 'Automatic',
        pricePerDay: 40000,
        purchasePrice: 14000000,
        location: 'Kigali',
        description: 'Well-maintained Honda Civic',
        isAvailable: true,
        owner: owner._id,
        images: ['https://ik.imagekit.io/1pb8aecil/car2a.jpg'],
        image: 'https://ik.imagekit.io/1pb8aecil/car2a.jpg'
      },
      {
        brand: 'BMW',
        model: 'X3',
        carNumber: '3',
        year: 2023,
        category: 'SUV',
        seating_capacity: 5,
        fuel_type: 'Diesel',
        transmission: 'Automatic',
        pricePerDay: 75000,
        purchasePrice: 28000000,
        location: 'Kigali',
        description: 'Luxury BMW X3 SUV',
        isAvailable: true,
        owner: owner._id,
        images: ['https://ik.imagekit.io/1pb8aecil/car3a.jpg'],
        image: 'https://ik.imagekit.io/1pb8aecil/car3a.jpg'
      },
      {
        brand: 'Mercedes',
        model: 'C-Class',
        carNumber: '4',
        year: 2022,
        category: 'Sedan',
        seating_capacity: 5,
        fuel_type: 'Petrol',
        transmission: 'Automatic',
        pricePerDay: 65000,
        purchasePrice: 25000000,
        location: 'Kigali',
        description: 'Luxury Mercedes C-Class sedan',
        isAvailable: true,
        owner: owner._id,
        images: ['https://ik.imagekit.io/1pb8aecil/car4a.jpg'],
        image: 'https://ik.imagekit.io/1pb8aecil/car4a.jpg'
      },
      {
        brand: 'Toyota',
        model: 'Land Cruiser',
        carNumber: '5',
        year: 2023,
        category: 'SUV',
        seating_capacity: 7,
        fuel_type: 'Diesel',
        transmission: 'Automatic',
        pricePerDay: 80000,
        purchasePrice: 30000000,
        location: 'Kigali',
        description: 'Toyota Land Cruiser off-road SUV',
        isAvailable: true,
        owner: owner._id,
        images: ['https://ik.imagekit.io/1pb8aecil/car5a.jpg'],
        image: 'https://ik.imagekit.io/1pb8aecil/car5a.jpg'
      },
      {
        brand: 'Nissan',
        model: 'Patrol',
        carNumber: '6',
        year: 2022,
        category: 'SUV',
        seating_capacity: 7,
        fuel_type: 'Diesel',
        transmission: 'Automatic',
        pricePerDay: 70000,
        purchasePrice: 26000000,
        location: 'Kigali',
        description: 'Nissan Patrol 4x4 SUV',
        isAvailable: true,
        owner: owner._id,
        images: ['https://ik.imagekit.io/1pb8aecil/car6a.jpg'],
        image: 'https://ik.imagekit.io/1pb8aecil/car6a.jpg'
      },
      {
        brand: 'Honda',
        model: 'CR-V',
        carNumber: '7',
        year: 2023,
        category: 'SUV',
        seating_capacity: 5,
        fuel_type: 'Petrol',
        transmission: 'Automatic',
        pricePerDay: 55000,
        purchasePrice: 20000000,
        location: 'Kigali',
        description: 'Honda CR-V compact SUV',
        isAvailable: true,
        owner: owner._id,
        images: ['https://ik.imagekit.io/1pb8aecil/car7a.jpg'],
        image: 'https://ik.imagekit.io/1pb8aecil/car7a.jpg'
      },
      {
        brand: 'Toyota',
        model: 'Corolla',
        carNumber: '8',
        year: 2023,
        category: 'Sedan',
        seating_capacity: 5,
        fuel_type: 'Petrol',
        transmission: 'Automatic',
        pricePerDay: 35000,
        purchasePrice: 12000000,
        location: 'Kigali',
        description: 'Toyota Corolla reliable sedan',
        isAvailable: true,
        owner: owner._id,
        images: ['https://ik.imagekit.io/1pb8aecil/car8a.jpg'],
        image: 'https://ik.imagekit.io/1pb8aecil/car8a.jpg'
      },
      {
        brand: 'BMW',
        model: 'X5',
        carNumber: '9',
        year: 2023,
        category: 'SUV',
        seating_capacity: 5,
        fuel_type: 'Diesel',
        transmission: 'Automatic',
        pricePerDay: 85000,
        purchasePrice: 32000000,
        location: 'Kigali',
        description: 'BMW X5 luxury SUV',
        isAvailable: true,
        owner: owner._id,
        images: ['https://ik.imagekit.io/1pb8aecil/car9a.jpg'],
        image: 'https://ik.imagekit.io/1pb8aecil/car9a.jpg'
      },
      {
        brand: 'Volkswagen',
        model: 'Golf',
        carNumber: '10',
        year: 2023,
        category: 'Hatchback',
        seating_capacity: 5,
        fuel_type: 'Petrol',
        transmission: 'Manual',
        pricePerDay: 30000,
        purchasePrice: 10000000,
        location: 'Kigali',
        description: 'Volkswagen Golf compact hatchback',
        isAvailable: true,
        owner: owner._id,
        images: ['https://ik.imagekit.io/1pb8aecil/car10a.jpg'],
        image: 'https://ik.imagekit.io/1pb8aecil/car10a.jpg'
      }
    ];

    const createdCars = await Car.insertMany(cars);
    console.log('Sample cars created successfully');

    // Add sample bookings
    const bookings = [
      {
        car: createdCars[0]._id,
        user: owner._id,
        owner: owner._id,
        pickupDate: new Date('2025-01-15'),
        returnDate: new Date('2025-01-17'),
        status: 'confirmed',
        price: 90000,
        createdAt: new Date()
      },
      {
        car: createdCars[1]._id,
        user: owner._id,
        owner: owner._id,
        pickupDate: new Date('2025-01-10'),
        returnDate: new Date('2025-01-12'),
        status: 'pending',
        price: 80000,
        createdAt: new Date()
      },
      {
        car: createdCars[2]._id,
        user: owner._id,
        owner: owner._id,
        pickupDate: new Date('2025-01-05'),
        returnDate: new Date('2025-01-07'),
        status: 'confirmed',
        price: 150000,
        createdAt: new Date()
      }
    ];

    await Booking.insertMany(bookings);
    console.log('Sample bookings created successfully');

    console.log('Sample data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedSampleData();
