import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  Flame, 
  Tag,
  Gift, 
  Utensils 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { CategoryType } from '../types';

export const PromotionalOfferPopup: React.FC = () => {
  const { navigateTo, addToCart } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  const promoCode = 'SEVENSTAR20';
  const discountText = '20% OFF';

  // Sample highlighted combo dish
  const featuredOfferDish = {
    id: 'pasta-truffle',
    name: 'Truffle Alfredo Tagliatelle',
    originalPrice: 650,
    offerPrice: 520,
    category: 'Pasta' as CategoryType,
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=85',
    description: 'Black summer truffle, artisan pasta & 24-month aged Parmigiano.',
    isVeg: true,
    rating: 4.9,
    reviewsCount: 140
  };

  useEffect(() => {
    // Show poster popup once per session after pleasant initial delay
    const seen = sessionStorage.getItem('sevenstar_promo_poster_seen');
    if (!seen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Track scroll position to only show reopen badge when user is well past the hero section
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsScrolledPastHero(true);
      } else {
        setIsScrolledPastHero(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('sevenstar_promo_poster_seen', 'true');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleClaimOffer = () => {
    handleClose();
    navigateTo('menu');
  };

  const handleQuickAdd = () => {
    addToCart({
      id: featuredOfferDish.id,
      name: featuredOfferDish.name,
      price: featuredOfferDish.offerPrice,
      category: featuredOfferDish.category,
      image: featuredOfferDish.image,
      description: featuredOfferDish.description,
      isVeg: featuredOfferDish.isVeg,
      rating: featuredOfferDish.rating,
      reviewsCount: featuredOfferDish.reviewsCount,
      inStock: true
    });
    handleClose();
  };

  return (
    <>
      {/* Reopen Badge - Only shown when scrolled past hero, never overlapping hero elements */}
      <AnimatePresence>
        {!isOpen && isScrolledPastHero && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#14181b]/95 text-white border border-[#c5a059]/60 shadow-xl backdrop-blur-md cursor-pointer group"
            aria-label="View 20% discount offer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a059] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c5a059]" />
            </span>
            <Tag className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="text-[11px] font-semibold text-stone-200">
              Claim <span className="text-[#c5a059] font-bold">20% Off</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Animated Promotional Discount Poster Popup */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
            
            {/* Clickable Backdrop Dismiss */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 cursor-pointer"
            />

            {/* Poster Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-gradient-to-b from-[#181d20] via-[#101316] to-[#0c0d0f] border-2 border-[#c5a059]/70 rounded-3xl overflow-hidden shadow-[0_10px_60px_rgba(197,160,89,0.3)] text-left text-white my-auto z-10"
            >
              {/* Corner Ornamental Accents (Poster Style) */}
              <div className="absolute top-2 left-2 text-[#c5a059]/50 text-xs pointer-events-none select-none">✦</div>
              <div className="absolute top-2 right-2 text-[#c5a059]/50 text-xs pointer-events-none select-none">✦</div>
              <div className="absolute bottom-2 left-2 text-[#c5a059]/50 text-xs pointer-events-none select-none">✦</div>
              <div className="absolute bottom-2 right-2 text-[#c5a059]/50 text-xs pointer-events-none select-none">✦</div>

              {/* Close Button - Prominent Gold & Charcoal */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/75 hover:bg-[#c5a059] border border-[#c5a059]/60 hover:border-[#c5a059] flex items-center justify-center text-stone-300 hover:text-black transition-all duration-200 cursor-pointer shadow-lg hover:rotate-90 group"
                aria-label="Close promotional poster"
              >
                <X className="w-4 h-4 transition-transform group-hover:scale-110" />
              </button>

              {/* Poster Top Visual Banner with Atmospheric Lighting */}
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85"
                  alt="Fine dining continental cuisine"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000"
                />
                
                {/* Vignette gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101316] via-[#101316]/60 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />

                {/* Royal Ribbon Badge */}
                <div className="absolute top-4 left-5 flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#c5a059]/60 flex items-center gap-1.5 text-[10px] font-bold text-[#c5a059] tracking-widest uppercase shadow-md">
                    <Sparkles className="w-3 h-3 fill-current animate-pulse text-[#c5a059]" />
                    <span>SEVEN STAR • GRAND INVITATION</span>
                  </div>
                </div>

                {/* Poster Discount Headline */}
                <div className="absolute bottom-3 left-5 right-5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#c5a059] text-black font-extrabold text-[11px] uppercase tracking-wider mb-1">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    Special Dining Privilege
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight drop-shadow-md">
                    {discountText} <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#eddab0] via-[#c5a059] to-[#d4af37]">Your First Experience</span>
                  </h3>
                </div>
              </div>

              {/* Poster Body */}
              <div className="p-5 sm:p-6 space-y-4">
                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                  Join us for an unforgettable continental dining journey. Savour artisan tagliatelle, flame-kissed prime cuts, and authentic wood-fired pizzas with <strong className="text-white font-medium">20% off</strong> your reservation or online order.
                </p>

                {/* Perforated Voucher Ticket Card */}
                <div className="relative bg-[#14181b] border border-dashed border-[#c5a059]/70 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3 shadow-inner">
                  {/* Decorative side notches */}
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#101316] border-r border-[#c5a059]/70" />
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#101316] border-l border-[#c5a059]/70" />

                  <div className="pl-2">
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
                      Your Secret Voucher Code
                    </p>
                    <p className="font-mono text-xl sm:text-2xl font-black tracking-widest text-[#c5a059] mt-0.5">
                      {promoCode}
                    </p>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#d4af37] hover:from-[#d4af37] hover:to-[#eddab0] text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md active:scale-95 flex-shrink-0"
                    title="Click to copy voucher code"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-black stroke-[3]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Featured Dish Preview with Quick Add */}
                <div className="bg-[#13171a] border border-stone-800 rounded-xl p-3 flex items-center gap-3">
                  <img
                    src={featuredOfferDish.image}
                    alt={featuredOfferDish.name}
                    className="w-13 h-13 sm:w-14 sm:h-14 rounded-lg object-cover flex-shrink-0 border border-stone-700"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-[#c5a059]">Chef Recommends</span>
                    <p className="font-serif text-xs sm:text-sm font-semibold text-white truncate">{featuredOfferDish.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-bold text-white">₹{featuredOfferDish.offerPrice}</span>
                      <span className="text-[11px] text-stone-500 line-through">₹{featuredOfferDish.originalPrice}</span>
                      <span className="text-[10px] text-emerald-400 font-medium">Save ₹130</span>
                    </div>
                  </div>
                  <button
                    onClick={handleQuickAdd}
                    className="px-3 py-1.5 rounded-lg bg-[#1f2529] hover:bg-[#c5a059] hover:text-black text-stone-200 text-xs font-semibold transition-all cursor-pointer flex-shrink-0 border border-stone-700"
                  >
                    Add +
                  </button>
                </div>

                {/* Action Controls */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={handleClaimOffer}
                    className="w-full flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-gradient-to-r from-[#c5a059] to-[#d4af37] hover:from-[#d4af37] hover:to-[#eddab0] text-black font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#c5a059]/20 hover:shadow-[#c5a059]/40 transition-all cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <span>Claim 20% Discount & View Menu</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleClose}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full text-stone-400 hover:text-white text-xs font-medium transition-colors cursor-pointer text-center"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
