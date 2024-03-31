import mongoose, { Document, Schema } from 'mongoose';
import { v4 } from 'uuid';
import { PromptBlock } from '@smart/types';

const PromptBlockSchema = new Schema<PromptBlock>(
  {
    id: {
      type: String,
      index: true,
      unique: true,
      required: true,
      default: v4,
    },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    type: { type: String, required: true },
    content: { type: String, required: true },
    created: { type: Date, default: Date.now },
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

export const PromptBlocks = mongoose.model<PromptBlock & Document>('PromptBlock', PromptBlockSchema);
