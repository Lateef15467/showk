import React, { useState } from 'react';
import { useApp } from '../App';
import { OrderStatus, MenuItem, RoomBooking, User, Room } from '../types';
import { apiService } from '../services/apiService';
import {
  ClipboardList, Bed, Utensils, Users as UsersIcon,
  Plus, Trash2, CheckCircle, Package,
  Edit3, X, Save, ShieldCheck,
  TrendingUp, Loader2
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const {
    auth,
    orders, setOrders,
    menu, setMenu,
    users, setUsers,
    rooms, setRooms,
    roomBookings, setRoomBookings
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'users' | 'rooms'>('orders');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editType, setEditType] = useState<'product' | 'user' | 'room' | null>(null);
  const [isActionLoading, setIsActionLoading] = useState<string | null>(null);

  // --- DELETE HANDLERS ---
  const handleDeleteOrder = async (id: string) => {
    if (confirm('Are you sure you want to purge this order record?')) {
      setIsActionLoading(id);
      try {
        await apiService.deleteOrder(id, auth.token!);
        setOrders(prev => prev.filter(o => o.id !== id));
      } catch (err) {
        alert('System error: Failed to delete order.');
      } finally {
        setIsActionLoading(null);
      }
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Permanently remove this delicacy from the menu?')) {
      setIsActionLoading(id);
      try {
        await apiService.deleteProduct(id, auth.token!);
        setMenu(prev => prev.filter(m => m.id !== id));
      } catch (err) {
        alert('System error: Failed to delete product.');
      } finally {
        setIsActionLoading(null);
      }
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (confirm('Cancel and delete this stay record?')) {
      setIsActionLoading(id);
      try {
        await apiService.deleteRoomBooking(id, auth.token!);
        setRoomBookings(prev => prev.filter(b => b.id !== id));
      } catch (err) {
        alert('System error: Failed to delete stay record.');
      } finally {
        setIsActionLoading(null);
      }
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (confirm('Revoke User access and delete account?')) {
      setIsActionLoading(id);
      try {
        await apiService.deleteUser(id, auth.token!);
        setUsers(prev => prev.filter(u => u.id !== id));
      } catch (err) {
        alert('System error: Failed to delete user.');
      } finally {
        setIsActionLoading(null);
      }
    }
  };

  // --- UPDATE HANDLERS ---
  const updateBookingStatus = async (id: string, status: RoomBooking['status']) => {
    try {
      await apiService.updateBooking(id, status, auth.token!);
      setRoomBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    } catch (err) {
      alert('Failed to update booking status.');
    }
  };

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    try {
      await apiService.updateOrder(id, status, auth.token!);
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    } catch (err) {
      alert('Failed to update order status.');
    }
  };

  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editType === 'product') {
        const updated = await apiService.updateProduct(editingItem, auth.token!);
        setMenu(prev => prev.map(m => m.id === updated.id ? updated : m));
      } else if (editType === 'user') {
        const updated = await apiService.updateUser(editingItem, auth.token!);
        setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
      }
      setEditingItem(null);
      setEditType(null);
    } catch (err) {
      alert('Failed to commit changes.');
    }
  };

  const calculateTotalRevenue = () => {
    const foodRev = orders.reduce((a, b) => a + b.total, 0);
    const roomRev = roomBookings.reduce((a, b) => a + b.totalPrice, 0);
    return foodRev + roomRev;
  };

  /* ─── shared select style helper ─── */
  const selectCls = (variant: 'green' | 'red' | 'amber' | 'blue') => {
    const map = {
      green: 'bg-green-50 border-green-200 text-green-700',
      red: 'bg-red-50 border-red-200 text-red-700',
      amber: 'bg-amber-50 border-amber-200 text-amber-800',
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
    };
    return `text-xs sm:text-sm font-black p-2.5 sm:p-4 border-2 rounded-2xl outline-none focus:ring-4 ring-amber-500/10 cursor-pointer transition-all w-full ${map[variant]}`;
  };

  const tabs = [
    { id: 'orders', label: 'Orders', fullLabel: 'Culinary Orders', icon: ClipboardList },
    { id: 'rooms', label: 'Stays', fullLabel: 'Room Stays', icon: Bed },
    { id: 'products', label: 'Menu', fullLabel: 'Menu Items', icon: Utensils },
    { id: 'users', label: 'Users', fullLabel: 'User ', icon: UsersIcon },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">

      {/* ── Header ── */}
      <header className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 mb-2 sm:mb-4 tracking-tight">
            Showk Control
          </h1>
          <p className="text-base sm:text-xl lg:text-2xl text-slate-500 font-medium italic">
            Master management for the Showk-View ecosystem.
          </p>
        </div>
        <div className="bg-slate-900 text-white px-5 sm:px-8 py-3 sm:py-4 rounded-2xl sm:rounded-3xl flex items-center space-x-3 sm:space-x-4 shadow-2xl self-start sm:self-auto">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs sm:text-sm font-black uppercase tracking-[0.2em]">System Online</span>
        </div>
      </header>

      {/* ── Analytics Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-16">
        <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl sm:rounded-[3rem] border-2 border-slate-100 shadow-sm">
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-3 sm:mb-4">Total Revenue</p>
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 truncate">
              ${calculateTotalRevenue().toLocaleString()}
            </h3>
            <TrendingUp className="text-green-500 flex-shrink-0" size={24} />
          </div>
        </div>

        <div className="bg-amber-800 p-6 sm:p-8 lg:p-10 rounded-3xl sm:rounded-[3rem] shadow-2xl shadow-amber-900/30 text-white">
          <p className="text-amber-200 text-xs font-black uppercase tracking-widest mb-3 sm:mb-4">Rooms Booked</p>
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold">{roomBookings.length}</h3>
            <Bed className="text-amber-400 flex-shrink-0" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl sm:rounded-[3rem] border-2 border-slate-100 shadow-sm">
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-3 sm:mb-4">Active Orders</p>
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900">
              {orders.filter(o => o.status !== 'DELIVERED').length}
            </h3>
            <Package className="text-amber-600 flex-shrink-0" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl sm:rounded-[3rem] border-2 border-slate-100 shadow-sm">
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-3 sm:mb-4">User Registry</p>
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900">{users.length}</h3>
            <UsersIcon className="text-slate-400 flex-shrink-0" size={24} />
          </div>
        </div>
      </div>

      {/* ── Tab Bar ── */}
      <div className="mb-8 sm:mb-12 overflow-x-auto no-scrollbar">
        <div className="flex bg-slate-200 p-2 rounded-2xl border-2 border-slate-300 shadow-inner w-max min-w-full sm:w-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 sm:space-x-3 px-4 sm:px-7 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl text-sm sm:text-base lg:text-lg font-black transition-all whitespace-nowrap flex-shrink-0 ${
                activeTab === tab.id
                  ? 'bg-white shadow-2xl text-amber-800 scale-105 border border-slate-100'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <tab.icon size={18} className="sm:hidden" />
              <tab.icon size={22} className="hidden sm:block" />
              {/* Short label on mobile, full label on sm+ */}
              <span className="sm:hidden">{tab.label}</span>
              <span className="hidden sm:inline">{tab.fullLabel}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Data Tables ── */}
      <div className="bg-white rounded-2xl sm:rounded-[1rem] border-2 border-slate-200 shadow-2xl overflow-hidden mb-16 sm:mb-24">

        {/* Orders */}
        {activeTab === 'orders' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead className="bg-slate-900 text-white text-xs font-black uppercase tracking-[0.15em]">
                <tr>
                  <th className="px-5 sm:px-10 py-6 sm:py-10">ID</th>
                  <th className="px-5 sm:px-10 py-6 sm:py-10">User</th>
                  <th className="px-5 sm:px-10 py-6 sm:py-10">Items</th>
                  <th className="px-5 sm:px-10 py-6 sm:py-10">Total</th>
                  <th className="px-5 sm:px-10 py-6 sm:py-10">Status</th>
                  <th className="px-5 sm:px-10 py-6 sm:py-10 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-50">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-all">
                    <td className="px-5 sm:px-10 py-5 sm:py-8 font-mono text-xs sm:text-sm font-bold text-slate-400">
                      #{order.id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-5 sm:px-10 py-5 sm:py-8 font-black text-slate-900 text-sm sm:text-lg">{order.userName}</td>
                    <td className="px-5 sm:px-10 py-5 sm:py-8">
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {order.items.map((item, idx) => (
                          <span key={idx} className="bg-slate-100 text-slate-700 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-xl text-xs font-black uppercase tracking-widest border border-slate-200 shadow-sm">
                            {item.quantity}x {item.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 sm:px-10 py-5 sm:py-8 font-black text-amber-800 text-lg sm:text-2xl">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-5 sm:px-10 py-5 sm:py-8">
                      <select
                        value={order.status}
                        onChange={e => updateOrderStatus(order.id, e.target.value as any)}
                        className={selectCls(
                          order.status === 'DELIVERED' ? 'green' :
                          order.status === 'CANCELLED' ? 'red' : 'amber'
                        )}
                      >
                        <option value="RECEIVED">Received</option>
                        <option value="PREPARING">Preparing</option>
                        <option value="OUT-FOR-DELIVERY">En Route</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-5 sm:px-10 py-5 sm:py-8 text-right">
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        disabled={isActionLoading === order.id}
                        className="p-3 sm:p-5 bg-red-50 text-red-600 rounded-2xl sm:rounded-3xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                      >
                        {isActionLoading === order.id
                          ? <Loader2 size={18} className="animate-spin" />
                          : <Trash2 size={18} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Room Stays */}
        {activeTab === 'rooms' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[650px]">
              <thead className="bg-slate-900 text-white text-xs font-black uppercase tracking-[0.15em]">
                <tr>
                  <th className="px-5 sm:px-10 py-6 sm:py-10">Stay ID</th>
                  <th className="px-5 sm:px-10 py-6 sm:py-10">User</th>
                  <th className="px-5 sm:px-10 py-6 sm:py-10">Room</th>
                  <th className="px-5 sm:px-10 py-6 sm:py-10">Dates</th>
                  <th className="px-5 sm:px-10 py-6 sm:py-10">Status</th>
                  <th className="px-5 sm:px-10 py-6 sm:py-10 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-50">
                {roomBookings.map(booking => (
                  <tr key={booking.id} className="hover:bg-slate-50 transition-all">
                    <td className="px-5 sm:px-10 py-5 sm:py-8 font-mono text-xs font-bold text-slate-400 max-w-[100px] truncate">
                      {booking.id}
                    </td>
                    <td className="px-5 sm:px-10 py-5 sm:py-8 font-black text-slate-900 text-sm sm:text-lg">{booking.userName}</td>
                    <td className="px-5 sm:px-10 py-5 sm:py-8 font-bold text-slate-700 text-sm sm:text-base">{booking.roomName}</td>
                    <td className="px-5 sm:px-10 py-5 sm:py-8 text-xs sm:text-base text-slate-600 font-black whitespace-nowrap">
                      {booking.checkIn} → {booking.checkOut}
                    </td>
                    <td className="px-5 sm:px-10 py-5 sm:py-8">
                      <select
                        value={booking.status}
                        onChange={e => updateBookingStatus(booking.id, e.target.value as any)}
                        className={selectCls(
                          booking.status === 'COMPLETED' ? 'green' :
                          booking.status === 'CANCELLED' ? 'red' : 'blue'
                        )}
                      >
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="CHECKED-IN">Checked-In</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-5 sm:px-10 py-5 sm:py-8 text-right">
                      <button
                        onClick={() => handleDeleteBooking(booking.id)}
                        disabled={isActionLoading === booking.id}
                        className="p-3 sm:p-5 bg-red-50 text-red-600 rounded-2xl sm:rounded-3xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                      >
                        {isActionLoading === booking.id
                          ? <Loader2 size={18} className="animate-spin" />
                          : <Trash2 size={18} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Menu Products */}
        {activeTab === 'products' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[500px]">
              <thead className="bg-slate-900 text-white text-xs font-black uppercase tracking-[0.15em]">
                <tr>
                  <th className="px-5 sm:px-10 py-6 sm:py-10">Preview</th>
                  <th className="px-5 sm:px-10 py-6 sm:py-10">Delicacy</th>
                  <th className="px-5 sm:px-10 py-6 sm:py-10">Category</th>
                  <th className="px-5 sm:px-10 py-6 sm:py-10">Price</th>
                  <th className="px-5 sm:px-10 py-6 sm:py-10 text-right">Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-50">
                {menu.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-all">
                    <td className="px-5 sm:px-10 py-4 sm:py-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl sm:rounded-3xl object-cover border-4 border-white shadow-xl"
                      />
                    </td>
                    <td className="px-5 sm:px-10 py-5 sm:py-8">
                      <div className="font-black text-slate-900 text-base sm:text-xl">{item.name}</div>
                      <div className="text-xs text-slate-400 italic mt-0.5">
                        {item.isAvailable ? 'Active' : 'Archived'}
                      </div>
                    </td>
                    <td className="px-5 sm:px-10 py-5 sm:py-8">
                      <span className="bg-slate-100 text-slate-700 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-black uppercase tracking-widest border-2 border-slate-200">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-5 sm:px-10 py-5 sm:py-8 font-black text-amber-800 text-xl sm:text-3xl">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-5 sm:px-10 py-5 sm:py-8 text-right">
                      <div className="flex justify-end space-x-2 sm:space-x-4">
                        <button
                          onClick={() => { setEditingItem({ ...item }); setEditType('product'); }}
                          className="p-3 sm:p-5 bg-blue-50 text-blue-600 rounded-2xl sm:rounded-3xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(item.id)}
                          disabled={isActionLoading === item.id}
                          className="p-3 sm:p-5 bg-red-50 text-red-600 rounded-2xl sm:rounded-3xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        >
                          {isActionLoading === item.id
                            ? <Loader2 size={18} className="animate-spin" />
                            : <Trash2 size={18} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Users */}
        {activeTab === 'users' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[400px]">
              <thead className="bg-slate-900 text-white text-xs font-black uppercase tracking-[0.15em]">
                <tr>
                  <th className="px-5 sm:px-10 py-6 sm:py-10">User</th>
                  <th className="px-5 sm:px-10 py-6 sm:py-10">Email</th>
                  <th className="px-5 sm:px-10 py-6 sm:py-10">Loyalty</th>
                  <th className="px-5 sm:px-10 py-6 sm:py-10 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-50">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-all">
                    <td className="px-5 sm:px-10 py-5 sm:py-8">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-10 h-10 sm:w-14 sm:h-14 bg-amber-50 text-amber-800 rounded-full flex items-center justify-center font-bold text-base sm:text-xl border-2 border-amber-100 flex-shrink-0">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="font-black text-slate-900 text-sm sm:text-lg truncate max-w-[100px] sm:max-w-none">
                          {user.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 sm:px-10 py-5 sm:py-8 text-sm sm:text-lg font-medium text-slate-600 truncate max-w-[140px] sm:max-w-none">
                      {user.email}
                    </td>
                    <td className="px-5 sm:px-10 py-5 sm:py-8">
                      <div className="flex items-center space-x-1.5 sm:space-x-2">
                        <span className="text-amber-800 font-black text-lg sm:text-2xl">{user.loyaltyPoints}</span>
                        <span className="text-xs font-black uppercase text-slate-400">Pts</span>
                      </div>
                    </td>
                    <td className="px-5 sm:px-10 py-5 sm:py-8 text-right">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={isActionLoading === user.id}
                        className="p-3 sm:p-5 bg-red-50 text-red-600 rounded-2xl sm:rounded-3xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                      >
                        {isActionLoading === user.id
                          ? <Loader2 size={18} className="animate-spin" />
                          : <Trash2 size={18} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Edit Modal ── */}
      {editingItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl"
            onClick={() => setEditingItem(null)}
          />
          <div className="bg-white rounded-3xl sm:rounded-[3.5rem] w-full max-w-lg sm:max-w-2xl relative z-10 overflow-hidden shadow-2xl animate-in zoom-in duration-300 border-2 sm:border-4 border-slate-100">
            <div className="p-7 sm:p-12">
              <div className="flex justify-between items-center mb-7 sm:mb-10 gap-4">
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900">Modify Record</h2>
                <button
                  onClick={() => setEditingItem(null)}
                  className="p-2.5 sm:p-3 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 transition-all flex-shrink-0"
                >
                  <X size={22} />
                </button>
              </div>

              <form onSubmit={saveEdit} className="space-y-6 sm:space-y-8">
                {editType === 'product' && (
                  <>
                    <div className="space-y-2 sm:space-y-3">
                      <label className="text-xs sm:text-sm font-black uppercase text-slate-500 tracking-widest ml-1">
                        Delicacy Name
                      </label>
                      <input
                        className="w-full p-4 sm:p-6 rounded-2xl sm:rounded-[1.5rem] border-2 border-slate-100 bg-slate-50 text-base sm:text-xl font-bold text-slate-900 focus:bg-white focus:border-amber-500 transition-all outline-none"
                        value={editingItem.name}
                        onChange={e => setEditingItem({ ...editingItem, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                      <div className="space-y-2 sm:space-y-3">
                        <label className="text-xs sm:text-sm font-black uppercase text-slate-500 tracking-widest ml-1">
                          Price
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          className="w-full p-4 sm:p-6 rounded-2xl sm:rounded-[1.5rem] border-2 border-slate-100 bg-slate-50 text-base sm:text-xl font-bold text-slate-900 focus:bg-white focus:border-amber-500 transition-all outline-none"
                          value={editingItem.price}
                          onChange={e => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })}
                          required
                        />
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <label className="text-xs sm:text-sm font-black uppercase text-slate-500 tracking-widest ml-1">
                          Category
                        </label>
                        <select
                          className="w-full p-4 sm:p-6 rounded-2xl sm:rounded-[1.5rem] border-2 border-slate-100 bg-slate-50 text-base sm:text-xl font-bold text-slate-900 focus:bg-white focus:border-amber-500 transition-all outline-none"
                          value={editingItem.category}
                          onChange={e => setEditingItem({ ...editingItem, category: e.target.value })}
                        >
                          <option value="Appetizers">Appetizers</option>
                          <option value="Main Course">Main Course</option>
                          <option value="Desserts">Desserts</option>
                          <option value="Drinks">Drinks</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-3 sm:space-x-4 bg-slate-900 text-white py-5 sm:py-6 rounded-2xl sm:rounded-[2rem] text-lg sm:text-2xl font-black transition-all shadow-2xl hover:bg-amber-800 active:scale-95"
                >
                  <Save size={24} />
                  <span>Commit Changes</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;