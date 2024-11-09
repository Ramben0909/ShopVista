import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoute.js'; // Import the authRoutes
import morgan from 'morgan';
import path from 'path'; // Import path module for file paths
import fs from 'fs'; // Import fs to read JSON file

dotenv.config(); // Load environment variables
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Serve static files (images) from the 'data/images' folder
const imagesDirectory = path.join('C:', 'Users', 'Ritam', 'Programming', 'ShopVista', 'Backend', 'data', 'images');
app.use('/images', express.static(imagesDirectory));

// Route to get all products
app.get('/api/v1/products', (req, res) => {
  const productsPath = path.resolve('data', 'products.json'); // Absolute path to products.json

  // Read the products.json file asynchronously
  fs.readFile(productsPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send('Error loading products data');
    }
    const products = JSON.parse(data);

    // No need to modify image path if they are already correct in the JSON file
    res.json(products); // Send the list of products with the correct image paths
  });
});

// Route to get a product by its ID
app.get('/api/v1/products/:id', (req, res) => {
  const { id } = req.params; // Get the product ID from the URL

  const productsPath = path.resolve('data', 'products.json'); // Absolute path to products.json

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

// Register the authentication routes
app.use('/api/v1/auth', authRoutes); // Add authRoutes with '/api/v1/auth' as the prefix

// Basic route for testing
app.get("/", (req, res) => {
  res.send("<h1>Welcome to my webpage</h1>");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
