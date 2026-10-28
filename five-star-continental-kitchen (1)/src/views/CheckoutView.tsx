import React, { useState } from 'react';
import { 
  CreditCard, 
  Truck, 
  Utensils, 
  ShoppingBag, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  Tag, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Sparkles,
  ShieldCheck,
  Banknote
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { Order, OrderType, PaymentMethod } from '../types';

export const CheckoutView: React.FC = () => {
  const { 
    cartItems, 
    cartTotals, 
    appliedPromo, 
    applyPromoCode, 
    removePromoCode, 
    createOrder, 
    currentUser, 
    navigateTo, 
    showToast 
  } = useApp();

  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [tableNumber, setTableNumber] = useState('Table 5 (Window Booth)');
  const [streetAddress, setStreetAddress] = useState('House 42-B, Main Boulevard');
  const [area, setArea] = useState('Gulberg III');
  const [city, setCity] = useState('Lahore');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  const [customerName, setCustomerName] = useState(currentUser.name || 'Hamza Malik');
  const [customerEmail, setCustomerEmail] = useState(currentUser.email || 'hamza.malik@example.com');
  const [customerPhone, setCustomerPhone] = useState(currentUser.phone || '+92 300 1234567');

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe-card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  const [promoInput, setPromoInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (cartItems.length === 0 && !completedOrder) {
    return (
      <div className="min-h-screen bg-[#0c0d0e] text-white flex items-center justify-center p-4">
        <div className="bg-[#121517] border border-stone-800 rounded-2xl p-10 text-center max-w-md w-full space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center mx-auto text-stone-600">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-white">Your Cart is Empty</h2>
          <p className="text-xs text-stone-400">
            Please add dishes from our continental menu before proceeding to checkout.
          </p>
          <button
            onClick={() => navigateTo('menu')}
            className="px-6 py-3 rounded-full bg-[#c5a059] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#d4af37] cursor-pointer"
          >
            Explore Menu
          </button>
        </div>
      </div>
    );
  }

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromoCode(promoInput.trim());
      setPromoInput('');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim()) {
      showToast('Please complete all contact information.', 'error');
      return;
    }

    if (orderType === 'delivery' && (!streetAddress.trim() || !area.trim())) {
      showToast('Please provide your complete delivery address.', 'error');
      return;
    }

    setIsProcessing(true);

    setTimeout(async () => {
      setIsProcessing(false);

      const newOrder = await createOrder({
        items: [...cartItems],
        orderType,
        tableNumber: orderType === 'dine-in' ? tableNumber : undefined,
        deliveryAddress: orderType === 'delivery' ? {
          street: streetAddress,
          area,
          city,
          notes: deliveryNotes
        } : undefined,
        customerInfo: {
          name: customerName.trim(),
          email: customerEmail.trim(),
          phone: customerPhone.trim()
        },
        paymentMethod,
        paymentStatus: paymentMethod === 'stripe-card' ? 'paid' : 'pending',
        subtotal: cartTotals.subtotal,
        tax: cartTotals.tax,
        deliveryFee: orderType === 'delivery' ? cartTotals.deliveryFee : 0,
        discount: cartTotals.discount,
        couponCode: appliedPromo?.code,
        total: orderType === 'delivery' 
          ? cartTotals.total 
          : Math.max(0, cartTotals.total - cartTotals.deliveryFee)
      });

      setCompletedOrder(newOrder);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-white pt-8 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c5a059] uppercase block">
            SECURE CHECKOUT
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Confirm Your Dining Order
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm font-light">
            Fast, encrypted checkout for fine dining delivery, curbside takeout, or table orders.
          </p>
        </div>

        {/* Completed Order Receipt Modal */}
        {completedOrder ? (
          <div className="bg-[#131618] border border-[#c5a059]/60 rounded-2xl p-6 sm:p-10 shadow-2xl max-w-2xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#c5a059] uppercase block">
                ORDER CONFIRMED
              </span>
              <h2 className="font-serif text-3xl font-bold text-white mt-1">
                Thank You for Dining with Us!
              </h2>
              <p className="text-xs text-stone-300 mt-2">
                Your order <strong className="text-white font-mono">{completedOrder.orderNumber}</strong> has been received by Executive Chef Marco's kitchen.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-[#181d20] border border-stone-800 rounded-xl p-5 text-left text-xs space-y-3">
              <div className="flex justify-between border-b border-stone-800 pb-2">
                <span className="text-stone-400">Order Number</span>
                <span className="font-mono text-[#c5a059] font-bold">{completedOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Order Type</span>
                <span className="text-white uppercase font-bold">{completedOrder.orderType}</span>
              </div>
              {completedOrder.tableNumber && (
                <div className="flex justify-between">
                  <span className="text-stone-400">Table Number</span>
                  <span className="text-white">{completedOrder.tableNumber}</span>
                </div>
              )}
              {completedOrder.deliveryAddress && (
                <div className="flex justify-between">
                  <span className="text-stone-400">Delivery Address</span>
                  <span className="text-white text-right max-w-xs">{completedOrder.deliveryAddress.street}, {completedOrder.deliveryAddress.area}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-stone-400">Payment Status</span>
                <span className="text-emerald-400 font-bold uppercase">{completedOrder.paymentStatus} via {completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between border-t border-stone-800 pt-2 text-sm font-bold">
                <span className="text-white">Total Paid</span>
                <span className="text-[#c5a059]">PKR {completedOrder.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => navigateTo('account')}
                className="flex-1 py-3.5 rounded-xl bg-[#c5a059] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#d4af37] cursor-pointer shadow-lg"
              >
                Track in My Account
              </button>
              <button
                onClick={() => navigateTo('home')}
                className="flex-1 py-3.5 rounded-xl bg-stone-800 text-stone-200 font-bold text-xs uppercase tracking-wider hover:bg-stone-700 cursor-pointer"
              >
                Return to Home
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 cols: Checkout Details */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. Dining / Order Type Selector */}
              <div className="bg-[#121517] border border-[#262c31] rounded-2xl p-5 space-y-3">
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center text-xs">1</span>
                  Select Order Service
                </h3>

                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'delivery' as OrderType, label: 'Delivery', icon: Truck, desc: 'Hot to your doorstep' },
                    { id: 'dine-in' as OrderType, label: 'Dine-In', icon: Utensils, desc: 'Served at your table' },
                    { id: 'pickup' as OrderType, label: 'Takeout', icon: ShoppingBag, desc: 'Express pickup' },
                  ].map((service) => {
                    const Icon = service.icon;
                    const isSelected = orderType === service.id;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setOrderType(service.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#1b2024] border-[#c5a059] text-[#c5a059] shadow-md'
                            : 'bg-[#161a1d] border-stone-800 text-stone-300 hover:border-stone-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <Icon className="w-4 h-4" />
                          <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#c5a059] bg-[#c5a059]' : 'border-stone-600'
                          }`}>
                            {isSelected && <span className="w-1.5 h-1.5 bg-black rounded-full" />}
                          </span>
                        </div>
                        <p className="font-bold text-xs text-white leading-tight">{service.label}</p>
                        <p className="text-[10px] text-stone-400 mt-0.5">{service.desc}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Conditional Fields based on Order Type */}
                {orderType === 'dine-in' && (
                  <div className="mt-3 pt-3 border-t border-[#1f2529]">
                    <label className="block text-xs font-medium text-stone-300 mb-1">Select Seated Table</label>
                    <select
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full bg-[#181d20] border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:border-[#c5a059] focus:outline-none"
                    >
                      {['Table 1 (Indoor)', 'Table 3 (Central Lounge)', 'Table 5 (Window Booth)', 'Table 7 (Garden Terrace)', 'Private Suite A'].map((tbl) => (
                        <option key={tbl} value={tbl} className="bg-[#181d20]">{tbl}</option>
                      ))}
                    </select>
                  </div>
                )}

                {orderType === 'delivery' && (
                  <div className="mt-3 pt-3 border-t border-[#1f2529] space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1">Street Address</label>
                      <input
                        type="text"
                        required
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="House / Apartment #, Street name"
                        className="w-full bg-[#181d20] border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:border-[#c5a059] focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-stone-300 mb-1">Area / Sector</label>
                        <input
                          type="text"
                          required
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                          placeholder="e.g. Gulberg III, DHA Phase 5"
                          className="w-full bg-[#181d20] border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:border-[#c5a059] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-300 mb-1">City</label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full bg-[#181d20] border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:border-[#c5a059] focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1">Rider Delivery Instructions (Optional)</label>
                      <input
                        type="text"
                        value={deliveryNotes}
                        onChange={(e) => setDeliveryNotes(e.target.value)}
                        placeholder="e.g. Ring bell twice, deliver to security guard"
                        className="w-full bg-[#181d20] border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:border-[#c5a059] focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Customer Contact Information */}
              <div className="bg-[#121517] border border-[#262c31] rounded-2xl p-5 space-y-4">
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center text-xs">2</span>
                  Guest Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-[#181d20] border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:border-[#c5a059] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full bg-[#181d20] border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:border-[#c5a059] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="w-full bg-[#181d20] border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:border-[#c5a059] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Payment Method */}
              <div className="bg-[#121517] border border-[#262c31] rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center text-xs">3</span>
                    Payment Method
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                    <Lock className="w-3.5 h-3.5" />
                    <span>256-bit Encrypted</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'stripe-card' as PaymentMethod, label: 'Stripe Card (Test)', icon: CreditCard },
                    { id: 'cash-on-delivery' as PaymentMethod, label: 'Cash on Delivery', icon: Banknote },
                    { id: 'bank-transfer' as PaymentMethod, label: 'Bank / Raast', icon: ShieldCheck },
                  ].map((pay) => {
                    const Icon = pay.icon;
                    const isSelected = paymentMethod === pay.id;
                    return (
                      <button
                        key={pay.id}
                        type="button"
                        onClick={() => setPaymentMethod(pay.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#1b2024] border-[#c5a059] text-[#c5a059] shadow-md'
                            : 'bg-[#161a1d] border-stone-800 text-stone-300 hover:border-stone-700'
                        }`}
                      >
                        <Icon className="w-4 h-4 mb-2" />
                        <p className="font-bold text-xs text-white">{pay.label}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Stripe interactive card fields */}
                {paymentMethod === 'stripe-card' && (
                  <div className="bg-[#181d20] border border-stone-700/80 p-4 rounded-xl space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-300 font-semibold">Test Credit / Debit Card</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                        Stripe Sandbox Active
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] text-stone-400 mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-[#121517] border border-stone-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:border-[#c5a059] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-stone-400 mb-1">Expires (MM/YY)</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-[#121517] border border-stone-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:border-[#c5a059] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-stone-400 mb-1">CVC Security Code</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full bg-[#121517] border border-stone-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:border-[#c5a059] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right 5 cols: Order Summary & Place Order */}
            <div className="lg:col-span-5 bg-[#121517] border border-[#262c31] rounded-2xl p-6 space-y-5 sticky top-24 shadow-2xl">
              <h3 className="font-serif text-lg font-bold text-white pb-3 border-b border-[#202529]">
                Order Summary ({cartTotals.itemCount} items)
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs gap-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        className="w-10 h-10 rounded-lg object-cover bg-stone-900"
                      />
                      <div>
                        <p className="font-bold text-white line-clamp-1">{item.menuItem.name}</p>
                        <p className="text-stone-400 text-[10px]">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-sans font-semibold text-white whitespace-nowrap">
                      PKR {(item.menuItem.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Form */}
              <div className="border-t border-[#202529] pt-4">
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-800/60 p-2.5 rounded-xl text-xs">
                    <span className="text-emerald-400 font-medium">
                      Coupon <strong>{appliedPromo.code}</strong> (-{appliedPromo.discountPercent}%)
                    </span>
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-stone-400 hover:text-red-400 text-xs underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      placeholder="Promo code (FIVESTAR15)"
                      className="flex-1 bg-[#181d20] border border-stone-700 rounded-xl px-3 py-2 text-xs text-white uppercase focus:border-[#c5a059] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-4 py-2 bg-stone-800 hover:bg-[#c5a059] text-stone-200 hover:text-black rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Cost Calculations */}
              <div className="space-y-2 text-xs text-stone-400 border-t border-[#202529] pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">PKR {cartTotals.subtotal.toLocaleString()}</span>
                </div>
                {cartTotals.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>- PKR {cartTotals.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Provincial Tax / GST (16%)</span>
                  <span className="text-white font-medium">PKR {cartTotals.tax.toLocaleString()}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="text-white font-medium">PKR {cartTotals.deliveryFee.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-[#23292e]">
                  <span>Total Amount</span>
                  <span className="text-[#c5a059]">
                    PKR {(orderType === 'delivery' ? cartTotals.total : cartTotals.total - cartTotals.deliveryFee).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit Order Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-full bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl hover:shadow-[#c5a059]/20 cursor-pointer"
              >
                {isProcessing ? (
                  <span>Authorizing Payment & Transmitting Order...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Place Order • PKR {(orderType === 'delivery' ? cartTotals.total : cartTotals.total - cartTotals.deliveryFee).toLocaleString()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </div>

          </form>
        )}

      </div>
    </div>
  );
};
