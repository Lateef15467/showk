
import React, { useState, useMemo } from 'react';
import { useApp } from '../App';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Flame, Eye, Search, ArrowUpDown } from 'lucide-react';

const Menu: React.FC = () => {
  const { menu, addToCart } = useApp();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');

  const categories = ['All', 'Appetizers', 'Main Course', 'Desserts', 'Drinks'];

  const processedMenu = useMemo(() => {
    let filtered = menu.filter(item => 
      (activeCategory === 'All' || item.category === activeCategory) &&
      (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (sortOrder === 'asc') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [menu, activeCategory, searchQuery, sortOrder]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-serif font-bold text-slate-900 mb-4">The Culinary Collection</h1>
        <p className="text-slate-500 max-w-2xl mx-auto italic">Refined flavors, masterfully prepared.</p>
      </header>

      {/* Controls: Search, Sort & Categories */}
      <div className="flex flex-col space-y-8 mb-16">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search our selection..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-2 ring-amber-500 outline-none transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
            <button 
              onClick={() => setSortOrder('none')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${sortOrder === 'none' ? 'bg-amber-50 text-amber-800' : 'text-slate-400 hover:text-slate-600'}`}
            >Default</button>
            <button 
              onClick={() => setSortOrder('asc')}
              className={`flex items-center px-4 py-2 rounded-xl text-xs font-bold transition-all ${sortOrder === 'asc' ? 'bg-amber-50 text-amber-800' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <ArrowUpDown size={12} className="mr-1" /> Price Low
            </button>
            <button 
              onClick={() => setSortOrder('desc')}
              className={`flex items-center px-4 py-2 rounded-xl text-xs font-bold transition-all ${sortOrder === 'desc' ? 'bg-amber-50 text-amber-800' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <ArrowUpDown size={12} className="mr-1" /> Price High
            </button>
          </div>
        </div>

        <div className="flex justify-center space-x-2 md:space-x-4 overflow-x-auto pb-2 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat 
                ? 'bg-amber-800 text-white shadow-lg scale-105' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {processedMenu.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in duration-700">
          {processedMenu.map(item => (
            <div key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 group">
              <div 
                className="relative h-64 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-amber-800 shadow-sm">${item.price.toFixed(2)}</div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                   <Eye size={24} className="text-white" />
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-800">{item.name}</h3>
                  <div className="flex text-amber-400">
                    <Star size={14} fill="currentColor" />
                    <span className="ml-1 text-xs font-bold text-slate-900">4.9</span>
                  </div>
                </div>
                <p className="text-slate-500 text-sm mb-8 h-10 overflow-hidden line-clamp-2">{item.description}</p>
                <button 
                  onClick={() => addToCart(item)}
                  className="w-full flex items-center justify-center space-x-2 bg-slate-900 hover:bg-amber-800 text-white py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95"
                >
                  <ShoppingCart size={18} />
                  <span>Add to Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <p className="text-slate-400 font-serif italic text-2xl">No delicacies match your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Menu;
