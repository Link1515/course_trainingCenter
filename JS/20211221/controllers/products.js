import products from '../models/products.js'

export const createProduct = async (req, res) => {
  try {
    if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
      res.status(400).send({ success: false, message: '格式錯誤' })
      return
    }
    const result = await products.create(req.body)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(400).send({ success: false, message: '帳號重複' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
