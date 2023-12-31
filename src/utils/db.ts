import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoConnect = async () => {
  // Connect to MongoDB
  try {
    if (process.env.DB_URL) {
      const connection = await mongoose.connect(process.env.DB_URL);
      console.log('DB connected successfully');
      return connection;
    }
    throw new Error('DB_URL not defined');
  } catch (error) {
    console.error('Connection to db failed: ', (error as Error).message);
  }
};

export default mongoConnect;
