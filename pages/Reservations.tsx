
import React, { useState } from 'react';
import { useApp } from '../App';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Utensils, Clock, CheckCircle, Info } from 'lucide-react';

const Reservations: React.FC = () => {
  const { auth, addReservation } = useApp();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '19:00',
    guests: 2,
    occasion: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.isAuthenticated) {
      alert("Please sign in to confirm your booking.");
      return;
    }

    const newRes = {
      id: Math.random().toString(36).substr(2, 9),
      userId: auth.user!.id,
      userName: auth.user!.name,
      ...formData,
      status: 'CONFIRMED' as const
    };

    addReservation(newRes);
    setIsSuccess(true);
    setTimeout(() => navigate('/profile'), 3000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center animate-in zoom-in duration-300">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Table Confirmed!</h2>
        <p className="text-slate-500 mb-8">We've reserved a stunning view for you. A confirmation has been sent to your email.</p>
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 text-left space-y-2">
          <p className="text-xs font-bold uppercase text-slate-400 tracking-widest">Your Reservation Details</p>
          <div className="flex justify-between font-bold">
            <span>Date & Time</span>
            <span>{formData.date} at {formData.time}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Guests</span>
            <span>{formData.guests} Users</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-4 block">Exclusive Dining</span>
          <h1 className="text-6xl font-serif font-bold text-slate-900 mb-8 leading-tight">Secure Your <br/> Showk View</h1>
          <p className="text-lg text-slate-600 mb-12 leading-relaxed">
            Our limited seating ensures an intimate environment. Whether it's a romantic evening or a business meeting, we provide the perfect atmosphere.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mr-4 shrink-0 text-amber-800">
                <Utensils size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Curated Menu</h4>
                <p className="text-sm text-slate-500">Access to our premium seasonal menu and chef's specials.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mr-4 shrink-0 text-amber-800">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Reserved Timing</h4>
                <p className="text-sm text-slate-500">Your table is kept for 20 minutes past your scheduled arrival.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-400 tracking-widest ml-1">Arrival Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="date" 
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-2 ring-amber-500 outline-none"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400 tracking-widest ml-1">Arrival Time</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <select 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-2 ring-amber-500 outline-none appearance-none"
                    value={formData.time}
                    onChange={e => setFormData({...formData, time: e.target.value})}
                  >
                    {['12:00','13:00','14:00','18:00','19:00','20:00','21:00'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-400 tracking-widest ml-1">Guests</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="number" 
                    min="1" max="12"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-2 ring-amber-500 outline-none"
                    value={formData.guests}
                    onChange={e => setFormData({...formData, guests: parseInt(e.target.value)})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-400 tracking-widest ml-1">Special Occasion (Optional)</label>
              <input 
                type="text" 
                placeholder="e.g. Birthday, Anniversary"
                className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 ring-amber-500 outline-none"
                value={formData.occasion}
                onChange={e => setFormData({...formData, occasion: e.target.value})}
              />
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl flex items-start space-x-3 text-amber-800">
              <Info size={18} className="shrink-0 mt-0.5" />
              <p className="text-[10px] font-medium leading-relaxed">
                By booking, you agree to our cancellation policy. Cancellations within 2 hours of booking may incur a $25 fee.
              </p>
            </div>

            <button 
              type="submit"
              className="w-full bg-slate-900 hover:bg-amber-800 text-white py-5 rounded-[1.5rem] font-bold transition-all shadow-xl active:scale-[0.98]"
            >
              Confirm Reservation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
