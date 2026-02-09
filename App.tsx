
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { User, AuthState, CartItem, MenuItem, Order, Reservation, Room, RoomBooking } from './types';
import { INITIAL_MENU, INITIAL_ROOMS, APP_NAME } from './constants';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import Reservations from './pages/Reservations';
import About from './pages/About';
import Contact from './pages/Contact';
import AuthModal from './components/AuthModal';
import { apiService } from './services/apiService';
import { ShoppingCart, User as UserIcon, Menu as MenuIcon, X, LayoutDashboard, LogOut, CalendarDays, Bed } from 'lucide-react';

interface AppContextType {
  auth: AuthState;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  menu: MenuItem[];
  setMenu: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  roomBookings: RoomBooking[];
  setRoomBookings: React.Dispatch<React.SetStateAction<RoomBooking[]>>;
  addRoomBooking: (booking: RoomBooking) => void;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  addOrder: (order: Order) => void;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  reservations: Reservation[];
  addReservation: (res: Reservation) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useApp();
  if (!auth.isAuthenticated || auth.user?.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem('auth');
    return saved ? JSON.parse(saved) : { user: null, token: null, isAuthenticated: false };
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [roomBookings, setRoomBookings] = useState<RoomBooking[]>(() => {
    const saved = localStorage.getItem('roomBookings');
    return saved ? JSON.parse(saved) : [];
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('reservations');
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [menu, setMenu] = useState<MenuItem[]>(INITIAL_MENU);
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  
  const [users, setUsers] = useState<User[]>([
    { id: 'admin1', name: 'Showk Admin', email: 'admin@showk.com', role: 'ADMIN', loyaltyPoints: 5000 },
    { id: 'user1', name: 'John Doe', email: 'john@example.com', role: 'USER', loyaltyPoints: 120 }
  ]);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('roomBookings', JSON.stringify(roomBookings));
  }, [roomBookings]);

  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations]);

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const response = await apiService.login(email, pass);
      const existingUser = users.find(u => u.email === email);
      const userData: User = existingUser || { ...response.user, loyaltyPoints: 0 };
      
      setAuth({ user: userData, token: response.token, isAuthenticated: true });
      if (!existingUser) {
        setUsers(prev => [...prev, userData]);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setAuth({ user: null, token: null, isAuthenticated: false });
    setCart([]);
    localStorage.removeItem('auth');
  };

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.id !== id));
  const clearCart = () => setCart([]);
  
  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    if (auth.user) {
      const pointsEarned = Math.floor(order.total * 10);
      setUsers(prev => prev.map(u => u.id === auth.user?.id ? { ...u, loyaltyPoints: u.loyaltyPoints + pointsEarned } : u));
      setAuth(prev => ({
        ...prev,
        user: prev.user ? { ...prev.user, loyaltyPoints: prev.user.loyaltyPoints + pointsEarned } : null
      }));
    }
  };

  const addReservation = (res: Reservation) => setReservations(prev => [res, ...prev]);
  const addRoomBooking = (booking: RoomBooking) => setRoomBookings(prev => [booking, ...prev]);

  return (
    <AppContext.Provider value={{
      auth, login, logout, cart, addToCart, removeFromCart, clearCart, menu, setMenu, 
      rooms, setRooms, roomBookings, setRoomBookings, addRoomBooking,
      orders, setOrders, addOrder, users, setUsers, reservations, addReservation
    }}>
      <HashRouter>
        <div className="min-h-screen flex flex-col">
          <nav className="sticky top-0 z-50 glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-24">
                <div className="flex-shrink-0">
                  <Link to="/" className="text-4xl font-serif font-bold tracking-tighter text-amber-800 hover:text-amber-900 transition-colors">
                    {APP_NAME}
                  </Link>
                </div>

                <div className="hidden md:flex flex-1 justify-center space-x-12">
                  <Link to="/" className="text-slate-700 hover:text-amber-800 px-3 py-2 text-lg font-black transition-colors">Home</Link>
                  <Link to="/menu" className="text-slate-700 hover:text-amber-800 px-3 py-2 text-lg font-black transition-colors">Menu</Link>
                  <Link to="/rooms" className="text-slate-700 hover:text-amber-800 px-3 py-2 text-lg font-black flex items-center transition-colors">
                    <Bed size={20} className="mr-2" /> Stay
                  </Link>
                  <Link to="/reservations" className="text-slate-700 hover:text-amber-800 px-3 py-2 text-lg font-black flex items-center transition-colors">
                    <CalendarDays size={20} className="mr-2" /> Book Table
                  </Link>
                </div>

                <div className="flex items-center space-x-8">
                  <Link to="/checkout" className="relative p-2 text-slate-700 hover:text-amber-800 transition-colors">
                    <ShoppingCart size={28} />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 px-2 py-1 text-xs font-black leading-none text-white bg-amber-600 rounded-full border-2 border-white shadow-sm">
                        {cart.reduce((acc, curr) => acc + curr.quantity, 0)}
                      </span>
                    )}
                  </Link>
                  
                  {auth.isAuthenticated ? (
                    <div className="flex items-center space-x-6">
                      <Link to="/profile" className="p-2 text-slate-700 hover:text-amber-800 transition-colors">
                        <UserIcon size={28} />
                      </Link>
                      {auth.user?.role === 'ADMIN' && (
                        <Link to="/admin" className="text-amber-800 bg-amber-50 rounded-full px-6 py-3 text-sm font-black border border-amber-200 hidden md:flex items-center transition-all hover:bg-amber-100 shadow-sm">
                          <LayoutDashboard size={20} className="mr-2" /> Admin
                        </Link>
                      )}
                      <button onClick={logout} className="p-2 text-slate-700 hover:text-red-600 transition-colors">
                        <LogOut size={28} />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setIsAuthModalOpen(true)} className="bg-amber-800 text-white px-8 py-4 rounded-full text-base font-black shadow-lg hover:bg-amber-900 transition-all active:scale-95">
                      Sign In
                    </button>
                  )}

                  <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-slate-700">
                    {isMobileMenuOpen ? <X size={32} /> : <MenuIcon size={32} />}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden glass border-t border-slate-200 p-8 space-y-6 animate-in fade-in slide-in-from-top-4 duration-200">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-2xl font-black text-slate-900">Home</Link>
                <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)} className="block text-2xl font-black text-slate-900">Menu</Link>
                <Link to="/rooms" onClick={() => setIsMobileMenuOpen(false)} className="block text-2xl font-black text-slate-900">Stay</Link>
                <Link to="/reservations" onClick={() => setIsMobileMenuOpen(false)} className="block text-2xl font-black text-slate-900">Book Table</Link>
                {auth.isAuthenticated && (
                  <>
                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block text-2xl font-black text-slate-900">Profile</Link>
                    {auth.user?.role === 'ADMIN' && (
                      <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block text-2xl font-black text-amber-800 bg-amber-50 p-4 rounded-2xl border border-amber-200 flex items-center">
                        <LayoutDashboard size={28} className="mr-4" /> Admin Dashboard
                      </Link>
                    )}
                  </>
                )}
              </div>
            )}
          </nav>

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/room/:id" element={<RoomDetails />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
            </Routes>
          </main>

          <footer className="bg-slate-900 text-slate-200 py-24">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-4xl font-serif text-white mb-6 tracking-tight">{APP_NAME}</h2>
              <p className="max-w-2xl mx-auto mb-12 text-lg text-slate-400 italic leading-relaxed">Redefining luxury through culinary mastery and panoramic views. Experience the peak of hospitality at Horizon Peak.</p>
              <div className="flex justify-center flex-wrap gap-10 mb-16 text-sm font-black uppercase tracking-[0.2em]">
                <Link to="/about" className="text-white hover:text-amber-500 transition-colors">Our Story</Link>
                <Link to="/contact" className="text-white hover:text-amber-500 transition-colors">Reach Us</Link>
                <Link to="/menu" className="text-white hover:text-amber-500 transition-colors">Privacy Policy</Link>
                <Link to="/rooms" className="text-white hover:text-amber-500 transition-colors">Careers</Link>
              </div>
              <p className="text-sm font-black uppercase tracking-[0.4em] text-slate-500">© 2024 {APP_NAME} International. All Rights Reserved.</p>
            </div>
          </footer>

          <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;
