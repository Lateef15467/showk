
import React, { useState } from 'react';
import { useApp } from '../App';
import { useNavigate } from 'react-router-dom';
import { CreditCard, ShieldCheck, Truck, ShoppingBag, Smartphone, CheckCircle2, Wallet, Ticket, X } from 'lucide-react';

type PaymentMethod = 'card' | 'easypaisa' | 'jazzcash';

const Checkout: React.FC = () => {
  const { cart, auth, addOrder, clearCart } = useApp();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 50 ? 0 : 5.99;
  const discountAmount = subtotal * discount;
  const total = subtotal + deliveryFee - discountAmount;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'Showk20') {
      setDiscount(0.2);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setDiscount(0);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.isAuthenticated) {
      alert("Please login to place an order");
      return;
    }

    if ((paymentMethod === 'easypaisa' || paymentMethod === 'jazzcash') && !phoneNumber) {
      alert("Please enter your mobile wallet number");
      return;
    }

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2500));

    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      userId: auth.user!.id,
      userName: auth.user!.name,
      items: [...cart],
      total: total,
      status: 'RECEIVED' as const,
      createdAt: new Date().toISOString(),
      paymentId: `${paymentMethod.toUpperCase()}-` + Math.random().toString(36).substr(2, 6).toUpperCase()
    };

    addOrder(newOrder);
    clearCart();
    setIsProcessing(false);
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-serif font-bold mb-4">Your basket is empty</h2>
        <button onClick={() => navigate('/menu')} className="bg-amber-800 text-white px-8 py-3 rounded-full font-bold">Go to Menu</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center"><Truck className="mr-2 text-amber-600" /> Delivery</h2>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="p-4 rounded-xl border border-slate-200" required />
              <input type="text" placeholder="Last Name" className="p-4 rounded-xl border border-slate-200" required />
              <input type="text" placeholder="Address" className="col-span-2 p-4 rounded-xl border border-slate-200" required />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center"><Wallet className="mr-2 text-amber-600" /> Payment</h2>
            <div className="grid gap-4 mb-6">
               {/* Card */}
               <button type="button" onClick={() => setPaymentMethod('card')} className={`p-6 rounded-2xl border-2 flex justify-between items-center ${paymentMethod === 'card' ? 'border-amber-600 bg-amber-50' : 'bg-white'}`}>
                 <span className="font-bold">Credit/Debit Card</span>
                 {paymentMethod === 'card' && <CheckCircle2 size={20} className="text-amber-600" />}
               </button>
               {/* Wallet Options */}
               <div className="grid grid-cols-2 gap-4">
                 <button type="button" onClick={() => setPaymentMethod('easypaisa')} className={`p-4 rounded-2xl border-2 flex flex-col items-center ${paymentMethod === 'easypaisa' ? 'border-green-600 bg-green-50' : 'bg-white'}`}>
                    <span className="font-bold text-sm">Easypaisa</span>
                 </button>
                 <button type="button" onClick={() => setPaymentMethod('jazzcash')} className={`p-4 rounded-2xl border-2 flex flex-col items-center ${paymentMethod === 'jazzcash' ? 'border-red-600 bg-red-50' : 'bg-white'}`}>
                    <span className="font-bold text-sm">JazzCash</span>
                 </button>
               </div>
            </div>

            {(paymentMethod === 'easypaisa' || paymentMethod === 'jazzcash') && (
              <div className="p-6 bg-slate-50 rounded-2xl mb-6">
                <input 
                  type="tel" 
                  placeholder="Mobile Account Number" 
                  className="w-full p-4 rounded-xl border"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </div>
            )}
          </section>
        </div>

        <div className="lg:sticky lg:top-32 h-fit">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl">
            <h2 className="text-2xl font-serif font-bold mb-6">Summary</h2>
            
            {/* Coupon Code Field */}
            <div className="mb-8">
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Promo Code (Showk20)" 
                    className={`w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 outline-none focus:ring-2 ${discount > 0 ? 'ring-green-500 border-green-200' : 'ring-amber-500'}`}
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                  />
                </div>
                <button 
                  onClick={handleApplyCoupon}
                  className="px-6 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-amber-800 transition-colors"
                >Apply</button>
              </div>
              {couponError && <p className="text-xs text-red-500 mt-2 font-bold">{couponError}</p>}
              {discount > 0 && <p className="text-xs text-green-600 mt-2 font-bold flex items-center"><CheckCircle2 size={12} className="mr-1" /> 20% Discount Applied!</p>}
            </div>

            <div className="space-y-4 mb-8">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.name}</span>
                  <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-6 space-y-3">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-bold">
                  <span>Promo Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500">
                <span>Delivery</span>
                <span className="font-bold">{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-2xl font-serif font-bold pt-4 border-t mt-4">
                <span>Total</span>
                <span className="text-amber-800">${total.toFixed(2)}</span>
              </div>
            </div>

            <button onClick={handlePlaceOrder} className="w-full mt-8 py-5 bg-amber-800 text-white rounded-2xl font-bold shadow-lg">
              {isProcessing ? 'Processing...' : 'Complete Purchase'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
