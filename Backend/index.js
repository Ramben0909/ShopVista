import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoute.js';
import morgan from 'morgan';
import path from 'path'; // Import path module to manage file paths
import fs from 'fs'; // Import fs to read JSON file

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

// Route to get all products
app.get('/api/v1/products', (req, res) => {
  // Use path.resolve() to get the absolute path to products.json
  const productsPath = path.resolve('data', 'products.json'); // Absolute path
  
  // Read the products.json file asynchronously
  fs.readFile(productsPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send('Error loading products data');
    }
    const products = JSON.parse(data);
    res.json(products); // Send the list of products as a response
  });
});

// Route to get a product by its ID
app.get('/api/v1/products/:id', (req, res) => {
  const { id } = req.params; // Get the product ID from the URL
  
  // Use path.resolve() to get the absolute path to products.json
  const productsPath = path.resolve('data', 'products.json'); // Absolute path
  
  // Read the products.json file asynchronously
  fs.readFile(productsPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send('Error loading products data');
    }
    const products = JSON.parse(data);
    // Find the product by its ID
    const product = products.find((product) => product.product_id === id);
    
    if (product) {
      res.json(product); // Send the found product details
    } else {
      res.status(404).json({ message: 'Product not found' }); // Product not found
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
