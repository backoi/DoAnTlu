import { model, Schema } from 'mongoose'


const reviewSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  });
  
export const Review = model('Review', reviewSchema);

// module.exports = mongoose.model('Review', reviewSchema);