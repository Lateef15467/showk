
export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  loyaltyPoints: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Appetizers' | 'Main Course' | 'Desserts' | 'Drinks';
  image: string;
  isAvailable: boolean;
  calories?: number;
  reviews: Review[];
}

export interface Room {
  id: string;
  name: string;
  type: 'Deluxe' | 'Executive Suite' | 'Presidential' | 'Penthouse';
  description: string;
  pricePerNight: number;
  amenities: string[];
  image: string;
  isAvailable: boolean;
  maxGuests: number;
}

export interface RoomBooking {
  id: string;
  userId: string;
  userName: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'CHECKED-IN' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export type OrderStatus = 'RECEIVED' | 'PREPARING' | 'OUT-FOR-DELIVERY' | 'DELIVERED' | 'CANCELLED';

export interface Order {
  id: string;
  userId: string;
  userName: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  paymentId?: string;
}

export interface Reservation {
  id: string;
  userId: string;
  userName: string;
  date: string;
  time: string;
  guests: number;
  occasion?: string;
  status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
