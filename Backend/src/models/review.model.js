import { model, Schema, Types } from 'mongoose'


const reviewSchema = new Schema({
    user: { type: Types.ObjectId, ref: 'User', required: true },
    product: { type: Types.ObjectId, ref: 'Product', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  });
  
export const Review = model('Review', reviewSchema);

// module.exports = mongoose.model('Review', reviewSchema);