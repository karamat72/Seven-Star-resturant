import React from 'react';
import { 
  ArrowRight, 
  Heart, 
  Users, 
  Briefcase, 
  Cake, 
  Sparkles 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OccasionType } from '../types';

export const ChefAndOccasionsSection: React.FC = () => {
  const { navigateTo } = useApp();

  const handleOccasionClick = (occasion: OccasionType) => {
    navigateTo('reservations', { occasion });
  };

  return (
    <section className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Block - Meet Our Chef (Dark luxury block matching screenshot) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#131618] to-[#0e1012] border border-[#23282e] rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              
              {/* Chef Photography */}
              <div className="sm:col-span-5 relative">
                <div className="aspect-[4/5] rounded-xl overflow-hidden border border-stone-700/60 bg-stone-900 shadow-xl group">
                  <img
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80"
                    alt="Executive Chef Marco - SEVEN STAR Continental Kitchen"
                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 text-[10px] text-[#c5a059] font-mono tracking-wider">
                    EXEC. CHEF MARCO
                  </div>
                </div>
              </div>

              {/* Chef Copy */}
              <div className="sm:col-span-7 space-y-4">
                <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c5a059] uppercase block">
                  MEET OUR CHEF
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Crafted with Passion & Purpose
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed font-light">
                  Our chef brings global culinary influences together to create dishes that are both comforting and exciting.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => navigateTo('about')}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-stone-200 text-black font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>Our Story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Block - Perfect for Every Occasion (Matching ivory/cream card in screenshot) */}
          <div className="lg:col-span-6 bg-[#f7f5f0] text-[#1a1c1e] rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl border border-[#dedad2]">
            
            {/* Elegant background flourish */}
            <div className="absolute -top-10 -right-10 w-44 h-44 opacity-15 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="none" stroke="#7e673a" strokeWidth="1.5">
                <path d="M50 0 C60 30 70 40 100 50 C70 60 60 70 50 100 C40 70 30 60 0 50 C30 40 40 30 50 0 Z" />
              </svg>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              
              {/* Left side text & 4 Occasion Buttons */}
              <div className="sm:col-span-7 space-y-4">
                <div>
                  <span className="text-[11px] font-bold tracking-[0.25em] text-[#7d6537] uppercase block mb-1">
                    PERFECT FOR
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#141618] leading-tight">
                    Every Occasion
                  </h3>
                </div>

                {/* 4 Interactive Occasion Cards - Click to preselect booking */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {[
                    { label: 'Romantic Dinners' as OccasionType, icon: Heart },
                    { label: 'Family Gatherings' as OccasionType, icon: Users },
                    { label: 'Corporate Events' as OccasionType, icon: Briefcase },
                    { label: 'Birthdays & Celebrations' as OccasionType, icon: Cake },
                  ].map((occ) => {
                    const Icon = occ.icon;
                    return (
                      <button
                        key={occ.label}
                        onClick={() => handleOccasionClick(occ.label)}
                        className="p-2.5 rounded-xl bg-white border border-[#e4ded5] hover:border-[#7d6537] hover:shadow-md transition-all text-center flex flex-col items-center justify-center gap-1.5 group cursor-pointer"
                        title={`Reserve for ${occ.label}`}
                      >
                        <div className="w-8 h-8 rounded-full bg-[#f2eee6] group-hover:bg-[#7d6537] group-hover:text-white flex items-center justify-center text-[#7d6537] transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-semibold text-[#222] group-hover:text-[#7d6537] transition-colors leading-tight">
                          {occ.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right side culinary photo with wine glass */}
              <div className="sm:col-span-5 relative">
                <div className="aspect-[4/5] rounded-xl overflow-hidden border border-[#d8d2c6] shadow-lg bg-stone-200">
                  <img
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
                    alt="Occasion dining steak dish with wine glass"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
