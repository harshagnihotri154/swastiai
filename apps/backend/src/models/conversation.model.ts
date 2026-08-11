import { Schema, model, Document } from "mongoose";

export interface IMessage {
  role: "user" | "model" | "human";
  content: string;
  timestamp: Date;
}

export interface IConversation extends Document {
  customerPhone: string;
  messages: IMessage[];
  isPaused: boolean;
  updatedAt: Date;
}

const conversationSchema = new Schema<IConversation>(
  {
    customerPhone: { type: String, required: true, unique: true, index: true },
    isPaused: { type: Boolean, default: false },
    messages: [
      {
        role: { type: String, enum: ["user", "model", "human"], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export const ConversationModel = model<IConversation>("Conversation", conversationSchema);
