import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import agentRoutes from "../modules/agent/agent.routes";
import whatsappRoutes from "../modules/whatsapp/whatsapp.routes";
import knowledgeRoutes from "../modules/knowledge/knowledge.routes";
import mcpRoutes from "../modules/mcp/mcp.routes";
import { env } from "../config/env";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "SWASTIAI API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

// Dynamic Secure Credentials API Endpoint
router.get("/credentials", (_req, res) => {
  res.json({
    success: true,
    data: {
      webhookUrl: `${process.env.NGROK_URL || "https://your-domain.ngrok-free.dev"}/webhook`,
      whatsappToken: env.WHATSAPP_ACCESS_TOKEN || "CONFIGURE_YOUR_TOKEN_IN_ENV",
      whatsappPhoneId: env.WHATSAPP_PHONE_NUMBER_ID || "CONFIGURE_YOUR_PHONE_ID_IN_ENV",
      groqApiKey: env.GROQ_API_KEY || "CONFIGURE_YOUR_GROQ_KEY_IN_ENV",
      verifyToken: env.WHATSAPP_VERIFY_TOKEN
    }
  });
});

router.use("/auth", authRoutes);
router.use("/agent", agentRoutes);
router.use("/knowledge", knowledgeRoutes);
router.use("/mcp", mcpRoutes);
router.use("/whatsapp", whatsappRoutes);

export default router;