import { Schema, model, Document, Types } from "mongoose";

export interface IKnowledgeItem extends Document {
  userId?: Types.ObjectId;
  title: string;
  content: string;
  type: "faq" | "document" | "website";
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const knowledgeItemSchema = new Schema<IKnowledgeItem>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    type: { type: String, enum: ["faq", "document", "website"], default: "faq" },
    tags: [{ type: String, trim: true }]
  },
  { timestamps: true }
);

export const KnowledgeItemModel = model<IKnowledgeItem>("KnowledgeItem", knowledgeItemSchema);
