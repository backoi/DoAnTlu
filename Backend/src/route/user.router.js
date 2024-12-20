import express from 'express';
import {User} from '../models/user.model.js';
import { authenticateUser } from '../middleware/authenticateUser.js';
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

export {userRouter};