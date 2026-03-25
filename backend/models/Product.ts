
// Conceptual Mongoose Schema for Product
export const ProductSchema = {
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
  calories: { type: Number }
};
