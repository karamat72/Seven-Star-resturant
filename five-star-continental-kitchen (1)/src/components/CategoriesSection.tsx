import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/menuData';
import { useApp } from '../context/AppContext';

export const CategoriesSection: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <section className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Matching Screenshot */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-stone-100 gap-4">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c5a059] uppercase block mb-1">
              EXPLORE OUR MENU
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#141618] tracking-tight">
              Continental Favourites
            </h2>
          </div>

          <button
            onClick={() => navigateTo('menu')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-800 hover:text-[#c5a059] transition-colors group cursor-pointer"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 Category Grid Cards - Clean white cards with light border as shown in screenshot */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateTo('menu', { category: cat.id })}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-stone-200 hover:border-[#c5a059] transition-all duration-300 hover:shadow-lg flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Text & Circular Arrow Button */}
              <div className="p-3 flex items-center justify-between flex-1 bg-white">
                <div>
                  <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-[#c5a059] transition-colors leading-tight">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                    {cat.tagline}
                  </p>
                </div>

                <div className="w-6 h-6 rounded-full border border-stone-300 group-hover:border-stone-800 flex items-center justify-center text-stone-600 group-hover:text-black transition-all ml-2 flex-shrink-0">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
