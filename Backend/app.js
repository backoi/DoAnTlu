import express from "express";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import cors from "cors";
import mongoose from "mongoose";
import * as AdminJSMongoose from "@adminjs/mongoose";
import { User } from "./src/models/user.model.js";
import { authRouter } from "./src/route/auth.router.js";
import { Product } from "./src/models/product.model.js";
import { categoryRouter } from "./src/route/category.router.js";
import { Category } from "./src/models/category.model.js";
import { productRouter } from "./src/route/product.router.js";
import { Review } from "./src/models/review.model.js";
import { reviewRouter } from "./src/route/review.router.js";
import "dotenv/config";
import { paymentRouter } from "./src/route/payment.router.js";
import { Order } from "./src/models/order.model.js";
import { orderRouter } from "./src/route/order.router.js";
import { userRouter } from "./src/route/user.router.js";
import { Coupon } from "./src/models/coupon.model.js";
import { Expo } from "expo-server-sdk";
import { Device } from "./src/models/device.model.js";
import { deviceRouter } from "./src/route/device.router.js";
import analyticsRouter from "./src/route/analytic.router.js";

const expo = new Expo();
const app = express();
const port = 3000;


AdminJS.registerAdapter(AdminJSMongoose);
const start = async () => {
  //connect to db mongo
  await mongoose.connect(process.env.MONGO_URL);
  //await mongoose.connect('mongodb://localhost/ecomarket')
  app.listen(port, () => {
    console.log(`AdminJS panel is available at http://localhost:${port}/admin`);
  });
};
start();
const adminJs = new AdminJS({
  //databases: [],
  resources: [
    {
      resource: User,
      options: {
        // navigation: {
        //   name: 'EcoMarket', // Thay "Test" thành tên bạn muốn
        //    // Tùy chọn: thêm icon nếu muốn
        // },

        properties: {
          password: { isVisible: { list: true, show: true, edit: false } },
          //name:{isVisible:false},
        },
      },
    },
    {
      resource: Category,
    },
    {
      resource: Product,
    },
    {
      resource: Review,
    },
    {
      resource: Order,
    },
    {
      resource: Device,
    },
    {
      resource: Coupon,

      options: {
        actions: {
          new: {
            after: async (request, response, context) => {
              const { record, h, resource } = context; //currentAdmin nếu có đặt mật khẩu
              const coupon = record.params;
              const userId = coupon.user;
              console.log("coupon:", coupon);
              let devices = [];
              if (userId) {
                devices = await Device.find({ userId });
              } else {
                devices = await Device.find();
              }
              const pushTokens = devices.map((device) => device.token);

              if (record.isValid()) {
                //tạo thông báo
                const messages = pushTokens.map((pushToken) => ({
                  to: pushToken,
                  sound: "default",
                  title: "New Coupon",
                  body: `You have a new coupon: ${coupon.code} with discount ${coupon.discountPercentage}%`,
                }));

                //gui thong bao cho tat ca cac thiet bi
                let chunks = expo.chunkPushNotifications(messages);
                for (let chunk of chunks) {
                  try {
                    await expo.sendPushNotificationsAsync(chunk);
                  } catch (error) {
                    console.error("Error sending notifications:", error);
                  }
                }
                console.log("Send to all customers successfully");
              } else {
                console.log("Falled validation:", record.errors);
              }

              return {
                redirectUrl: h.resourceUrl({
                  resourceId: resource._decorated?.id() || resource.id(),
                }),
                record: record.toJSON(),
                notice: {
                  message: "successfullyCreated",
                  type: "success",
                },
              };
            },
          },
        },
      },
    },
  ],
  rootPath: "/admin",
  branding: {
    companyName: "Ecomarket", // Tên công ty hoặc tiêu đề bạn muốn hiển thị
  },
});

const router = AdminJSExpress.buildRouter(adminJs);
app.use(cors());
app.use(express.json()); //để phân tích cú pháp dữ liệu JSON trong body của request.
app.use(adminJs.options.rootPath, router);
//http://localhost:3000/
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/review", reviewRouter);
app.use("/user/order", orderRouter);
app.use("/user/profile", userRouter);
app.use("/payment", paymentRouter);
app.use("/device", deviceRouter);
app.use("/analytic", analyticsRouter);

app.get("/", (req, res) => {
  res.send("Welcome to AdminJS with Express!");
});
//lấy ảnh từ cloud làm đơn giản ko cần phức tạp
