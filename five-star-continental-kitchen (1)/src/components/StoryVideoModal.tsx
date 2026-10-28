import React from 'react';
import { X, Play, Sparkles, Volume2, Award, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StoryVideoModal: React.FC = () => {
  const { isVideoStoryOpen, setIsVideoStoryOpen, navigateTo } = useApp();

  if (!isVideoStoryOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div 
        className="bg-[#121517] border border-[#2b3137] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsVideoStoryOpen(false)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video / Cinema Screen */}
        <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
          {/* High-res culinary video ambiance */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-dish-in-a-restaurant-kitchen-41443-large.mp4"
              type="video/mp4"
            />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Floating Cinema Overlays */}
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
            <div className="space-y-1">
              <span className="text-[10px] tracking-[0.25em] text-[#c5a059] font-bold uppercase">
                A CONTINENTAL ODYSSEY
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
                Crafting Culinary Soul Since 2018
              </h3>
              <p className="text-xs text-stone-300 max-w-md hidden sm:block">
                Witness our team roll hand-shaped pasta, fire wood-burning hearths, and blend old-world European recipes with modern panache.
              </p>
            </div>

            <div className="pointer-events-auto">
              <button
                onClick={() => {
                  setIsVideoStoryOpen(false);
                  navigateTo('reservations');
                }}
                className="px-5 py-2.5 rounded-full bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
              >
                Experience in Person
              </button>
            </div>
          </div>
        </div>

        {/* Story details below video */}
        <div className="p-6 sm:p-8 bg-[#14171a] border-t border-[#22272b] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-300">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1f2529] border border-stone-700 flex items-center justify-center text-[#c5a059] flex-shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white mb-0.5">Michelin Heritage</p>
              <p className="text-stone-400 font-light">Trained in Tuscany and Lyon, bringing continental perfection to every course.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1f2529] border border-stone-700 flex items-center justify-center text-[#c5a059] flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white mb-0.5">Farm to Hearth</p>
              <p className="text-stone-400 font-light">Organic produce picked daily from regional orchards and premium Australian Wagyu.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1f2529] border border-stone-700 flex items-center justify-center text-[#c5a059] flex-shrink-0">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white mb-0.5">Warm Hospitality</p>
              <p className="text-stone-400 font-light">Every guest is treated like family in an atmosphere designed for memories.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
