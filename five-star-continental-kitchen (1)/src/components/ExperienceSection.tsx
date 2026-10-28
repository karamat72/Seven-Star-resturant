import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ExperienceSection: React.FC = () => {
  const { navigateTo, reviews } = useApp();

  const approvedReviews = reviews.filter((r) => r.isApproved);
  const avgRating = approvedReviews.length > 0 
    ? (approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length).toFixed(1)
    : '4.8';

  return (
    <section className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column - Content & Statistics matching screenshot */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c5a059] uppercase block">
              AN EXPERIENCE BEYOND FOOD
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141618] tracking-tight leading-[1.12]">
              Dine. Unwind. <br />
              Create Memories.
            </h2>

            <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
              From intimate dinners to lively get-togethers, our restaurant offers the perfect setting with great food, warm hospitality and an unforgettable ambience.
            </p>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('reservations')}
                className="inline-flex items-center gap-3 px-7 py-3 rounded-full bg-[#181a18] hover:bg-black text-white font-medium text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow hover:shadow-lg"
              >
                <span>Reserve a Table</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Statistics Row */}
            <div className="pt-8 border-t border-stone-200 flex items-center gap-8 sm:gap-12">
              <div>
                <p className="font-serif text-3xl sm:text-4xl font-bold text-[#141618]">100+</p>
                <p className="text-xs text-stone-500 mt-1 uppercase tracking-wider">Signature Dishes</p>
              </div>

              <div className="border-l border-stone-200 pl-8 sm:pl-12">
                <div className="flex items-center gap-1">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-[#141618]">{avgRating}</span>
                  <Star className="w-4 h-4 fill-[#c5a059] text-[#c5a059]" />
                </div>
                <p className="text-xs text-stone-500 mt-1 uppercase tracking-wider">Customer Reviews</p>
              </div>

              <div className="border-l border-stone-200 pl-8 sm:pl-12">
                <p className="font-serif text-3xl sm:text-4xl font-bold text-[#141618]">5K+</p>
                <p className="text-xs text-stone-500 mt-1 uppercase tracking-wider">Happy Guests</p>
              </div>
            </div>

          </div>

          {/* Right Column - Restaurant Interior with Handwritten script stamp */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100 aspect-[16/10]">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85"
                alt="Bellagio Restaurant Ambience"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />

              {/* Floating script stamp at top right - matching screenshot */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/95 backdrop-blur-sm border border-stone-200/80 px-4 py-2.5 rounded-2xl shadow-lg -rotate-2">
                <p className="font-script text-xl sm:text-2xl text-stone-900 font-semibold leading-tight text-center">
                  Great Food <br />
                  Better Company <span className="text-[#c5a059]">♡</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
