
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { apiService } from '../services/apiService';
import { ArrowLeft, Calendar, Users, Star, CheckCircle, Info, Sparkles, CreditCard, Loader2, ShieldCheck } from 'lucide-react';

const RoomDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { rooms, auth, addRoomBooking } = useApp();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const room = rooms.find(r => r.id === id);

  const nights = useMemo(() => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const diff = end.getTime() - start.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  }, [formData.checkIn, formData.checkOut]);

  const totalPrice = nights * (room?.pricePerNight || 0);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!auth.isAuthenticated) {
      alert("Membership Required: Please sign in to book your stay at Showk-View.");
      return;
    }

    if (nights <= 0) {
      alert("Invalid Dates: Your departure must be after your arrival.");
      return;
    }

    setIsProcessing(true);
    try {
      const result = await apiService.bookRoom({
        userId: auth.user!.id,
        userName: auth.user!.name,
        roomId: room!.id,
        roomName: room!.name,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: formData.guests,
        totalPrice,
      }, auth.token!);
      
      addRoomBooking(result);
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => navigate('/profile'), 4000);
    } catch (err) {
      console.error("MERN Sync Error:", err);
      setIsProcessing(false);
    }
  };

  if (!room) return <div className="text-center py-24 font-serif text-2xl">Suite Selection Not Found</div>;

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center animate-in zoom-in duration-500">
        <div className="w-28 h-28 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
          <CheckCircle size={56} />
        </div>
        <h2 className="text-5xl font-serif font-bold text-slate-900 mb-6">Stay Confirmed</h2>
        <p className="text-xl text-slate-600 mb-12 italic leading-relaxed">Your sanctuary at the peak has been reserved. Data synced to your Patron Profile.</p>
        
        <div className="bg-white rounded-[2.5rem] p-12 border border-slate-100 shadow-2xl text-left space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
          <div className="flex justify-between items-center border-b border-slate-50 pb-5">
            <span className="text-slate-500 font-bold italic text-base">Suite Type</span>
            <span className="text-slate-900 font-black text-lg">{room.name}</span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-50 pb-5">
            <span className="text-slate-500 font-bold italic text-base">Arrival Date</span>
            <span className="text-slate-900 font-black text-lg">{formData.checkIn}</span>
          </div>
          <div className="flex justify-between items-center pt-6 text-4xl font-serif font-bold text-amber-800">
            <span>Amount Paid</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>
        </div>
        <div className="mt-16 flex items-center justify-center text-slate-500 space-x-4">
          <Loader2 className="animate-spin" size={24} />
          <p className="text-base font-black uppercase tracking-[0.2em]">Updating Master Database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <button onClick={() => navigate(-1)} className="flex items-center text-slate-600 hover:text-amber-800 font-black mb-12 transition-all group text-sm uppercase tracking-widest">
        <ArrowLeft size={20} className="mr-3 group-hover:-translate-x-1" />
        Return to Selection
      </button>

      <div className="grid lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-10 animate-in slide-in-from-left duration-700">
          <div className="relative rounded-[3.5rem] overflow-hidden shadow-2xl h-[600px]">
            <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            <div className="absolute bottom-12 left-12 text-white">
              <span className="bg-amber-600 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-lg">{room.type}</span>
              <h1 className="text-5xl font-serif font-bold mt-6 tracking-tight">{room.name}</h1>
            </div>
          </div>
          <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
             <h3 className="text-3xl font-serif font-bold text-slate-900 mb-6">Premier Accommodations</h3>
             <p className="text-xl text-slate-600 italic leading-relaxed">"{room.description}"</p>
             <div className="grid grid-cols-2 gap-6 mt-10">
               {room.amenities.map(amenity => (
                 <div key={amenity} className="flex items-center text-slate-700 font-bold text-sm bg-slate-50 p-4 rounded-2xl border border-slate-100">
                   <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                   {amenity}
                 </div>
               ))}
             </div>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100 sticky top-32 animate-in slide-in-from-right duration-700">
          <div className="flex justify-between items-center mb-10 pb-10 border-b border-slate-100">
            <div>
              <span className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Nightly Investment</span>
              <span className="text-5xl font-serif font-bold text-amber-800">${room.pricePerNight} <span className="text-base font-sans text-slate-400 font-bold italic">/ night</span></span>
            </div>
            <div className="flex items-center bg-amber-50 px-6 py-3 rounded-2xl border border-amber-200 shadow-sm">
              <Star className="text-amber-500 mr-2" size={22} fill="currentColor" />
              <span className="text-amber-800 font-black text-xl">4.9</span>
            </div>
          </div>

          <form onSubmit={handleBooking} className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-black uppercase text-slate-600 tracking-widest ml-1">Arrival Date</label>
                <input type="date" required className="w-full p-5 rounded-2xl border border-slate-200 focus:ring-2 ring-amber-500 outline-none text-base font-bold bg-slate-50 transition-all focus:bg-white" value={formData.checkIn} onChange={e => setFormData({...formData, checkIn: e.target.value})} />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-black uppercase text-slate-600 tracking-widest ml-1">Departure</label>
                <input type="date" required className="w-full p-5 rounded-2xl border border-slate-200 focus:ring-2 ring-amber-500 outline-none text-base font-bold bg-slate-50 transition-all focus:bg-white" value={formData.checkOut} onChange={e => setFormData({...formData, checkOut: e.target.value})} />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-black uppercase text-slate-600 tracking-widest ml-1">Patron Count</label>
              <input type="number" min="1" max={room.maxGuests} required className="w-full p-5 rounded-2xl border border-slate-200 focus:ring-2 ring-amber-500 outline-none text-base font-bold bg-slate-50 transition-all focus:bg-white" value={formData.guests} onChange={e => setFormData({...formData, guests: parseInt(e.target.value) || 1})} />
            </div>

            {nights > 0 ? (
              <div className="bg-amber-50/50 p-10 rounded-[2.5rem] border border-amber-200 space-y-6 animate-in fade-in slide-in-from-top-2">
                <div className="flex justify-between text-base text-slate-700 font-bold italic">
                  <span>Suite Rental ({nights} Nights)</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base text-green-700 font-bold italic">
                  <span>Resort Fees & Taxes</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between text-4xl font-serif font-bold text-slate-900 pt-8 border-t border-amber-200">
                  <span>Grand Total</span>
                  <span className="text-amber-800">${totalPrice.toLocaleString()}</span>
                </div>
              </div>
            ) : (
              <div className="p-12 border-2 border-dashed border-slate-100 rounded-[2.5rem] text-center">
                 <p className="text-slate-400 font-bold uppercase tracking-widest text-sm italic">Select arrival and departure dates</p>
              </div>
            )}

            <button 
              type="submit"
              disabled={isProcessing || nights <= 0}
              className={`w-full flex items-center justify-center space-x-4 py-6 rounded-2xl font-black text-lg transition-all shadow-2xl transform active:scale-95 ${isProcessing || nights <= 0 ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-amber-800 text-white shadow-slate-900/30'}`}
            >
              {isProcessing ? <><Loader2 className="animate-spin" size={24} /><span>Syncing Reservation...</span></> : <><CreditCard size={24} /><span>Confirm Luxury Stay</span></>}
            </button>
            <div className="flex items-center justify-center text-xs font-black text-slate-400 uppercase tracking-[0.2em] space-x-3 mt-4">
              <ShieldCheck className="text-green-500" size={18} />
              <span>Secure Encrypted Transaction</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
