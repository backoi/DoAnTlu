import express from 'express';
import { Order } from '../models/order.model.js';
import { authenticateUser } from '../middleware/authenticateUser.js';


const orderRouter = express.Router();


//localhost:3000/order/:userId/
orderRouter.get('/',authenticateUser, async (req, res) => {
  try {
     const userId = req.user.userId;
     console.log(userId);
     const onGoingOrders = await Order.find({userId,status: 'OnGoing'}).populate('items.product');//.sort({})
     const ordersHistory = await Order.find({
      userId,
      status: { $in: ["Completed", "Canceled"] },
    }).populate('items.product');

    res.status(200).json({message:'Get oders success',
      data:{ongoing:onGoingOrders,history:ordersHistory} 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
});
orderRouter.post('/changeStatus',authenticateUser, async (req, res) => {
  try {
    // const userId = req.user.userId;
     const {orderId} = req.body;
     const orders = await Order.findByIdAndUpdate(orderId,{status: 'Completed',paymentStatus:'Paid'});
    res.status(200).json({message:'Update order success',
      data:{orders} 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
});

orderRouter.post('/cancelOrder',authenticateUser, async (req, res) => {
  try {
    // const userId = req.user.userId;
     const {orderId} = req.body;
     if (!orderId){
      return res.status(400).json({ message: 'Order ID is required' });
     }
     console.log('cancel id',orderId);
     const order = await Order.findByIdAndUpdate(orderId,{status: 'Canceled'});
    res.status(200).json({message:'Cancel order success',});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
});
orderRouter.get('/abc',authenticateUser, async (req, res) => {
  try {
    // const userId = req.user.userId;
    
    res.status(200).json({message:'Test success',data:{text:'abc'}
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
});
export {orderRouter};