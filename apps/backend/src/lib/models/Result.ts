import mongoose, { Document, Schema } from 'mongoose';
import { v4 } from 'uuid';
import { ModelResult } from '@smart/types';

const ModelResultSchema = new Schema<ModelResult>(
  {
    id: {
      type: String,
      index: true,
      unique: true,
      required: true,
      default: v4,
    },
    model: { type: String, required: true },
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    responseTime: { type: Number },
  },
  {
    toObject: {
      virtuals: false,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
    toJSON: {
      virtuals: false,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const ModelResults = mongoose.model<ModelResult & Document>('ModelResult', ModelResultSchema);
