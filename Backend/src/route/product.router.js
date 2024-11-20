import express, { query } from 'express';
import { Product } from '../models/product.model.js';
import { Review } from '../models/review.model.js';


const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const {search,category}=req.query //truyền từ params của endpoint //query là ?=
  const query={}
  if(search){
    query.name={$regex:search,$options:'i'} //tim kiem tuong doi, khong phan biet hoa thuong
  }
  if(category){
    query.category=category
  }
  try {
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
});

productRouter.get('/features', async (req, res) => {
  try {
    const products = await Product.find({isFeatures:true});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
});

productRouter.get('/:id', async (req, res) => {
  const {id}=req.params // đặt tên trùng với endpoint //params là :
  try {
    const product = await Product.findById(id);
    const reviews = await Review.find({'productId':id})
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({product,reviews});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
});




export {productRouter};