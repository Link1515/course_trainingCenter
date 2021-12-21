import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '缺少商品名稱']
  },
  price: {
    type: Number,
    required: [true, '缺少商品價格'],
    min: 0
  }
}, { versionKey: false })

export default mongoose.model('products', productSchema)
