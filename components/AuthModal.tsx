
import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { useApp } from '../App';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      onClose();
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg relative z-10 overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 border border-slate-100">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all">
          <X size={24} />
        </button>
        
        <div className="p-10 sm:p-12">
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-3">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-600 text-lg mb-10">
            {isLogin ? 'Enter your credentials to access your sanctuary.' : 'Join our elite community of culinary enthusiasts.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-black uppercase text-slate-500 tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
                  <input
                    type="text"
                    placeholder="e.g. Alexander Showk"
                    className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-4 ring-amber-500/10 outline-none transition-all text-lg font-bold text-slate-900 placeholder:text-slate-300"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-black uppercase text-slate-500 tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-4 ring-amber-500/10 outline-none transition-all text-lg font-bold text-slate-900 placeholder:text-slate-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black uppercase text-slate-500 tracking-widest ml-1">Secure Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-4 ring-amber-500/10 outline-none transition-all text-lg font-bold text-slate-900 placeholder:text-slate-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-800 hover:bg-amber-900 text-white py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-amber-900/20 active:scale-[0.98] disabled:bg-slate-300 mt-4"
            >
              {loading ? 'Verifying...' : isLogin ? 'Sign Into Account' : 'Register Member'}
            </button>
          </form>

          <div className="mt-10 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-amber-800 font-black hover:text-amber-900 underline underline-offset-8 text-base transition-colors"
            >
              {isLogin ? "New to the view? Create an Account" : "Already a member? Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
