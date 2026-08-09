import { Router } from "express";
import { WhatsAppController } from "./whatsapp.controller";

const router = Router();

// Meta Webhook endpoints (root /webhook)
router.get("/webhook", WhatsAppController.verifyWebhook);
router.post("/webhook", WhatsAppController.handleWebhook);

// Messaging API endpoint
router.post("/send", WhatsAppController.sendMessage);
router.post("/ask-ai", WhatsAppController.askAI);

export default router;
