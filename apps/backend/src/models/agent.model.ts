import { Schema, model, Document, Types } from "mongoose";

export interface IAgentConfig extends Document {
  userId?: Types.ObjectId;
  agentName: string;
  systemPrompt: string;
  aiModel: string;
  temperature: number;
  provider: "meta" | "interakt";
  interaktApiKey?: string;
  whatsappToken?: string;
  phoneNumberId?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const agentConfigSchema = new Schema<IAgentConfig>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    agentName: { type: String, required: true, default: "Swastiai Business Assistant" },
    systemPrompt: {
      type: String,
      required: true,
      default: "You are Swastiai's official WhatsApp AI assistant. Answer user inquiries politely, concisely, and professionally."
    },
    aiModel: { type: String, required: true, default: "groq-llama-3.3-70b" },
    temperature: { type: Number, required: true, default: 0.7 },
    provider: { type: String, enum: ["meta", "interakt"], default: "meta" },
    interaktApiKey: { type: String, default: "" },
    whatsappToken: { type: String, default: "" },
    phoneNumberId: { type: String, default: "" },
    isDefault: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const AgentConfigModel = model<IAgentConfig>("AgentConfig", agentConfigSchema);
