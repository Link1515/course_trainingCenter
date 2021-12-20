import mongoose from 'mongoose'

const Schema = mongoose.Schema

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, '未填入商品名稱'],
    unique: true
  },
  price: {
    type: Number,
    required: [true, '未填入商品價格'],
    min: [0, '最小值為 0']
  },
  description: {
    type: String,
    default: '無說明'
  },
  quantity: {
    type: Number,
    required: [true, '未填入商品數量'],
    min: [0, '最小值為 0']
  }
}, { versionKey: false })

const products = mongoose.model('products', productSchema)

export default products

// export default mongoose.model('products', productSchema)
