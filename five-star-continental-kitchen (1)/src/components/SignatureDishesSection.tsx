import React from 'react';
import { ArrowRight, Plus, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MenuItem } from '../types';

export const SignatureDishesSection: React.FC = () => {
  const { 
    menuItems, 
    addToCart, 
    setSelectedDishModal, 
    navigateTo, 
    cartItems
  } = useApp();

  // The 6 signature dishes featured in the screenshot
  const signatureDishes = menuItems.filter((item) => item.isSignature).slice(0, 6);

  return (
    <section className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-stone-100 gap-4">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c5a059] uppercase block mb-1">
              CHEF'S SPECIALS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#141618] tracking-tight">
              Our Signature Dishes
            </h2>
          </div>

          <button
            onClick={() => navigateTo('menu')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-800 hover:text-[#c5a059] transition-colors group cursor-pointer"
          >
            <span>View All Dishes</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 Product Cards - Exact Match to Screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {signatureDishes.map((dish: MenuItem) => {
            const inCart = cartItems.some((ci) => ci.menuItem.id === dish.id);

            return (
              <div
                key={dish.id}
                className="group bg-white rounded-xl overflow-hidden border border-stone-200 hover:border-stone-400 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              >
                {/* Food Image */}
                <div 
                  className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 cursor-pointer"
                  onClick={() => setSelectedDishModal(dish)}
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {!dish.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-red-300 bg-red-950/80 px-2 py-0.5 rounded uppercase">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-3 flex flex-col justify-between flex-1">
                  <div 
                    className="cursor-pointer"
                    onClick={() => setSelectedDishModal(dish)}
                  >
                    <h3 className="font-serif text-sm font-bold text-stone-900 group-hover:text-[#c5a059] transition-colors leading-snug line-clamp-1">
                      {dish.name}
                    </h3>
                    <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                      {dish.tagline || dish.description}
                    </p>
                  </div>

                  {/* Price & Black Circular (+) Button */}
                  <div className="mt-4 pt-2.5 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="font-sans text-sm font-bold text-stone-900">
                        ₹{dish.price.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(dish, 1)}
                      disabled={!dish.inStock}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        !dish.inStock
                          ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                          : inCart
                          ? 'bg-[#c5a059] text-black shadow-sm'
                          : 'bg-[#181a18] hover:bg-black text-white'
                      }`}
                      title={inCart ? 'In cart' : 'Add to cart'}
                      aria-label={`Add ${dish.name} to cart`}
                    >
                      {inCart ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
