
import { MenuItem, Room } from './types';

export const INITIAL_MENU: MenuItem[] = [
  {
    id: '1',
    name: 'Truffle Risotto',
    description: 'Creamy Arborio rice with wild mushrooms and fresh black truffle shavings.',
    price: 32.00,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    calories: 450,
    reviews: [
      { id: 'r1', userId: 'user1', userName: 'John Doe', rating: 5, comment: 'Absolutely divine. The truffle flavor is perfectly balanced.', createdAt: new Date().toISOString() }
    ]
  },
  {
    id: '2',
    name: 'Pan-Seared Scallops',
    description: 'Jumbo scallops with parsnip puree and crispy pancetta.',
    price: 24.50,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1533777324565-a040eb52facd?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    calories: 320,
    reviews: []
  },
  {
    id: '3',
    name: 'Lava Chocolate Cake',
    description: 'Warm dark chocolate cake with a molten center and vanilla bean gelato.',
    price: 14.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    calories: 680,
    reviews: [
      { id: 'r2', userId: 'user1', userName: 'John Doe', rating: 4, comment: 'Very rich and delicious, but quite heavy!', createdAt: new Date().toISOString() }
    ]
  },
  {
    id: '4',
    name: 'Garden Gin & Tonic',
    description: 'Premium gin with elderflower, cucumber, and botanical tonic.',
    price: 16.00,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    reviews: []
  },
  {
    id: '5',
    name: 'Wagyu Beef Burger',
    description: 'Grade A5 wagyu beef with caramelized onions and aged cheddar on brioche.',
    price: 28.00,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    calories: 890,
    reviews: []
  }
];

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'rm1',
    name: 'Showk Deluxe',
    type: 'Deluxe',
    description: 'Experience panoramic city views with floor-to-ceiling windows and premium marble finishes.',
    pricePerNight: 299,
    amenities: ['King Bed', 'City View', 'Mini Bar', 'Smart TV', '24/7 Service'],
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1200',
    isAvailable: true,
    maxGuests: 2
  },
  {
    id: 'rm2',
    name: 'Celestial Executive Room',
    type: 'Executive Room',
    description: 'A spacious haven designed for elite travelers, featuring a separate living area and a private terrace.',
    pricePerNight: 499,
    amenities: ['King Bed', 'Private Terrace', 'Jacuzzi', 'Workstation', 'VIP Lounge Access'],
    image: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=1200',
    isAvailable: true,
    maxGuests: 3
  },
  {
    id: 'rm3',
    name: 'The Showk Presidential',
    type: 'Presidential',
    description: 'The pinnacle of luxury. A 200sqm Room with a private kitchen, grand piano, and dedicated butler.',
    pricePerNight: 1200,
    amenities: ['Grand Piano', 'Private Kitchen', 'Butler Service', 'Steam Room', 'Home Cinema'],
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200',
    isAvailable: true,
    maxGuests: 4
  }
];

export const APP_NAME = "Showk-View";
