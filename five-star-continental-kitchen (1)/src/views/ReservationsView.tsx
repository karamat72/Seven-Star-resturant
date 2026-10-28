import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  ShieldCheck, 
  AlertCircle,
  XCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { OccasionType, Reservation } from '../types';

export const ReservationsView: React.FC = () => {
  const { 
    reservationDraft, 
    setReservationDraft, 
    createReservation, 
    cancelReservation,
    reservations, 
    currentUser, 
    checkAvailability, 
    showToast,
    navigateTo
  } = useApp();

  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [date, setDate] = useState(reservationDraft.date || tomorrow);
  const [timeSlot, setTimeSlot] = useState(reservationDraft.timeSlot || '7:30 PM');
  const [guestsCount, setGuestsCount] = useState(reservationDraft.guestsCount || 2);
  const [seatingPreference, setSeatingPreference] = useState<'Indoor Main Dining' | 'Romantic Window Booth' | 'Garden Terrace' | 'Private Dining Suite'>(
    (reservationDraft.seatingPreference as any) || 'Romantic Window Booth'
  );
  const [occasion, setOccasion] = useState<OccasionType>(
    reservationDraft.occasion || 'Romantic Dinners'
  );
  const [guestName, setGuestName] = useState(currentUser.name || '');
  const [guestEmail, setGuestEmail] = useState(currentUser.email || '');
  const [guestPhone, setGuestPhone] = useState(currentUser.phone || '+92 300 1234567');
  const [specialRequests, setSpecialRequests] = useState('');
  
  const [confirmedBooking, setConfirmedBooking] = useState<Reservation | null>(null);
  const [activeTab, setActiveTab] = useState<'new' | 'my-bookings'>('new');

  // Customer's own bookings
  const myReservations = reservations.filter(
    (r) => r.guestEmail.toLowerCase() === (currentUser.email || '').toLowerCase() || r.guestName === currentUser.name
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check availability
    const check = checkAvailability(date, timeSlot, guestsCount);
    if (!check.available) {
      showToast(check.message, 'error');
      return;
    }

    if (!guestName.trim() || !guestEmail.trim() || !guestPhone.trim()) {
      showToast('Please provide your complete contact details.', 'error');
      return;
    }

    const booking = await createReservation({
      date,
      timeSlot,
      guestsCount,
      seatingPreference,
      occasion,
      guestName: guestName.trim(),
      guestEmail: guestEmail.trim(),
      guestPhone: guestPhone.trim(),
      specialRequests: specialRequests.trim() || undefined
    });

    setConfirmedBooking(booking);

    // Trigger confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-white pt-8 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c5a059] uppercase block">
            TABLE RESERVATIONS
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Reserve Your Fine Dining Table
          </h1>
          <p className="text-stone-300 text-sm font-light">
            Book in advance to ensure preferred seating in our main salon, romantic window booths, or private dining room.
          </p>

          {/* Tab Switcher */}
          <div className="flex justify-center pt-2">
            <div className="bg-[#15191c] p-1 rounded-xl border border-stone-800 flex items-center gap-1 text-xs">
              <button
                onClick={() => setActiveTab('new')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer ${
                  activeTab === 'new' ? 'bg-[#c5a059] text-black shadow' : 'text-stone-400 hover:text-white'
                }`}
              >
                New Reservation
              </button>
              <button
                onClick={() => setActiveTab('my-bookings')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'my-bookings' ? 'bg-[#c5a059] text-black shadow' : 'text-stone-400 hover:text-white'
                }`}
              >
                <span>My Bookings</span>
                {myReservations.length > 0 && (
                  <span className="bg-stone-800 text-stone-200 px-1.5 py-0.2 rounded-full text-[10px]">
                    {myReservations.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: New Reservation Form */}
        {activeTab === 'new' && (
          <div className="bg-[#121517] border border-[#262c31] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#c5a059]/5 rounded-full blur-[100px] pointer-events-none" />

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10 text-left">
              
              {/* Step 1: Date, Time & Guests */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#20262a]">
                  <span className="w-6 h-6 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center text-xs font-bold">1</span>
                  <h3 className="font-serif text-lg font-bold text-white">Date, Time & Party Size</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Date */}
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1.5">Dining Date</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-[#c5a059] absolute left-3 top-3" />
                      <input
                        type="date"
                        required
                        value={date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-[#181d20] border border-stone-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:border-[#c5a059] focus:outline-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1.5">Number of Guests</label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-[#c5a059] absolute left-3 top-3" />
                      <select
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(Number(e.target.value))}
                        className="w-full bg-[#181d20] border border-stone-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:border-[#c5a059] focus:outline-none cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16].map((num) => (
                          <option key={num} value={num} className="bg-[#181d20]">
                            {num} {num === 1 ? 'Guest' : 'Guests'} {num >= 8 ? '(Private Dining Recommended)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Seating Preference */}
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1.5">Seating Preference</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#c5a059] absolute left-3 top-3" />
                      <select
                        value={seatingPreference}
                        onChange={(e) => setSeatingPreference(e.target.value as any)}
                        className="w-full bg-[#181d20] border border-stone-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:border-[#c5a059] focus:outline-none cursor-pointer"
                      >
                        <option value="Romantic Window Booth" className="bg-[#181d20]">Romantic Window Booth</option>
                        <option value="Indoor Main Dining" className="bg-[#181d20]">Indoor Main Dining Salon</option>
                        <option value="Garden Terrace" className="bg-[#181d20]">Garden Terrace (Open Air)</option>
                        <option value="Private Dining Suite" className="bg-[#181d20]">Private Dining Suite</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-2">Select Preferred Dining Slot</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {[
                      '12:30 PM', '1:30 PM', '2:30 PM',
                      '6:30 PM', '7:00 PM', '7:30 PM',
                      '8:00 PM', '8:30 PM', '9:30 PM', '10:00 PM'
                    ].map((slot) => {
                      const isSelected = timeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTimeSlot(slot)}
                          className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer text-center ${
                            isSelected
                              ? 'bg-[#c5a059] text-black font-bold border-[#c5a059] shadow-md'
                              : 'bg-[#181c20] text-stone-300 border-stone-800 hover:border-stone-600 hover:text-white'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 2: Occasion */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#20262a]">
                  <span className="w-6 h-6 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center text-xs font-bold">2</span>
                  <h3 className="font-serif text-lg font-bold text-white">Occasion & Ambience</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {[
                    'Romantic Dinners',
                    'Family Gatherings',
                    'Corporate Events',
                    'Birthdays & Celebrations',
                    'Anniversary',
                    'Casual Dining'
                  ].map((occ) => {
                    const isSelected = occasion === occ;
                    return (
                      <button
                        key={occ}
                        type="button"
                        onClick={() => setOccasion(occ as OccasionType)}
                        className={`p-3 rounded-xl border text-xs text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#1e2327] border-[#c5a059] text-[#c5a059] font-bold shadow-md'
                            : 'bg-[#181c20] border-stone-800 text-stone-300 hover:border-stone-600'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isSelected ? 'fill-current' : 'text-stone-400'}`} />
                        <span className="leading-tight">{occ}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Guest Details & Special Requests */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#20262a]">
                  <span className="w-6 h-6 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center text-xs font-bold">3</span>
                  <h3 className="font-serif text-lg font-bold text-white">Contact & Requests</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Hamza Malik"
                      className="w-full bg-[#181d20] border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#c5a059] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-[#181d20] border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#c5a059] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="w-full bg-[#181d20] border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#c5a059] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Special Requests (Candles, cake, quiet table, dietary restrictions)
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Please arrange a quiet corner booth with candlelight and rose petals for our anniversary."
                    className="w-full bg-[#181d20] border border-stone-700 rounded-xl px-3.5 py-2 text-xs text-white focus:border-[#c5a059] focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-[#20262a]">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl hover:shadow-[#c5a059]/20 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm Reservation ({guestsCount} Guests on {date} at {timeSlot})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        )}

        {/* Tab 2: My Bookings */}
        {activeTab === 'my-bookings' && (
          <div className="space-y-4">
            {myReservations.length === 0 ? (
              <div className="bg-[#121517] border border-stone-800 rounded-2xl p-12 text-center space-y-4">
                <Calendar className="w-12 h-12 text-stone-600 mx-auto" />
                <h3 className="font-serif text-xl font-bold text-white">No Reservations Found</h3>
                <p className="text-xs text-stone-400 max-w-sm mx-auto">
                  You do not have any active table bookings under {currentUser.name || 'this account'}.
                </p>
                <button
                  onClick={() => setActiveTab('new')}
                  className="px-6 py-2.5 rounded-full bg-[#c5a059] text-black font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Book a Table Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myReservations.map((res) => (
                  <div
                    key={res.id}
                    className="bg-[#14171a] border border-[#262c31] rounded-2xl p-5 space-y-4 shadow-xl relative"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-mono">
                          Ref #{res.referenceNumber}
                        </span>
                        <h4 className="font-serif text-lg font-bold text-white">
                          {res.occasion}
                        </h4>
                      </div>

                      <span
                        className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                          res.status === 'confirmed'
                            ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                            : res.status === 'cancelled'
                            ? 'bg-rose-950/80 text-rose-400 border border-rose-800'
                            : 'bg-stone-800 text-stone-400'
                        }`}
                      >
                        {res.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-[#181d20] p-3 rounded-xl border border-stone-800">
                      <div>
                        <span className="text-stone-400 block text-[10px]">Date</span>
                        <strong className="text-white">{res.date}</strong>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px]">Time</span>
                        <strong className="text-white">{res.timeSlot}</strong>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px]">Party Size</span>
                        <strong className="text-white">{res.guestsCount} Guests</strong>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px]">Seating Area</span>
                        <strong className="text-white truncate block">{res.seatingPreference}</strong>
                      </div>
                    </div>

                    {res.specialRequests && (
                      <p className="text-[11px] text-stone-400 italic">
                        "{res.specialRequests}"
                      </p>
                    )}

                    {res.status === 'confirmed' && (
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => cancelReservation(res.id)}
                          className="text-xs text-rose-400 hover:text-rose-300 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Cancel Booking</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Confirmation Modal */}
        {confirmedBooking && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-[#14171a] border border-[#c5a059]/60 w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl relative text-center">
              <div className="w-16 h-16 rounded-full bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center mx-auto mb-4 text-[#c5a059]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-[10px] tracking-[0.25em] text-[#c5a059] font-bold uppercase block mb-1">
                RESERVATION CONFIRMED
              </span>
              <h3 className="font-serif text-3xl font-bold text-white mb-2">
                We Look Forward to Welcoming You
              </h3>
              <p className="text-xs text-stone-300 max-w-sm mx-auto mb-6">
                Your table has been reserved. A confirmation email and SMS with dining directions have been dispatched.
              </p>

              <div className="bg-[#1a1f23] border border-stone-800 rounded-xl p-4 text-left space-y-2.5 text-xs mb-6">
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Reference Number</span>
                  <strong className="text-[#c5a059] font-mono text-sm">{confirmedBooking.referenceNumber}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Guest Name</span>
                  <strong className="text-white">{confirmedBooking.guestName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Date & Time</span>
                  <strong className="text-white">{confirmedBooking.date} at {confirmedBooking.timeSlot}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Party Size & Area</span>
                  <strong className="text-white">{confirmedBooking.guestsCount} Guests ({confirmedBooking.seatingPreference})</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Occasion</span>
                  <strong className="text-white">{confirmedBooking.occasion}</strong>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setConfirmedBooking(null);
                    setActiveTab('my-bookings');
                  }}
                  className="flex-1 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  View My Bookings
                </button>
                <button
                  onClick={() => {
                    setConfirmedBooking(null);
                    navigateTo('menu');
                  }}
                  className="flex-1 py-3 rounded-xl bg-[#c5a059] hover:bg-[#d4af37] text-black text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Explore Menu
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
