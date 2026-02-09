
import express from 'express';
import { protect, admin } from '../middleware/auth';
import { deleteProduct, updateProduct } from '../controllers/productController';

const router = express.Router();

router.route('/:id')
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
