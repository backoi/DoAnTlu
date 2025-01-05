import express from "express";
import Stripe from "stripe";
import { Order } from "../models/order.model.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { Coupon } from "../models/coupon.model.js";
import { Product } from "../models/product.model.js";

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
  //ham tru so luong trong kho
  const userId = req.user.userId; //lay tu token
  const { orderId, paymentMethod, items, deliveryAddress,coupon } = req.body;
  const updateProductInventory = async (items) => {
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${item.productId} not found` });
      }
      else if (product.stock < item.quantityPurchased) {
        return res
          .status(400)
          .json({
            message: `Product ${product.name} does not have enough stock`,
          });
      }

      product.stock -= item.quantityPurchased; // Trừ số lượng sản phẩm
      await product.save();
    }
  }
  try {
    if(coupon) {
      const couponCode = coupon;
      //console.log('couponCode', couponCode)
      const couponData = await Coupon.findOneAndUpdate({ code:couponCode,user:userId },{isUsed:true});
      //if (!couponData) return 
      //if (!couponData) return res.status(404).json({ message: "Coupon not found" });
      //if (couponData.isUsed) return res.status(400).json({ message: "Coupon is already used" });
      //if (new Date(couponData.expiryDate) < new Date())
      //  return res.status(400).json({ message: "Coupon has expired" });
      //totalAmount = totalAmount - (totalAmount * couponData.discount) / 100;
      
      //await couponData.save();
    }
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
      console.log("totalAmount", totalAmount.toFixed(4))
      const order = new Order({
        userId,
        items,
        totalAmount:totalAmount.toFixed(2),
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
        totalAmount:totalAmount.toFixed(2),
        totalItems,
        deliveryAddress,
        paymentStatus: "Pending",
        paymentMethod: "Cash",
      });
      await order.save();
      await updateProductInventory(items);
      res.json({
        message: "Order updated successfully cash,pending",
        data: { OderId: order.id },
      });
    
  }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

paymentRouter.post('/validate-coupon', authenticateUser, async (req, res) => {
  try {
    const { couponCode } = req.body;
    const currentDate = new Date();

    // Kiểm tra mã giảm giá
    const coupon = await Coupon.findOne({ 
      code: couponCode, 
      userId: req.user.userId, 
      isUsed: false,
      expiresAt: { $gt: currentDate } // Kiểm tra xem coupon còn hạn sử dụng hay không
    });

    if (!coupon) {
      return res.json({ data: { isValid: false }, message: 'Invalid, expired or already used coupon code' });
    }

    if (coupon.isUsed) {
      return res.json({ data: { isValid: false }, message: "Coupon is already used" });
    }

    res.status(200).json({
      data: {
        isValid: true,
        discountPercentage: coupon.discountPercentage
      },
      message: 'Coupon code is valid'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { paymentRouter };
