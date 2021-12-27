import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routers/users.js'
import productRouter from './routers/products.js'
import fileRouter from './routers/files.js'

mongoose.connect(process.env.DB_URL, () => {
  console.log('Database Connected')
})

const app = express()

app.use(express.json())

app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/files', fileRouter)

app.listen(process.env.PORT || 3000, () => {
  console.log('Server Started')
})
