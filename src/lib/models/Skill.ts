// lib/models/Skill.ts - Skill model for MongoDB
import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: string;
  level: number;
  order: number;
  createdAt: Date;
}

const SkillSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['frontend', 'backend', 'tools'],
    trim: true
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);