import express from 'express';
import { Review } from '../models/review.model.js';


const reviewRouter = express.Router();

reviewRouter.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching review', error });
  }
});

export {reviewRouter};