import express, { query } from 'express';
import { Product } from '../models/product.model.js';
import { Review } from '../models/review.model.js';


const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const {search,category,minPrice,maxPrice,minRate, offset, limit}=req.query //truyền từ params của axios //query là ?=
  
  const query={}
  if(search){
    query.name={$regex:search,$options:'i'} //tim kiem tuong doi, khong phan biet hoa thuong
  }
  if(category){
    query.category=category
  }
  
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) {
        query.price.$gte = parseFloat(minPrice); // Giá >= minPrice
    }
    if (maxPrice) {
        query.price.$lte = parseFloat(maxPrice); // Giá <= maxPrice
    }
}
  if (minRate) {
      query.averageRating = { $gte: parseFloat(minRate) }; // Đánh giá >= minRate
  }
  try {
    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .skip(parseInt(offset))
      .limit(parseInt(limit))
      .lean();
    
    const updatedProducts = products.map(product => {
      if (product.discount > 0) {
        product.discountedPrice = product.price * (1 - product.discount / 100);
      }
      return product;
    });
    res.status(200).json({message:'get products success',data:{products:updatedProducts,totalProducts,
      hasMore: parseInt(offset) + parseInt(limit) < totalProducts}});

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
    res.json({message:"get product by id",data:{product}});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
});

// productRouter.get('/features', async (req, res) => {
//   try {
//     const products = await Product.find({isFeatures:true});
//     res.status(200).json({message:'get feature success',data:{products}});

   
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching product', error });
//   }
// });


export {productRouter};