import express from "express";
import { Order } from "../models/order.model.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { Product } from "../models/product.model.js";

const orderRouter = express.Router();

//localhost:3000/order/:userId/
orderRouter.get("/", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    //console.log("user gọi order", userId);
    const onGoingOrders = await Order.find({ userId, status: "OnGoing" })
      .populate("items.productId")
      .sort({ orderAt: -1 });
    const ordersHistory = await Order.find({
      userId,
      status: { $in: ["Completed", "Cancelled"] },
    })
      .populate("items.productId")
      .sort({ orderAt: -1 });

    res
      .status(200)
      .json({
        message: "Get oders success",
        data: { ongoing: onGoingOrders, history: ordersHistory },
      });
  } catch (error) {
    res.status(500).json({ message: "Error fetching all order", error });
  }
});
orderRouter.post("/changeStatus", authenticateUser, async (req, res) => {
  try {
    // const userId = req.user.userId;
    const { orderId } = req.body;
    const orders = await Order.findByIdAndUpdate(orderId, {
      status: "Completed",
      paymentStatus: "Paid",
    });
    res.status(200).json({ message: "Update order success", data: { orders } });
  } catch (error) {
    res.status(500).json({ message: "Error fetching order in change status", error });
  }
});

orderRouter.post("/cancelOrder", authenticateUser, async (req, res) => {
  const { orderId } = req.body;
  //console.log("cancel id", orderId);
  const restoreProductInventory = async (items) => {
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${item.productId} not found` });
      }
      product.stock += item.quantityPurchased; // Tăng lại số lượng sản phẩm
      await product.save();
    }
  };
  try {
    // const userId = req.user.userId;
    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }
    //console.log("cancel id", orderId);
    const order = await Order.findById(orderId);
    console.log("order", order);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    // Nếu đơn hàng đã được thanh toán, không thể hủy
    else if (order.paymentStatus === "Paid") {
      return res.status(400).json({ message: "Cannot cancel a paid order" });
    }

    
    order.status = "Cancelled";
    await order.save();
    await restoreProductInventory(order.items);
    //const order = await Order.find(orderId,{status: 'Canceled'});
    res.status(200).json({ message: "Cancel order success" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching order in cancel", error });
  }
});

export { orderRouter };
