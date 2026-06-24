import React from 'react';
import dynamic from 'next/dynamic';
import PromoAlert from '@/components/PromoAlert';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FlightSearchForm from '@/features/flight-booking/components/FlightSearchForm';
import Footer from '@/components/Footer';

// Dynamically load below-the-fold components for performance optimization & code splitting
const SpecialOffers = dynamic(() => import('@/features/marketing/components/SpecialOffers'), { ssr: true });
const WhyBookWithUs = dynamic(() => import('@/features/marketing/components/WhyBookWithUs'), { ssr: true });
const Packages = dynamic(() => import('@/features/marketing/components/Packages'), { ssr: true });
const TrendingDeals = dynamic(() => import('@/features/marketing/components/TrendingDeals'), { ssr: true });
const AirlinePartners = dynamic(() => import('@/features/marketing/components/AirlinePartners'), { ssr: true });
const LuxuryBanner = dynamic(() => import('@/features/marketing/components/LuxuryBanner'), { ssr: true });
const SubscriptionBanner = dynamic(() => import('@/features/marketing/components/SubscriptionBanner'), { ssr: true });
const Testimonials = dynamic(() => import('@/features/marketing/components/Testimonials'), { ssr: true });

const TravelGptChat = dynamic(() => import('@/features/chat-ai/components/TravelGptChat'));
const Ticker = dynamic(() => import('@/features/marketing/components/Ticker'), { ssr: true });

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg-light dark:bg-brand-primary">
      {/* Sticky Header Bar (Promo Alert + Navigation) */}
      <div className="sticky top-0 z-[1000] flex flex-col">
        {/* Discount Promo Code Alert Banner */}
        <PromoAlert />

        {/* Premium Header */}
        <Header />

        {/* Floating Text Marquee Ticker */}
        <Ticker />
      </div>

      {/* Hero Section */}
      <Hero />

      {/* Main Content Sections */}
      <main className="flex-1 pb-10">
        {/* Overlapping Flight Search Form Container */}
        <div className="premium-container relative z-20 -mt-20 md:-mt-28 lg:-mt-36">
          <FlightSearchForm />
        </div>

        {/* Special Offers Grid & Call Banner */}
        <SpecialOffers />

        {/* Why Book With Us Grid */}
        <WhyBookWithUs />

        {/* Popular Holiday Packages */}
        <Packages />

        {/* Trending Cheap Flight Deals Grid (Popular Routes) */}
        <TrendingDeals />

        {/* Luxury Business Class Callout Banner */}
        <LuxuryBanner />


        {/* Subscription Newsletter Panel */}
        <SubscriptionBanner />

        {/* Global Airline Directory (partner carriers) */}
        <AirlinePartners />

        {/* Testimonials Review Panel */}
        <Testimonials />


      </main>

      {/* Floating Travel GPT Chat Assistant */}
      <TravelGptChat />

      {/* Footer Details */}
      <Footer />
    </div>
  );
}
