import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Plus, 
  Minus, 
  Flame, 
  Clock, 
  Heart, 
  ShieldAlert, 
  Check, 
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MenuItem } from '../types';

export const DishDetailModal: React.FC = () => {
  const { 
    selectedDishModal, 
    setSelectedDishModal, 
    addToCart, 
    favorites, 
    toggleFavorite, 
    menuItems 
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!selectedDishModal) return null;

  const isFav = favorites.includes(selectedDishModal.id);
  const relatedDishes = menuItems
    .filter((d) => d.category === selectedDishModal.category && d.id !== selectedDishModal.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(selectedDishModal, quantity, specialInstructions.trim() || undefined);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setSelectedDishModal(null);
      setQuantity(1);
      setSpecialInstructions('');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in">
      <div 
        className="bg-[#131618] border border-[#2c3237] w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden relative my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedDishModal(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Image */}
          <div className="md:col-span-5 relative bg-stone-900 min-h-[250px] md:min-h-full">
            <img
              src={selectedDishModal.image}
              alt={selectedDishModal.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131618] via-transparent to-transparent md:hidden" />

            {/* Favorite button */}
            <button
              onClick={() => toggleFavorite(selectedDishModal.id)}
              className={`absolute top-4 left-4 p-2.5 rounded-full backdrop-blur-md border border-white/10 transition-colors cursor-pointer ${
                isFav ? 'bg-red-500 text-white' : 'bg-black/60 text-stone-300 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            </button>

            {/* Category Pill */}
            <div className="absolute bottom-4 left-4 hidden md:block">
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-semibold tracking-wider uppercase text-[#c5a059] border border-[#c5a059]/30">
                {selectedDishModal.category}
              </span>
            </div>
          </div>

          {/* Right Column: Details & Order Controls */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Header Title & Rating */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#c5a059] uppercase">
                    {selectedDishModal.category}
                  </span>
                  {selectedDishModal.isSignature && (
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Chef's Signature
                    </span>
                  )}
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {selectedDishModal.name}
                </h2>

                <div className="flex items-center gap-4 mt-2 text-xs">
                  <div className="flex items-center gap-1 text-[#c5a059]">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-white">{selectedDishModal.rating}</span>
                    <span className="text-stone-400">({selectedDishModal.reviewsCount} reviews)</span>
                  </div>

                  {selectedDishModal.prepTime && (
                    <div className="flex items-center gap-1 text-stone-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{selectedDishModal.prepTime}</span>
                    </div>
                  )}

                  {selectedDishModal.spiceLevel && selectedDishModal.spiceLevel !== 'None' && (
                    <div className="flex items-center gap-1 text-orange-400">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{selectedDishModal.spiceLevel}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="text-2xl font-bold text-white font-sans flex items-baseline gap-1">
                <span className="text-sm font-medium text-[#c5a059]">PKR</span>
                <span>{selectedDishModal.price.toLocaleString()}</span>
              </div>

              {/* Description */}
              <p className="text-stone-300 text-sm font-light leading-relaxed">
                {selectedDishModal.description}
              </p>

              {/* Ingredients */}
              {selectedDishModal.ingredients && selectedDishModal.ingredients.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                    Key Ingredients
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDishModal.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="text-xs bg-[#1a1f22] text-stone-300 px-2.5 py-1 rounded-md border border-stone-800"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Allergens */}
              {selectedDishModal.allergens && selectedDishModal.allergens.length > 0 && (
                <div className="flex items-center gap-2 text-xs text-amber-300/80 bg-amber-500/10 px-3 py-2 rounded-lg border border-amber-500/20">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>Contains: {selectedDishModal.allergens.join(', ')}</span>
                </div>
              )}

              {/* Special Instructions Input */}
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">
                  Special Kitchen Request (Optional)
                </label>
                <input
                  type="text"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Extra sauce on side, less salt, no garlic..."
                  className="w-full bg-[#181d20] border border-stone-800 rounded-lg px-3 py-2 text-xs text-white focus:border-[#c5a059] focus:outline-none"
                />
              </div>

            </div>

            {/* Bottom Actions: Quantity Selector & Add Button */}
            <div className="pt-4 border-t border-[#202528] flex items-center gap-4">
              
              {/* Quantity */}
              <div className="flex items-center border border-stone-700 rounded-xl bg-[#181c20] p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!selectedDishModal.inStock}
                className={`flex-1 py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  !selectedDishModal.inStock
                    ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                    : addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#c5a059] hover:bg-[#d4af37] text-black shadow-lg hover:shadow-[#c5a059]/20'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart • PKR {(selectedDishModal.price * quantity).toLocaleString()}</span>
                  </>
                )}
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
