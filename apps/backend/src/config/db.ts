import mongoose from "mongoose";
import { env } from "./env";

export const connectDB = async () => {
  try {
    const maskedUri = env.MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, "//***:***@");
    console.log(`Connecting to MongoDB (${maskedUri})...`);
    await mongoose.connect(env.MONGODB_URI);
    console.log("✅ MongoDB Connected successfully!");
  } catch (error: any) {
    console.error("❌ MongoDB Connection Failed:", error.message || error);
  }
};