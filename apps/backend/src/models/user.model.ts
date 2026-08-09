import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  name?: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("User", userSchema);
