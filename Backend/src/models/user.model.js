import { model, Schema, Types } from 'mongoose'
//const {model, Schema} =require('mongoose')
const UserSchema = new Schema(
  {
    name: { type: String},
    email:{ type: String, required: true },
    password:{ type: String, required: true },

  },
  { timestamps: true },
)

 export const User = model('User', UserSchema);
 