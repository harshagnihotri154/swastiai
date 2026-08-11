import app from './apps/backend/src/app';
import { connectDB } from './apps/backend/src/config/db';

export default async function handler(req: any, res: any) {
  try {
    await connectDB();
  } catch (err) {
    // Ignore if connection already established
  }
  return app(req, res);
}
