// // src/config/connection.ts
// import mongoose, { ConnectOptions } from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// const connectionString: string = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialDB';

// const connectDB = async (): Promise<void> => {
//   try {
//     await mongoose.connect(connectionString, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     } as ConnectOptions);
//     console.log('Database connected successfully.');
//   } catch (error) {
//     console.error('Database connection error:', error);
//     process.exit(1);
//   }
// };

// mongoose.connection.on('connected', () => console.log('Mongoose connected'));
// mongoose.connection.on('error', (err) => console.error('Mongoose connection error:', err));
// mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

// export { connectDB };
// export default mongoose.connection;
// src/config/connection.ts
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetwork';
    await mongoose.connect(mongoURI, {
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};