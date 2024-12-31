 import cron from "node-cron";
 import { Product } from "../models/product.model.js";
 console.log('Scheduler is running');
// // Giảm giá toàn bộ sản phẩm vào lúc 18h
 cron.schedule('0 18 * * *', async () => {
   console.log('Bắt đầu giảm giá 10%');
  const products = await Product.find({});
  products.forEach(async (product) => {
    product.discountedPrice = product.price * 0.9;
    await product.save();
  });
},{
  timezone: 'Asia/Ho_Chi_Minh'
});
// // Lên lịch khôi phục giá gốc sau 19h
cron.schedule('0 19 * * *', async () => {
  console.log('Kết thúc giảm giá, khôi phục giá gốc');
  const products = await Product.find({});
  products.forEach(async (product) => {
    product.discountedPrice = null;
    await product.save();
  });
},{
  timezone: 'Asia/Ho_Chi_Minh'
});
