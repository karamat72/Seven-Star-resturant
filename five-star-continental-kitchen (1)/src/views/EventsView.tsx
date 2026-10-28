import React, { useState } from 'react';
import { 
  Heart, 
  Users, 
  Briefcase, 
  Cake, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Wine,
  Calendar,
  Phone,
  Mail,
  User
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OccasionType } from '../types';

export const EventsView: React.FC = () => {
  const { currentUser, showToast, navigateTo } = useApp();

  const [selectedPackage, setSelectedPackage] = useState('The Romantic Rendezvous');
  const [occasion, setOccasion] = useState<OccasionType>('Romantic Dinners');
  const [guestCount, setGuestCount] = useState(2);
  const [preferredDate, setPreferredDate] = useState(new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]);
  const [clientName, setClientName] = useState(currentUser.name || '');
  const [clientEmail, setClientEmail] = useState(currentUser.email || '');
  const [clientPhone, setClientPhone] = useState(currentUser.phone || '+92 300 1234567');
  const [specialDetails, setSpecialDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const packages = [
    {
      title: 'The Romantic Rendezvous',
      tagline: 'Ideal for Anniversaries & Proposals',
      price: 'PKR 18,500',
      priceSubtitle: 'for two guests',
      icon: Heart,
      features: [
        'Private Window Booth with Candlelight & Red Rose Petals',
        '4-Course Curated Chef Tasting Menu',
        'Welcome Sparkling Mocktail / Artisan Spritzers',
        'Hand-piped Custom Chocolate Lava Cake with message',
        'Dedicated Sommelier & Butler Service'
      ]
    },
    {
      title: 'The Executive Soirée',
      tagline: 'Corporate Dinners & High-Stake Deals',
      price: 'PKR 6,500',
      priceSubtitle: 'per guest (min 6 guests)',
      icon: Briefcase,
      features: [
        'Private Soundproof Dining Salon with AV Screen',
        'Family-Style Continental Feasts (Prime Wagyu & Pastas)',
        'Personalized Printed Menus with Company Logo',
        'Unlimited Artisanal Espresso & European Patisserie',
        'Express High-Discretion White Glove Service'
      ]
    },
    {
      title: 'Grand Family Celebration',
      tagline: 'Birthdays, Milestones & Reunions',
      price: 'PKR 5,200',
      priceSubtitle: 'per guest (min 10 guests)',
      icon: Cake,
      features: [
        'Dedicated Banquet Floor or Garden Terrace Section',
        'Signature Wood-Fired Pizza & Pasta Station Live',
        'Custom 2kg Artisan Birthday Cake from Patisserie',
        'Floral Table Centerpieces & Fairy Lights Setup',
        'Keepsake Printed Photograph for the Host'
      ]
    }
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim() || !clientPhone.trim()) {
      showToast('Please provide your complete contact details.', 'error');
      return;
    }

    setIsSubmitted(true);
    showToast('Your private event inquiry has been submitted! Our concierge will call you.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-white pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c5a059] uppercase block">
            PRIVATE DINING & OCCASIONS
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Curated Experiences for Life's Rare Moments
          </h1>
          <p className="text-stone-300 text-sm sm:text-base font-light">
            From intimate proposal dinners bathed in candlelight to prestigious corporate galas, our dedicated event concierge creates perfection.
          </p>
        </div>

        {/* 3 Packages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            const isSelected = selectedPackage === pkg.title;

            return (
              <div
                key={pkg.title}
                className={`bg-[#131618] rounded-2xl p-6 sm:p-8 border flex flex-col justify-between transition-all duration-300 shadow-xl ${
                  isSelected
                    ? 'border-[#c5a059] ring-1 ring-[#c5a059]'
                    : 'border-[#262c31] hover:border-stone-600'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#1b2024] border border-stone-700 flex items-center justify-center text-[#c5a059] mb-4">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white leading-tight">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 mb-4">{pkg.tagline}</p>

                  <div className="mb-6 pb-4 border-b border-[#202529]">
                    <span className="font-serif text-3xl font-bold text-white">{pkg.price}</span>
                    <span className="text-xs text-stone-400 block mt-0.5">{pkg.priceSubtitle}</span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-stone-300 mb-8">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#c5a059] flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setSelectedPackage(pkg.title);
                    const formElement = document.getElementById('inquiry-form');
                    formElement?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#c5a059] text-black shadow-lg'
                      : 'bg-stone-800 text-stone-200 hover:bg-[#c5a059] hover:text-black'
                  }`}
                >
                  Select Package
                </button>
              </div>
            );
          })}
        </div>

        {/* Event Inquiry Form */}
        <div id="inquiry-form" className="bg-[#121517] border border-[#262c31] rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-white">Inquiry Received</h3>
              <p className="text-xs text-stone-300">
                Thank you, <strong>{clientName}</strong>. Our Private Dining Event Director will contact you at <strong>{clientPhone}</strong> within 4 business hours with custom menu proposals and floor plan options.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-stone-800 text-stone-200 text-xs font-semibold cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <div>
              <div className="max-w-xl mb-8 space-y-1">
                <span className="text-[10px] tracking-[0.25em] text-[#c5a059] font-bold uppercase block">
                  BESPOKE RESERVATION INQUIRY
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Tell Us About Your Event
                </h3>
                <p className="text-xs text-stone-400">
                  Currently selected: <strong className="text-[#c5a059]">{selectedPackage}</strong>
                </p>
              </div>

              <form onSubmit={handleInquirySubmit} className="space-y-6 text-xs text-left">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1.5">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Zainab Qureshi"
                      className="w-full bg-[#181d20] border border-stone-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#c5a059] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 font-medium mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="zainab@example.com"
                      className="w-full bg-[#181d20] border border-stone-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#c5a059] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 font-medium mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="w-full bg-[#181d20] border border-stone-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#c5a059] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1.5">Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-[#181d20] border border-stone-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#c5a059] focus:outline-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 font-medium mb-1.5">Estimated Guests</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={150}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full bg-[#181d20] border border-stone-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#c5a059] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 font-medium mb-1.5">Occasion Style</label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value as OccasionType)}
                      className="w-full bg-[#181d20] border border-stone-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#c5a059] focus:outline-none cursor-pointer"
                    >
                      <option value="Romantic Dinners">Romantic Dinners & Proposals</option>
                      <option value="Birthdays & Celebrations">Birthdays & Anniversaries</option>
                      <option value="Corporate Events">Corporate Banquets</option>
                      <option value="Family Gatherings">Family Reunion</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1.5">
                    Describe Special Requests, Decor Themes or Dietary Preferences
                  </label>
                  <textarea
                    rows={3}
                    value={specialDetails}
                    onChange={(e) => setSpecialDetails(e.target.value)}
                    placeholder="e.g. We require floral table decor, projection screen for presentation, and gluten-free choices for 2 guests."
                    className="w-full bg-[#181d20] border border-stone-700 rounded-xl px-3.5 py-2 text-white focus:border-[#c5a059] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-xl transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request Event Proposal & Reservation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
