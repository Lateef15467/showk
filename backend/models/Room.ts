
import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Deluxe', 'Executive Room', 'Presidential', 'Penthouse'], required: true },
  description: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  amenities: [String],
  image: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
  maxGuests: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model('Room', roomSchema);
