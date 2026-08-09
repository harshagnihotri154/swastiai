import mongoose from "mongoose";
import { env } from "./env";

export const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    // console.log("URI:", env.MONGODB_URI.replace(/\/\/.*:.*@/, "//<username>:<password>@"));
console.log("URI:", env.MONGODB_URI);
    await mongoose.connect(env.MONGODB_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error);
    process.exit(1);
  }
};