import {Schema,model} from 'mongoose';

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantityPurchased: { type: Number, required: true },
            amountPrice: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    totalItems: { type: Number, required: true },
    status:{type: String, required: true, default: 'OnGoing',enum: ['OnGoing', 'Completed','Canceled']},
    deliveryAddress: { type: String, required: true},
    paymentStatus: { type: String,enum: ['Pending', 'Paid', 'Fail'], default:'Pending'}, // Pending, Paid, Failed
    paymentMethod: { type: String, required: true,enum:['Cash','Stripe Card'] }, // Stripe, Paypal, etc.
    orderAt:{type:Date, default: Date.now}
});

export const Order= model('Order', orderSchema);
