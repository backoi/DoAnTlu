import express from 'express';
import { Category } from '../models/category.model.js';


const categoryRouter = express.Router();

categoryRouter.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error });
  }
});

export {categoryRouter};