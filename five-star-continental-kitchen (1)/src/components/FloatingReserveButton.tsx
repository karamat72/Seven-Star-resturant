import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

export const FloatingReserveButton: React.FC = () => {
  const { navigateTo, activePage } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past hero
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Do not show if already on reservations or admin view
  if (activePage === 'reservations' || activePage === 'admin') {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            onClick={() => navigateTo('reservations')}
            className="group relative flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#181a18] hover:bg-black text-white border border-[#c5a059]/80 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_4px_30px_rgba(197,160,89,0.3)] transition-all duration-300 cursor-pointer overflow-hidden"
            aria-label="Reserve a Table"
          >
            {/* Ambient golden pulse ring */}
            <span className="absolute -inset-1 rounded-full bg-[#c5a059]/20 blur-sm group-hover:bg-[#c5a059]/30 transition-colors pointer-events-none" />
            
            <div className="relative z-10 w-6 h-6 rounded-full bg-[#c5a059] flex items-center justify-center text-black">
              <Calendar className="w-3.5 h-3.5 fill-current" />
            </div>

            <span className="relative z-10 text-xs font-bold uppercase tracking-wider text-white">
              Reserve Table
            </span>

            <ArrowRight className="relative z-10 w-3.5 h-3.5 text-[#c5a059] group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
