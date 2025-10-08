// lib/models/Content.ts - Content model for MongoDB
import mongoose, { Schema, Document } from 'mongoose';

export interface IContent extends Document {
  section: string;
  key: string;
  value: any;
  type: 'text' | 'html' | 'array' | 'object' | 'image';
  updatedAt: Date;
}

const ContentSchema: Schema = new Schema({
  section: {
    type: String,
    required: true,
    enum: ['hero', 'about', 'skills', 'projects', 'contact']
  },
  key: {
    type: String,
    required: true
  },
  value: {
    type: Schema.Types.Mixed,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['text', 'html', 'array', 'object', 'image'],
    default: 'text'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create compound index for efficient queries
ContentSchema.index({ section: 1, key: 1 }, { unique: true });

export default mongoose.models.Content || mongoose.model<IContent>('Content', ContentSchema);