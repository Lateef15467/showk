
import React from 'react';
import { useApp } from '../App';
import { Link } from 'react-router-dom';
import OrderTracker from '../components/OrderTracker';
import { ChevronRight, ArrowRight, Clock, Truck, Home as HomeIcon, Camera } from 'lucide-react';

const Home: React.FC = () => {
  const { auth, orders } = useApp();
  const userOrders = orders.filter(o => o.userId === auth.user?.id);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">

      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] rounded-2xl sm:rounded-[3rem] overflow-hidden mb-12 sm:mb-24 shadow-2xl group">
        <img
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2000"
          alt="Restaurant view"
          className="w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent flex items-center p-4 sm:p-12">
          <div className="max-w-xl text-white">
            <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-3 block">
              Culinary Excellence
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-serif font-bold mb-4 leading-tight">
              A Symphony <br className="hidden sm:block" /> of Flavor
            </h1>

            <p className="text-sm sm:text-lg mb-6 sm:mb-10 opacity-80 leading-relaxed">
              Experience a sensory journey at the city's highest peak, where fine dining meets panoramic horizon views.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/menu" className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white px-6 sm:px-10 py-3 sm:py-5 rounded-full font-bold transition-all">
                Explore Menu <ArrowRight className="ml-2" size={20} />
              </Link>

              <Link to="/reservations" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 sm:px-10 py-3 sm:py-5 rounded-full font-bold border border-white/20">
                Book a Table
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ambience Gallery */}
      <section className="mb-12 sm:mb-24">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 mb-2 sm:mb-4">
            The Atmosphere
          </h2>
          <p className="text-slate-400 italic text-sm sm:text-base">
            Designing moments, not just meals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="md:col-span-2 relative rounded-2xl sm:rounded-3xl overflow-hidden group h-60 sm:h-auto">
            <img src="https://images.unsplash.com/photo-1550966841-3ee32c94380b?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
          </div>

          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="h-40 sm:h-full relative rounded-2xl sm:rounded-3xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=500" className="w-full h-full object-cover" />
            </div>
            <div className="h-40 sm:h-full relative rounded-2xl sm:rounded-3xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=500" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-60 sm:h-auto">
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 text-center">

        <div className="group">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-amber-50 text-amber-800 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 transition-all group-hover:bg-amber-800 group-hover:text-white">
            <Clock size={32} />
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold mb-2 sm:mb-4">Timeless Service</h3>
          <p className="text-slate-500 text-sm sm:text-base">Gourmet preparation that respects your time.</p>
        </div>

        <div className="group">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-green-50 text-green-800 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 transition-all group-hover:bg-green-800 group-hover:text-white">
            <Truck size={32} />
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold mb-2 sm:mb-4">Prime Delivery</h3>
          <p className="text-slate-500 text-sm sm:text-base">Temperature-controlled delivery with care.</p>
        </div>

        <div className="group">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-blue-50 text-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 transition-all group-hover:bg-blue-800 group-hover:text-white">
            <Camera size={32} />
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold mb-2 sm:mb-4">Iconic Views</h3>
          <p className="text-slate-500 text-sm sm:text-base">City’s best view with luxury dining.</p>
        </div>

      </section>

    </div>
  );
};

export default Home;
