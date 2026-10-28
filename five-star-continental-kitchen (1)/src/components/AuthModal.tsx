import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Sparkles,
  ArrowRight 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authMode, 
    setAuthMode, 
    setCurrentUser, 
    showToast,
    loginAs
  } = useApp();

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (authMode === 'login') {
        const isAdmin = email.toLowerCase().includes('admin') || email.toLowerCase().includes('chef');
        setCurrentUser({
          id: `usr-${Date.now()}`,
          name: isAdmin ? 'Chef Marco (Admin)' : (email.split('@')[0] || 'Five Star Diner'),
          email: email.trim(),
          role: isAdmin ? 'admin' : 'customer',
          favorites: ['dish-1', 'dish-4']
        });
        showToast(`Welcome back, ${isAdmin ? 'Admin' : 'Diner'}!`, 'success');
        setIsAuthModalOpen(false);
      } else if (authMode === 'signup') {
        setCurrentUser({
          id: `usr-${Date.now()}`,
          name: name.trim() || 'New Diner',
          email: email.trim(),
          phone: phone.trim(),
          role: 'customer',
          favorites: []
        });
        showToast('Account created successfully! Welcome to Five Star.', 'success');
        setIsAuthModalOpen(false);
      } else {
        showToast(`Password reset link dispatched to ${email}`, 'info');
        setAuthMode('login');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div 
        className="bg-[#14171a] border border-[#2b3137] w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full border border-[#c5a059]/40 bg-[#1b2024] flex items-center justify-center mx-auto mb-3 text-[#c5a059]">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            {authMode === 'login' && 'Welcome to Five Star'}
            {authMode === 'signup' && 'Create Your Account'}
            {authMode === 'forgot' && 'Reset Your Password'}
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            {authMode === 'login' && 'Sign in to track orders, manage reservations & earn dining rewards.'}
            {authMode === 'signup' && 'Join Five Star for exclusive dining perks and express checkout.'}
            {authMode === 'forgot' && 'Enter your registered email and we will send you a reset link.'}
          </p>
        </div>

        {/* Quick Demo Account Shortcuts */}
        <div className="bg-[#1b2024] border border-[#2a3036] rounded-xl p-3 mb-6">
          <p className="text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-2">
            Instant Demo Logins:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                loginAs('customer');
                setIsAuthModalOpen(false);
              }}
              className="py-1.5 px-2 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>Customer Demo</span>
            </button>
            <button
              type="button"
              onClick={() => {
                loginAs('admin');
                setIsAuthModalOpen(false);
              }}
              className="py-1.5 px-2 bg-amber-950/60 hover:bg-amber-900/60 border border-amber-700/50 text-amber-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {authMode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Daniyal Khan"
                  className="w-full bg-[#1c2226] border border-stone-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:border-[#c5a059] focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#1c2226] border border-stone-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:border-[#c5a059] focus:outline-none"
              />
            </div>
          </div>

          {authMode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 300 1234567"
                  className="w-full bg-[#1c2226] border border-stone-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:border-[#c5a059] focus:outline-none"
                />
              </div>
            </div>
          )}

          {authMode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-stone-300">Password</label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    className="text-[11px] text-[#c5a059] hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#1c2226] border border-stone-700 rounded-xl pl-9 pr-10 py-2.5 text-xs text-white focus:border-[#c5a059] focus:outline-none"
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
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              {loading ? (
                <span>Processing...</span>
              ) : (
                <>
                  <span>
                    {authMode === 'login' && 'Sign In to Account'}
                    {authMode === 'signup' && 'Create Account'}
                    {authMode === 'forgot' && 'Send Reset Link'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Switch Between Modes */}
        <div className="mt-6 text-center text-xs text-stone-400 border-t border-[#23282c] pt-4">
          {authMode === 'login' ? (
            <p>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className="text-[#c5a059] font-semibold hover:underline ml-1 cursor-pointer"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="text-[#c5a059] font-semibold hover:underline ml-1 cursor-pointer"
              >
                Sign In
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
