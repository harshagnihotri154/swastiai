import { Request, Response } from "express";
import { env } from "../../config/env";
import { WhatsAppService } from "./whatsapp.service";
import { InteraktService } from "../interakt/interakt.service";
import { AIService } from "../ai/ai.service";
import { ConversationModel } from "../../models/conversation.model";
import { AgentConfigModel } from "../../models/agent.model";
import { KnowledgeService } from "../knowledge/knowledge.service";
import { MCPService } from "../mcp/mcp.service";
import { BaileysService } from "./baileys.service";

export class WhatsAppController {
  /**
   * GET /webhook - Meta Webhook Verification
   */
  static verifyWebhook(req: Request, res: Response): any {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    const verifyToken = env.WHATSAPP_VERIFY_TOKEN || process.env.WHATSAPP_VERIFY_TOKEN || "swastiai123";

    // If accessed directly via browser without query params
    if (!mode && !token && !challenge) {
      return res.status(200).json({
        success: true,
        message: "WhatsApp Webhook endpoint is active 🚀",
        info: "Meta will automatically call this endpoint to verify your webhook and deliver real-time WhatsApp messages.",
      });
    }

    if (mode === "subscribe" && token === verifyToken) {
      console.log("✅ WhatsApp Webhook verified successfully by Meta!");
      return res.status(200).send(challenge);
    }

    console.warn("❌ Webhook verification failed. Token mismatch or invalid mode.");
    return res.status(403).json({ error: "Verification token mismatch" });
  }

  /**
   * POST /webhook - Receive Messages & Events from Meta
   */
  static async handleWebhook(req: Request, res: Response): Promise<any> {
    try {
      const body = req.body;

      // Ensure webhook payload is from WhatsApp Cloud API
      if (body.object === "whatsapp_business_account") {
        for (const entry of body.entry || []) {
          for (const change of entry.changes || []) {
            const value = change.value;

            if (value && value.messages && value.messages.length > 0) {
              const message = value.messages[0];
              const fromNumber = message.from; // Customer's WhatsApp number
              const messageId = message.id;
              const type = message.type;

              const displayPhoneNumber = value.metadata?.display_phone_number || "";
              const phoneNumberId = value.metadata?.phone_number_id || "";

              console.log(`📩 Incoming WhatsApp Message [${type}] from ${fromNumber} (To Business Number: ${displayPhoneNumber} | PhoneID: ${phoneNumberId}):`);

              let messageText = "";
              if (type === "text") {
                messageText = message.text?.body || "";
                console.log(`   Message Text: "${messageText}"`);

                // Mark message as read
                await WhatsAppService.markAsRead(messageId).catch(() => {});

                // 1. Multi-Tenant Lookup: Find the specific signed-up business customer's AgentConfig in MongoDB
                let agentConfig = await AgentConfigModel.findOne({
                  $or: [
                    { phoneNumberId: phoneNumberId },
                    { userPhoneNumber: displayPhoneNumber },
                    { isDefault: true }
                  ]
                });

                if (!agentConfig) {
                  agentConfig = await AgentConfigModel.findOne({ isDefault: true });
                }

                console.log(`👤 Active Business Tenant Profile Loaded: "${agentConfig?.agentName}" (ID: ${agentConfig?._id})`);

                // 2. Load THIS Business Customer's Custom System Prompt
                let systemPrompt = agentConfig?.systemPrompt || env.DEFAULT_SYSTEM_PROMPT;

                // 3. Load THIS Business Customer's Specific Uploaded Knowledge Base & PDF RAG Context
                const knowledgeContext = await KnowledgeService.searchKnowledgeContext(messageText);
                if (knowledgeContext) {
                  console.log(`📚 Injected Business Knowledge Base RAG Context into AI prompt!`);
                  systemPrompt += `\n\n[Business Knowledge Base Documentation]\nUse the following verified business facts to answer the customer query accurately:\n${knowledgeContext}`;
                }

                // 3. Inject MCP (Model Context Protocol) Tools Context
                const mcpContext = await MCPService.getMCPContextPrompt();
                systemPrompt += `\n\n${mcpContext}`;

                // 4. Fetch or create Conversation History in MongoDB
                let conversation = await ConversationModel.findOne({ customerPhone: fromNumber });
                if (!conversation) {
                  conversation = new ConversationModel({ customerPhone: fromNumber, messages: [] });
                }

                // Format previous messages for AI context (last 6 messages)
                const historyContext = conversation.messages.slice(-6).map((msg) => ({
                  role: msg.role === 'human' ? 'assistant' : (msg.role as 'user' | 'model' | 'assistant' | 'system'),
                  content: msg.content
                }));

                // 5. Generate AI response with history memory + Knowledge Base + MCP
                console.log(`🤖 Generating AI Response (History Context: ${historyContext.length} msgs | KB: ${knowledgeContext ? "Yes" : "No"})...`);
                const aiReply = await AIService.generateReply(messageText, systemPrompt, historyContext);

                // 4. Save conversation memory to MongoDB
                conversation.messages.push({ role: "user", content: messageText, timestamp: new Date() });
                conversation.messages.push({ role: "model", content: aiReply, timestamp: new Date() });
                await conversation.save();

                // Send AI reply back to user via WhatsApp or Interakt
                console.log(`📤 Sending AI reply to ${fromNumber} via [${agentConfig?.provider || "meta"}]: "${aiReply}"`);
                try {
                  if (agentConfig?.provider === "interakt" && agentConfig?.interaktApiKey) {
                    await InteraktService.sendTextMessage(agentConfig.interaktApiKey, "91", fromNumber, aiReply);
                    console.log(`✅ AI reply sent successfully via Interakt API to ${fromNumber}`);
                  } else {
                    await WhatsAppService.sendTextMessage(fromNumber, aiReply);
                    console.log(`✅ AI reply sent successfully via Meta API to ${fromNumber}`);
                  }
                } catch (sendErr: any) {
                  console.error(`⚠️ Could not dispatch WhatsApp message:`, sendErr.message);
                }
              } else {
                console.log(`   Message Payload:`, message[type]);
              }
            } else if (value && value.statuses && value.statuses.length > 0) {
              const status = value.statuses[0];
              console.log(`ℹ️ WhatsApp Status Update: Message ${status.id} is now ${status.status}`);
            }
          }
        }

        return res.status(200).send("EVENT_RECEIVED");
      }

      return res.sendStatus(404);
    } catch (error) {
      console.error("Error processing Meta webhook:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /**
   * POST /api/v1/whatsapp/send - Trigger sending a WhatsApp message
   */
  static async sendMessage(req: Request, res: Response): Promise<any> {
    try {
      const { to, message, templateName, isTemplate } = req.body;

      if (!to) {
        return res.status(400).json({ success: false, error: "'to' phone number is required" });
      }

      let result;
      if (isTemplate) {
        result = await WhatsAppService.sendTemplateMessage(to, templateName || "hello_world");
      } else {
        if (!message) {
          return res.status(400).json({ success: false, error: "'message' text is required" });
        }
        result = await WhatsAppService.sendTextMessage(to, message);
      }

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      console.error("Error in sendMessage controller:", error);
      return res.status(500).json({
        success: false,
        error: error.message || "Failed to send message",
      });
    }
  }

  /**
   * POST /api/v1/whatsapp/ask-ai - Ask AI Agent a question & deliver reply to phone
   */
  static async askAI(req: Request, res: Response): Promise<any> {
    try {
      const { question, to, systemPrompt } = req.body;
      const userPhone = to || (req as any).user?.phone || "919084553059";

      if (!question) {
        return res.status(400).json({ success: false, error: "'question' text is required" });
      }

      console.log(`💬 User Question: "${question}"`);
      console.log("🤖 Generating AI Response via Groq Llama 3.3...");
      const aiReply = await AIService.generateReply(question, systemPrompt);

      console.log(`📤 Sending AI reply to ${userPhone}: "${aiReply}"`);
      let whatsappStatus = "Delivered to WhatsApp ✅";
      try {
        const agentConfig = await AgentConfigModel.findOne({ isDefault: true });
        if (agentConfig?.provider === "interakt" && agentConfig?.interaktApiKey) {
          await InteraktService.sendTextMessage(agentConfig.interaktApiKey, "91", userPhone, aiReply);
        } else if (agentConfig?.provider === "meta" && agentConfig?.whatsappToken) {
          await WhatsAppService.sendTextMessage(userPhone, aiReply);
        } else {
          // Default: Real Baileys WhatsApp Socket
          const sent = await BaileysService.sendMessage(userPhone, aiReply);
          if (!sent) {
            whatsappStatus = "Baileys WhatsApp socket waiting or initializing";
          }
        }
      } catch (err: any) {
        whatsappStatus = `WhatsApp Delivery Note: ${err.message}`;
      }

      return res.status(200).json({
        success: true,
        question,
        aiReply,
        whatsappStatus,
        deliveredTo: userPhone,
      });
    } catch (error: any) {
      console.error("Error in askAI controller:", error);
      return res.status(500).json({
        success: false,
        error: error.message || "Failed to process AI question",
      });
    }
  }
}
