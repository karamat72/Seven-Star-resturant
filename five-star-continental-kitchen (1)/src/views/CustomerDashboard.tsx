import React, { useState } from 'react';
import { 
  User, 
  ShoppingBag, 
  Calendar, 
  Heart, 
  Star, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  LogOut,
  MapPin,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OrderStatus } from '../types';

export const CustomerDashboard: React.FC = () => {
  const { 
    currentUser, 
    orders, 
    reservations, 
    cancelReservation, 
    favorites, 
    menuItems, 
    addToCart, 
    reviews, 
    logout, 
    loginAs,
    navigateTo 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'reservations' | 'favorites' | 'reviews'>('orders');

  const myOrders = orders.filter(
    (o) => o.customerInfo.email.toLowerCase() === (currentUser.email || '').toLowerCase() || o.customerInfo.name === currentUser.name
  );

  const myReservations = reservations.filter(
    (r) => r.guestEmail.toLowerCase() === (currentUser.email || '').toLowerCase() || r.guestName === currentUser.name
  );

  const favoriteDishes = menuItems.filter((d) => favorites.includes(d.id));

  const myReviews = reviews.filter(
    (r) => r.authorEmail.toLowerCase() === (currentUser.email || '').toLowerCase() || r.authorName === currentUser.name
  );

  const getOrderStatusStep = (status: OrderStatus) => {
    switch (status) {
      case 'confirmed': return 1;
      case 'preparing': return 2;
      case 'cooking': return 3;
      case 'out-for-delivery':
      case 'ready-for-pickup': return 4;
      case 'served':
      case 'completed': return 5;
      default: return 1;
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-white pt-8 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Card Header */}
        <div className="bg-[#131618] border border-[#24292e] rounded-2xl p-6 sm:p-8 mb-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#1b2024] border-2 border-[#c5a059] flex items-center justify-center text-[#c5a059] shadow-lg">
              <User className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {currentUser.name}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#c5a059]/20 text-[#c5a059] px-2.5 py-0.5 rounded-full border border-[#c5a059]/40">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">{currentUser.email || 'guest@dining.com'}</p>
              {currentUser.phone && <p className="text-xs text-stone-400">{currentUser.phone}</p>}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => loginAs('admin')}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-[#c5a059] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-700"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Dashboard</span>
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-rose-950/60 text-stone-300 hover:text-rose-400 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-700"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-[#202529]">
          {[
            { id: 'orders', label: 'My Orders', count: myOrders.length, icon: ShoppingBag },
            { id: 'reservations', label: 'Table Bookings', count: myReservations.length, icon: Calendar },
            { id: 'favorites', label: 'Saved Dishes', count: favoriteDishes.length, icon: Heart },
            { id: 'reviews', label: 'My Reviews', count: myReviews.length, icon: Star },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#c5a059] text-black shadow-md'
                    : 'bg-[#15191c] text-stone-300 hover:bg-[#1f2428] hover:text-white border border-stone-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-black/20 text-black' : 'bg-stone-800 text-stone-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {myOrders.length === 0 ? (
              <div className="bg-[#121517] border border-stone-800 rounded-2xl p-12 text-center space-y-4">
                <ShoppingBag className="w-12 h-12 text-stone-600 mx-auto" />
                <h3 className="font-serif text-xl font-bold text-white">No Dining Orders Yet</h3>
                <p className="text-xs text-stone-400 max-w-sm mx-auto">
                  Experience our artisan pastas, steaks, and wood-fired pizzas delivered hot or prepared for your table.
                </p>
                <button
                  onClick={() => navigateTo('menu')}
                  className="px-6 py-2.5 rounded-full bg-[#c5a059] text-black font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Order Delicacies Now
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {myOrders.map((order) => {
                  const step = getOrderStatusStep(order.status);
                  return (
                    <div
                      key={order.id}
                      className="bg-[#131618] border border-[#262c31] rounded-2xl p-6 space-y-5 shadow-xl"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#202529]">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-bold text-[#c5a059]">
                              {order.orderNumber}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-800 px-2.5 py-0.5 rounded text-stone-300">
                              {order.orderType}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-400 mt-0.5">
                            Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="font-sans text-base font-bold text-white block">
                            PKR {order.total.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-emerald-400 uppercase font-semibold">
                            {order.paymentStatus} via {order.paymentMethod}
                          </span>
                        </div>
                      </div>

                      {/* Visual Status Tracker Bar */}
                      <div className="py-2">
                        <div className="flex items-center justify-between text-[11px] font-medium text-stone-400 mb-2">
                          <span className={step >= 1 ? 'text-[#c5a059] font-bold' : ''}>1. Received</span>
                          <span className={step >= 2 ? 'text-[#c5a059] font-bold' : ''}>2. Preparing</span>
                          <span className={step >= 3 ? 'text-[#c5a059] font-bold' : ''}>3. Kitchen Hearth</span>
                          <span className={step >= 4 ? 'text-[#c5a059] font-bold' : ''}>4. Out / Ready</span>
                          <span className={step >= 5 ? 'text-emerald-400 font-bold' : ''}>5. Completed</span>
                        </div>
                        <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden flex">
                          <div
                            className="bg-gradient-to-r from-[#c5a059] to-[#e5c07b] h-full transition-all duration-500"
                            style={{ width: `${(step / 5) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
                        {order.items.map((it) => (
                          <div key={it.id} className="flex items-center gap-2.5 bg-[#181d20] p-2.5 rounded-xl border border-stone-800">
                            <img src={it.menuItem.image} alt={it.menuItem.name} className="w-10 h-10 rounded-lg object-cover" />
                            <div className="text-xs truncate">
                              <p className="font-bold text-white truncate">{it.menuItem.name}</p>
                              <p className="text-stone-400 text-[10px]">Qty: {it.quantity} • PKR {(it.menuItem.price * it.quantity).toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab Content 2: Table Bookings */}
        {activeTab === 'reservations' && (
          <div className="space-y-4">
            {myReservations.length === 0 ? (
              <div className="bg-[#121517] border border-stone-800 rounded-2xl p-12 text-center space-y-4">
                <Calendar className="w-12 h-12 text-stone-600 mx-auto" />
                <h3 className="font-serif text-xl font-bold text-white">No Table Reservations Found</h3>
                <p className="text-xs text-stone-400 max-w-sm mx-auto">
                  Reserve a table for romantic dinners, family gatherings, or celebration events.
                </p>
                <button
                  onClick={() => navigateTo('reservations')}
                  className="px-6 py-2.5 rounded-full bg-[#c5a059] text-black font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Reserve a Table
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myReservations.map((res) => (
                  <div
                    key={res.id}
                    className="bg-[#14171a] border border-[#262c31] rounded-2xl p-5 space-y-4 shadow-xl"
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

        {/* Tab Content 3: Favorites */}
        {activeTab === 'favorites' && (
          <div>
            {favoriteDishes.length === 0 ? (
              <div className="bg-[#121517] border border-stone-800 rounded-2xl p-12 text-center space-y-4">
                <Heart className="w-12 h-12 text-stone-600 mx-auto" />
                <h3 className="font-serif text-xl font-bold text-white">No Favorite Dishes Saved</h3>
                <p className="text-xs text-stone-400 max-w-sm mx-auto">
                  Browse our menu and click the heart icon on any dish to bookmark your favorites.
                </p>
                <button
                  onClick={() => navigateTo('menu')}
                  className="px-6 py-2.5 rounded-full bg-[#c5a059] text-black font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteDishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="bg-[#14171a] border border-[#262c31] rounded-2xl p-4 flex gap-3 group"
                  >
                    <img src={dish.image} alt={dish.name} className="w-20 h-20 rounded-xl object-cover bg-stone-900" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif text-sm font-bold text-white line-clamp-1">{dish.name}</h4>
                        <p className="text-[10px] text-stone-400 line-clamp-1">{dish.tagline}</p>
                        <p className="text-xs font-bold text-[#c5a059] mt-1 font-sans">PKR {dish.price.toLocaleString()}</p>
                      </div>

                      <button
                        onClick={() => addToCart(dish, 1)}
                        className="self-start mt-2 px-3 py-1 rounded-lg bg-[#1a2024] hover:bg-[#c5a059] text-stone-200 hover:text-black border border-stone-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content 4: Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {myReviews.length === 0 ? (
              <div className="bg-[#121517] border border-stone-800 rounded-2xl p-12 text-center space-y-4">
                <Star className="w-12 h-12 text-stone-600 mx-auto" />
                <h3 className="font-serif text-xl font-bold text-white">No Reviews Submitted</h3>
                <p className="text-xs text-stone-400 max-w-sm mx-auto">
                  Share your impressions on our dishes and ambience to guide other diners.
                </p>
                <button
                  onClick={() => navigateTo('home')}
                  className="px-6 py-2.5 rounded-full bg-[#c5a059] text-black font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Visit Homepage to Review
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myReviews.map((rev) => (
                  <div key={rev.id} className="bg-[#14171a] border border-stone-800 rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-[#c5a059]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-stone-700'}`} />
                        ))}
                      </div>
                      <span className="text-[10px] text-stone-500">{rev.date}</span>
                    </div>
                    {rev.dishName && <p className="text-xs text-[#c5a059] font-medium">{rev.dishName}</p>}
                    <p className="text-xs text-stone-300 italic">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
