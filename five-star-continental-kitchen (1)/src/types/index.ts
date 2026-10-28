export type CategoryType = 'Pasta' | 'Pizza' | 'Steaks' | 'Burgers' | 'Salads' | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryType;
  price: number; // in PKR
  description: string;
  tagline?: string;
  image: string;
  rating: number;
  reviewsCount: number;
  calories?: number;
  prepTime?: string;
  allergens?: string[];
  ingredients?: string[];
  spiceLevel?: 'Mild' | 'Medium' | 'Hot' | 'None';
  isSignature?: boolean;
  isPopular?: boolean;
  isVeg?: boolean;
  inStock: boolean;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export type OrderType = 'dine-in' | 'pickup' | 'delivery';
export type PaymentMethod = 'stripe-card' | 'cash-on-delivery' | 'bank-transfer';
export type OrderStatus = 'confirmed' | 'preparing' | 'cooking' | 'out-for-delivery' | 'ready-for-pickup' | 'served' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  orderType: OrderType;
  tableNumber?: string;
  deliveryAddress?: {
    street: string;
    area: string;
    city: string;
    notes?: string;
  };
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending';
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
  estimatedTime?: string;
}

export type OccasionType = 'Romantic Dinners' | 'Family Gatherings' | 'Corporate Events' | 'Birthdays & Celebrations' | 'Casual Dining' | 'Anniversary';

export type ReservationStatus = 'confirmed' | 'cancelled' | 'completed' | 'pending';

export interface Reservation {
  id: string;
  referenceNumber: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  seatingPreference: 'Indoor Main Dining' | 'Romantic Window Booth' | 'Garden Terrace' | 'Private Dining Suite';
  occasion: OccasionType;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  status: ReservationStatus;
  createdAt: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorEmail: string;
  avatar?: string;
  rating: number;
  dishName?: string;
  comment: string;
  date: string;
  isApproved: boolean;
  source?: 'Google' | 'Verified Guest' | 'Direct';
}

export interface EventInquiry {
  id: string;
  eventType: OccasionType;
  date: string;
  guestsCount: number;
  preferredPackage?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  budget?: string;
  additionalNotes?: string;
  status: 'new' | 'contacted' | 'confirmed' | 'closed';
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  favorites: string[]; // dish IDs
  savedAddresses?: string[];
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  maxDiscount?: number;
  minOrder: number;
  description: string;
  isActive: boolean;
}
