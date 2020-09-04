import mongoose, { Schema, Document } from 'mongoose';

export interface Item {
  name: string;
  amount: number;
}

interface ItemDocument extends Item, Document {}

export const itemSchema = new Schema<Item>({
  name: {
    type: String,
    minlength: 1,
    required: true,
  },
  amount: {
    type: Number,
    min: 0,
    required: true,
  },
});

export const ItemModel = mongoose.model<ItemDocument>('Item', itemSchema);
