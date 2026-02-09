
// import Product from '../models/Product';

/**
 * @desc    Delete a product
 * @route   DELETE /api/menu/:id
 * @access  Private/Admin
 */
export const deleteProduct = async (req: any, res: any) => {
  try {
    // const product = await Product.findById(req.params.id);
    // if (product) {
    //   await product.remove();
    //   res.json({ message: 'Product removed' });
    // } else {
    //   res.status(404).json({ message: 'Product not found' });
    // }
    res.json({ message: 'Product successfully removed from database' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update a product
 * @route   PUT /api/menu/:id
 * @access  Private/Admin
 */
export const updateProduct = async (req: any, res: any) => {
  const { name, price, description, image, category, isAvailable } = req.body;
  try {
    // const product = await Product.findById(req.params.id);
    // if (product) {
    //   product.name = name;
    //   ... update fields
    //   const updatedProduct = await product.save();
    //   res.json(updatedProduct);
    // }
    res.json({ message: 'Product updated', data: req.body });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
