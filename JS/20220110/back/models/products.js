import mongoose from 'mongoose'

const prodcutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '商品不能為空']
  },
  price: {
    type: Number,
    min: [0, '價格格式不正確'],
    required: [true, '商品價格不能為空']
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  sell: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    // 商品分類(靜態)
    enum: {
      values: ['飾品', '皮件', '鞋子'],
      message: '商品分類不存在'
    }
  }
}, { versionKey: false })

export default mongoose.model('products', prodcutSchema)
