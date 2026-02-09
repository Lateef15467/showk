
import React from 'react';
import { useApp } from '../App';
import { Link } from 'react-router-dom';
import OrderTracker from '../components/OrderTracker';
import { ChevronRight, ArrowRight, Clock, Truck, Home as HomeIcon, Camera } from 'lucide-react';

const Home: React.FC = () => {
  const { auth, orders } = useApp();
  const userOrders = orders.filter(o => o.userId === auth.user?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="relative h-[70vh] rounded-[3rem] overflow-hidden mb-24 shadow-2xl group">
        <img 
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2000" 
          alt="Restaurant view" 
          className="w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent flex items-center p-12">
          <div className="max-w-xl text-white">
            <span className="text-amber-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block animate-in slide-in-from-left duration-700">Culinary Excellence</span>
            <h1 className="text-7xl font-serif font-bold mb-6 leading-tight">A Symphony <br/> of Flavor</h1>
            <p className="text-lg mb-10 opacity-80 leading-relaxed">Experience a sensory journey at the city's highest peak, where fine dining meets panoramic horizon views.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/menu" className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white px-10 py-5 rounded-full font-bold transition-all transform hover:translate-x-1">
                Explore Menu <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link to="/reservations" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-10 py-5 rounded-full font-bold border border-white/20 transition-all">
                Book a Table
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ambience Gallery */}
      <section className="mb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">The Atmosphere</h2>
          <p className="text-slate-400 italic">Designing moments, not just meals.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[500px]">
          <div className="md:col-span-2 relative rounded-3xl overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1550966841-3ee32c94380b?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Kitchen" />
            <div className="absolute inset-0 bg-black/40 flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white font-bold">The Open Kitchen</p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="h-full relative rounded-3xl overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=500" className="w-full h-full object-cover" alt="Interior" />
            </div>
            <div className="h-full relative rounded-3xl overflow-hidden group">
               <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=500" className="w-full h-full object-cover" alt="Interior 2" />
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden group">
             <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Dish detail" />
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="grid md:grid-cols-3 gap-12">
        <div className="group text-center">
          <div className="w-20 h-20 bg-amber-50 text-amber-800 rounded-[2rem] flex items-center justify-center mx-auto mb-8 transition-all group-hover:bg-amber-800 group-hover:text-white group-hover:rotate-6">
            <Clock size={36} />
          </div>
          <h3 className="text-2xl font-serif font-bold mb-4">Timeless Service</h3>
          <p className="text-slate-500 leading-relaxed text-sm px-4">Gourmet preparation that respects your time without compromising quality.</p>
        </div>
        <div className="group text-center">
          <div className="w-20 h-20 bg-green-50 text-green-800 rounded-[2rem] flex items-center justify-center mx-auto mb-8 transition-all group-hover:bg-green-800 group-hover:text-white group-hover:rotate-6">
            <Truck size={36} />
          </div>
          <h3 className="text-2xl font-serif font-bold mb-4">Prime Delivery</h3>
          <p className="text-slate-500 leading-relaxed text-sm px-4">The Showk experience, temperature-controlled and delivered with care.</p>
        </div>
        <div className="group text-center">
          <div className="w-20 h-20 bg-blue-50 text-blue-800 rounded-[2rem] flex items-center justify-center mx-auto mb-8 transition-all group-hover:bg-blue-800 group-hover:text-white group-hover:rotate-6">
            <Camera size={36} />
          </div>
          <h3 className="text-2xl font-serif font-bold mb-4">Iconic Views</h3>
          <p className="text-slate-500 leading-relaxed text-sm px-4">The city's best vista paired with our world-class hospitality.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
