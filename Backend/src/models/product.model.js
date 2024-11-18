import mongoose, { model, Schema } from 'mongoose'
//const {model,Schema} = require('mongoose');

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String,},
    price: { type: Number, required: true },
    stock: { type: Number, require: true },
    isFeatures: { type: Boolean, default: false },
    unit:{type:String,enum: ['Kg', 'Piece', 'Bottle']},
    imgUrl: { type: String },
    backColor:{type:String},
    category:{ type: mongoose.Schema.Types.ObjectId, require:true,ref:'Category'},
  },  
)

export const Product = model('Product', ProductSchema);
//module.exports = { Product };