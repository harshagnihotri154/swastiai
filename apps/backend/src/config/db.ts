import mongoose from "mongoose";
import dns from "dns";
import { env } from "./env";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  // Ignore if setServers is not allowed in environment
}

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