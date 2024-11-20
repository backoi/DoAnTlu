import express from 'express';
import { Review } from '../models/review.model.js';
import { Product } from '../models/product.model.js';
// http://localhost:3000/api/review
const reviewRouter = express.Router();

reviewRouter.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching review', error });
  }
});


// Thêm một review mới cho sản phẩm
reviewRouter.post('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params;
  const { userId, rating, comment } = req.body;

  try {
    // Tạo review mới
    const review = await Review.create({ userId,productId, rating, comment });
    console.log('review moi tao',review)
    // Tính toán lại averageRating và reviewsCount
    const reviews = await Review.find({ productId });
    console.log('Tat ca review cua san pham',productId,'là:',reviews)
    const reviewsCount = reviews.length;
    const averageRating =
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviewsCount;

    // Cập nhật lại thông tin đánh giá của sản phẩm
    await Product.findByIdAndUpdate(productId, {
      averageRating,
      reviewsCount,
    });

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add review' });
  }
});





export {reviewRouter};