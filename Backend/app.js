import express from 'express';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as AdminJSMongoose from '@adminjs/mongoose';
import { User } from './src/models/user.model.js';
import { authRouter } from './src/route/auth.router.js';
import { Product } from './src/models/product.model.js';
import { categoryRouter } from './src/route/category.router.js';
import { Category } from './src/models/category.model.js';
import { productRouter } from './src/route/product.router.js';
import { Review } from './src/models/review.model.js';
import { reviewRouter } from './src/route/review.router.js';
import 'dotenv/config'
import { paymentRouter } from './src/route/payment.router.js';
import { Order } from './src/models/oder.model.js';
const app = express();
const port = 3000;
AdminJS.registerAdapter(AdminJSMongoose)
const start = async () => {
  //connect to db mongo
  await mongoose.connect(process.env.MONGO_URL)
  //await mongoose.connect('mongodb://localhost/ecomarket')
  app.listen(port, () => {
    console.log(`AdminJS panel is available at http://localhost:${port}/admin`);
  });
}
start()
const adminJs = new AdminJS({
  //databases: [],
  resources:[{
    resource: User,
    options: {
      // navigation: {
      //   name: 'EcoMarket', // Thay "Test" thành tên bạn muốn
      //    // Tùy chọn: thêm icon nếu muốn
      // },
      
      properties:{
        password: { isVisible: { list: true, show: true, edit: false } },
        //name:{isVisible:false},
      }

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

  }
],
  rootPath: '/admin',
  branding: {
    companyName: 'Ecomarket',  // Tên công ty hoặc tiêu đề bạn muốn hiển thị
  },
});

const router = AdminJSExpress.buildRouter(adminJs);
app.use(cors())
app.use(express.json()) //để phân tích cú pháp dữ liệu JSON trong body của request.
app.use(adminJs.options.rootPath, router);
//http://localhost:3000/
app.use('/api/auth', authRouter);
app.use('/api/category',categoryRouter)
app.use('/api/product',productRouter)
app.use('/api/review',reviewRouter)
app.use('/payment/',paymentRouter)

app.get('/', (req, res) => {
  res.send('Welcome to AdminJS with Express!');
});
//lấy ảnh từ cloud làm đơn giản ko cần phức tạp