import { Schema, model, Document, Types } from "mongoose";

export interface IMessage extends Document {
  conversationId: Types.ObjectId;
  workspaceId: Types.ObjectId;
  sender: "customer" | "model" | "human";
  content: string;
  metaMessageId?: string;
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    conversationId: { type: Schema.Types.ObjectId, ref: "Conversation", required: true, index: true },
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, index: true },
    sender: { type: String, enum: ["customer", "model", "human"], required: true },
    content: { type: String, required: true },
    metaMessageId: { type: String, default: "" }
  },
  { timestamps: true }
);

export const MessageModel = model<IMessage>("Message", messageSchema);
