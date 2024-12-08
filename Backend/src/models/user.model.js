import { model, Schema, Types } from 'mongoose'
//const {model, Schema} =require('mongoose')
const UserSchema = new Schema(
  {
    username: { type: String},
    email:{ type: String, required: true },
    password:{ type: String, required: true },
    phone:{ type: String,default: ''},
    address:{ type: String,default: ''}
  },
  { timestamps: true },
)

 export const User = model('User', UserSchema);
 