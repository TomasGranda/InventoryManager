import mongoose, { Schema, Document, DocumentQuery } from 'mongoose';
import { itemTypeSchema, ItemType, ItemTypeDocument } from './ItemType';

export interface Item {
  itemTypeId?: string;
  itemType?: DocumentQuery<ItemTypeDocument, ItemTypeDocument, unknown>;
  amount: number;
}

export interface ItemDocument extends Item, Document {}

export const itemSchema = new Schema<Item>({
  itemType: {
    type: itemTypeSchema,
    required: true,
  },
  amount: {
    type: Number,
    min: 0,
    required: true,
  },
});

export const ItemModel = mongoose.model<ItemDocument>('Item', itemSchema);
