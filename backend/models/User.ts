
import { UserRole } from '../../types';

// Conceptual Mongoose Schema for User
export const UserSchema = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed
  role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now }
};
