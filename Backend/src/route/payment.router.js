import express from "express";
import Stripe from "stripe";
import { Order } from "../models/order.model.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const stripe = new Stripe(
  "sk_test_51QRxCpFWO9StdPGrxgRdI0gO4CPgWItIzjZs6I5GBdW25seLPMBlc4lM743kT9fw2jyOMbWvovMsdTfieBOcfMmi00pEdYymxU"
);

const paymentRouter = express.Router();

// Tạo payment intent
paymentRouter.post(
  "/create-payment-intent",
  authenticateUser,
  async (req, res) => {
    try {
      // const customer = await stripe.customers.create();
      // const ephemeralKey = await stripe.ephemeralKeys.create(
      //   {customer: customer.id},
      //   {apiVersion: '2024-11-20.acacia'}
      // );
      const { totalAmount} = req.body;
      // Tính tổng tiền
      // Tạo payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(totalAmount*100), // Số tiền tính bằng cents
        currency: "usd",
        payment_method_types: ["card"],
        //  automatic_payment_methods:{
        //     enabled: true,
        //  },
        //customer: customer.id,
      });

      res.status(200).json({
        message: "tao intent thanh cong",
        data: {
          clientSecret: paymentIntent.client_secret,
          totalAmount,
          // OderId:order._id,
          // ephemeralKey: ephemeralKey.secret,
          // customer: customer.id,
        },
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Cập nhật trạng thái đơn hàng sau khi thanh toán
paymentRouter.post("/confirm-payment", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId; //lay tu token
    const { orderId, paymentMethod, items, deliveryAddress } = req.body;
    const totalAmount = items.reduce(
      (total, item) => total + item.amountPrice,
      0
    );
    const totalItems = items.reduce(
      (total, item) => total + item.quantityPurchased,
      0
    );
    //cập nhật paid khi giao thành công cho đơn cash
    if (orderId) {
      const order = await Order.findById(orderId);
      if (!order) return res.status(404).json({ message: "Order not found" });
      order.paymentStatus = "Paid";
      await order.save();
      res.json({
        message: "Order updated successfully paid",
        data: { OrderId: order.id },
      });
    }
    //thanh toan card thì sẽ paid
    else if (paymentMethod == "Stripe Card") {
      const order = new Order({
        userId,
        items,
        totalAmount,
        totalItems,
        deliveryAddress,
        paymentStatus: "Paid",
        paymentMethod,
      });
      await order.save();
      res.json({
        message: "Order updated successfully card,paid",
        data: { OderId: order.id },
      });
    }
    //thanh toan cash thì sẽ pending
    else{
      const order = new Order({
        userId,
        items,
        totalAmount,
        totalItems,
        deliveryAddress,
        paymentStatus: "Pending",
        paymentMethod: "Cash",
      });
      await order.save();
      res.json({
        message: "Order updated successfully cash,pending",
        data: { OderId: order.id },
      });
    
  }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { paymentRouter };
