import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  DollarSign, 
  ShoppingBag, 
  Calendar, 
  UtensilsCrossed, 
  Star, 
  Plus, 
  Trash2, 
  Edit3, 
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  UserCheck,
  Lock,
  Phone,
  Mail,
  MapPin,
  Clock,
  Eye,
  Key
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CategoryType, MenuItem, OrderStatus, ReservationStatus } from '../types';
import { CATEGORIES } from '../data/menuData';

export const AdminDashboard: React.FC = () => {
  const { 
    currentUser, 
    menuItems, 
    addMenuItem, 
    updateMenuItem, 
    deleteMenuItem, 
    toggleStock, 
    orders, 
    updateOrderStatus, 
    reservations, 
    updateReservationStatus, 
    reviews, 
    approveReview, 
    rejectReview,
    loginAs,
    loginAdmin,
    showToast 
  } = useApp();

  const [adminTab, setAdminTab] = useState<'overview' | 'orders' | 'reservations' | 'menu' | 'reviews'>('overview');
  
  // Order search and filter
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | OrderStatus>('all');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<any | null>(null);

  // Reservation search
  const [reservationSearchQuery, setReservationSearchQuery] = useState('');
  const [reservationStatusFilter, setReservationStatusFilter] = useState<'all' | ReservationStatus>('all');

  // Menu Item Editor Modal state
  const [isAddDishOpen, setIsAddDishOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<MenuItem | null>(null);

  const [dishName, setDishName] = useState('');
  const [dishCategory, setDishCategory] = useState<CategoryType>('Pasta');
  const [dishPrice, setDishPrice] = useState(520);
  const [dishDescription, setDishDescription] = useState('');
  const [dishImage, setDishImage] = useState('https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=800&q=80');
  const [dishTagline, setDishTagline] = useState('Chef Special');
  const [isSignature, setIsSignature] = useState(false);

  // Login form for unauthorized view
  const [unauthPassword, setUnauthPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
      if (orderSearchQuery.trim()) {
        const q = orderSearchQuery.toLowerCase();
        const matchesNum = o.orderNumber.toLowerCase().includes(q);
        const matchesName = o.customerInfo.name.toLowerCase().includes(q);
        const matchesPhone = o.customerInfo.phone.toLowerCase().includes(q);
        const matchesDish = o.items.some((it: any) => it.menuItem.name.toLowerCase().includes(q));
        if (!matchesNum && !matchesName && !matchesPhone && !matchesDish) return false;
      }
      return true;
    });
  }, [orders, orderStatusFilter, orderSearchQuery]);

  // Filtered Reservations
  const filteredReservations = useMemo(() => {
    return reservations.filter((r) => {
      if (reservationStatusFilter !== 'all' && r.status !== reservationStatusFilter) return false;
      if (reservationSearchQuery.trim()) {
        const q = reservationSearchQuery.toLowerCase();
        const matchesRef = r.referenceNumber.toLowerCase().includes(q);
        const matchesName = r.guestName.toLowerCase().includes(q);
        const matchesPhone = r.guestPhone.toLowerCase().includes(q);
        if (!matchesRef && !matchesName && !matchesPhone) return false;
      }
      return true;
    });
  }, [reservations, reservationStatusFilter, reservationSearchQuery]);

  // Statistics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const pendingOrders = orders.filter((o) => o.status !== 'completed' && o.status !== 'cancelled').length;
  const todayReservations = reservations.filter((r) => r.status === 'confirmed').length;

  const handleOpenAddModal = (dish?: MenuItem) => {
    if (dish) {
      setEditingDish(dish);
      setDishName(dish.name);
      setDishCategory(dish.category);
      setDishPrice(dish.price);
      setDishDescription(dish.description);
      setDishImage(dish.image);
      setDishTagline(dish.tagline || '');
      setIsSignature(!!dish.isSignature);
    } else {
      setEditingDish(null);
      setDishName('');
      setDishCategory('Pasta');
      setDishPrice(650);
      setDishDescription('Authentic continental recipe crafted with imported ingredients.');
      setDishImage('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80');
      setDishTagline('House Specialty');
      setIsSignature(false);
    }
    setIsAddDishOpen(true);
  };

  const handleSaveDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dishName.trim()) return;

    if (editingDish) {
      updateMenuItem(editingDish.id, {
        name: dishName.trim(),
        category: dishCategory,
        price: Number(dishPrice),
        description: dishDescription.trim(),
        image: dishImage.trim(),
        tagline: dishTagline.trim(),
        isSignature
      });
    } else {
      addMenuItem({
        name: dishName.trim(),
        category: dishCategory,
        price: Number(dishPrice),
        description: dishDescription.trim(),
        image: dishImage.trim(),
        tagline: dishTagline.trim(),
        rating: 5.0,
        reviewsCount: 1,
        inStock: true,
        isSignature,
        allergens: ['Dairy'],
        ingredients: ['Chef Selection', 'Artisan Seasonings']
      });
    }

    setIsAddDishOpen(false);
  };

  const handleUnauthorizedLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    await loginAdmin(unauthPassword, 'admin@fivestar.com');
    setIsLoggingIn(false);
  };

  // If user is not admin, show secure login prompt
  if (currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#0c0d0e] text-white flex items-center justify-center p-4">
        <div className="bg-[#121517] border border-stone-800 rounded-2xl p-8 max-w-md w-full shadow-2xl text-center space-y-5">
          <div className="w-14 h-14 rounded-full bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center mx-auto text-[#c5a059]">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-white">Administrator Access Required</h2>
            <p className="text-xs text-stone-400 mt-1">
              Please authenticate with your management account credentials.
            </p>
          </div>

          <div className="bg-[#191e23] border border-stone-700/80 rounded-xl p-3 text-left text-xs space-y-1">
            <p className="text-[10px] text-[#c5a059] font-bold uppercase tracking-wider flex items-center gap-1">
              <Key className="w-3 h-3" /> System Credentials
            </p>
            <p className="text-stone-300 font-mono text-[11px]">User: <strong className="text-white">admin@fivestar.com</strong></p>
            <p className="text-stone-300 font-mono text-[11px]">Pass: <strong className="text-[#c5a059]">Bellagio#Admin2026!FiveStar</strong></p>
          </div>

          <form onSubmit={handleUnauthorizedLogin} className="space-y-3 text-left">
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1">Enter Admin Password</label>
              <input
                type="password"
                required
                value={unauthPassword}
                onChange={(e) => setUnauthPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#181d21] border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#c5a059] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              {isLoggingIn ? 'Verifying...' : 'Unlock Admin Panel'}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setUnauthPassword('SevenStar@RoyalHearth2026!')}
            className="text-[11px] text-stone-400 hover:text-white underline cursor-pointer"
          >
            Auto-fill secure admin password
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-white pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header Banner */}
        <div className="bg-gradient-to-r from-[#171c19] via-[#121614] to-[#161a1d] border border-[#2b362f] rounded-2xl p-6 sm:p-8 mb-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center text-[#c5a059] shadow-lg">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  SEVEN STAR Operations Portal
                </h1>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Live Database Connected
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">
                Authenticated Admin: <strong className="text-white">bellagioadmin</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => loginAs('customer')}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer border border-stone-700 flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4 text-[#c5a059]" />
              <span>Switch to Customer View</span>
            </button>
          </div>
        </div>

        {/* Admin Nav Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#202529]">
          {[
            { id: 'overview', label: 'Overview & KPIs', icon: Sparkles },
            { id: 'orders', label: `Customer Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'reservations', label: `Table Bookings (${reservations.length})`, icon: Calendar },
            { id: 'menu', label: `Menu Dishes (${menuItems.length})`, icon: UtensilsCrossed },
            { id: 'reviews', label: `Reviews Moderation (${reviews.length})`, icon: Star },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#c5a059] text-black shadow-md font-bold'
                    : 'bg-[#15191c] text-stone-300 hover:bg-[#1f2428] hover:text-white border border-stone-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview & KPIs */}
        {adminTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-[#14171a] border border-[#252a2f] p-5 rounded-2xl shadow-xl flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-stone-400 uppercase tracking-widest font-medium">Total Sales</p>
                  <p className="font-sans text-2xl font-bold text-white mt-1">₹{totalRevenue.toLocaleString()}</p>
                  <span className="text-[10px] text-emerald-400 font-semibold">Processed Orders</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-[#14171a] border border-[#252a2f] p-5 rounded-2xl shadow-xl flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-stone-400 uppercase tracking-widest font-medium">Active Orders</p>
                  <p className="font-sans text-2xl font-bold text-white mt-1">{pendingOrders} In Progress</p>
                  <span className="text-[10px] text-amber-400 font-semibold">Kitchen Queue</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <ShoppingBag className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-[#14171a] border border-[#252a2f] p-5 rounded-2xl shadow-xl flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-stone-400 uppercase tracking-widest font-medium">Table Bookings</p>
                  <p className="font-sans text-2xl font-bold text-white mt-1">{todayReservations} Confirmed</p>
                  <span className="text-[10px] text-[#c5a059] font-semibold">Seated guests</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#c5a059]/10 border border-[#c5a059]/20 flex items-center justify-center text-[#c5a059]">
                  <Calendar className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-[#14171a] border border-[#252a2f] p-5 rounded-2xl shadow-xl flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-stone-400 uppercase tracking-widest font-medium">Dishes Catalog</p>
                  <p className="font-sans text-2xl font-bold text-white mt-1">{menuItems.length} Recipes</p>
                  <span className="text-[10px] text-stone-400">{menuItems.filter(m => m.inStock).length} in stock</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300">
                  <UtensilsCrossed className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Recent Orders Overview */}
            <div className="bg-[#131618] border border-[#262c31] rounded-2xl p-6 space-y-4 shadow-xl text-left">
              <div className="flex items-center justify-between border-b border-[#202529] pb-3">
                <h3 className="font-serif text-lg font-bold text-white">Live Kitchen Pipeline</h3>
                <button
                  onClick={() => setAdminTab('orders')}
                  className="text-xs text-[#c5a059] hover:underline cursor-pointer"
                >
                  Manage All Orders →
                </button>
              </div>

              <div className="space-y-3">
                {orders.slice(0, 4).map((o) => (
                  <div key={o.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#181d20] p-4 rounded-xl border border-stone-800 gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#c5a059]">{o.orderNumber}</span>
                        <span className="text-white font-semibold">{o.customerInfo.name}</span>
                        <span className="text-[10px] uppercase font-bold bg-stone-800 px-2 py-0.5 rounded text-stone-300">
                          {o.orderType}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-400 mt-1">
                        {o.items.map((it: any) => `${it.quantity}x ${it.menuItem.name}`).join(', ')}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-bold text-white">₹{o.total.toLocaleString()}</span>
                      <span className="bg-[#242b30] text-[#c5a059] px-2.5 py-1 rounded-full text-[10px] font-bold uppercase">
                        {o.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Orders Search & Management */}
        {adminTab === 'orders' && (
          <div className="space-y-5 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">Customer Orders Management</h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  View full customer details, ordered items, prices, payment status, and update kitchen progress.
                </p>
              </div>
              <span className="text-xs bg-[#191e22] border border-stone-800 px-3 py-1.5 rounded-xl text-stone-300 font-mono">
                {filteredOrders.length} of {orders.length} orders
              </span>
            </div>

            {/* Search and Filters Bar */}
            <div className="bg-[#131618] border border-[#262c31] p-4 rounded-2xl flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between shadow-lg">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  placeholder="Search by customer name, order #, phone, or dish name..."
                  className="w-full bg-[#1b2024] border border-stone-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400">Status:</span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value as any)}
                  className="bg-[#1b2024] border border-stone-700 text-xs text-white rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="preparing">Preparing</option>
                  <option value="cooking">Cooking</option>
                  <option value="out-for-delivery">Out for Delivery</option>
                  <option value="ready-for-pickup">Ready for Pickup</option>
                  <option value="served">Served</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div className="bg-[#131618] border border-stone-800 rounded-2xl p-12 text-center text-stone-400 text-xs">
                No orders match your search criteria.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-[#131618] border border-[#262c31] rounded-2xl p-5 space-y-4 shadow-xl"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#202529]">
                      
                      {/* Left: Order # and Customer details */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-[#c5a059]">{order.orderNumber}</span>
                          <span className="text-[10px] uppercase font-bold bg-stone-800 px-2 py-0.5 rounded text-stone-300">
                            {order.orderType}
                          </span>
                          {order.tableNumber && (
                            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
                              {order.tableNumber}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-300 pt-1">
                          <span className="font-bold text-white flex items-center gap-1">
                            {order.customerInfo.name}
                          </span>
                          <span className="flex items-center gap-1 text-stone-400">
                            <Phone className="w-3 h-3 text-[#c5a059]" /> {order.customerInfo.phone}
                          </span>
                          <span className="flex items-center gap-1 text-stone-400">
                            <Mail className="w-3 h-3 text-[#c5a059]" /> {order.customerInfo.email}
                          </span>
                        </div>

                        {order.deliveryAddress && (
                          <p className="text-[11px] text-stone-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-[#c5a059]" />
                            {order.deliveryAddress.street}, {order.deliveryAddress.area}, {order.deliveryAddress.city}
                          </p>
                        )}
                        <p className="text-[10px] text-stone-500 mt-0.5">
                          Ordered on: {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>

                      {/* Right: Payment Status & Live Status Selector */}
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="text-right">
                          <p className="font-sans font-bold text-white text-base">₹{order.total.toLocaleString()}</p>
                          <span className={`text-[10px] font-bold uppercase ${
                            order.paymentStatus === 'paid' ? 'text-emerald-400' : 'text-amber-400'
                          }`}>
                            {order.paymentStatus} via {order.paymentMethod}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-stone-400">Order Status:</span>
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className="bg-[#1b2024] border border-[#c5a059]/60 text-[#c5a059] text-xs font-bold rounded-xl px-3 py-2 cursor-pointer focus:outline-none"
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="preparing">Preparing</option>
                            <option value="cooking">Cooking</option>
                            <option value="out-for-delivery">Out for Delivery</option>
                            <option value="ready-for-pickup">Ready for Pickup</option>
                            <option value="served">Served</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                    </div>

                    {/* Ordered Items with itemized prices */}
                    <div className="space-y-2">
                      <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Ordered Items ({order.items.length})
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {order.items.map((it: any) => (
                          <div
                            key={it.id}
                            className="bg-[#181d20] p-2.5 rounded-xl border border-stone-800 flex items-center justify-between text-xs"
                          >
                            <div className="flex items-center gap-2.5 truncate mr-2">
                              {it.menuItem.image && (
                                <img src={it.menuItem.image} alt={it.menuItem.name} className="w-8 h-8 rounded-lg object-cover" />
                              )}
                              <div className="truncate">
                                <p className="font-bold text-white truncate">{it.menuItem.name}</p>
                                <p className="text-stone-400 text-[10px]">Qty: {it.quantity}</p>
                              </div>
                            </div>
                            <span className="font-mono text-stone-300 font-semibold whitespace-nowrap">
                              ₹{(it.menuItem.price * it.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Table Bookings */}
        {adminTab === 'reservations' && (
          <div className="space-y-5 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">Table Reservations Management</h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  Confirm table allocations, view special requests, or update reservation status.
                </p>
              </div>
              <span className="text-xs bg-[#191e22] border border-stone-800 px-3 py-1.5 rounded-xl text-stone-300 font-mono">
                {filteredReservations.length} of {reservations.length} bookings
              </span>
            </div>

            {/* Filter and Search */}
            <div className="bg-[#131618] border border-[#262c31] p-4 rounded-2xl flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between shadow-lg">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={reservationSearchQuery}
                  onChange={(e) => setReservationSearchQuery(e.target.value)}
                  placeholder="Search by reference #, guest name, or telephone..."
                  className="w-full bg-[#1b2024] border border-stone-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400">Status:</span>
                <select
                  value={reservationStatusFilter}
                  onChange={(e) => setReservationStatusFilter(e.target.value as any)}
                  className="bg-[#1b2024] border border-stone-700 text-xs text-white rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Bookings</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredReservations.map((res) => (
                <div
                  key={res.id}
                  className="bg-[#131618] border border-[#262c31] rounded-2xl p-5 space-y-4 shadow-xl"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-xs text-[#c5a059] font-bold">Ref #{res.referenceNumber}</span>
                      <h4 className="font-serif text-base font-bold text-white mt-0.5">{res.guestName}</h4>
                      <p className="text-[11px] text-stone-400">{res.guestPhone} • {res.guestEmail}</p>
                    </div>

                    <select
                      value={res.status}
                      onChange={(e) => updateReservationStatus(res.id, e.target.value as ReservationStatus)}
                      className="bg-[#181d20] border border-stone-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-[#181d20] p-3 rounded-xl border border-stone-800">
                    <div>
                      <span className="text-stone-400 block text-[10px]">Date & Time</span>
                      <strong className="text-white">{res.date} at {res.timeSlot}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Party Size</span>
                      <strong className="text-white">{res.guestsCount} Guests</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Occasion</span>
                      <strong className="text-[#c5a059]">{res.occasion}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Seating Area</span>
                      <strong className="text-white truncate block">{res.seatingPreference}</strong>
                    </div>
                  </div>

                  {res.specialRequests && (
                    <p className="text-[11px] text-stone-400 italic">
                      Special Request: "{res.specialRequests}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Menu Dishes Management */}
        {adminTab === 'menu' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between pb-2">
              <h3 className="font-serif text-xl font-bold text-white">Dishes Catalog</h3>
              <button
                onClick={() => handleOpenAddModal()}
                className="px-4 py-2 rounded-xl bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Dish</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.map((dish) => (
                <div
                  key={dish.id}
                  className="bg-[#131618] border border-[#262c31] rounded-2xl p-4 flex flex-col justify-between space-y-3"
                >
                  <div className="flex gap-3">
                    <img src={dish.image} alt={dish.name} className="w-20 h-20 rounded-xl object-cover bg-stone-900 flex-shrink-0" />
                    <div className="flex-1 truncate">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] bg-stone-800 text-[#c5a059] px-2 py-0.5 rounded uppercase font-semibold">
                          {dish.category}
                        </span>
                        {dish.isSignature && (
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                            Signature
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif text-sm font-bold text-white truncate">{dish.name}</h4>
                      <p className="text-xs font-bold text-white mt-1">₹{dish.price.toLocaleString()}</p>
                    </div>
                  </div>

                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {dish.description}
                  </p>

                  <div className="pt-3 border-t border-[#1f2529] flex items-center justify-between text-xs">
                    <button
                      onClick={() => toggleStock(dish.id)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold uppercase transition-colors cursor-pointer ${
                        dish.inStock
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                          : 'bg-rose-950/60 text-rose-400 border border-rose-800'
                      }`}
                    >
                      {dish.inStock ? 'In Stock' : 'Out of Stock'}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenAddModal(dish)}
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white cursor-pointer"
                        title="Edit Dish"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteMenuItem(dish.id)}
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-rose-900/60 text-stone-300 hover:text-rose-400 cursor-pointer"
                        title="Delete Dish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Reviews Moderation */}
        {adminTab === 'reviews' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between pb-2">
              <h3 className="font-serif text-xl font-bold text-white">Customer Reviews Moderation</h3>
              <span className="text-xs text-stone-400">{reviews.length} reviews total</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-[#131618] border border-[#262c31] rounded-2xl p-5 space-y-3 shadow-xl"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                        alt={rev.authorName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xs font-bold text-white">{rev.authorName}</p>
                        <p className="text-[10px] text-stone-400">{rev.authorEmail}</p>
                      </div>
                    </div>

                    <div className="flex items-center text-[#c5a059]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-stone-700'}`} />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-stone-300 italic leading-relaxed">
                    "{rev.comment}"
                  </p>

                  <div className="pt-2 border-t border-[#1f2529] flex items-center justify-between text-xs">
                    <span className={`text-[10px] font-bold uppercase ${rev.isApproved ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {rev.isApproved ? 'Approved & Visible' : 'Pending Review'}
                    </span>

                    <div className="flex items-center gap-2">
                      {!rev.isApproved && (
                        <button
                          onClick={() => approveReview(rev.id)}
                          className="px-3 py-1 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => rejectReview(rev.id)}
                        className="px-3 py-1 bg-rose-950/60 hover:bg-rose-900 border border-rose-700 text-rose-300 rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add / Edit Dish Modal */}
        {isAddDishOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-[#14171a] border border-stone-700 w-full max-w-lg rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <h3 className="font-serif text-2xl font-bold text-white mb-4">
                {editingDish ? 'Edit Menu Dish' : 'Add New Gourmet Dish'}
              </h3>

              <form onSubmit={handleSaveDish} className="space-y-4 text-xs text-left">
                <div>
                  <label className="block text-stone-300 font-medium mb-1">Dish Name *</label>
                  <input
                    type="text"
                    required
                    value={dishName}
                    onChange={(e) => setDishName(e.target.value)}
                    className="w-full bg-[#1b2024] border border-stone-700 rounded-lg px-3 py-2 text-white focus:border-[#c5a059] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Category</label>
                    <select
                      value={dishCategory}
                      onChange={(e) => setDishCategory(e.target.value as CategoryType)}
                      className="w-full bg-[#1b2024] border border-stone-700 rounded-lg px-3 py-2 text-white focus:border-[#c5a059] focus:outline-none"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id} className="bg-[#1b2024]">{cat.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Price (₹) *</label>
                    <input
                      type="number"
                      required
                      min={10}
                      value={dishPrice}
                      onChange={(e) => setDishPrice(Number(e.target.value))}
                      className="w-full bg-[#1b2024] border border-stone-700 rounded-lg px-3 py-2 text-white focus:border-[#c5a059] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">Tagline</label>
                  <input
                    type="text"
                    value={dishTagline}
                    onChange={(e) => setDishTagline(e.target.value)}
                    placeholder="e.g. Rich, Creamy, Irresistible"
                    className="w-full bg-[#1b2024] border border-stone-700 rounded-lg px-3 py-2 text-white focus:border-[#c5a059] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">Food Photography URL</label>
                  <input
                    type="url"
                    required
                    value={dishImage}
                    onChange={(e) => setDishImage(e.target.value)}
                    className="w-full bg-[#1b2024] border border-stone-700 rounded-lg px-3 py-2 text-white focus:border-[#c5a059] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={dishDescription}
                    onChange={(e) => setDishDescription(e.target.value)}
                    className="w-full bg-[#1b2024] border border-stone-700 rounded-lg px-3 py-2 text-white focus:border-[#c5a059] focus:outline-none resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="isSignature"
                    checked={isSignature}
                    onChange={(e) => setIsSignature(e.target.checked)}
                    className="w-4 h-4 rounded text-[#c5a059] focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="isSignature" className="text-stone-300 cursor-pointer">
                    Feature as Signature Dish on Homepage
                  </label>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddDishOpen(false)}
                    className="flex-1 py-2.5 rounded-xl bg-stone-800 text-stone-300 font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Save Dish
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
