import express from 'express';
import { Review } from '../models/review.model.js';
import { Product } from '../models/product.model.js';
import { authenticateUser } from '../middleware/authenticateUser.js';
// http://localhost:3000/api/review
const reviewRouter = express.Router();

reviewRouter.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('user');
    res.status(200).json({message:'get reviews success',data:{reviews}});

  } catch (error) {
    res.status(500).json({ message: 'Error fetching review', error });
  }
});

reviewRouter.get('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviews = await Review.find({productId}).populate('userId').sort({ createAt: -1 });
    res.status(200).json({message:'get reviews success',data:{reviews}});

  } catch (error) {
    res.status(500).json({ message: 'Error fetching review', error });
  }
});

// Thêm một review mới cho sản phẩm
reviewRouter.post('/:productId/reviews',authenticateUser, async (req, res) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;
  //console.log('gia tri id', productId, 'gai tri rate', rating, 'gia tri comment', comment);
  const userId=req.user.userId;
  //console.log('id user',userId)
  // let now = new Date();
  // let vietnamTime = now.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  // console.log('gio viet nam',vietnamTime)
  try {
    // Tạo review mới
    
    const review = new Review({ userId,productId,rating,comment });
    //console.log('review',review)
    await review.save();
    
    //console.log('review moi tao',review)
    
    // Tính toán lại averageRating và reviewsCount
     const reviews = await Review.find({productId});
     //console.log('Tat ca review cua san pham',productId,'là:',reviews)

     const reviewsCount = reviews.length;
     //console.log('reviewsCount',reviewsCount)
     const averageRating =
       reviews.reduce((sum, review) => sum + review.rating, 0) / reviewsCount;
     //console.log('averageRating',averageRating)
    // // Cập nhật lại thông tin đánh giá của sản phẩm
     const product = await Product.findOneAndUpdate({ _id: productId}, {
       averageRating,
       reviewsCount,
     }, { new: true });
    //console.log('product',product)
    res.status(201).json({ message: 'Review added successfully', data:{review} });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add review' });
  }
});




export {reviewRouter};