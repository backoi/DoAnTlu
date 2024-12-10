import { model, Schema } from 'mongoose'

const CouponSchema = new Schema(
  {
    code: { type: String, required: true,unique: true },
    discountPercentage:{ type: Number, required: true },
    isUsed: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', },
    expiresAt: { type: Date },
  },
)

export const Coupon = model('Coupon', CouponSchema);