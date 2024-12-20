import { model, Schema } from 'mongoose'

const DeviceSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', },
    token: {type:String},
    createAt: { type: Date,default:  Date.now},
  },
)

export const Device = model('Device', DeviceSchema);