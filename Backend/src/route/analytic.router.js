import express from 'express';
import { Order } from '../models/order.model.js';
import { Product } from '../models/product.model.js';
const analyticsRouter = express.Router();

analyticsRouter.get('/top-selling-products', async (req, res) => {
  try {
    // Lấy tất cả đơn hàng có trạng thái Completed
    const orders = await Order.find({ status: 'Completed' });
    //console.log(orders);
    // Tạo một map để lưu tổng số lượng bán cho từng sản phẩm
    const productSales = {};

    // Tính tổng số lượng bán cho từng sản phẩm
    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = 0;
        }
        productSales[item.productId] += item.quantityPurchased;
      });
    });
    //console.log(productSales);
    // Chuyển dữ liệu map thành mảng để dễ sắp xếp
     const productSalesArray = Object.keys(productSales).map((productId) => ({
       productId,
       totalSold: productSales[productId],
 }));
 
 // Sắp xếp mảng theo tổng số lượng bán giảm dần
 productSalesArray.sort((a, b) => b.totalSold - a.totalSold);

    // Lấy top 10 sản phẩm
    const topSellingProducts = productSalesArray.slice(0, 10);

    // Lấy thông tin chi tiết của sản phẩm từ cơ sở dữ liệu
     const products = await Product.find({
       _id: { $in: topSellingProducts.map((p) => p.productId) },
     });
     console.log(products);

    // Kết hợp thông tin sản phẩm với số lượng đã bán
    // const result = topSellingProducts.map((p) => ({
    //   ...p,
    //   product: products.find((prod) => prod._id.toString() === p.productId),
    // }));

     res.json({
       message: 'Top 10 best-selling products',
       data: products,
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default analyticsRouter;
