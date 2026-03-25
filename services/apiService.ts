
import { MenuItem, User, Order, Room, RoomBooking, OrderStatus } from '../types';

const API_URL = '/api';
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  // --- AUTHENTICATION ---
  login: async (email: string, pass: string) => {
    console.log(`[MERN] POST ${API_URL}/auth/login`);
    await wait(1000); 
    if (email === 'admin@Showk.com' && pass === 'admin') {
      return { 
        user: { id: 'admin1', name: 'Showk Admin', email, role: 'ADMIN' as const, loyaltyPoints: 5000 }, 
        token: 'fake-jwt-admin-token' 
      };
    }
    return { 
      user: { id: 'user-' + Date.now(), name: email.split('@')[0], email, role: 'USER' as const, loyaltyPoints: 0 }, 
      token: 'fake-jwt-user-token-' + Date.now()
    };
  },

  // --- ROOMS & BOOKINGS ---
  bookRoom: async (bookingData: any, token: string): Promise<RoomBooking> => {
    console.log(`[MERN] POST ${API_URL}/room-bookings`, bookingData);
    await wait(1200);
    return {
      ...bookingData,
      id: 'BK-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      status: 'CONFIRMED',
      createdAt: new Date().toISOString()
    };
  },

  updateBooking: async (id: string, status: RoomBooking['status'], token: string) => {
    console.log(`[MERN] PATCH ${API_URL}/room-bookings/${id}`, { status });
    await wait(600);
    return true;
  },

  deleteRoomBooking: async (id: string, token: string) => {
    console.log(`[MERN] DELETE ${API_URL}/room-bookings/${id}`);
    await wait(800);
    return true;
  },

  // --- CULINARY ORDERS ---
  updateOrder: async (id: string, status: OrderStatus, token: string) => {
    console.log(`[MERN] PATCH ${API_URL}/orders/${id}`, { status });
    await wait(600);
    return true;
  },

  deleteOrder: async (id: string, token: string) => {
    console.log(`[MERN] DELETE ${API_URL}/orders/${id}`);
    await wait(800);
    return true;
  },

  // --- MENU / PRODUCTS ---
  createProduct: async (item: Partial<MenuItem>, token: string) => {
    console.log(`[MERN] POST ${API_URL}/menu`, item);
    await wait(1000);
    return { ...item, id: 'P-' + Date.now() } as MenuItem;
  },

  updateProduct: async (item: MenuItem, token: string) => {
    console.log(`[MERN] PUT ${API_URL}/menu/${item.id}`, item);
    await wait(700);
    return item;
  },

  deleteProduct: async (id: string, token: string) => {
    console.log(`[MERN] DELETE ${API_URL}/menu/${id}`);
    await wait(800);
    return true;
  },

  // --- UserS / USERS ---
  updateUser: async (user: User, token: string) => {
    console.log(`[MERN] PUT ${API_URL}/users/${user.id}`, user);
    await wait(600);
    return user;
  },

  deleteUser: async (id: string, token: string) => {
    console.log(`[MERN] DELETE ${API_URL}/users/${id}`);
    await wait(800);
    return true;
  }
};
