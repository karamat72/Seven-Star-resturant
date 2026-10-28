import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Check, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const { 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    cartTotals,
    navigateTo
  } = useApp();

  const [promoInput, setPromoInput] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const ok = applyPromoCode(promoInput.trim());
    if (ok) setPromoInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    navigateTo('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in">
      <div 
        className="w-full max-w-md bg-[#111416] border-l border-[#242a2f] h-full flex flex-col justify-between shadow-2xl relative animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#1f2529] flex items-center justify-between bg-[#14171a]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#c5a059]" />
            <h3 className="font-serif text-lg font-bold text-white">Your Dining Cart</h3>
            <span className="text-xs bg-stone-800 text-stone-300 px-2 py-0.5 rounded-full font-sans font-bold">
              {cartTotals.itemCount}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-stone-400 hover:text-red-400 p-1.5 transition-colors cursor-pointer"
                title="Clear all items"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body - Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-600">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-white">Your Cart is Empty</h4>
              <p className="text-xs text-stone-400 max-w-xs leading-relaxed">
                Discover our signature pastas, flame-grilled steaks, and handcrafted desserts to begin your culinary experience.
              </p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigateTo('menu');
                }}
                className="px-6 py-2.5 rounded-full bg-[#c5a059] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#d4af37] cursor-pointer shadow-lg"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#161a1d] border border-[#262c32] rounded-xl p-3 flex gap-3 group relative"
                >
                  {/* Dish Thumbnail */}
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-16 h-16 rounded-lg object-cover bg-stone-900 flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-serif text-sm font-bold text-white line-clamp-1">
                          {item.menuItem.name}
                        </h4>
                        <span className="text-[10px] text-stone-400">
                          PKR {item.menuItem.price.toLocaleString()} each
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-500 hover:text-red-400 transition-colors p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.specialInstructions && (
                      <p className="text-[10px] text-stone-400 italic line-clamp-1 mt-0.5">
                        Note: {item.specialInstructions}
                      </p>
                    )}

                    {/* Quantity controls and item total */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#20262b]">
                      <div className="flex items-center border border-stone-700 rounded-lg bg-[#111416]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-stone-300 hover:text-white cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-stone-300 hover:text-white cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-white font-sans">
                        PKR {(item.menuItem.price * item.quantity).toLocaleString()}
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer - Calculations & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#1f2529] bg-[#14171a] space-y-4">
            
            {/* Promo Code Box */}
            {appliedPromo ? (
              <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-800/60 px-3 py-2 rounded-xl text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-medium">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Promo <strong>{appliedPromo.code}</strong> applied ({appliedPromo.discountPercent}% OFF)</span>
                </div>
                <button
                  onClick={removePromoCode}
                  className="text-stone-400 hover:text-red-400 text-[11px] underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                  placeholder="Promo code (e.g. FIVESTAR15)"
                  className="flex-1 bg-[#191e22] border border-stone-700 rounded-xl px-3 py-2 text-xs text-white uppercase tracking-wider placeholder:normal-case focus:border-[#c5a059] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-800 hover:bg-[#c5a059] text-stone-300 hover:text-black font-semibold text-xs rounded-xl uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>
            )}

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-400 border-t border-[#202528] pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-medium">PKR {cartTotals.subtotal.toLocaleString()}</span>
              </div>

              {cartTotals.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span>- PKR {cartTotals.discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>GST / Provincial Tax (16%)</span>
                <span className="text-white font-medium">PKR {cartTotals.tax.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Service & Delivery Fee</span>
                <span className="text-white font-medium">PKR {cartTotals.deliveryFee.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[#23292e]">
                <span>Total Amount</span>
                <span className="text-[#c5a059]">PKR {cartTotals.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 rounded-full bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl hover:shadow-[#c5a059]/20 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
