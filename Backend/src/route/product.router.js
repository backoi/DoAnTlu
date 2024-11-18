import express, { query } from 'express';
import { Product } from '../models/product.model.js';


const productRouter = express.Router();

// productRouter.get('/', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching product', error });
//   }
// });
productRouter.get('/', async (req, res) => {
  const {search,category}=req.query
  //console.log('gia tri cate tren sv',category)
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
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
});




export {productRouter};