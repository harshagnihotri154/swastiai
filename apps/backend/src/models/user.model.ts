import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  passwordHash?: string;
  name?: string;
  otp?: string;
  otpExpiresAt?: Date;
  isVerified?: boolean;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String },
    name: { type: String, trim: true },
    otp: { type: String, default: "" },
    otpExpiresAt: { type: Date },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("User", userSchema);
