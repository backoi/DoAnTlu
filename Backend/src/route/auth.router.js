import express from 'express';
//const express=require('express')
import {User} from '../models/user.model.js'
//const {User}=require('../models/user.model.js')
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { Coupon } from '../models/coupon.model.js';
import crypto from 'crypto';
import "dotenv/config";

const authRouter = express.Router();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS_EMAIL,
  },
});
//dang ki
authRouter.post('/register', async (req, res) => {
  try {
    const {username, email, password } = req.body;
   // res.send('thanh cong roi')
    const existedUsers = await User.findOne({email});
    if(existedUsers){
        res.status(400)
        throw new Error('User has already exist!!!');
    }
    else{
        const hashPass= await bcrypt.hash(password,10)
        const newUser= new User({username,email,password:hashPass})
        //console.log(newUser)
        await newUser.save()

        //tao ma giam gia
        const discountCode = crypto.randomBytes(4).toString('hex').toUpperCase(); // Ví dụ: "4F7A1B2C"
        const coupon = new Coupon({
            code: discountCode,
            discountPercentage: 10, // Giảm giá 10%
            user: newUser._id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Hết hạn sau 7 ngày
        });
        await coupon.save();
        const accessToken = jwt.sign({ userId: newUser._id, email},process.env.SECRET_KEY,{expiresIn:'1d'});//backoi hoặc dùng process.env.JWT_SECRET
        res.status(201).json({message:'Sign up success',data:{accessToken,discountCode} }); 
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});
//đăng nhập
authRouter.post('/login',async(req,res)=>{
    try {
        const { email, password } = req.body;
       // res.send('thanh cong roi')
        const existedUsers = await User.findOne({email});
        if(!existedUsers){
           return res.status(404).json({ message: "User not found" });
        }
        const isMatchPass=await bcrypt.compare(password,existedUsers.password)
        if(!isMatchPass) {
          return res.status(400).json({ message: "Incorect password" });
        }
        else{
          const token = jwt.sign({ userId: existedUsers._id },process.env.SECRET_KEY,{expiresIn:'1d'});//hoặc dùng process.env.JWT_SECRET
          res.status(200).json({message:'Login success',data:{username:existedUsers.username,email,phone:existedUsers.phone,address:existedUsers.address, accessToken:token} });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
       
      }
})

authRouter.post('/forgot-password',async(req,res)=>{
  const randomCode=Math.floor(1000 + Math.random() * 9000);
  try {
      const { email } = req.body;
      const user = await User.findOne({ email })
      if(!user){
        res.status(404).json({message:'Email not exists!'});
      }
      else{
        await transporter.sendMail({
        from: `"Le Bac 👻" <${process.env.EMAIL}>`, // sender address 
        to: email, // list of receivers
        subject: "Verify code ✔", // Subject line
        text: "This is verify code to reset password!!", // plain text body
        html: `<b>Verify code: ${randomCode} </b>`, // html body
      })
      res.status(200).json({message:'Send success!',data:{code:randomCode}});
    };
    } catch (error) {
      res.status(405).json({ error:error.message });
     
    }
})

authRouter.post('/change-password',async(req,res)=>{
  const {email,password}=req.body
  //console.log('data received',email,password)
  //newpass nữa
  try {
    const user = await User.findOne({ email })
    //console.log('user',user)
    const hashPass= await bcrypt.hash(password,10)
    const update = await User.findOneAndUpdate(user._id,{
      password : hashPass
  })

    res.status(200).json({message:'Update success!'});
      
    } catch (error) {
      res.status(400).json({ error: error.message });
     
    }
})
export {authRouter};