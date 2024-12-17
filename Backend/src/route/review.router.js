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
    const reviews = await Review.find({product:productId}).populate('user').sort({ createAt: -1 });
    res.status(200).json({message:'get reviews success',data:{reviews}});

  } catch (error) {
    res.status(500).json({ message: 'Error fetching review', error });
  }
});

// Thêm một review mới cho sản phẩm
reviewRouter.post('/:productId/reviews',authenticateUser, async (req, res) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;
  const userId=req.user.userId;
  try {
    // Tạo review mới
    
    const review = new Review({ user:userId,product:productId, rating,comment});
    await review.save();
    
    console.log('review moi tao',review)
    
    // Tính toán lại averageRating và reviewsCount
     const reviews = await Review.find({product:productId});
     console.log('Tat ca review cua san pham',productId,'là:',reviews)

     const reviewsCount = reviews.length;
     const averageRating =
       reviews.reduce((sum, review) => sum + review.rating, 0) / reviewsCount;

    // // Cập nhật lại thông tin đánh giá của sản phẩm
     await Product.findOneAndUpdate({product:productId}, {
       averageRating,
       reviewsCount,
     });
    
    res.status(201).json({ message: 'Review added successfully', data:{review} });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add review' });
  }
});




export {reviewRouter};