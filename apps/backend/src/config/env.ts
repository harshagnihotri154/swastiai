import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  PORT: z.string().default("5000"),

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  MONGODB_URI: z.string().min(1, "MongoDB URI is required"),

  WHATSAPP_ACCESS_TOKEN: z.string().optional().default(""),
  WHATSAPP_PHONE_NUMBER_ID: z.string().optional().default(""),
  WHATSAPP_VERIFY_TOKEN: z.string().optional().default("swastiai123"),

  GEMINI_API_KEY: z.string().optional().default(""),
  OPENAI_API_KEY: z.string().optional().default(""),
  GROQ_API_KEY: z.string().optional().default(""),
  JWT_SECRET: z.string().optional().default("swastiai_secret_jwt_key_2026"),
  DEFAULT_SYSTEM_PROMPT: z
    .string()
    .optional()
    .default(
      "You are Swastiai, an intelligent, helpful, and polite AI business assistant on WhatsApp. Answer customer inquiries clearly and concisely."
    ),
});

export const env = envSchema.parse(process.env);