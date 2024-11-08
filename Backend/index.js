import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoute.js';
import morgan from 'morgan';
import path from 'path'; // Import path module to manage file paths

dotenv.config(); // Load environment variables
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoutes);

// Serve the products.json file when accessing /api/v1/products
app.get('/api/v1/products', (req, res) => {
  // Use path.resolve() to get the absolute path to products.json
  const productsPath = path.resolve('data', 'products.json'); // Absolute path
  
  // Send the products.json file as a response
  res.sendFile(productsPath, (err) => {
    if (err) {
      res.status(500).send('Error in loading products.json');
    }
  });
});

// Basic route for testing
app.get("/", (req, res) => {
  res.send("<h1>Welcome to my webpage</h1>");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
