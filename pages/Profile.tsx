import React, { useState } from 'react';
import { useApp } from '../App';
import { User, Shield, Calendar, Package, Clock, Star, Coins, ArrowRight, LayoutDashboard, Bed, MapPin } from 'lucide-react';
import OrderTracker from '../components/OrderTracker';

const Profile: React.FC = () => {
  const { auth, orders, reservations, roomBookings } = useApp();
  const [activeTab, setActiveTab] = useState<'orders' | 'reservations' | 'stays'>('orders');

  if (!auth.isAuthenticated || !auth.user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6 text-slate-900">User Access Only</h2>
        <p className="text-lg sm:text-xl text-slate-600">Please sign in to view your culinary and travel journey.</p>
      </div>
    );
  }

  const userOrders = orders.filter(o => o.userId === auth.user?.id);
  const userReservations = reservations.filter(r => r.userId === auth.user?.id);
  const userStays = roomBookings.filter(b => b.userId === auth.user?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">

        {/* ── Sidebar ── */}
        <div className="space-y-6 lg:space-y-10">

          {/* Profile Card */}
          <div className="bg-white rounded-3xl sm:rounded-[3rem] p-8 sm:p-12 shadow-sm border border-slate-100 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-3 bg-amber-800" />
            <div className="w-20 h-20 sm:w-28 sm:h-28 bg-amber-50 text-amber-800 rounded-full flex items-center justify-center text-4xl sm:text-5xl font-serif font-bold mx-auto mb-6 sm:mb-8 shadow-inner border border-amber-100">
              {auth.user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-2">{auth.user.name}</h2>
            <p className="text-slate-500 text-base sm:text-lg mb-6 sm:mb-8 font-medium break-all">{auth.user.email}</p>
            <div className="flex justify-center">
              <span className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.2em]">
                Elite {auth.user.role} Member
              </span>
            </div>
          </div>

          {/* Loyalty Card */}
          <div className="bg-amber-800 text-white rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-10 shadow-2xl shadow-amber-900/20">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <Coins size={28} className="text-amber-400" />
              <span className="text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-amber-200">Showk Rewards</span>
            </div>
            <p className="text-4xl sm:text-5xl font-serif font-bold mb-3 sm:mb-4">{auth.user.loyaltyPoints.toLocaleString()}</p>
            <p className="text-xs sm:text-sm font-bold opacity-80 mb-6 sm:mb-8 uppercase tracking-widest">Available Loyalty Points</p>
            <div className="bg-white/10 p-5 sm:p-6 rounded-2xl border border-white/5">
              <p className="font-black text-amber-300 mb-2 uppercase text-xs tracking-widest">
                User Tier: {auth.user.loyaltyPoints > 1000 ? 'Platinum Showk' : 'Gold Signature'}
              </p>
              <p className="text-sm text-amber-50 leading-relaxed italic opacity-80">
                Points can be redeemed for private cellar tours or Room upgrades.
              </p>
            </div>
          </div>
        </div>

        {/* ── Content Area ── */}
        <div className="lg:col-span-2 space-y-8 sm:space-y-12">

          {/* Tabs */}
          <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { id: 'orders', label: 'Culinary History', icon: Package },
              { id: 'reservations', label: 'Table Bookings', icon: Calendar },
              { id: 'stays', label: 'Luxury Stays', icon: Bed },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 sm:pb-5 px-1 mr-6 sm:mr-10 text-sm sm:text-base font-black transition-all relative flex items-center space-x-2 sm:space-x-3 whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.id ? 'text-amber-800' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-800 rounded-full animate-in slide-in-from-left duration-300" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="animate-in fade-in duration-500">

            {/* ── Stays ── */}
            {activeTab === 'stays' && (
              <div className="space-y-6 sm:space-y-8">
                {userStays.length === 0 ? (
                  <div className="p-12 sm:p-20 text-center bg-white rounded-3xl sm:rounded-[2.5rem] border border-slate-100 text-slate-400 italic text-lg sm:text-xl shadow-sm">
                    No luxury stays recorded. Visit our Rooms to begin your journey.
                  </div>
                ) : userStays.map(stay => (
                  <div
                    key={stay.id}
                    className="bg-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-8 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center">
                      <div className="w-14 h-14 sm:w-20 sm:h-20 bg-slate-50 text-amber-800 rounded-2xl sm:rounded-3xl flex items-center justify-center mr-5 sm:mr-8 shadow-inner border border-slate-100 flex-shrink-0">
                        <Bed size={28} className="sm:hidden" />
                        <Bed size={40} className="hidden sm:block" />
                      </div>
                      <div>
                        <h4 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">{stay.roomName}</h4>
                        <p className="text-sm sm:text-base text-slate-500 font-bold flex items-center mt-1 sm:mt-2 italic">
                          <Calendar size={15} className="mr-2 sm:mr-3 text-amber-700 flex-shrink-0" />
                          {stay.checkIn} — {stay.checkOut}
                        </p>
                      </div>
                    </div>
                    <div className="flex sm:flex-col sm:text-right items-center sm:items-end gap-4 sm:gap-0">
                      <span className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs font-black uppercase tracking-widest ${
                        stay.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {stay.status}
                      </span>
                      <p className="sm:mt-4 text-xl sm:text-2xl font-serif font-bold text-amber-800">${stay.totalPrice.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Orders ── */}
            {activeTab === 'orders' && (
              <div className="space-y-6 sm:space-y-8">
                {userOrders.length === 0 ? (
                  <div className="p-12 sm:p-20 text-center bg-white rounded-3xl sm:rounded-[2.5rem] border border-slate-100 italic text-slate-400 text-lg sm:text-xl shadow-sm">
                    Your culinary order history is empty.
                  </div>
                ) : userOrders.map(order => (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center mb-6 sm:mb-10 gap-4">
                      <span className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] sm:tracking-[0.3em] break-all">
                        ID: {order.id.slice(-8).toUpperCase()}
                      </span>
                      <span className="text-xl sm:text-2xl font-serif font-bold text-amber-800 flex-shrink-0">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                    <OrderTracker status={order.status} />
                  </div>
                ))}
              </div>
            )}

            {/* ── Reservations ── */}
            {activeTab === 'reservations' && (
              <div className="space-y-6 sm:space-y-8">
                {userReservations.length === 0 ? (
                  <div className="p-12 sm:p-20 text-center bg-white rounded-3xl sm:rounded-[2.5rem] border border-slate-100 italic text-slate-400 text-lg sm:text-xl shadow-sm">
                    No table bookings found in our registry.
                  </div>
                ) : userReservations.map(res => (
                  <div
                    key={res.id}
                    className="bg-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 border border-slate-100 shadow-sm flex items-center justify-between gap-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center min-w-0">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-900 text-white rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center mr-5 sm:mr-8 shadow-lg flex-shrink-0">
                        <span className="text-xs font-black uppercase tracking-tighter opacity-70">{res.date.split('-')[1]}</span>
                        <span className="text-lg sm:text-2xl font-serif font-bold leading-none">{res.date.split('-')[2]}</span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-base sm:text-xl font-bold text-slate-900 truncate">{res.time} • {res.guests} Users</h4>
                        <p className="text-xs sm:text-sm text-slate-500 font-bold italic flex items-center mt-1">
                          <MapPin size={13} className="mr-1.5 sm:mr-2 text-amber-700 flex-shrink-0" /> Premium Terrace Seating
                        </p>
                      </div>
                    </div>
                    <span className="px-4 py-1.5 sm:px-6 sm:py-2 bg-green-100 text-green-800 text-xs font-black rounded-full uppercase tracking-widest flex-shrink-0">
                      {res.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;