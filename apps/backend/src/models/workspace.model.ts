import { Schema, model, Document, Types } from "mongoose";

export interface IWorkspace extends Document {
  ownerId?: Types.ObjectId;
  businessName: string;
  category: string;
  description: string;
  website?: string;
  location?: string;
  contactEmail?: string;
  contactPhone?: string;
  createdAt: Date;
  updatedAt: Date;
}

const workspaceSchema = new Schema<IWorkspace>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    businessName: { type: String, required: true, default: "Sharma Properties" },
    category: { type: String, required: true, default: "Real Estate" },
    description: { type: String, default: "Find 2BHK/3BHK properties and schedule site visits." },
    website: { type: String, default: "" },
    location: { type: String, default: "Noida, Sector 18" },
    contactEmail: { type: String, default: "" },
    contactPhone: { type: String, default: "+91-9084553059" }
  },
  { timestamps: true }
);

export const WorkspaceModel = model<IWorkspace>("Workspace", workspaceSchema);
