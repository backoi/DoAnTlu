import { model, Schema, Types } from 'mongoose'

const CategorySchema = new Schema(
  {
    name: { type: String, required: true,unique: true },
    img:{ type: String, required: true,unique: true },
    backColor:{ type: String, required: true, },
  },
)

export const Category = model('Category', CategorySchema);