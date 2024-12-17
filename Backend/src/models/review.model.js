import { create } from 'domain';
import { model, Schema } from 'mongoose'


const reviewSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createAt:{type:Date,default: Date.now}
  });
  
export const Review = model('Review', reviewSchema);

// module.exports = mongoose.model('Review', reviewSchema);