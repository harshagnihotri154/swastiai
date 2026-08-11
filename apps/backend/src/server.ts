import app from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/db";

// Connect to database in serverless or local mode
connectDB().catch((err) => console.error("MongoDB Connect Error:", err));

if (!process.env.VERCEL) {
  app.listen(env.PORT, () => {
    console.log(`
🚀 SWASTIAI Server Running
🌐 http://localhost:${env.PORT}
`);
  });
}

export default async function handler(req: any, res: any) {
  try {
    await connectDB();
  } catch (err) {
    // Ignore if connection already established
  }
  return app(req, res);
}