import { model, Schema, Types } from 'mongoose'

export const CategorySchema = new Schema(
  {
    name: { type: String, required: true,unique: true },
  },
)

export const Category = model('Category', CategorySchema);