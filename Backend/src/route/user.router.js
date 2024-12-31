import express from 'express';
import bcrypt from 'bcryptjs'
import {User} from '../models/user.model.js';
import { authenticateUser } from '../middleware/authenticateUser.js';
import { Coupon } from '../models/coupon.model.js';
// http://localhost:3000/user/profile

const userRouter = express.Router();

userRouter.get('/', authenticateUser,async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    res.status(200).json({message:'user info',data:{user}});

  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});
userRouter.post('/update-infor', authenticateUser,async (req, res) => {
  try {
    const userId = req.user.userId;
    const { username, email, phone, address, currentPassword, newPassword } = req.body;
    const user = await User.findByIdAndUpdate(userId,{username,email,phone,address},); //{new true} để trả về dữ liệu mới sau khi update
    if(currentPassword && newPassword){
      const isMatchPass=await bcrypt.compare(currentPassword,user.password)
      if(!isMatchPass) {
        return res.status(400).json({ message: "Incorect password" });
      }
      else{
        const hashPass= await bcrypt.hash(newPassword,10)
        user.password=hashPass;
        await user.save();//hoặc là findByIdAndUpdate như trên
      }
      }
    res.status(200).json({message:'update infor success',data:{user}});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error }); 
  }
})
//update password
// userRouter.post('/update-password', authenticateUser,async (req, res) => {
//   try {
//     const userId = req.user.userId;
//     const {currentPassword,newPassword}=req.body;
//     const user = await User.findById(userId) 
//     const isMatchPass=await bcrypt.compare(currentPassword,user.password)
//     if(!isMatchPass) {
//       return res.status(400).json({ message: "Incorect password" });
//     }
//     else{
//        const hashPass= await bcrypt.hash(newPassword,10)
//        user.password=hashPass;
//        await user.save();
//       res.status(200).json({message:'update success',data:{userId:user._id}});
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching users', error });
//   }
//     }
// ); //tách ra 2 cái thì dùng

// get coupon
userRouter.get('/coupon', authenticateUser,async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const coupons = await Coupon.find({
      $or: [
        { userId }, // Điều kiện 1: userId trùng với userId truyền vào
        { userId: { $exists: false } }, // Điều kiện 2: userId không tồn tại
      ],
    });
    res.status(200).json({message:'get coupon',data:{coupons}});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching coupons', error });
  }
});
export {userRouter};