import express from 'express'
import { addProduct, editProduct, deleteProduct, getProduct, getAllProducts } from '../controllers/products.js'

const router = express.Router()

router.post('/', addProduct)
router.patch('/:id', editProduct)
router.delete('/:id', deleteProduct)
router.get('/:id', getProduct)
router.get('/', getAllProducts)

export default router
