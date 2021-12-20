import products from '../models/products.js'

export const addProduct = async (req, res) => {
  try {
    if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
      res.status(400).send({ success: false, message: '格式錯誤' })
      return
    }
    const result = (await products.create(req.body)).toObject()
    delete result.password
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    let errMsg = ''
    if (error.name === 'ValidationError') {
      for (const err of Object.keys(error.errors)) {
        errMsg += error.errors[err] + ' '
      }
      res.status(400).send({ success: false, message: errMsg })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(400).send({ success: false, message: '商品名稱重複' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const editProduct = async (req, res) => {
  try {
    const result = await products.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    let errMsg = ''
    if (error.name === 'ValidationError') {
      for (const err of Object.keys(error.errors)) {
        errMsg += error.errors[err] + ' '
      }
      res.status(400).send({ success: false, message: errMsg })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(400).send({ success: false, message: '商品名稱重複' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const deleteProduct = async (req, res) => {
  try {
    await products.findByIdAndDelete(req.params.id)
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    console.log(error)
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '查無此ID' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const getProduct = async (req, res) => {
  try {
    const result = await products.findById(req.params.id)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '查無此ID' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const query = {
      $and: [],
      $or: [
        { name: { $in: [] } },
        { description: { $in: [] } }
      ]
    }
    if (req.query.price_gte && !isNaN(parseInt(req.query.price_gte))) {
      query.$and.push({ price: { $gte: req.query.price_gte } })
    }

    if (req.query.price_lte && !isNaN(parseInt(req.query.price_lte))) {
      query.$and.push({ price: { $lte: req.query.price_lte } })
    }

    if (req.query.keywords) {
      const keywords = req.query.keywords.split(',').map(keyword => {
        return new RegExp(keyword, 'i')
      })
      query.$or[0].name.$in = keywords
      query.$or[1].description.$in = keywords
    } else {
      delete query.$or
    }

    if (query.$and.length === 0) {
      delete query.$and
    }

    const result = await products.find(query)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
