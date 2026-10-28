import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Key
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminLoginModal: React.FC = () => {
  const { 
    isAdminLoginModalOpen, 
    setIsAdminLoginModalOpen, 
    loginAdmin, 
    showToast 
  } = useApp();

  const [username, setUsername] = useState('bellagioadmin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isAdminLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMessage('Please enter your administrator password.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    const res = await loginAdmin(password.trim(), username.trim());
    setLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleAutofillSetup = () => {
    setUsername('bellagioadmin');
    setPassword('SevenStar@RoyalHearth2026!');
    showToast('Admin credentials filled', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div 
        className="bg-[#121517] border border-[#2e353c] w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 relative text-left animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAdminLoginModalOpen(false)}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Crest */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full border border-[#c5a059] bg-[#1a1e22] flex items-center justify-center mx-auto mb-3 text-[#c5a059] shadow-lg">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-[#c5a059] uppercase block font-bold">
            SEVEN STAR RESTAURANT PORTAL
          </span>
          <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
            Admin Management Login
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            Access live customer orders, table reservations, and culinary operations.
          </p>
        </div>

        {/* Secure Admin Setup Notice */}
        <div className="bg-[#191e23] border border-[#2b333c] rounded-xl p-3.5 mb-5 text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-wider flex items-center gap-1">
              <Key className="w-3 h-3" /> Secure Admin Credentials
            </span>
            <button
              type="button"
              onClick={handleAutofillSetup}
              className="text-[10px] bg-[#c5a059]/20 text-[#c5a059] hover:bg-[#c5a059] hover:text-black font-bold px-2 py-0.5 rounded transition-colors cursor-pointer"
            >
              1-Click Auto Fill
            </button>
          </div>
          <p className="text-stone-300 font-mono text-[11px]">
            User: <strong className="text-white">bellagioadmin</strong>
          </p>
          <p className="text-stone-300 font-mono text-[11px] truncate">
            Pass: <strong className="text-[#c5a059]">SevenStar@RoyalHearth2026!</strong>
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-xs text-red-300 mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1">
              Admin Username / Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="bellagioadmin"
                className="w-full bg-[#181d21] border border-stone-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:border-[#c5a059] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#181d21] border border-stone-700 rounded-xl pl-9 pr-10 py-2.5 text-xs text-white focus:border-[#c5a059] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl mt-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Log In to Admin Panel</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
