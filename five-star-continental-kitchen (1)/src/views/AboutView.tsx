import React from 'react';
import { Sparkles, Award, Utensils, Heart, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutView: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-white pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c5a059] uppercase block">
            OUR HERITAGE & PASSION
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[1.1]">
            Where Culinary Artistry Meets Continental Elegance
          </h1>
          <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
            Founded with a vision to redefine fine dining, SEVEN STAR brings centuries of European culinary heritage into a vibrant, modern setting.
          </p>
        </div>

        {/* Story Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c5a059] uppercase block">
              THE GENESIS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              A Symphony of European Culinary Traditions
            </h2>
            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              At SEVEN STAR, our culinary ethos was forged through decades of relentless pursuit of flavor across Northern Italy, France, and the Mediterranean coastline.
            </p>
            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              We believe food is not merely sustenance—it is theatre, dialogue, and memory. From our 72-hour fermented sourdough pizzas to our hand-rolled tagliatelle bathed in black truffle emulsion, every single component is prepared from scratch daily.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#202529]">
              <div>
                <p className="font-serif text-3xl font-bold text-[#c5a059]">100%</p>
                <p className="text-xs text-stone-400 mt-1 uppercase tracking-wider">Scratch-Cooked Sauces</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-[#c5a059]">450°C</p>
                <p className="text-xs text-stone-400 mt-1 uppercase tracking-wider">Volcanic Stone Oven</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-[#14171a]">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
                alt="SEVEN STAR Dining Ambiance"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#161a1d] border border-[#c5a059]/40 p-4 rounded-xl shadow-xl hidden sm:block">
              <p className="font-script text-xl text-white font-semibold">
                Good Food. Brighter Conversations. ♡
              </p>
            </div>
          </div>
        </div>

        {/* Chef Marco Feature */}
        <div className="bg-[#131618] border border-[#262c31] rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-stone-700 bg-stone-900 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80"
                  alt="Executive Chef Marco"
                  className="w-full h-full object-cover filter grayscale contrast-125"
                />
              </div>
            </div>

            <div className="lg:col-span-8 space-y-5">
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c5a059] uppercase block">
                EXECUTIVE CULINARY DIRECTOR
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Chef Marco Valenti
              </h3>
              <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
                "Cooking is an act of deep respect. When a guest sits at our table, they are giving us two hours of their life. Our duty is to turn those hours into something unforgettable, with authentic aromas, pristine textures, and thoughtful hospitality."
              </p>
              <div className="flex flex-wrap gap-6 pt-2 text-xs text-stone-400">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#c5a059]" />
                  <span>Grand Diplôme Le Cordon Bleu</span>
                </div>
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-[#c5a059]" />
                  <span>20+ Years Continental Kitchen Mastery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars / Values Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c5a059] uppercase block">
              OUR CORE PROMISES
            </span>
            <h3 className="font-serif text-3xl font-bold text-white">
              The SEVEN STAR Standard
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#14171a] border border-[#262c31] p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#c5a059]/20 flex items-center justify-center text-[#c5a059]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-white">Uncompromising Ingredients</h4>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Imported DOP Parmigiano-Reggiano, Norwegian cold-water salmon, and prime Black Angus beef cuts aged on-site.
              </p>
            </div>

            <div className="bg-[#14171a] border border-[#262c31] p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#c5a059]/20 flex items-center justify-center text-[#c5a059]">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-white">Curated Hospitality</h4>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Attentive, discreet, and deeply intuitive service designed to celebrate anniversaries, deals, and cozy family moments.
              </p>
            </div>

            <div className="bg-[#14171a] border border-[#262c31] p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#c5a059]/20 flex items-center justify-center text-[#c5a059]">
                <Utensils className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-white">Culinary Precision</h4>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Wood-fired baking, exact sous-vide temperature regulation, and bespoke plated aesthetics on every presentation.
              </p>
            </div>
          </div>
        </div>

        {/* CTA to Reserve */}
        <div className="bg-gradient-to-r from-[#171c19] to-[#121614] border border-[#26312a] rounded-3xl p-8 sm:p-12 text-center space-y-4">
          <h3 className="font-serif text-3xl font-bold text-white">Join Us for an Unforgettable Dining Evening</h3>
          <p className="text-stone-300 text-xs sm:text-sm max-w-lg mx-auto">
            Experience our table hospitality firsthand. Reservations recommended for weekend evenings.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('reservations')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-widest cursor-pointer shadow-xl"
            >
              <span>Reserve a Table</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
