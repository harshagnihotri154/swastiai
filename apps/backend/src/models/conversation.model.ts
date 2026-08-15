import { Schema, model, Document } from "mongoose";

export interface IMessage {
  role: "user" | "model" | "human";
  content: string;
  timestamp: Date;
}

export interface IConversation extends Document {
  userId?: Schema.Types.ObjectId;
  businessPhone: string;
  customerPhone: string;
  customerName?: string;
  messages: IMessage[];
  isPaused: boolean;
  updatedAt: Date;
}

const conversationSchema = new Schema<IConversation>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    businessPhone: { type: String, required: true, index: true },
    customerPhone: { type: String, required: true, index: true },
    customerName: { type: String, default: "" },
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

// Compound index so each business line has isolated threads per customer
conversationSchema.index({ businessPhone: 1, customerPhone: 1 });

export const ConversationModel = model<IConversation>("Conversation", conversationSchema);
