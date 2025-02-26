import { model, Schema } from 'mongoose'
//const {model,Schema} = require('mongoose');

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String,},
    price: { type: Number, required: true },
    stock: { type: Number, require: true },
    unit:{type:String,enum: ['1 Kg', '1 Piece', '1 Bottle']},
    imgUrl: { type: String },
    backColor:{type:String},
    category:{ type: Schema.Types.ObjectId, require:true,ref:'Category'},
    averageRating: { type: Number, default: 0 }, // Trung bình đánh giá
    reviewsCount: { type: Number, default: 0 }, // Số lượng đánh giá
    discount: { type: Number, default: 0 }, // Giảm giá (%)
    discountedPrice: { type: Number }, 
  },  
)

export const Product = model('Product', ProductSchema);
//module.exports = { Product };