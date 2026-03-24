
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-slate-900 mb-4">Get in Touch</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">Whether you're planning a romantic dinner or a corporate event, we're here to make it unforgettable.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold mb-8 flex items-center">
                <MessageSquare className="text-amber-600 mr-2" /> Contact Details
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mr-4 shrink-0">
                    <MapPin className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Our Location</p>
                    <p className="text-slate-500 text-sm">123 Showk Peak Dr.<br/>Celestial Valley, CV 90210</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mr-4 shrink-0">
                    <Phone className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Phone</p>
                    <p className="text-slate-500 text-sm">+1 (555) 800-VIEW</p>
                    <p className="text-slate-500 text-sm">+1 (555) 800-1234</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mr-4 shrink-0">
                    <Mail className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Email</p>
                    <p className="text-slate-500 text-sm">reservations@Showkview.com</p>
                    <p className="text-slate-500 text-sm">events@Showkview.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-600 rounded-full opacity-20"></div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Clock className="text-amber-500 mr-2" /> Opening Hours
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Monday - Thursday</span>
                  <span className="font-medium text-amber-500">11:00 - 22:00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Friday - Saturday</span>
                  <span className="font-medium text-amber-500">11:00 - 00:00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Sunday</span>
                  <span className="font-medium text-amber-500">10:00 - 21:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h3 className="text-2xl font-serif font-bold mb-8">Send Us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter your name"
                      className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 ring-amber-500 outline-none transition-all"
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 ring-amber-500 outline-none transition-all"
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                  <input 
                    type="text" 
                    placeholder="Inquiry Subject"
                    className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 ring-amber-500 outline-none transition-all"
                    value={formState.subject}
                    onChange={(e) => setFormState({...formState, subject: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 ring-amber-500 outline-none transition-all resize-none"
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-amber-800 hover:bg-amber-900 text-white py-5 rounded-2xl font-bold transition-all shadow-lg shadow-amber-800/20 flex items-center justify-center space-x-2 active:scale-[0.98]"
                >
                  <Send size={18} />
                  <span>Send Message</span>
                </button>

                {isSent && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-100 text-green-700 rounded-xl text-center font-medium animate-in fade-in slide-in-from-top-2">
                    Thank you! Your message has been received. We'll get back to you shortly.
                  </div>
                )}
              </form>
            </div>

            {/* Placeholder Map Visual */}
            <div className="mt-8 h-64 bg-slate-200 rounded-[2rem] overflow-hidden relative shadow-inner">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center grayscale opacity-50"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl flex items-center space-x-3 border border-amber-200">
                    <MapPin className="text-amber-600" />
                    <span className="font-bold text-slate-800">Showk Peak Location</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
