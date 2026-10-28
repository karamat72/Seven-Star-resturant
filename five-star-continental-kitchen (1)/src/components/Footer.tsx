import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { navigateTo, setIsAdminLoginModalOpen, currentUser } = useApp();

  return (
    <footer className="bg-white text-stone-700 pt-16 pb-10 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid - Exact Match to Bellagio Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-100 text-left">
          
          {/* Col 1: Bellagio Brand & Socials (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full border border-[#c5a059]/40 flex items-center justify-center bg-[#fcfaf6] text-[#c5a059]">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
              <div>
                <div className="font-serif text-2xl tracking-[0.22em] font-bold text-stone-900 leading-none">
                  SEVEN STAR
                </div>
                <div className="text-[8px] tracking-[0.35em] text-[#857f74] uppercase mt-1">
                  CONTINENTAL KITCHEN
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-500 font-light leading-relaxed max-w-sm">
              Savour globally inspired continental flavours, crafted with the finest ingredients in a warm and elegant setting.
            </p>

            {/* Social Icons - Circular outlines matching screenshot */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-stone-300 hover:border-stone-900 text-stone-700 hover:text-black flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-stone-300 hover:border-stone-900 text-stone-700 hover:text-black flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-stone-300 hover:border-stone-900 text-stone-700 hover:text-black flex items-center justify-center transition-colors"
                aria-label="Pinterest"
              >
                <span className="font-serif font-bold text-xs">P</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-widest text-stone-900">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'home', label: 'Home' },
                { id: 'menu', label: 'Menu' },
                { id: 'about', label: 'About' },
                { id: 'gallery', label: 'Gallery' },
                { id: 'reservations', label: 'Reservations' },
                { id: 'events', label: 'Events' },
                { id: 'contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => navigateTo(link.id as any)}
                    className="hover:text-[#c5a059] transition-colors cursor-pointer text-stone-600 hover:underline"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Opening Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-semibold text-xs uppercase tracking-widest text-stone-900">
              Opening Hours
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-stone-100 pb-1.5">
                <span className="text-stone-500">Mon – Thu</span>
                <span className="font-medium text-stone-900">11:00 AM – 11:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-1.5">
                <span className="text-stone-500">Fri – Sat</span>
                <span className="font-medium text-stone-900">11:00 AM – 12:00 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Sun</span>
                <span className="font-medium text-stone-900">11:00 AM – 10:00 PM</span>
              </div>
            </div>
          </div>

          {/* Col 4: Contact Us & Handwritten Stamp (3 cols) */}
          <div className="lg:col-span-3 space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-widest text-stone-900 mb-3">
                Contact Us
              </h4>
              <ul className="space-y-2.5 text-xs text-stone-600">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#c5a059] flex-shrink-0 mt-0.5" />
                  <span>
                    123 Food Street,<br />
                    Zirakpur, Punjab 140603, India
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
                  <a href="tel:+919876543210" className="hover:text-black transition-colors">
                    +91 98765 43210
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#c5a059] flex-shrink-0" />
                  <a href="mailto:hello@sevenstar.in" className="hover:text-black transition-colors">
                    hello@sevenstar.in
                  </a>
                </li>
              </ul>
            </div>

            {/* Handwritten script stamp matching screenshot bottom right */}
            <div className="pt-4 self-end sm:self-start lg:self-end">
              <p className="font-script text-2xl text-stone-900 font-semibold leading-tight rotate-3 hover:rotate-0 transition-transform select-none">
                Good Food <br />
                Happier Days <span className="text-[#c5a059]">♡</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Policies & Small Admin Login Link as requested */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 SEVEN STAR Continental Kitchen. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <button 
              onClick={() => navigateTo('contact')}
              className="hover:text-stone-800 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button 
              onClick={() => navigateTo('contact')}
              className="hover:text-stone-800 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span>•</span>
            {/* Small unobtrusive Admin Login link matching original design seamlessly */}
            <button
              onClick={() => {
                if (currentUser.role === 'admin') {
                  navigateTo('admin');
                } else {
                  setIsAdminLoginModalOpen(true);
                }
              }}
              className="text-stone-500 hover:text-[#c5a059] font-medium transition-colors cursor-pointer flex items-center gap-1"
              title="Restaurant Operations & Admin Login"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Admin Login</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
