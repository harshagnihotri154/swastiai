import { Schema, model, Document, Types } from "mongoose";

export interface ICustomer extends Document {
  workspaceId: Types.ObjectId;
  phone: string;
  name?: string;
  notes?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const customerSchema = new Schema<ICustomer>(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true, index: true },
    phone: { type: String, required: true, index: true },
    name: { type: String, default: "" },
    notes: { type: String, default: "" },
    tags: { type: [String], default: ["whatsapp_lead"] }
  },
  { timestamps: true }
);

export const CustomerModel = model<ICustomer>("Customer", customerSchema);
