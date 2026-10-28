import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactView: React.FC = () => {
  const { showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do you recommend reservations in advance?',
      a: 'Yes, especially for Thursday through Sunday evenings. We hold reserved window booths and main salon tables for 15 minutes past booking time.'
    },
    {
      q: 'Is there a dress code at Five Star?',
      a: 'We embrace a smart casual to semi-formal dining atmosphere. We kindly request our guests to refrain from athletic shorts or beachwear.'
    },
    {
      q: 'Do you provide valet parking?',
      a: 'Complimentary executive valet parking is available at our grand entrance 7 days a week.'
    },
    {
      q: 'Can you cater to severe allergies and dietary needs?',
      a: 'Absolutely. Our culinary team can prepare custom gluten-free, vegan, nut-free, and halal continental recipes with advanced notice.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSent(true);
    showToast('Your message has been sent to our concierge desk!', 'success');
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-white pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c5a059] uppercase block">
            GET IN TOUCH
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            We Are Here to Serve You
          </h1>
          <p className="text-stone-300 text-sm font-light">
            Questions regarding table reservations, private event hires, or custom culinary menus? Reach out anytime.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#131618] border border-[#262c31] rounded-2xl p-6 text-center space-y-3 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-[#1b2024] border border-stone-700 flex items-center justify-center text-[#c5a059] mx-auto">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Our Location</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              123 Luxury Boulevard, Gulberg III<br />
              Lahore, Pakistan
            </p>
            <p className="text-[11px] text-[#c5a059] font-medium">Complimentary Valet Provided</p>
          </div>

          <div className="bg-[#131618] border border-[#262c31] rounded-2xl p-6 text-center space-y-3 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-[#1b2024] border border-stone-700 flex items-center justify-center text-[#c5a059] mx-auto">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Direct Telephone</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Dining Reservations: <a href="tel:+924235789000" className="hover:text-[#c5a059] underline">+92 42 3578 9000</a><br />
              Event Concierge: <a href="tel:+923001234567" className="hover:text-[#c5a059] underline">+92 300 1234567</a>
            </p>
            <p className="text-[11px] text-emerald-400 font-medium">Lines open 10:00 AM – 11:00 PM</p>
          </div>

          <div className="bg-[#131618] border border-[#262c31] rounded-2xl p-6 text-center space-y-3 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-[#1b2024] border border-stone-700 flex items-center justify-center text-[#c5a059] mx-auto">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Dining Hours</h3>
            <div className="text-xs text-stone-300 space-y-1">
              <p>Mon – Thu: 11:00 AM – 11:00 PM</p>
              <p>Fri – Sat: 11:00 AM – 12:00 AM</p>
              <p>Sun: 11:00 AM – 10:00 PM</p>
            </div>
          </div>
        </div>

        {/* Contact Form & Location Map Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-[#131618] border border-[#262c31] rounded-3xl p-6 sm:p-10 shadow-2xl">
            {isSent ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">Message Dispatched</h3>
                <p className="text-xs text-stone-300 max-w-sm mx-auto">
                  Thank you for writing to Five Star Continental Kitchen. Our guest relations director will respond shortly.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="px-6 py-2 rounded-xl bg-stone-800 text-stone-200 text-xs font-semibold cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs text-left">
                <div>
                  <span className="text-[10px] tracking-[0.25em] text-[#c5a059] font-bold uppercase block mb-1">
                    DIRECT INQUIRY
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white">Send Us a Message</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-[#181d20] border border-stone-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#c5a059] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 font-medium mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-[#181d20] border border-stone-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#c5a059] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1.5">Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Table reservation question, private event, menu inquiry"
                    className="w-full bg-[#181d20] border border-stone-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#c5a059] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1.5">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How may our hospitality team assist you?"
                    className="w-full bg-[#181d20] border border-stone-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#c5a059] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-xl transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Interactive Map & Address Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#131618] border border-[#262c31] rounded-3xl p-6 shadow-2xl overflow-hidden">
              <h3 className="font-serif text-lg font-bold text-white mb-3">Restaurant Location & Map</h3>
              
              {/* Simulated Map Display */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-stone-800 bg-[#0e1215]">
                {/* Background map tile graphic */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Pin in center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="relative">
                    <span className="w-12 h-12 rounded-full bg-[#c5a059]/30 animate-ping absolute -inset-2" />
                    <div className="w-10 h-10 rounded-full bg-[#c5a059] text-black flex items-center justify-center font-bold shadow-2xl relative z-10">
                      <MapPin className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-3 bg-black/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-stone-700 text-center shadow-xl">
                    <p className="font-serif text-xs font-bold text-white">Five Star Continental</p>
                    <p className="text-[10px] text-[#c5a059]">Gulberg III, Main Boulevard</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#202529] flex items-center justify-between text-xs text-stone-300">
                <span>Coordinates: 31.5204° N, 74.3587° E</span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#c5a059] hover:underline font-semibold"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="bg-[#131618] border border-[#262c31] rounded-3xl p-6 shadow-2xl space-y-3">
              <h3 className="font-serif text-lg font-bold text-white mb-2">Frequently Asked Questions</h3>
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border-b border-[#202529] pb-3 last:border-b-0">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left text-xs font-semibold text-stone-200 hover:text-[#c5a059] py-1 cursor-pointer transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-[#c5a059]" /> : <ChevronDown className="w-4 h-4 text-stone-500" />}
                    </button>
                    {isOpen && (
                      <p className="text-xs text-stone-400 font-light mt-2 leading-relaxed animate-in fade-in">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
