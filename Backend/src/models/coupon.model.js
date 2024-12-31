import { model, Schema } from 'mongoose'

const CouponSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', },
    code: { type: String, required: true,unique: true },
    discountPercentage:{ type: Number, required: true },
    isUsed: { type: Boolean, default: false },
    expiresAt: { type: Date },
  },
)

export const Coupon = model('Coupon', CouponSchema);