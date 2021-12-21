import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
  pid: {
    type: mongoose.ObjectId,
    ref: 'products',
    required: [true, '缺少商品編號']
  },
  quantity: {
    type: Number,
    required: [true, '缺少商品數量']
  }
}, { versionKey: false })

const userSchema = new mongoose.Schema({
  account: {
    type: String,
    require: [true, '缺少帳號欄位'],
    unique: true
  },
  cart: {
    type: [cartSchema],
    default: []
  }
}, { versionKey: false })

export default mongoose.model('users', userSchema)
