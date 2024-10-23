// server.mjs (or server.js with "type": "module" in package.json)
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000; // Default port if not specified

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
