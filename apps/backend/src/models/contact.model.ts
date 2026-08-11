import mongoose, { Schema, Document } from 'mongoose';

export interface IContactEnquiry extends Document {
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'contacted';
  createdAt: Date;
}

const ContactEnquirySchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'contacted'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

export const ContactEnquiryModel = mongoose.model<IContactEnquiry>('ContactEnquiry', ContactEnquirySchema);
