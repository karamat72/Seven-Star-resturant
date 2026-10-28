import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu as MenuIcon, 
  X, 
  MapPin, 
  Instagram, 
  Facebook, 
  ArrowRight,
  ShieldCheck,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { 
    activePage, 
    navigateTo, 
    cartTotals, 
    setIsCartDrawerOpen, 
    currentUser, 
    setIsAdminLoginModalOpen,
    favorites,
    setSearchQuery
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      navigateTo('menu');
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      {/* 1. Top Announcement Bar - Recreating screenshot top bar exactly */}
      {showTopBar && (
        <div className="bg-[#181d19] border-b border-[#252e27] text-[11px] text-[#b0bbb3] px-4 py-2 transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Left promo text & quote pill button */}
            <div className="flex items-center gap-3">
              <span className="text-[#c5a059] text-xs">🍃</span>
              <span className="font-medium text-[#e4eae6]">
                For modern website design contact us
              </span>
              <button 
                onClick={() => navigateTo('events')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-stone-100 text-[#181d19] font-semibold text-[10px] uppercase tracking-wider transition-colors cursor-pointer shadow-sm ml-2"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </button>
            </div>

            {/* Right socials, Find Us, Close button */}
            <div className="flex items-center gap-4 text-[#c0cac3]">
              <div className="flex items-center gap-2.5 border-r border-[#2d3a31] pr-3">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
              </div>

              <button 
                onClick={() => navigateTo('contact')} 
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                <span className="hidden sm:inline font-medium">Find Us</span>
              </button>

              <button 
                onClick={() => setShowTopBar(false)}
                className="text-stone-400 hover:text-white ml-1 cursor-pointer"
                aria-label="Close bar"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Main Navigation Bar - PURE WHITE as in reference screenshot */}
      <header 
        className={`sticky top-0 z-40 bg-white transition-all duration-200 border-b ${
          isScrolled 
            ? 'shadow-md py-3 border-stone-200' 
            : 'py-4 border-stone-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Bellagio Logo - Exact Match to Screenshot */}
          <button 
            onClick={() => navigateTo('home')} 
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            {/* Elegant Floral / Crown Crest */}
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-[#c5a059] border border-[#c5a059]/40 bg-[#fbf9f4]">
              <Sparkles className="w-4 h-4 fill-current" />
            </div>
            <div>
              <div className="font-serif text-2xl tracking-[0.22em] font-bold text-[#141618] group-hover:text-[#c5a059] transition-colors leading-none">
                SEVEN STAR
              </div>
              <div className="text-[8px] tracking-[0.35em] text-[#857f74] uppercase mt-1">
                CONTINENTAL KITCHEN
              </div>
            </div>
          </button>

          {/* Desktop Nav Links - Charcoal text with active gold underline */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-[#25282a]">
            {[
              { id: 'home', label: 'Home' },
              { id: 'menu', label: 'Menu' },
              { id: 'about', label: 'About' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'reservations', label: 'Reservations' },
              { id: 'events', label: 'Events' },
              { id: 'contact', label: 'Contact' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id as any)}
                className={`relative py-1 transition-colors cursor-pointer ${
                  activePage === link.id 
                    ? 'text-[#c5a059] font-semibold' 
                    : 'text-[#2a2d30] hover:text-[#c5a059]'
                }`}
              >
                {link.label}
                {activePage === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c5a059] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            
            {/* Search Icon */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-stone-700 hover:text-[#c5a059] transition-colors rounded-full hover:bg-stone-100 cursor-pointer"
              title="Search menu"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Cart Icon & Badge */}
            <button 
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2 text-stone-700 hover:text-[#c5a059] transition-colors rounded-full hover:bg-stone-100 cursor-pointer"
              title="Shopping Cart"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartTotals.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c5a059] text-black font-bold text-[10px] rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                  {cartTotals.itemCount}
                </span>
              )}
            </button>

            {/* Favorites (hidden on small screens) */}
            <button 
              onClick={() => navigateTo('account')}
              className="relative p-2 text-stone-700 hover:text-[#c5a059] transition-colors rounded-full hover:bg-stone-100 cursor-pointer hidden md:block"
              title="Saved Favorites"
              aria-label="Favorites"
            >
              <Heart className="w-4 h-4" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              )}
            </button>

            {/* Direct Navbar Admin Access */}
            <button
              onClick={() => {
                if (currentUser.role === 'admin') {
                  navigateTo('admin');
                } else {
                  setIsAdminLoginModalOpen(true);
                }
              }}
              className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                currentUser.role === 'admin'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 hover:border-[#c5a059]'
              }`}
              title="Admin Portal (Orders & Reservations)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{currentUser.role === 'admin' ? 'Admin Panel' : 'Admin'}</span>
            </button>

            {/* "Reserve a Table ->" Pill Button - Exact Black Pill Button from Screenshot */}
            <button 
              onClick={() => navigateTo('reservations')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#181a18] hover:bg-black text-white font-medium text-xs tracking-wider uppercase transition-all duration-200 shadow hover:shadow-lg cursor-pointer"
            >
              <span>Reserve a Table</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-stone-800 hover:text-[#c5a059] rounded-lg cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-stone-100 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-3">
            <nav className="flex flex-col gap-1 text-sm font-medium">
              {[
                { id: 'home', label: 'Home' },
                { id: 'menu', label: 'Menu' },
                { id: 'about', label: 'About' },
                { id: 'gallery', label: 'Gallery' },
                { id: 'reservations', label: 'Reservations' },
                { id: 'events', label: 'Events' },
                { id: 'contact', label: 'Contact' },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    navigateTo(link.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left py-2.5 px-3 rounded-lg transition-colors cursor-pointer ${
                    activePage === link.id
                      ? 'bg-stone-100 text-[#c5a059] font-bold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
                <button 
                  onClick={() => {
                    navigateTo('reservations');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#181a18] text-white font-semibold text-xs uppercase tracking-wider cursor-pointer"
                >
                  <span>Reserve a Table</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex gap-2 pt-1 text-xs">
                  <button 
                    onClick={() => {
                      navigateTo('account');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex-1 py-2 bg-stone-100 text-stone-800 rounded-lg text-center font-medium cursor-pointer"
                  >
                    My Account
                  </button>
                  <button 
                    onClick={() => {
                      setIsAdminLoginModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex-1 py-2 bg-stone-100 text-[#c5a059] rounded-lg text-center font-semibold cursor-pointer"
                  >
                    Admin Login
                  </button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center pt-24 px-4 animate-in fade-in">
          <div className="bg-white border border-stone-200 w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative text-stone-900">
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-black cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">Search SEVEN STAR Menu</h3>
            <p className="text-stone-500 text-xs mb-4">
              Explore continental pastas, flame-grilled steaks, wood-fired pizzas, and artisan desserts...
            </p>

            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-[#c5a059]" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="e.g. Truffle Alfredo, Margherita, Salmon, Tenderloin..."
                autoFocus
                className="w-full bg-stone-50 text-stone-900 pl-11 pr-28 py-3 rounded-xl border border-stone-300 focus:border-[#c5a059] focus:outline-none text-sm"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 bg-[#181a18] text-white font-medium text-xs rounded-lg uppercase tracking-wider hover:bg-black cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
