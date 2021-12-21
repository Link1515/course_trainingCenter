import products from '../models/products.js'
import users from '../models/users.js'

export const createUser = async (req, res) => {
  try {
    if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
      res.status(400).send({ success: false, message: '格式錯誤' })
      return
    }
    const result = await users.create(req.body)
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

export const addCart = async (req, res) => {
  try {
    if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
      res.status(400).send({ success: false, message: '格式錯誤' })
      return
    }

    if (!req.body.pid) {
      res.status(400).send({ success: false, message: '缺少商品編號' })
      return
    }
    if (!req.body.quantity) {
      res.status(400).send({ success: false, message: '缺少商品數量' })
      return
    }
    if (typeof req.body.quantity !== 'number') {
      res.status(400).send({ success: false, message: '資料格式不正確，商品數量必須為數字型別' })
      return
    }

    // 檢查商品是否存在
    let result = await products.findById(req.body.pid)
    if (!result) {
      res.status(404).send({ success: false, message: '查無此商品' })
      return
    }

    // const result = await users.findByIdAndUpdate(req.params.id, {
    //   $push: {
    //     cart: req.body
    //   }
    // }, { new: true, runValidators: true })

    result = await users.findById(req.params.id, 'cart')
    // 檢查商品是否在購物車內
    if (!result) {
      res.status(404).send({ success: false, message: '查無使用者' })
      return
    }
    const idx = result.cart.findIndex(product => {
      // product.pid 的資料型態是 objectId，不能直接比較，要轉字串
      return product.pid.toString() === req.body.pid
    })
    if (idx > -1) {
      // 如果在購物車內，就加數量
      result.cart[idx].quantity += req.body.quantity
      // 如果數量處理後小於 0，從購物車移除
      if (result.cart[idx].quantity <= 0) {
        result.cart.splice(idx, 1)
      }
    } else {
      // 不在購物車內就push
      result.cart.push(req.body)
    }
    result.save()

    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到此用戶ID' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const getUser = async (req, res) => {
  try {
    const result = await users.findById(req.params.id, '-cart')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到此用戶ID' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const getUserCart = async (req, res) => {
  try {
    // .populate(有 ref 欄位的屬性, {欄位名: 是否顯示}) 會關聯其他 collection 的資料，會對應到 schema 的 ref 屬性
    const result = await users.findById(req.params.id, 'cart').populate('cart.pid')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到此用戶ID' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
