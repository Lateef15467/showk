
import React from 'react';
import { APP_NAME } from '../constants';
import { Star, Award, Users, Coffee } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-4 block">Since 1998</span>
            <h1 className="text-6xl font-serif font-bold text-slate-900 mb-8 tracking-tight">The Vision Behind <br/> {APP_NAME}</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We believe that fine dining is more than just a meal—it's a multi-sensory journey where the environment is as important as the ingredients.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-amber-100 rounded-[2rem] -rotate-3 transition-transform group-hover:rotate-0 duration-500"></div>
              <img 
                src="https://images.unsplash.com/photo-1550966841-3ee32c94380b?auto=format&fit=crop&q=80&w=800" 
                alt="Chef at work" 
                className="relative rounded-2xl shadow-2xl z-10 w-full object-cover h-[500px]"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-serif font-bold text-slate-800">Culinary Craftsmanship</h2>
              <p className="text-slate-600 text-lg">
                Led by Executive Chef Julian Vance, our kitchen is a sanctuary of tradition and innovation. Every ingredient is hand-selected from sustainable local farms, ensuring that the essence of each season is captured in every plate.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <Award className="text-amber-600 mb-2" size={32} />
                  <span className="text-2xl font-bold">12+</span>
                  <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Awards</span>
                </div>
                <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <Users className="text-amber-600 mb-2" size={32} />
                  <span className="text-2xl font-bold">50k+</span>
                  <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Happy Guests</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Experience Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 order-2 md:order-1">
              <h2 className="text-4xl font-serif font-bold text-slate-800 mb-6">"The View" That Defines Us</h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Situated atop the city's highest peak, Showk-View offers a panoramic vista that transforms throughout the day. From the golden hues of sunset to the sparkling city lights at night, our setting provides the perfect backdrop for your most cherished celebrations.
              </p>
              <ul className="space-y-4">
                {['Panoramic Cityscape Views', 'Intimate Candlelit Ambience', 'Exquisite Private Dining Rooms', 'Expert Sommelier Service'].map((feature, i) => (
                  <li key={i} className="flex items-center text-slate-700 font-medium">
                    <Star className="text-amber-500 mr-3 shrink-0" size={18} fill="currentColor" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 order-1 md:order-2">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200" 
                alt="Restaurant interior" 
                className="rounded-[3rem] shadow-xl w-full h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="py-20 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <Coffee className="mx-auto mb-6 text-amber-500" size={48} />
          <h2 className="text-4xl font-serif font-bold mb-6 italic">"Good food is the foundation of genuine happiness."</h2>
          <p className="text-slate-400 text-lg">We invite you to experience the peak of fine dining.</p>
        </div>
      </section>
    </div>
  );
};

export default About;
