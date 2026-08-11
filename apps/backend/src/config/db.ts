import mongoose from "mongoose";
import dns from "dns";
import { env } from "./env";

if (!process.env.VERCEL) {
  try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  } catch (e) {
    // Ignore if setServers is not allowed in environment
  }
}

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    const mongoUri = process.env.MONGODB_URI || env.MONGODB_URI;
    const maskedUri = mongoUri.replace(/\/\/[^:]+:[^@]+@/, "//***:***@");
    console.log(`Connecting to MongoDB (${maskedUri})...`);
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB Connected successfully!");
  } catch (error: any) {
    console.error("❌ MongoDB Connection Failed:", error.message || error);
  }
};