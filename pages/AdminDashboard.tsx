
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

  // --- DELETE HANDLERS (With API Sync) ---
  const handleDeleteOrder = async (id: string) => {
    if (confirm("Are you sure you want to purge this order record?")) {
      setIsActionLoading(id);
      try {
        await apiService.deleteOrder(id, auth.token!);
        setOrders(prev => prev.filter(o => o.id !== id));
      } catch (err) {
        alert("System error: Failed to delete order.");
      } finally {
        setIsActionLoading(null);
      }
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm("Permanently remove this delicacy from the menu?")) {
      setIsActionLoading(id);
      try {
        await apiService.deleteProduct(id, auth.token!);
        setMenu(prev => prev.filter(m => m.id !== id));
      } catch (err) {
        alert("System error: Failed to delete product.");
      } finally {
        setIsActionLoading(null);
      }
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (confirm("Cancel and delete this stay record?")) {
      setIsActionLoading(id);
      try {
        await apiService.deleteRoomBooking(id, auth.token!);
        setRoomBookings(prev => prev.filter(b => b.id !== id));
      } catch (err) {
        alert("System error: Failed to delete stay record.");
      } finally {
        setIsActionLoading(null);
      }
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (confirm("Revoke patron access and delete account?")) {
      setIsActionLoading(id);
      try {
        await apiService.deleteUser(id, auth.token!);
        setUsers(prev => prev.filter(u => u.id !== id));
      } catch (err) {
        alert("System error: Failed to delete user.");
      } finally {
        setIsActionLoading(null);
      }
    }
  };

  // --- UPDATE HANDLERS (With API Sync) ---
  const updateBookingStatus = async (id: string, status: RoomBooking['status']) => {
    try {
      await apiService.updateBooking(id, status, auth.token!);
      setRoomBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    } catch (err) {
      alert("Failed to update booking status.");
    }
  };

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    try {
      await apiService.updateOrder(id, status, auth.token!);
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    } catch (err) {
      alert("Failed to update order status.");
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
      alert("Failed to commit changes.");
    }
  };

  const calculateTotalRevenue = () => {
    const foodRev = orders.reduce((a, b) => a + b.total, 0);
    const roomRev = roomBookings.reduce((a, b) => a + b.totalPrice, 0);
    return foodRev + roomRev;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-6xl font-serif font-bold text-slate-900 mb-4 tracking-tight">Horizon Control</h1>
          <p className="text-2xl text-slate-500 font-medium italic">Master management for the Showk-View ecosystem.</p>
        </div>
        <div className="bg-slate-900 text-white px-8 py-4 rounded-3xl flex items-center space-x-4 shadow-2xl">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-black uppercase tracking-[0.2em]">System Online</span>
        </div>
      </header>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm font-black uppercase tracking-widest mb-4">Total Revenue</p>
          <div className="flex items-center justify-between">
            <h3 className="text-4xl font-serif font-bold text-slate-900">${calculateTotalRevenue().toLocaleString()}</h3>
            <TrendingUp className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-amber-800 p-10 rounded-[3rem] shadow-2xl shadow-amber-900/30 text-white">
          <p className="text-amber-200 text-sm font-black uppercase tracking-widest mb-4">Suites Booked</p>
          <div className="flex items-center justify-between">
            <h3 className="text-4xl font-serif font-bold">{roomBookings.length}</h3>
            <Bed className="text-amber-400" size={32} />
          </div>
        </div>
        <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm font-black uppercase tracking-widest mb-4">Active Orders</p>
          <div className="flex items-center justify-between">
            <h3 className="text-4xl font-serif font-bold text-slate-900">{orders.filter(o => o.status !== 'DELIVERED').length}</h3>
            <Package className="text-amber-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm font-black uppercase tracking-widest mb-4">Patron Registry</p>
          <div className="flex items-center justify-between">
            <h3 className="text-4xl font-serif font-bold text-slate-900">{users.length}</h3>
            <UsersIcon className="text-slate-400" size={32} />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-8">
        <div className="flex bg-slate-200 p-2.5 rounded-[2rem] border-2 border-slate-300 shadow-inner overflow-x-auto no-scrollbar">
          {[
            { id: 'orders', label: 'Culinary Orders', icon: ClipboardList },
            { id: 'rooms', label: 'Suite Stays', icon: Bed },
            { id: 'products', label: 'Menu Items', icon: Utensils },
            { id: 'users', label: 'Patron Mgmt', icon: UsersIcon }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-3 px-10 py-5 rounded-[1.5rem] text-lg font-black transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-white shadow-2xl text-amber-800 scale-105 border border-slate-100' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <tab.icon size={24} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Management Tables */}
      <div className="bg-white rounded-[3.5rem] border-2 border-slate-200 shadow-2xl overflow-hidden mb-24">
        {activeTab === 'orders' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-white text-sm font-black uppercase tracking-[0.2em]">
                <tr>
                  <th className="px-10 py-10">Identifier</th>
                  <th className="px-10 py-10">Patron</th>
                  <th className="px-10 py-10">Culinary Selection</th>
                  <th className="px-10 py-10">Investment</th>
                  <th className="px-10 py-10">Kitchen Status</th>
                  <th className="px-10 py-10 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-50">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-all">
                    <td className="px-10 py-8 font-mono text-sm font-bold text-slate-400">#{order.id.slice(-6).toUpperCase()}</td>
                    <td className="px-10 py-8 font-black text-slate-900 text-lg">{order.userName}</td>
                    <td className="px-10 py-8">
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item, idx) => (
                          <span key={idx} className="bg-slate-100 text-slate-700 px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest border border-slate-200 shadow-sm">
                            {item.quantity}x {item.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-10 py-8 font-black text-amber-800 text-2xl">${order.total.toFixed(2)}</td>
                    <td className="px-10 py-8">
                      <select 
                        value={order.status} 
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className={`text-sm font-black p-4 border-2 rounded-2xl outline-none focus:ring-4 ring-amber-500/10 cursor-pointer transition-all ${
                          order.status === 'DELIVERED' ? 'bg-green-50 border-green-200 text-green-700' : 
                          order.status === 'CANCELLED' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-amber-50 border-amber-200 text-amber-800'
                        }`}
                      >
                        <option value="RECEIVED">Received</option>
                        <option value="PREPARING">Preparing</option>
                        <option value="OUT-FOR-DELIVERY">En Route</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <button 
                        onClick={() => handleDeleteOrder(order.id)}
                        disabled={isActionLoading === order.id}
                        className="p-5 bg-red-50 text-red-600 rounded-3xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                      >
                        {isActionLoading === order.id ? <Loader2 size={24} className="animate-spin" /> : <Trash2 size={24} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'rooms' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-white text-sm font-black uppercase tracking-[0.2em]">
                <tr>
                  <th className="px-10 py-10">Stay ID</th>
                  <th className="px-10 py-10">Patron</th>
                  <th className="px-10 py-10">Suite Selection</th>
                  <th className="px-10 py-10">Date Window</th>
                  <th className="px-10 py-10">Status</th>
                  <th className="px-10 py-10 text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-50">
                {roomBookings.map(booking => (
                  <tr key={booking.id} className="hover:bg-slate-50 transition-all">
                    <td className="px-10 py-8 font-mono text-sm font-bold text-slate-400">{booking.id}</td>
                    <td className="px-10 py-8 font-black text-slate-900 text-lg">{booking.userName}</td>
                    <td className="px-10 py-8 font-bold text-slate-700 text-lg">{booking.roomName}</td>
                    <td className="px-10 py-8 text-base text-slate-600 font-black">{booking.checkIn} → {booking.checkOut}</td>
                    <td className="px-10 py-8">
                      <select 
                        value={booking.status} 
                        onChange={(e) => updateBookingStatus(booking.id, e.target.value as any)}
                        className={`text-sm font-black p-4 border-2 rounded-2xl outline-none focus:ring-4 ring-amber-500/10 cursor-pointer transition-all ${
                          booking.status === 'COMPLETED' ? 'bg-green-50 border-green-200 text-green-700' : 
                          booking.status === 'CANCELLED' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-blue-50 border-blue-200 text-blue-800'
                        }`}
                      >
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="CHECKED-IN">Patron Checked-In</option>
                        <option value="COMPLETED">Check-Out (Completed)</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <button 
                        onClick={() => handleDeleteBooking(booking.id)}
                        disabled={isActionLoading === booking.id}
                        className="p-5 bg-red-50 text-red-600 rounded-3xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                      >
                        {isActionLoading === booking.id ? <Loader2 size={24} className="animate-spin" /> : <Trash2 size={24} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-white text-sm font-black uppercase tracking-[0.2em]">
                <tr>
                  <th className="px-10 py-10">Preview</th>
                  <th className="px-10 py-10">Delicacy</th>
                  <th className="px-10 py-10">Category</th>
                  <th className="px-10 py-10">Investment</th>
                  <th className="px-10 py-10 text-right">Master Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-50">
                {menu.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-all">
                    <td className="px-10 py-6">
                      <img src={item.image} alt={item.name} className="w-24 h-24 rounded-3xl object-cover border-4 border-white shadow-xl" />
                    </td>
                    <td className="px-10 py-8">
                      <div className="font-black text-slate-900 text-xl">{item.name}</div>
                      <div className="text-sm text-slate-400 italic">Availability: {item.isAvailable ? 'Active' : 'Archived'}</div>
                    </td>
                    <td className="px-10 py-8">
                      <span className="bg-slate-100 text-slate-700 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border-2 border-slate-200">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-10 py-8 font-black text-amber-800 text-3xl">${item.price.toFixed(2)}</td>
                    <td className="px-10 py-8 text-right">
                       <div className="flex justify-end space-x-4">
                          <button onClick={() => { setEditingItem({...item}); setEditType('product'); }} className="p-5 bg-blue-50 text-blue-600 rounded-3xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                            <Edit3 size={24} />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(item.id)}
                            disabled={isActionLoading === item.id}
                            className="p-5 bg-red-50 text-red-600 rounded-3xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                          >
                            {isActionLoading === item.id ? <Loader2 size={24} className="animate-spin" /> : <Trash2 size={24} />}
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-white text-sm font-black uppercase tracking-[0.2em]">
                <tr>
                  <th className="px-10 py-10">Patron</th>
                  <th className="px-10 py-10">Email Registry</th>
                  <th className="px-10 py-10">Loyalty Status</th>
                  <th className="px-10 py-10 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-50">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-all">
                    <td className="px-10 py-8">
                       <div className="flex items-center space-x-4">
                         <div className="w-14 h-14 bg-amber-50 text-amber-800 rounded-full flex items-center justify-center font-bold text-xl border-2 border-amber-100">
                           {user.name.charAt(0).toUpperCase()}
                         </div>
                         <div className="font-black text-slate-900 text-lg">{user.name}</div>
                       </div>
                    </td>
                    <td className="px-10 py-8 text-lg font-medium text-slate-600">{user.email}</td>
                    <td className="px-10 py-8">
                       <div className="flex items-center space-x-2">
                         <span className="text-amber-800 font-black text-2xl">{user.loyaltyPoints}</span>
                         <span className="text-xs font-black uppercase text-slate-400">Pts</span>
                       </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <button 
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={isActionLoading === user.id}
                        className="p-5 bg-red-50 text-red-600 rounded-3xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                      >
                        {isActionLoading === user.id ? <Loader2 size={24} className="animate-spin" /> : <Trash2 size={24} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editingItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl" onClick={() => setEditingItem(null)}></div>
          <div className="bg-white rounded-[3.5rem] w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl animate-in zoom-in duration-300 border-4 border-slate-100">
            <div className="p-12">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-4xl font-serif font-bold text-slate-900">Modify Record</h2>
                <button onClick={() => setEditingItem(null)} className="p-3 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 transition-all">
                  <X size={28} />
                </button>
              </div>

              <form onSubmit={saveEdit} className="space-y-8">
                {editType === 'product' && (
                  <>
                    <div className="space-y-3">
                      <label className="text-sm font-black uppercase text-slate-500 tracking-widest ml-1">Delicacy Name</label>
                      <input 
                        className="w-full p-6 rounded-[1.5rem] border-2 border-slate-100 bg-slate-50 text-xl font-bold text-slate-900 focus:bg-white focus:border-amber-500 transition-all"
                        value={editingItem.name} 
                        onChange={e => setEditingItem({...editingItem, name: e.target.value})} 
                        required 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-sm font-black uppercase text-slate-500 tracking-widest ml-1">Investment (Price)</label>
                        <input 
                          type="number" step="0.01"
                          className="w-full p-6 rounded-[1.5rem] border-2 border-slate-100 bg-slate-50 text-xl font-bold text-slate-900 focus:bg-white focus:border-amber-500 transition-all"
                          value={editingItem.price} 
                          onChange={e => setEditingItem({...editingItem, price: parseFloat(e.target.value)})} 
                          required 
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-black uppercase text-slate-500 tracking-widest ml-1">Category</label>
                        <select 
                          className="w-full p-6 rounded-[1.5rem] border-2 border-slate-100 bg-slate-50 text-xl font-bold text-slate-900 focus:bg-white focus:border-amber-500 transition-all"
                          value={editingItem.category} 
                          onChange={e => setEditingItem({...editingItem, category: e.target.value})}
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
                  className="w-full flex items-center justify-center space-x-4 bg-slate-900 text-white py-6 rounded-[2rem] text-2xl font-black transition-all shadow-2xl hover:bg-amber-800 active:scale-95"
                >
                  <Save size={32} />
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
