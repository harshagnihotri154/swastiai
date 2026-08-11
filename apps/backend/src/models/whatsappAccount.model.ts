import { Schema, model, Document, Types } from "mongoose";

export interface IWhatsAppAccount extends Document {
  workspaceId: Types.ObjectId;
  wabaId: string;
  phoneNumberId: string;
  displayPhoneNumber: string;
  encryptedAccessToken: string;
  status: "ACTIVE" | "PENDING" | "DISCONNECTED";
  createdAt: Date;
  updatedAt: Date;
}

const whatsAppAccountSchema = new Schema<IWhatsAppAccount>(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, index: true },
    wabaId: { type: String, required: true, default: "1098234710129" },
    phoneNumberId: { type: String, required: true, index: true },
    displayPhoneNumber: { type: String, required: true },
    encryptedAccessToken: { type: String, default: "" },
    status: { type: String, enum: ["ACTIVE", "PENDING", "DISCONNECTED"], default: "ACTIVE" }
  },
  { timestamps: true }
);

export const WhatsAppAccountModel = model<IWhatsAppAccount>("WhatsAppAccount", whatsAppAccountSchema);
