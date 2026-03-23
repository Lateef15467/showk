import React from 'react';
import { useApp } from '../App';
import { useNavigate } from 'react-router-dom';
import { Bed, Users, Star, ArrowRight, ShieldCheck } from 'lucide-react';

const Rooms: React.FC = () => {
  const { rooms } = useApp();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

      {/* Header */}
      <header className="text-center mb-10 sm:mb-16">
        <span className="text-amber-600 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
          Boutique Resort
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-4">
          Sanctuaries of Serenity
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto">
          Discover our collection of high-altitude suites, where modern elegance meets comfort.
        </p>
      </header>

      {/* Room Cards */}
      <div className="grid grid-cols-1 gap-8 sm:gap-12">
        {rooms.map(room => (
          <div
            key={room.id}
            className="bg-white rounded-3xl sm:rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm flex flex-col md:flex-row group hover:shadow-2xl transition-all duration-500"
          >
            {/* Image */}
            <div className="w-full md:w-1/2 relative h-60 sm:h-72 md:h-auto overflow-hidden flex-shrink-0">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-5 left-5 sm:top-8 sm:left-8 bg-white/90 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold text-amber-800 shadow-sm">
                {room.type}
              </div>
            </div>

            {/* Info */}
            <div className="w-full md:w-1/2 p-6 sm:p-10 md:p-16 flex flex-col justify-between">
              <div>
                {/* Title + Rating */}
                <div className="flex justify-between items-start mb-4 sm:mb-6 gap-4">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                    {room.name}
                  </h2>
                  <div className="flex items-center text-amber-400 flex-shrink-0">
                    <Star size={15} fill="currentColor" />
                    <span className="ml-1 text-slate-900 font-bold text-sm">4.9</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-500 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed italic">
                  "{room.description}"
                </p>

                {/* Amenity Badges */}
                <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10">
                  <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <Users size={15} className="mr-1.5 sm:mr-2 text-amber-600 flex-shrink-0" />
                    Max {room.maxGuests} Guests
                  </div>
                  <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <ShieldCheck size={15} className="mr-1.5 sm:mr-2 text-amber-600 flex-shrink-0" />
                    All-Inclusive Access
                  </div>
                  <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <Bed size={15} className="mr-1.5 sm:mr-2 text-amber-600 flex-shrink-0" />
                    King Size Comfort
                  </div>
                </div>
              </div>

              {/* Price + CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 sm:pt-8 border-t border-slate-100 gap-5 sm:gap-6">
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Nightly Rate</span>
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-800">
                    ${room.pricePerNight}{' '}
                    <span className="text-sm font-sans text-slate-400">/ night</span>
                  </span>
                </div>
                <button
                  onClick={() => navigate(`/room/${room.id}`)}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-amber-800 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold transition-all transform hover:translate-x-1 flex items-center justify-center space-x-2 shadow-xl shadow-slate-900/10 text-sm sm:text-base"
                >
                  <span>Check Availability</span>
                  <ArrowRight size={17} />
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