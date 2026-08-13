import { Schema, model, Document, Types } from "mongoose";

export interface IBusinessPhoneNumber {
  label: string;
  phone: string;
  phoneNumberId?: string;
  active: boolean;
  createdAt?: Date;
}

export interface IAgentConfig extends Document {
  workspaceId?: Types.ObjectId;
  userId?: Types.ObjectId;
  userPhoneNumber?: string;
  phoneNumbers?: IBusinessPhoneNumber[];
  agentName: string;
  role?: string;
  systemPrompt: string;
  aiModel: string;
  temperature: number;
  provider: "meta" | "interakt" | "qrcode";
  interaktApiKey?: string;
  whatsappToken?: string;
  phoneNumberId?: string;
  allowedTools?: string[];
  humanHandoffKeywords?: string[];
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const businessPhoneNumberSchema = new Schema<IBusinessPhoneNumber>({
  label: { type: String, required: true, default: "Primary WhatsApp" },
  phone: { type: String, required: true },
  phoneNumberId: { type: String, default: "" },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const agentConfigSchema = new Schema<IAgentConfig>(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    userPhoneNumber: { type: String, default: "" },
    phoneNumbers: [businessPhoneNumberSchema],
    agentName: { type: String, required: true, default: "Harsh Agnihotri" },
    role: { type: String, default: "Software Developer & AI Engineer" },
    systemPrompt: {
      type: String,
      required: true,
      default: "You are Harsh Agnihotri, a skilled Software Developer & AI Engineer. Speak warmly, smartly, and professionally like Harsh Agnihotri on WhatsApp. Help clients with software development, AI solutions, web/app inquiries, and project consultation. Keep your responses short (1-2 sentences), crisp, and direct."
    },
    aiModel: { type: String, required: true, default: "groq-llama-3.3-70b" },
    temperature: { type: Number, required: true, default: 0.7 },
    provider: { type: String, enum: ["meta", "interakt", "qrcode"], default: "qrcode" },
    interaktApiKey: { type: String, default: "" },
    whatsappToken: { type: String, default: "" },
    phoneNumberId: { type: String, default: "" },
    allowedTools: { type: [String], default: ["searchProperties", "bookAppointment", "createLead"] },
    humanHandoffKeywords: { type: [String], default: ["human", "agent", "owner", "speak to representative"] },
    isDefault: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const AgentConfigModel = model<IAgentConfig>("AgentConfig", agentConfigSchema);
