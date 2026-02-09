
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { 
  ArrowLeft, ShoppingCart, Star, Flame, Package, 
  ShieldCheck, Clock, MessageSquare, Send 
} from 'lucide-react';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { menu, setMenu, auth, addToCart } = useApp();
  
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const product = menu.find(item => item.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-serif font-bold mb-4">Dish Not Found</h2>
        <button onClick={() => navigate('/menu')} className="bg-amber-800 text-white px-8 py-3 rounded-full font-bold">
          Back to Menu
        </button>
      </div>
    );
  }

  const averageRating = product.reviews.length > 0
    ? (product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length).toFixed(1)
    : "New";

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.isAuthenticated || !auth.user) {
      alert("Please sign in to leave a review.");
      return;
    }

    const newReview = {
      id: Math.random().toString(36).substr(2, 9),
      userId: auth.user.id,
      userName: auth.user.name,
      rating: reviewRating,
      comment: reviewComment,
      createdAt: new Date().toISOString()
    };

    setMenu(prev => prev.map(item => 
      item.id === product.id 
      ? { ...item, reviews: [newReview, ...item.reviews] } 
      : item
    ));

    setReviewComment('');
    setReviewRating(5);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-slate-500 hover:text-amber-800 font-bold mb-8 transition-colors group"
      >
        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Gallery
      </button>

      <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
        {/* Product Image */}
        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl group">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Product Info */}
        <div className="space-y-8 py-4">
          <div>
            <span className="bg-amber-50 text-amber-800 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-amber-100">
              {product.category}
            </span>
            <h1 className="text-5xl font-serif font-bold text-slate-900 mt-4 mb-4 tracking-tight">{product.name}</h1>
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-amber-400">
                <Star size={18} fill="currentColor" />
                <span className="ml-2 text-slate-900 font-bold">{averageRating}</span>
                <span className="ml-2 text-slate-400 text-sm font-bold">({product.reviews.length} Reviews)</span>
              </div>
              {product.calories && (
                <div className="flex items-center text-slate-500 text-sm font-bold">
                  <Flame size={16} className="mr-2 text-orange-500" />
                  {product.calories} Calories
                </div>
              )}
            </div>
          </div>

          <div className="text-4xl font-serif font-bold text-amber-800">
            ${product.price.toFixed(2)}
          </div>

          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold text-slate-800 mb-2">The Chef's Perspective</h3>
            <p className="text-slate-600 text-lg leading-relaxed italic">
              "This dish represents the heart of Showk-View. We've combined the finest seasonal textures with a balanced palette to create a memorable culinary signature."
            </p>
            <p className="text-slate-500 text-base leading-relaxed mt-4">
              {product.description} Crafted with precision, our {product.name} is a testament to sustainable sourcing and artisanal preparation.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 py-6 border-y border-slate-100">
            <div className="text-center">
              <Clock size={20} className="mx-auto text-slate-400 mb-2" />
              <span className="block text-[10px] font-bold text-slate-400 uppercase">Prep Time</span>
              <span className="text-sm font-bold text-slate-800">25 Mins</span>
            </div>
            <div className="text-center">
              <Package size={20} className="mx-auto text-slate-400 mb-2" />
              <span className="block text-[10px] font-bold text-slate-400 uppercase">Availability</span>
              <span className="text-sm font-bold text-slate-800">{product.isAvailable ? 'In Stock' : 'Sold Out'}</span>
            </div>
            <div className="text-center">
              <ShieldCheck size={20} className="mx-auto text-slate-400 mb-2" />
              <span className="block text-[10px] font-bold text-slate-400 uppercase">Quality</span>
              <span className="text-sm font-bold text-slate-800">Organic</span>
            </div>
          </div>

          <div className="pt-4">
            <button 
              onClick={() => addToCart(product)}
              disabled={!product.isAvailable}
              className={`w-full flex items-center justify-center space-x-4 py-5 rounded-2xl font-bold transition-all shadow-xl active:scale-[0.98] ${
                product.isAvailable 
                ? 'bg-slate-900 hover:bg-amber-800 text-white shadow-slate-900/10' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <ShoppingCart size={24} />
              <span className="text-lg">Add to Your Selection</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="grid lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8 flex items-center">
            <MessageSquare className="mr-4 text-amber-800" /> Patron Reviews
          </h2>
          
          <div className="space-y-8">
            {product.reviews.length === 0 ? (
              <div className="bg-slate-50 rounded-3xl p-12 text-center text-slate-400 border-2 border-dashed border-slate-200">
                No reviews yet. Be the first to share your experience.
              </div>
            ) : (
              product.reviews.map(review => (
                <div key={review.id} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600 mr-3">
                        {review.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{review.userName}</p>
                        <p className="text-xs text-slate-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed italic">"{review.comment}"</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Write a Review Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl sticky top-32">
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-6 text-center">Your Rating</h3>
            
            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="transition-transform active:scale-90"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setReviewRating(star)}
                  >
                    <Star 
                      size={32} 
                      className={`${(hoverRating || reviewRating) >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} 
                    />
                  </button>
                ))}
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Your Experience</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about the textures, flavors, and presentation..."
                  className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 ring-amber-500 outline-none transition-all resize-none text-sm"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={!auth.isAuthenticated}
                className={`w-full flex items-center justify-center space-x-2 py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95 ${
                  auth.isAuthenticated 
                  ? 'bg-amber-800 hover:bg-amber-900 text-white shadow-amber-800/20' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Send size={18} />
                <span>{auth.isAuthenticated ? 'Post Experience' : 'Sign in to Review'}</span>
              </button>
              
              {!auth.isAuthenticated && (
                <p className="text-center text-[10px] font-bold text-slate-400 uppercase">Only registered patrons can leave reviews.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
