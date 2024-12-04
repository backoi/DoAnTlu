import {Schema,model} from 'mongoose';

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    totalItems: { type: Number, required: true },
    paymentStatus: { type: String,enum: ['Pending', 'Paid', 'Fail'], default:'Pending'}, // Pending, Paid, Failed
    paymentMethod: { type: String, required: true }, // Stripe, Paypal, etc.
});

export const Order= model('Order', orderSchema);
