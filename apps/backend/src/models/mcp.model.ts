import { Schema, model, Document, Types } from "mongoose";

export interface IMCPTool extends Document {
  userId?: Types.ObjectId;
  name: string;
  description: string;
  endpointUrl: string;
  method: "GET" | "POST";
  parameterName: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const mcpToolSchema = new Schema<IMCPTool>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    endpointUrl: { type: String, required: true },
    method: { type: String, enum: ["GET", "POST"], default: "GET" },
    parameterName: { type: String, default: "query" },
    enabled: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const MCPToolModel = model<IMCPTool>("MCPTool", mcpToolSchema);
