import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return mongoose.connection;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);

    isConnected = true;

    console.log("MongoDB Connected");
    console.log("Host:", connection.connection.host);

    return connection;
  } catch (error) {
    console.error("MongoDB Connection Failed");
    throw error;
  }
};

export default connectDB;