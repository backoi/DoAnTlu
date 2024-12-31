import cron from "node-cron";
import { Product } from "../models/product.model";

// Lên lịch giảm giá lúc 18h mỗi ngày
cron.schedule("0 18 * * *", async () => {
  console.log("Bắt đầu giảm giá 10%!");

  try {
    // Áp dụng giảm giá
    await Product.updateMany({}, { $set: { discount: 10 } });
    console.log("Áp dụng giảm giá thành công!");

    // Gỡ giảm giá sau 1 giờ
    setTimeout(async () => {
      try {
        await Product.updateMany({}, { $set: { discount: 0 } });
        console.log("Gỡ giảm giá thành công!");
      } catch (error) {
        console.error("Lỗi khi gỡ giảm giá:", error);
      }
    }, 60 * 60 * 1000); // 1 giờ
  } catch (error) {
    console.error("Lỗi khi áp dụng giảm giá:", error);
  }
},{
    timezone: "Asia/Ho_Chi_Minh" // Ví dụ: Múi giờ Việt Nam
  });