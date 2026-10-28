import React, { useState } from 'react';
import { Calendar, Clock, Users, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReservationBanner: React.FC = () => {
  const { navigateTo, setReservationDraft, checkAvailability, showToast } = useApp();

  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [date, setDate] = useState(tomorrow);
  const [time, setTime] = useState('7:00 PM');
  const [guests, setGuests] = useState(2);

  const handleFindTable = (e: React.FormEvent) => {
    e.preventDefault();

    const check = checkAvailability(date, time, guests);
    if (!check.available) {
      showToast(check.message, 'error');
      return;
    }

    setReservationDraft((prev) => ({
      ...prev,
      date,
      timeSlot: time,
      guestsCount: guests
    }));

    showToast(`Table available for ${guests} guests on ${date} at ${time}!`, 'success');
    navigateTo('reservations');
  };

  return (
    <section className="py-14 bg-[#0a0b0c] relative overflow-hidden border-b border-[#1b1f22]">
      {/* Background glow and subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1d2320] via-[#0c0d0e] to-[#08090a] opacity-90" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* Left Text */}
          <div className="space-y-1">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c5a059] uppercase block">
              BOOK YOUR TABLE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Good Food Awaits You
            </h2>
            <p className="text-stone-300 text-sm font-light">
              Make your next meal special. Reserve your table now.
            </p>
          </div>

          {/* Right Inline Reservation Form - Exact Match to Screenshot */}
          <form 
            onSubmit={handleFindTable}
            className="bg-[#121517] border border-[#2b3137] rounded-2xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shadow-2xl"
          >
            {/* Date Input */}
            <div className="flex items-center gap-2.5 px-3 py-2.5 bg-[#181c20] rounded-xl border border-stone-800 text-stone-200 text-xs">
              <Calendar className="w-4 h-4 text-[#c5a059]" />
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer"
              />
            </div>

            {/* Time Slot Selector */}
            <div className="flex items-center gap-2.5 px-3 py-2.5 bg-[#181c20] rounded-xl border border-stone-800 text-stone-200 text-xs">
              <Clock className="w-4 h-4 text-[#c5a059]" />
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer"
              >
                {['12:30 PM', '1:30 PM', '2:30 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:30 PM', '10:00 PM'].map((slot) => (
                  <option key={slot} value={slot} className="bg-[#181c20] text-white">
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            {/* Guests Selector */}
            <div className="flex items-center gap-2.5 px-3 py-2.5 bg-[#181c20] rounded-xl border border-stone-800 text-stone-200 text-xs">
              <Users className="w-4 h-4 text-[#c5a059]" />
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="bg-transparent text-white focus:outline-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                  <option key={num} value={num} className="bg-[#181c20] text-white">
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            {/* Find a Table Action Button */}
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer flex-shrink-0"
            >
              <span>Find a Table</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};
