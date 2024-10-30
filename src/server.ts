import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/connection'; // Import the connectDB function
import router from './routes'; // Import the main router

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Use the main router
    app.use('/api', router);

    // Start the server
    app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer(); 