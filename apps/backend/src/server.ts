import app from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/db";

// Connect to MongoDB Atlas
connectDB().catch((err) => console.error("MongoDB Connect Error:", err));

if (!process.env.VERCEL) {
  app.listen(env.PORT, () => {
    console.log(`
🚀 SWASTIAI Server Running
🌐 http://localhost:${env.PORT}
`);
  });
}

export default app;