import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  MenuItem, 
  CartItem, 
  Order, 
  Reservation, 
  Review, 
  PromoCode, 
  UserProfile, 
  CategoryType,
  OccasionType,
  OrderStatus,
  ReservationStatus 
} from '../types';
import { INITIAL_MENU_ITEMS, INITIAL_REVIEWS, INITIAL_PROMO_CODES } from '../data/menuData';

export type ActivePage = 
  | 'home' 
  | 'menu' 
  | 'about' 
  | 'gallery' 
  | 'reservations' 
  | 'events' 
  | 'contact' 
  | 'cart' 
  | 'checkout' 
  | 'account' 
  | 'admin';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  navigateTo: (page: ActivePage, params?: { category?: CategoryType; occasion?: OccasionType; dishId?: string }) => void;
  
  // Menu
  menuItems: MenuItem[];
  selectedCategory: CategoryType | 'All';
  setSelectedCategory: (cat: CategoryType | 'All') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedDishModal: MenuItem | null;
  setSelectedDishModal: (dish: MenuItem | null) => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  toggleStock: (id: string) => void;

  // Cart
  cartItems: CartItem[];
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  addToCart: (dish: MenuItem, quantity?: number, specialInstructions?: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  appliedPromo: PromoCode | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  cartTotals: {
    subtotal: number;
    discount: number;
    tax: number;
    deliveryFee: number;
    total: number;
    itemCount: number;
  };

  // Reservations
  reservations: Reservation[];
  reservationDraft: Partial<Reservation>;
  setReservationDraft: React.Dispatch<React.SetStateAction<Partial<Reservation>>>;
  createReservation: (booking: Omit<Reservation, 'id' | 'referenceNumber' | 'createdAt' | 'status'>) => Promise<Reservation>;
  cancelReservation: (id: string) => Promise<void>;
  updateReservationStatus: (id: string, status: ReservationStatus) => Promise<void>;
  checkAvailability: (date: string, time: string, guests: number) => { available: boolean; message: string };

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>) => Promise<Order>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'isApproved'>) => void;
  approveReview: (id: string) => void;
  rejectReview: (id: string) => void;

  // User & Auth
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  adminToken: string | null;
  loginAdmin: (password: string, username?: string) => Promise<{ success: boolean; error?: string }>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isAdminLoginModalOpen: boolean;
  setIsAdminLoginModalOpen: (open: boolean) => void;
  authMode: 'login' | 'signup' | 'forgot';
  setAuthMode: (mode: 'login' | 'signup' | 'forgot') => void;
  favorites: string[];
  toggleFavorite: (dishId: string) => void;
  loginAs: (role: 'customer' | 'admin') => void;
  logout: () => void;

  // Story video modal
  isVideoStoryOpen: boolean;
  setIsVideoStoryOpen: (open: boolean) => void;

  // Toast
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEMO_CUSTOMER: UserProfile = {
  id: 'usr-customer-1',
  name: 'Rahul Mehta',
  email: 'rahul.mehta@example.com',
  phone: '+91 98765 12345',
  role: 'customer',
  favorites: ['dish-1', 'dish-4']
};

const DEMO_ADMIN: UserProfile = {
  id: 'usr-admin-1',
  name: 'Executive Manager',
  email: 'admin@fivestar.com',
  phone: '+91 98765 43210',
  role: 'admin',
  favorites: []
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDishModal, setSelectedDishModal] = useState<MenuItem | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isVideoStoryOpen, setIsVideoStoryOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return localStorage.getItem('fs_admin_token') || null;
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('fs_menu_items');
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('fs_cart_items');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(() => {
    const saved = localStorage.getItem('fs_applied_promo');
    return saved ? JSON.parse(saved) : null;
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('fs_user');
    return saved ? JSON.parse(saved) : DEMO_CUSTOMER;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('fs_favorites');
    return saved ? JSON.parse(saved) : ['dish-1', 'dish-4'];
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('fs_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const [reservationDraft, setReservationDraft] = useState<Partial<Reservation>>({
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '7:00 PM',
    guestsCount: 2,
    occasion: 'Romantic Dinners',
    seatingPreference: 'Indoor Main Dining'
  });

  // Fetch real data from server on startup
  useEffect(() => {
    // 1. Fetch Orders
    fetch('/api/orders')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setOrders(data);
        } else {
          const saved = localStorage.getItem('fs_orders');
          if (saved) setOrders(JSON.parse(saved));
        }
      })
      .catch(() => {
        const saved = localStorage.getItem('fs_orders');
        if (saved) setOrders(JSON.parse(saved));
      });

    // 2. Fetch Reservations
    fetch('/api/reservations')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setReservations(data);
        } else {
          const saved = localStorage.getItem('fs_reservations');
          if (saved) setReservations(JSON.parse(saved));
        }
      })
      .catch(() => {
        const saved = localStorage.getItem('fs_reservations');
        if (saved) setReservations(JSON.parse(saved));
      });
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('fs_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('fs_cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('fs_applied_promo', JSON.stringify(appliedPromo));
  }, [appliedPromo]);

  useEffect(() => {
    localStorage.setItem('fs_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('fs_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('fs_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('fs_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('fs_reservations', JSON.stringify(reservations));
  }, [reservations]);

  // Toast
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation Helper
  const navigateTo = (page: ActivePage, params?: { category?: CategoryType; occasion?: OccasionType; dishId?: string }) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (params?.category) {
      setSelectedCategory(params.category);
    }
    if (params?.occasion) {
      setReservationDraft((prev) => ({ ...prev, occasion: params.occasion }));
    }
    if (params?.dishId) {
      const found = menuItems.find((d) => d.id === params.dishId);
      if (found) setSelectedDishModal(found);
    }
  };

  // Cart operations
  const addToCart = (dish: MenuItem, quantity = 1, specialInstructions?: string) => {
    if (!dish.inStock) {
      showToast(`${dish.name} is currently out of stock.`, 'error');
      return;
    }
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.menuItem.id === dish.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (specialInstructions) {
          updated[existingIndex].specialInstructions = specialInstructions;
        }
        return updated;
      }
      return [
        ...prev,
        {
          id: `ci-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          menuItem: dish,
          quantity,
          specialInstructions
        }
      ];
    });
    showToast(`Added ${dish.name} to cart!`, 'success');
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (code: string): boolean => {
    const promo = INITIAL_PROMO_CODES.find(
      (p) => p.code.toUpperCase() === code.trim().toUpperCase() && p.isActive
    );
    if (!promo) {
      showToast('Invalid or expired promotional code.', 'error');
      return false;
    }
    const sub = cartItems.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
    if (sub < promo.minOrder) {
      showToast(`This code requires a minimum order of ₹${promo.minOrder.toLocaleString()}.`, 'error');
      return false;
    }
    setAppliedPromo(promo);
    showToast(`Promo ${promo.code} applied! ${promo.discountPercent}% OFF`, 'success');
    return true;
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promotional code removed', 'info');
  };

  // Cart calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  let discount = 0;
  if (appliedPromo) {
    discount = Math.round((subtotal * appliedPromo.discountPercent) / 100);
    if (appliedPromo.maxDiscount && discount > appliedPromo.maxDiscount) {
      discount = appliedPromo.maxDiscount;
    }
  }
  const tax = Math.round((subtotal - discount) * 0.16); // 16% GST
  const deliveryFee = cartItems.length > 0 ? 60 : 0;
  const total = Math.max(0, subtotal - discount + tax + (cartItems.length > 0 ? deliveryFee : 0));
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotals = {
    subtotal,
    discount,
    tax,
    deliveryFee,
    total,
    itemCount
  };

  // Menu items CRUD
  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `dish-${Date.now()}`
    };
    setMenuItems((prev) => [newItem, ...prev]);
    showToast(`Dish "${newItem.name}" added to menu!`, 'success');
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
    showToast('Menu item updated successfully', 'success');
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Menu item deleted', 'info');
  };

  const toggleStock = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.inStock;
          showToast(
            `${item.name} marked as ${nextState ? 'In Stock' : 'Out of Stock'}`,
            nextState ? 'success' : 'info'
          );
          return { ...item, inStock: nextState };
        }
        return item;
      })
    );
  };

  // Reservations
  const checkAvailability = (date: string, time: string, guests: number) => {
    const existing = reservations.filter(
      (r) => r.date === date && r.timeSlot === time && r.status === 'confirmed'
    );
    const bookedGuests = existing.reduce((sum, r) => sum + r.guestsCount, 0);
    const capacityLimit = 30;

    if (bookedGuests + guests > capacityLimit) {
      return {
        available: false,
        message: `Time slot ${time} on ${date} is almost full. Only ${Math.max(
          0,
          capacityLimit - bookedGuests
        )} seats remain.`
      };
    }
    return { available: true, message: 'Table is available for your requested slot.' };
  };

  const createReservation = async (
    bookingData: Omit<Reservation, 'id' | 'referenceNumber' | 'createdAt' | 'status'>
  ): Promise<Reservation> => {
    const refNum = `FS-RES-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRes: Reservation = {
      ...bookingData,
      id: `res-${Date.now()}`,
      referenceNumber: refNum,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Save locally
    setReservations((prev) => [newRes, ...prev]);

    // Send to real backend API
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      if (res.ok) {
        const savedRes = await res.json();
        setReservations((prev) => prev.map((r) => (r.id === newRes.id ? savedRes : r)));
        showToast(`Reservation confirmed! Ref #${savedRes.referenceNumber}`, 'success');
        return savedRes;
      }
    } catch (err) {
      // offline fallback
    }

    showToast(`Reservation confirmed! Ref #${refNum}`, 'success');
    return newRes;
  };

  const cancelReservation = async (id: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'cancelled' } : r))
    );

    try {
      await fetch(`/api/reservations/${id}`, { method: 'DELETE' });
    } catch (err) {
      // offline fallback
    }

    showToast('Reservation cancelled', 'info');
  };

  const updateReservationStatus = async (id: string, status: ReservationStatus) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );

    try {
      await fetch(`/api/reservations/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: adminToken ? `Bearer ${adminToken}` : ''
        },
        body: JSON.stringify({ status })
      });
    } catch (err) {
      // offline fallback
    }

    showToast(`Reservation status updated to ${status}`, 'success');
  };

  // Orders
  const createOrder = async (
    orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>
  ): Promise<Order> => {
    const orderNum = `FS-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      estimatedTime: '25-35 mins'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (res.ok) {
        const savedOrder = await res.json();
        setOrders((prev) => prev.map((o) => (o.id === newOrder.id ? savedOrder : o)));
        showToast(`Order #${savedOrder.orderNumber} placed!`, 'success');
        return savedOrder;
      }
    } catch (err) {
      // offline fallback
    }

    showToast(`Order #${orderNum} placed!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );

    try {
      await fetch(`/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: adminToken ? `Bearer ${adminToken}` : ''
        },
        body: JSON.stringify({ status })
      });
    } catch (err) {
      // offline fallback
    }

    showToast(`Order status updated to ${status}`, 'success');
  };

  // Reviews
  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'isApproved'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      isApproved: true,
      source: 'Verified Guest'
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Thank you! Your review has been submitted.', 'success');
  };

  const approveReview = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isApproved: true } : r))
    );
    showToast('Review approved', 'success');
  };

  const rejectReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast('Review removed', 'info');
  };

  // User & Roles
  const toggleFavorite = (dishId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(dishId);
      const next = exists ? prev.filter((id) => id !== dishId) : [...prev, dishId];
      showToast(exists ? 'Removed from favorites' : 'Saved to favorites ❤️', 'info');
      return next;
    });
  };

  const loginAdmin = async (password: string, username = 'bellagioadmin') => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAdminToken(data.token);
        localStorage.setItem('fs_admin_token', data.token);
        setCurrentUser(data.user);
        showToast('Admin authorized successfully!', 'success');
        setIsAdminLoginModalOpen(false);
        setActivePage('admin');
        return { success: true };
      } else {
        showToast(data.error || 'Authentication failed', 'error');
        return { success: false, error: data.error };
      }
    } catch (err) {
      // Offline fallback
      if (
        (password === 'SevenStar@RoyalHearth2026!' || password === 'Bellagio#Admin2026!FiveStar') && 
        (username === 'bellagioadmin' || username === 'admin@fivestar.com')
      ) {
        const token = 'adm_local_session';
        setAdminToken(token);
        localStorage.setItem('fs_admin_token', token);
        setCurrentUser(DEMO_ADMIN);
        showToast('Admin authorized!', 'success');
        setIsAdminLoginModalOpen(false);
        setActivePage('admin');
        return { success: true };
      }
      showToast('Invalid credentials.', 'error');
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const loginAs = (role: 'customer' | 'admin') => {
    if (role === 'admin') {
      setCurrentUser(DEMO_ADMIN);
      setAdminToken('adm_demo_token');
      showToast('Switched to Admin Account', 'success');
    } else {
      setCurrentUser(DEMO_CUSTOMER);
      showToast('Logged in as Guest Customer', 'success');
    }
  };

  const logout = () => {
    setAdminToken(null);
    localStorage.removeItem('fs_admin_token');
    setCurrentUser({
      id: 'guest',
      name: 'Guest Diner',
      email: '',
      role: 'customer',
      favorites: []
    });
    showToast('You have been logged out.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        navigateTo,
        menuItems,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedDishModal,
        setSelectedDishModal,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleStock,
        cartItems,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        cartTotals,
        reservations,
        reservationDraft,
        setReservationDraft,
        createReservation,
        cancelReservation,
        updateReservationStatus,
        checkAvailability,
        orders,
        createOrder,
        updateOrderStatus,
        reviews,
        addReview,
        approveReview,
        rejectReview,
        currentUser,
        setCurrentUser,
        adminToken,
        loginAdmin,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isAdminLoginModalOpen,
        setIsAdminLoginModalOpen,
        authMode,
        setAuthMode,
        favorites,
        toggleFavorite,
        loginAs,
        logout,
        isVideoStoryOpen,
        setIsVideoStoryOpen,
        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
