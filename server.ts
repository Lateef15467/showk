
/**
 * MERN Backend Server Entry Point (Express)
 */
// import express from 'express';
// import mongoose from 'mongoose';
// import authRoutes from './backend/routes/authRoutes';
// import productRoutes from './backend/routes/productRoutes';

const expressMock = () => {
  console.log("Express Server Initialized...");
  console.log("Connecting to MongoDB at mongodb://localhost:27017/showk-view...");
  
  // App Config
  // app.use(express.json());
  // app.use('/api/auth', authRoutes);
  // app.use('/api/products', productRoutes);
  
  // Start
  // app.listen(5000, () => console.log('Server running on port 5000'));
};

expressMock();
