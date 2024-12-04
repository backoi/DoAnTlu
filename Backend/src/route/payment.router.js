import express from 'express';
import Stripe from 'stripe';
import { Order } from '../models/oder.model.js';

const stripe = new Stripe('sk_test_51QRxCpFWO9StdPGrxgRdI0gO4CPgWItIzjZs6I5GBdW25seLPMBlc4lM743kT9fw2jyOMbWvovMsdTfieBOcfMmi00pEdYymxU');

const paymentRouter = express.Router();

// Tạo payment intent
paymentRouter.post('/create-payment-intent', async (req, res) => {
    try {
        // const customer = await stripe.customers.create();
        // const ephemeralKey = await stripe.ephemeralKeys.create(
        //   {customer: customer.id},
        //   {apiVersion: '2024-11-20.acacia'}
        // );
        //console.log('Payment intent')
        const { items, paymentMethod ,totalItems} = req.body;
        const userId = '67338de8687ef8d9df287df5'
         // Tính tổng tiền
         const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

         // Tạo payment intent
         const paymentIntent = await stripe.paymentIntents.create({
             amount: totalAmount * 100, // Số tiền tính bằng cents
             currency: 'usd',
             payment_method_types: ['card'],
            //  automatic_payment_methods:{
            //     enabled: true,
            //  },
             //customer: customer.id,
         });

        //Tạo đơn hàng trong DB
         const order = new Order({
             user: userId,
             items,
             totalAmount,
             totalItems,
             paymentStatus: 'Pending',
             paymentMethod,
         });
        await order.save();

        res.status(200).json({data:{
            clientSecret: paymentIntent.client_secret,
            totalAmount,
            OderId:order._id,
            // ephemeralKey: ephemeralKey.secret,
            // customer: customer.id,
            
        }});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Cập nhật trạng thái đơn hàng sau khi thanh toán
paymentRouter.post('/confirm-payment', async (req, res) => {
    try {
        const { orderId, paymentStatus } = req.body;

        // Cập nhật trạng thái đơn hàng
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.paymentStatus = paymentStatus;
        await order.save();

        res.json({ message: 'Order updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export {paymentRouter}
