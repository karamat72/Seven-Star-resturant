import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { CategoriesSection } from '../components/CategoriesSection';
import { ExperienceSection } from '../components/ExperienceSection';
import { SignatureDishesSection } from '../components/SignatureDishesSection';
import { ChefAndOccasionsSection } from '../components/ChefAndOccasionsSection';
import { ReviewsSection } from '../components/ReviewsSection';
import { ReservationBanner } from '../components/ReservationBanner';

export const HomeView: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. Hero Section matching screenshot with pasta plate & handwritten badge */}
      <HeroSection />

      {/* 2. Food Categories Section (Pasta, Pizza, Steaks, Burgers, Salads, Desserts) */}
      <CategoriesSection />

      {/* 3. Restaurant Experience Section ("Dine. Unwind. Create Memories." + stats + interior photo) */}
      <ExperienceSection />

      {/* 4. Chef's Specials: Our Signature Dishes (6 product cards in PKR) */}
      <SignatureDishesSection />

      {/* 5. Meet Our Chef & Perfect for Every Occasion (Two-column split block) */}
      <ChefAndOccasionsSection />

      {/* 6. What Our Guests Say (Customer reviews with stars & avatars) */}
      <ReviewsSection />

      {/* 7. Book Your Table Banner ("Good Food Awaits You" with date/time/guest picker) */}
      <ReservationBanner />
    </div>
  );
};
