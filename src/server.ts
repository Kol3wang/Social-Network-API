import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/connection';
import router from './routes';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const startServer = async () => {
  try {
    await connectDB();
    app.use('/api', router); // Prefix /api for all routes
    app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();