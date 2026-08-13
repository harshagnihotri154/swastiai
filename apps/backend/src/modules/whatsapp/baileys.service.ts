import QRCode from "qrcode";
import path from "path";
import fs from "fs";
import { AgentConfigModel } from "../../models/agent.model";
import { ConversationModel } from "../../models/conversation.model";
import { KnowledgeService } from "../knowledge/knowledge.service";
import { AIService } from "../ai/ai.service";
import { env } from "../../config/env";

let makeWASocket: any = null;
let DisconnectReason: any = null;
let useMultiFileAuthState: any = null;

async function loadBaileys(): Promise<boolean> {
  if (makeWASocket && useMultiFileAuthState) return true;
  if (process.env.VERCEL) return false;
  try {
    const baileys = await import("@whiskeysockets/baileys");
    makeWASocket = baileys.default || baileys.makeWASocket || baileys;
    DisconnectReason = baileys.DisconnectReason;
    useMultiFileAuthState = baileys.useMultiFileAuthState;
    return true;
  } catch (err: any) {
    console.warn("Baileys load skipped:", err.message || err);
    return false;
  }
}

export class BaileysService {
  private static sock: any = null;
  private static currentQR: string | null = null;
  private static pairingCode: string | null = null;
  private static connectionStatus: "DISCONNECTED" | "SCAN_READY" | "CONNECTED" = "DISCONNECTED";
  private static activePhoneNumber: string | null = null;

  /**
   * Resolve real phone number or friendly name from WhatsApp message payload (bypasses LID privacy numbers)
   */
  private static resolveCustomerPhone(msg: any): string {
    try {
      const senderJid = msg.key.remoteJid || "";
      const pushName = msg.pushName || "";

      // 1. Check alternate participant/JID field if present
      const altJid = msg.key.remoteJidAlt || msg.key.participant || "";
      if (altJid && !altJid.includes("lid") && altJid.includes("@s.whatsapp.net")) {
        const rawNum = altJid.split("@")[0].split(":")[0];
        if (rawNum && rawNum.length <= 13) {
          return `+${rawNum}`;
        }
      }

      const rawPhone = senderJid.split("@")[0].split(":")[0];

      // 2. If valid phone number (10 to 13 digits, e.g. 919084553059)
      if (rawPhone && rawPhone.length <= 13 && !rawPhone.startsWith("204")) {
        return `+${rawPhone}`;
      }

      // 3. Fallback to active business phone line or raw phone
      return this.activePhoneNumber ? `+${this.activePhoneNumber}` : (rawPhone ? `+${rawPhone}` : "");
    } catch (err) {
      return this.activePhoneNumber ? `+${this.activePhoneNumber}` : "";
    }
  }

  /**
   * Logout current WhatsApp session and clear auth state to allow new logins
   */
  static async logout(): Promise<void> {
    try {
      if (this.sock) {
        try {
          await this.sock.logout();
        } catch (e) {}
        try {
          this.sock.ev.removeAllListeners("connection.update");
          this.sock.ev.removeAllListeners("creds.update");
          this.sock.end(undefined);
        } catch (e) {}
        this.sock = null;
      }
      this.currentQR = null;
      this.pairingCode = null;
      this.connectionStatus = "DISCONNECTED";
      this.activePhoneNumber = null;

      this.clearStaleSession();

      // Reset default agent config connection info
      const config = await AgentConfigModel.findOne({ isDefault: true });
      if (config) {
        config.userPhoneNumber = "";
        await config.save();
      }

      console.log("🚪 Logged out WhatsApp session and cleared session data.");
    } catch (err: any) {
      console.error("Logout error:", err.message);
    }
  }

  /**
   * Clear stale session keys if connection fails
   */
  static clearStaleSession(): void {
    try {
      const authFolder = process.env.VERCEL
        ? path.join("/tmp", "baileys_auth_info")
        : path.join(process.cwd(), "baileys_auth_info");
      if (fs.existsSync(authFolder)) {
        fs.rmSync(authFolder, { recursive: true, force: true });
        console.log("🧹 Cleared stale Baileys auth session files.");
      }
    } catch (err) {
      // Ignore
    }
  }

  /**
   * Initialize Baileys WhatsApp Socket session
   */
  static async initSession(forceFresh: boolean = false): Promise<void> {
    try {
      const loaded = await loadBaileys();
      if (!loaded) return;

      if (forceFresh) {
        this.clearStaleSession();
      }

      const authFolder = process.env.VERCEL
        ? path.join("/tmp", "baileys_auth_info")
        : path.join(process.cwd(), "baileys_auth_info");
      const { state, saveCreds } = await useMultiFileAuthState(authFolder);

      this.sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 60000,
        keepAliveIntervalMs: 25000
      });

      this.sock.ev.on("creds.update", saveCreds);

      this.sock.ev.on("connection.update", async (update: any) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
          console.log("📲 Baileys real WhatsApp Web QR Code generated!");
          this.currentQR = await QRCode.toDataURL(qr);
          this.connectionStatus = "SCAN_READY";
        }

        if (connection === "close") {
          const statusCode = (lastDisconnect?.error as any)?.output?.statusCode;
          const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
          console.log("⚠️ Baileys connection closed (StatusCode:", statusCode, "). Reconnecting:", shouldReconnect);
          this.connectionStatus = "DISCONNECTED";

          if (statusCode === 428 || statusCode === 401) {
            // Re-init with clean session
            setTimeout(() => this.initSession(true), 2000);
          } else if (shouldReconnect) {
            setTimeout(() => this.initSession(false), 3000);
          }
        } else if (connection === "open") {
          console.log("✅ REAL WHATSAPP WEB CONNECTED VIA BAILEYS SOCKET!");
          this.connectionStatus = "CONNECTED";
          const userJid = this.sock.user?.id || "";
          this.activePhoneNumber = userJid.split(":")[0] || userJid.split("@")[0];

          // Save state to MongoDB
          const config = await AgentConfigModel.findOne({ isDefault: true });
          if (config) {
            config.provider = "qrcode";
            config.userPhoneNumber = `+${this.activePhoneNumber}`;
            await config.save();
          }
        }
      });

      // Sync all existing historical WhatsApp chats into MongoDB
      this.sock.ev.on("messaging-history.set", async ({ messages }: any) => {
        try {
          if (!Array.isArray(messages)) return;
          for (const msg of messages) {
            if (!msg.message || !msg.key.remoteJid) continue;
            const senderJid = msg.key.remoteJid;
            if (senderJid.endsWith("@g.us")) continue;

            const senderPhone = this.resolveCustomerPhone(msg);
            const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
            if (!text.trim()) continue;

            let conversation = await ConversationModel.findOne({ customerPhone: senderPhone });
            if (!conversation) {
              conversation = await ConversationModel.findOneAndUpdate(
                { customerPhone: senderPhone },
                { $setOnInsert: { customerPhone: senderPhone, messages: [], isPaused: false } },
                { upsert: true, new: true }
              );
            }

            if (conversation) {
              const role = msg.key.fromMe ? "model" : "user";
              const exists = conversation.messages.some(m => m.content === text);
              if (!exists) {
                conversation.messages.push({
                  role,
                  content: text,
                  timestamp: msg.messageTimestamp ? new Date(Number(msg.messageTimestamp) * 1000) : new Date()
                });
                await conversation.save().catch(err => console.warn("Conversation save warning:", err.message));
              }
            }
          }
          console.log("📚 Synced historical WhatsApp chats to MongoDB Atlas!");
        } catch (err: any) {
          console.warn("History sync warning:", err.message);
        }
      });

      // Handle real incoming WhatsApp messages from phone
      this.sock.ev.on("messages.upsert", async (m: any) => {
        if (m.type !== "notify") return;

        for (const msg of m.messages) {
          if (!msg.message || msg.key.fromMe) continue;

          const senderJid = msg.key.remoteJid;
          if (!senderJid || senderJid.endsWith("@g.us")) continue;

          const senderPhone = this.resolveCustomerPhone(msg);
          const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";

          if (!text.trim()) continue;

          console.log(`📩 Real Baileys WhatsApp Message from ${senderPhone}: "${text}"`);

          const agentConfig = await AgentConfigModel.findOne({ isDefault: true });
          let systemPrompt = agentConfig?.systemPrompt || env.DEFAULT_SYSTEM_PROMPT;

          const knowledgeContext = await KnowledgeService.searchKnowledgeContext(text);
          if (knowledgeContext) {
            systemPrompt += `\n\n[Business Knowledge Base]\n${knowledgeContext}`;
          }

          let conversation = await ConversationModel.findOne({ customerPhone: senderPhone });
          if (!conversation) {
            conversation = await ConversationModel.findOneAndUpdate(
              { customerPhone: senderPhone },
              { $setOnInsert: { customerPhone: senderPhone, messages: [], isPaused: false } },
              { upsert: true, new: true }
            );
          }

          if (!conversation) continue;

          if (conversation.isPaused) {
            console.log(`⏸️ AI Agent is PAUSED for ${senderPhone}. Skipping automated AI reply.`);
            conversation.messages.push({ role: "user", content: text, timestamp: new Date() });
            await conversation.save().catch(err => console.warn("Conversation save warning:", err.message));
            continue;
          }

          const historyContext = conversation.messages.slice(-6).map((item) => ({
            role: item.role === 'human' ? 'assistant' : (item.role as 'user' | 'model' | 'assistant' | 'system'),
            content: item.content
          }));

          const aiReply = await AIService.generateReply(text, systemPrompt, historyContext);

          conversation.messages.push({ role: "user", content: text, timestamp: new Date() });
          conversation.messages.push({ role: "model", content: aiReply, timestamp: new Date() });
          await conversation.save().catch(err => console.warn("Conversation save warning:", err.message));

          console.log(`📤 Sending Baileys AI reply to ${senderPhone}: "${aiReply}"`);
          try {
            const cleanPhone = senderPhone.replace(/[^0-9]/g, "");
            const phoneJid = `${cleanPhone}@s.whatsapp.net`;
            if (cleanPhone && cleanPhone.length >= 10) {
              await this.sock.sendMessage(phoneJid, { text: aiReply });
              console.log(`✅ Baileys AI reply dispatched to ${phoneJid}`);
            }
            if (senderJid && !senderJid.endsWith("@lid") && !senderJid.includes(cleanPhone)) {
              const cleanSenderJid = senderJid.split(":")[0] + "@s.whatsapp.net";
              await this.sock.sendMessage(cleanSenderJid, { text: aiReply }).catch(() => {});
            }
          } catch (sendErr: any) {
            console.error(`❌ Error sending Baileys WhatsApp message:`, sendErr.message || sendErr);
          }
        }
      });
    } catch (err: any) {
      console.error("Error initializing Baileys session:", err.message);
    }
  }

  /**
   * Send Message via active Baileys WhatsApp socket
   */
  static async sendMessage(toPhone: string, text: string): Promise<boolean> {
    try {
      await loadBaileys();
      if (!this.sock) {
        console.error("Baileys sendMessage Error: Socket is not initialized");
        return false;
      }
      let cleanTo = toPhone.replace(/[^0-9]/g, "");
      if (cleanTo.length === 10) {
        cleanTo = `91${cleanTo}`;
      }
      const jid = `${cleanTo}@s.whatsapp.net`;
      await this.sock.sendMessage(jid, { text });
      console.log(`📤 Baileys direct message sent to ${cleanTo} (${jid}): "${text}"`);
      return true;
    } catch (err: any) {
      console.error("Baileys sendMessage Error:", err.message);
      return false;
    }
  }

  /**
   * Request 8-Digit Pairing Code for phone number
   */
  static async requestPairingCode(phone: string): Promise<string> {
    const cleanPhone = phone.replace(/[^0-9]/g, "");

    // Re-init fresh socket to guarantee active connection for pairing
    await this.initSession(true);

    // Wait up to 3 seconds for socket ready state
    await new Promise((r) => setTimeout(r, 2000));

    try {
      if (this.sock && typeof this.sock.requestPairingCode === "function") {
        const code = await this.sock.requestPairingCode(cleanPhone);
        this.pairingCode = code;
        console.log(`🔢 Fresh Baileys Pairing Code generated for ${cleanPhone}: ${code}`);
        return code;
      }
    } catch (err: any) {
      console.warn("Could not request Baileys pairing code:", err.message);
      throw new Error(`WhatsApp pairing failed: ${err.message || "Ensure your phone is online and try again"}`);
    }

    throw new Error("WhatsApp socket not ready for pairing.");
  }

  static getQR(): string | null {
    return this.currentQR;
  }

  static getPairingCode(): string | null {
    return this.pairingCode;
  }

  static getStatus(): "DISCONNECTED" | "SCAN_READY" | "CONNECTED" {
    return this.connectionStatus;
  }

  static getActivePhone(): string | null {
    return this.activePhoneNumber;
  }
}
