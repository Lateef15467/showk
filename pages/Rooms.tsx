
import React from 'react';
import { useApp } from '../App';
import { useNavigate } from 'react-router-dom';
import { Bed, Users, Star, ArrowRight, ShieldCheck } from 'lucide-react';

const Rooms: React.FC = () => {
  const { rooms } = useApp();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <span className="text-amber-600 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Boutique Resort</span>
        <h1 className="text-5xl font-serif font-bold text-slate-900 mb-4">Sanctuaries of Serenity</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">Discover our collection of high-altitude suites, where modern elegance meets comfort.</p>
      </header>

      <div className="grid lg:grid-cols-1 gap-12">
        {rooms.map(room => (
          <div key={room.id} className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm flex flex-col md:flex-row group hover:shadow-2xl transition-all duration-500">
            <div className="md:w-1/2 relative h-80 md:h-auto overflow-hidden">
              <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-amber-800 shadow-sm">
                {room.type}
              </div>
            </div>
            <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-serif font-bold text-slate-900">{room.name}</h2>
                  <div className="flex items-center text-amber-400">
                    <Star size={16} fill="currentColor" />
                    <span className="ml-1 text-slate-900 font-bold">4.9</span>
                  </div>
                </div>
                <p className="text-slate-500 text-lg mb-8 leading-relaxed italic">"{room.description}"</p>
                
                <div className="flex flex-wrap gap-4 mb-10">
                  <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <Users size={16} className="mr-2 text-amber-600" /> Max {room.maxGuests} Guests
                  </div>
                  <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <ShieldCheck size={16} className="mr-2 text-amber-600" /> All-Inclusive Access
                  </div>
                  <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <Bed size={16} className="mr-2 text-amber-600" /> King Size Comfort
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-slate-50 gap-6">
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Nightly Rate</span>
                  <span className="text-3xl font-serif font-bold text-amber-800">${room.pricePerNight} <span className="text-sm font-sans text-slate-400">/ night</span></span>
                </div>
                <button 
                  onClick={() => navigate(`/room/${room.id}`)}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-amber-800 text-white px-10 py-5 rounded-2xl font-bold transition-all transform hover:translate-x-1 flex items-center justify-center space-x-2 shadow-xl shadow-slate-900/10"
                >
                  <span>Check Availability</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
