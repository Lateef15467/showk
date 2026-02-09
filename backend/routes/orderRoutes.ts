
import express from 'express';
import { protect, admin } from '../middleware/auth';
import { updateOrderStatus, deleteOrder } from '../controllers/orderController';

const router = express.Router();

router.route('/:id')
  .patch(protect, admin, updateOrderStatus)
  .delete(protect, admin, deleteOrder);

export default router;
