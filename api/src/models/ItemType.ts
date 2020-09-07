import mongoose, { Schema, Document } from 'mongoose';

export interface ItemType {
  name: string;
  amount: number;
}

export interface ItemTypeDocument extends ItemType, Document {}

export const itemTypeSchema = new Schema<ItemType>({
  name: {
    type: String,
    minlength: 1,
    required: true,
  },
});

export const ItemTypeModel = mongoose.model<ItemTypeDocument>(
  'ItemType',
  itemTypeSchema,
);
