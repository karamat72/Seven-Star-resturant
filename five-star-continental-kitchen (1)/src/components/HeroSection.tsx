import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, 
  Play, 
  Utensils, 
  Leaf, 
  Wine, 
  Users, 
  Sparkles,
  Flame,
  Clock,
  RotateCw
} from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useApp } from '../context/AppContext';
import { CategoryType } from '../types';

interface HeroDish {
  id: string;
  name: string;
  category: CategoryType;
  subtitle: string;
  price: number;
  image: string;
  badge: string;
  calories: string;
  prepTime: string;
}

const HERO_DISHES: HeroDish[] = [
  {
    id: 'pasta-truffle',
    name: 'Truffle Alfredo Tagliatelle',
    category: 'Pasta',
    subtitle: "Artisan fresh ribbon pasta, black summer truffle & 24-month aged Parmigiano",
    price: 520,
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=1200&q=85',
    badge: "Chef's Signature",
    calories: "620 kcal",
    prepTime: "18 mins"
  },
  {
    id: 'steak-ribeye',
    name: 'Charcoal-Grilled Prime Ribeye',
    category: 'Steaks',
    subtitle: 'Prime grass-fed cut, garlic rosemary butter, grilled asparagus & jus reduction',
    price: 990,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
    badge: 'Master Grill',
    calories: "780 kcal",
    prepTime: "24 mins"
  },
  {
    id: 'pizza-margherita',
    name: 'Wood-Fired Margherita Royale',
    category: 'Pizza',
    subtitle: 'San Marzano DOP tomatoes, buffalo mozzarella, fresh sweet basil & cold-pressed oil',
    price: 480,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=1200&q=85',
    badge: 'Artisan Oven',
    calories: "590 kcal",
    prepTime: "15 mins"
  }
];

export const HeroSection: React.FC = () => {
  const { navigateTo, setIsVideoStoryOpen, addToCart } = useApp();
  const [selectedDishIdx, setSelectedDishIdx] = useState(0);
  const currentDish = HERO_DISHES[selectedDishIdx];

  // 3D Parallax Mouse Tracking with Motion Springs
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid, luxurious feel
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D Rotation transforms for the main image stage
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);
  
  // Depth translation for floating badges
  const floatZ1 = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);
  const floatZ2 = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20]);
  const badgeTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);
  const badgeTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-[#0c0d0e] overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 border-b border-[#1f2326] select-none"
      style={{ perspective: 1200 }}
    >
      {/* 3D Atmospheric Depth Glows */}
      <div 
        className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#c5a059]/10 rounded-full blur-[140px] pointer-events-none transition-transform duration-1000"
        style={{ transform: `translate3d(${smoothMouseX.get() * 30}px, ${smoothMouseY.get() * 30}px, 0)` }}
      />
      <div className="absolute -bottom-24 left-10 w-[450px] h-[450px] bg-[#1a2e22]/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[280px] h-[280px] bg-[#d4af37]/5 rounded-full blur-[90px] pointer-events-none" />

      {/* Floating 3D Sparkle particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-12 left-[15%] w-1.5 h-1.5 rounded-full bg-[#c5a059]/60 animate-ping" />
        <span className="absolute top-36 right-[25%] w-2 h-2 rounded-full bg-[#d4af37]/40 animate-pulse" />
        <span className="absolute bottom-20 left-[35%] w-1 h-1 rounded-full bg-white/40 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          
          {/* Left Column - Typography, Actions & Highlights (Top-Aligned) */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-6 xl:col-span-7 flex flex-col justify-start text-left pt-1 sm:pt-2"
          >
            
            {/* Tagline / Eyebrow Header - Matching Reference Screenshot */}
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] shadow-[0_0_8px_#c5a059]" />
              <p className="tracking-[0.24em] text-[11px] sm:text-xs font-semibold text-[#c5a059] uppercase">
                GOOD FOOD. BRIGHTER CONVERSATIONS.
              </p>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] xl:text-[3.85rem] font-bold text-white tracking-tight leading-[1.08] mb-3 sm:mb-4">
              A Continental <br className="hidden sm:inline" />
              Dining Experience <br />
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#eddab0] via-[#c5a059] to-[#d4af37] drop-shadow-sm inline-block mt-0.5 sm:mt-1">
                Made for Every Occasion
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-stone-300 text-sm sm:text-base lg:text-lg max-w-xl font-light leading-relaxed mb-5 sm:mb-6">
              Savour globally inspired flavours, crafted with the finest ingredients, in a warm and elegant setting at SEVEN STAR.
            </p>

            {/* Call-to-Action Buttons - Perfectly Balanced & Aligned */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-5">
              <button
                onClick={() => navigateTo('reservations')}
                className="group relative inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-full bg-gradient-to-r from-[#c5a059] to-[#d4af37] hover:from-[#d4af37] hover:to-[#eddab0] text-[#0c0d0e] font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#c5a059]/20 hover:shadow-[#c5a059]/35 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer overflow-hidden flex-shrink-0"
              >
                <span className="relative z-10 font-bold">Reserve a Table</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>

              <button
                onClick={() => setIsVideoStoryOpen(true)}
                className="inline-flex items-center justify-center gap-3 h-12 px-6 rounded-full bg-[#15191c]/90 hover:bg-[#1f2428] text-white border border-stone-700 hover:border-[#c5a059] font-medium text-xs uppercase tracking-wider transition-all duration-200 group cursor-pointer shadow-md backdrop-blur-sm flex-shrink-0"
              >
                <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-[#c5a059] group-hover:text-black flex items-center justify-center transition-colors">
                  <Play className="w-3 h-3 fill-current ml-0.5 text-white group-hover:text-black" />
                </div>
                <span>Watch Our Story</span>
              </button>
            </div>

            {/* Dish Quick Selector Tabs (Harmonious Inline Segment) */}
            <div className="flex items-center flex-wrap gap-2 mb-6 sm:mb-7">
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium mr-1.5 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#c5a059]" />
                Featured:
              </span>
              {HERO_DISHES.map((dish, idx) => (
                <button
                  key={dish.id}
                  onClick={() => setSelectedDishIdx(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    selectedDishIdx === idx
                      ? 'bg-[#c5a059] text-black font-semibold shadow-md'
                      : 'bg-[#161a1d] text-stone-400 hover:text-white hover:bg-[#20262b] border border-[#262c31]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${selectedDishIdx === idx ? 'bg-black' : 'bg-[#c5a059]'}`} />
                  {idx === 0 ? 'Pasta' : idx === 1 ? 'Steak' : 'Pizza'}
                </button>
              ))}
            </div>

            {/* Key Feature Highlights Bar - Balanced 4-Column Grid Aligned with Screenshot */}
            <div className="pt-5 sm:pt-6 border-t border-[#1f2427] grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
              <div className="flex items-center gap-3 group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#15181a] border border-[#262c31] flex items-center justify-center text-[#c5a059] group-hover:border-[#c5a059] group-hover:scale-105 transition-all flex-shrink-0">
                  <Utensils className="w-4 h-4" />
                </div>
                <div className="text-xs leading-tight">
                  <p className="font-semibold text-white">Global</p>
                  <p className="text-stone-400">Flavours</p>
                </div>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#15181a] border border-[#262c31] flex items-center justify-center text-[#c5a059] group-hover:border-[#c5a059] group-hover:scale-105 transition-all flex-shrink-0">
                  <Leaf className="w-4 h-4" />
                </div>
                <div className="text-xs leading-tight">
                  <p className="font-semibold text-white">Fresh & Premium</p>
                  <p className="text-stone-400">Ingredients</p>
                </div>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#15181a] border border-[#262c31] flex items-center justify-center text-[#c5a059] group-hover:border-[#c5a059] group-hover:scale-105 transition-all flex-shrink-0">
                  <Wine className="w-4 h-4" />
                </div>
                <div className="text-xs leading-tight">
                  <p className="font-semibold text-white">Elegant</p>
                  <p className="text-stone-400">Ambience</p>
                </div>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#15181a] border border-[#262c31] flex items-center justify-center text-[#c5a059] group-hover:border-[#c5a059] group-hover:scale-105 transition-all flex-shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-xs leading-tight">
                  <p className="font-semibold text-white">Perfect for</p>
                  <p className="text-stone-400">Every Occasion</p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column - 3D Interactive Food Stage (Top-Aligned precisely in red-highlighted zone) */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex justify-center items-start pt-1 sm:pt-2 lg:pt-0 mt-4 lg:mt-0">
            <motion.div 
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full max-w-md lg:max-w-none transition-transform duration-100 ease-out"
            >
              
              {/* Outer decorative gold ring with depth */}
              <div 
                className="absolute -inset-2.5 sm:-inset-3.5 rounded-3xl border border-[#c5a059]/25 blur-[1px] pointer-events-none"
                style={{ transform: 'translateZ(-20px)' }}
              />

              {/* Glowing background illumination behind dish */}
              <div 
                className="absolute -inset-6 bg-gradient-to-tr from-[#c5a059]/15 via-[#d4af37]/10 to-transparent rounded-full blur-2xl pointer-events-none"
                style={{ transform: 'translateZ(-40px)' }}
              />

              {/* Main Image Container - Elevated Presence */}
              <motion.div 
                key={currentDish.id}
                initial={{ opacity: 0.85, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-800 bg-[#121517] aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] xl:aspect-[16/12] group"
                style={{ transform: 'translateZ(10px)' }}
              >
                <img
                  src={currentDish.image}
                  alt={currentDish.name}
                  className="w-full h-full object-cover object-center transform group-hover:scale-106 transition-transform duration-700 ease-out"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/25 pointer-events-none" />

                {/* Top culinary badge */}
                <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 flex items-center gap-2 z-10">
                  <span className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#c5a059]/50 text-[#c5a059] text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase">
                    {currentDish.badge}
                  </span>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-stone-300 text-[10px]">
                    <Clock className="w-3 h-3 text-[#c5a059]" />
                    <span>{currentDish.prepTime}</span>
                  </div>
                </div>

                {/* Bottom dish details & quick order bar */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-[#0d0f11]/90 backdrop-blur-md border border-stone-800/90 p-3 sm:p-3.5 rounded-xl flex items-center justify-between shadow-xl z-10">
                  <div className="space-y-0.5 pr-2 min-w-0">
                    <p className="text-[10px] uppercase tracking-widest text-[#c5a059] font-semibold">Chef Recommends</p>
                    <p className="font-serif text-sm sm:text-base text-white font-semibold truncate">{currentDish.name}</p>
                    <p className="text-[11px] text-stone-400 hidden sm:block truncate">{currentDish.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm sm:text-base font-bold text-white bg-[#1f2428] px-2.5 sm:px-3 py-1.5 rounded-lg border border-stone-700">
                      ₹{currentDish.price}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          id: currentDish.id,
                          name: currentDish.name,
                          price: currentDish.price,
                          category: currentDish.category,
                          image: currentDish.image,
                          description: currentDish.subtitle,
                          isVeg: currentDish.id.includes('margherita') || currentDish.id.includes('pasta'),
                          rating: 4.9,
                          reviewsCount: 140,
                          inStock: true
                        });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md active:scale-95"
                      title="Quick Add to Order"
                    >
                      Add +
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Floating 3D Handwritten Script Badge - Exact Match to Screenshot Top Right */}
              <motion.div 
                style={{
                  x: badgeTranslateX,
                  y: badgeTranslateY,
                  transform: 'translateZ(50px)'
                }}
                className="absolute -top-4 -right-2 sm:-top-5 sm:-right-4 bg-gradient-to-br from-[#1d2226] via-[#15191c] to-[#0f1214] border border-[#c5a059]/60 px-4 py-2.5 sm:px-5 sm:py-3.5 rounded-2xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-300 pointer-events-auto z-20"
              >
                <p className="font-script text-lg sm:text-2xl text-white font-semibold leading-tight text-center drop-shadow">
                  Good Food <br />
                  Brings People <br />
                  Together <span className="text-[#c5a059]">♡</span>
                </p>
              </motion.div>

              {/* Floating 3D Star Rating Badge in Bottom Left */}
              <motion.div 
                style={{
                  transform: 'translateZ(45px)'
                }}
                className="absolute -bottom-4 -left-2 sm:-bottom-5 sm:-left-4 bg-[#161a1d]/95 backdrop-blur-md border border-[#2f363c] px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 sm:gap-3 z-20"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#c5a059]/20 flex items-center justify-center text-[#c5a059] shadow-inner flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <span>4.9 / 5.0</span>
                    <span className="text-[#c5a059] tracking-wider">★★★★★</span>
                  </div>
                  <p className="text-[10px] text-stone-400">Over 5,000+ Verified Diners</p>
                </div>
              </motion.div>

              {/* Floating 3D Dish Rotation Toggle Button */}
              <motion.div
                style={{
                  x: floatZ1,
                  y: floatZ2,
                  transform: 'translateZ(65px)'
                }}
                className="hidden lg:flex absolute top-1/2 -left-6 bg-[#181d19]/90 backdrop-blur-md border border-[#2c382f] p-2.5 rounded-full shadow-xl items-center justify-center text-[#c5a059] hover:scale-110 transition-transform cursor-pointer z-20"
                title="Switch Signature Dish"
                onClick={() => setSelectedDishIdx((prev) => (prev + 1) % HERO_DISHES.length)}
              >
                <RotateCw className="w-4 h-4 text-[#c5a059]" />
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

