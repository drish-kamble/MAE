import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("🔍 Connecting to MongoDB...");
    console.log("🔍 MONGO_URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ MongoDB connected successfully");
    console.log("Database Name:", mongoose.connection.db.databaseName);
  } catch (error) {
    console.error("❌ MongoDB connection error:");
    console.error(error); // IMPORTANT: full error
    process.exit(1);
  }
};

export default connectDB;
