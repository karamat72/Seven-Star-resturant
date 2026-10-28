/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { MenuView } from './views/MenuView';
import { ReservationsView } from './views/ReservationsView';
import { CheckoutView } from './views/CheckoutView';
import { CustomerDashboard } from './views/CustomerDashboard';
import { AdminDashboard } from './views/AdminDashboard';
import { AboutView } from './views/AboutView';
import { GalleryView } from './views/GalleryView';
import { EventsView } from './views/EventsView';
import { ContactView } from './views/ContactView';
import { CartDrawer } from './components/CartDrawer';
import { DishDetailModal } from './components/DishDetailModal';
import { StoryVideoModal } from './components/StoryVideoModal';
import { AuthModal } from './components/AuthModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { ToastContainer } from './components/ToastContainer';
import { PromotionalOfferPopup } from './components/PromotionalOfferPopup';
import { FloatingReserveButton } from './components/FloatingReserveButton';

const MainContent: React.FC = () => {
  const { activePage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-white text-stone-900 selection:bg-[#c5a059] selection:text-white">
      {/* Top Bar & Main Sticky Navigation */}
      <Header />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        {activePage === 'home' && <HomeView />}
        {activePage === 'menu' && <MenuView />}
        {activePage === 'about' && <AboutView />}
        {activePage === 'gallery' && <GalleryView />}
        {activePage === 'reservations' && <ReservationsView />}
        {activePage === 'events' && <EventsView />}
        {activePage === 'contact' && <ContactView />}
        {activePage === 'checkout' && <CheckoutView />}
        {activePage === 'account' && <CustomerDashboard />}
        {activePage === 'admin' && <AdminDashboard />}
      </main>

      {/* Footer matching reference screenshot */}
      <Footer />

      {/* Interactive Global Modals, Drawers & Popups */}
      <CartDrawer />
      <DishDetailModal />
      <StoryVideoModal />
      <AuthModal />
      <AdminLoginModal />
      <ToastContainer />
      <PromotionalOfferPopup />
      <FloatingReserveButton />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
