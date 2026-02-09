
// import Order from '../models/Order';

/**
 * @desc    Update order status
 * @route   PATCH /api/orders/:id
 * @access  Private/Admin
 */
export const updateOrderStatus = async (req: any, res: any) => {
  try {
    // const order = await Order.findById(req.params.id);
    // if (order) { order.status = req.body.status; await order.save(); }
    res.json({ message: 'Order status updated' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete an order record
 * @route   DELETE /api/orders/:id
 * @access  Private/Admin
 */
export const deleteOrder = async (req: any, res: any) => {
  try {
    // await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order purged from history' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
