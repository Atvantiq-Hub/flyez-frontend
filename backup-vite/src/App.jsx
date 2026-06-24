import React from 'react';
import { Phone } from 'lucide-react';
import PromoAlert from './components/PromoAlert';
import Header from './components/Header';
import FlightSearchForm from './components/FlightSearchForm';
import SpecialOffers from './components/SpecialOffers';
import WhyBookWithUs from './components/WhyBookWithUs';
import TrendingDeals from './components/TrendingDeals';
import Packages from './components/Packages';
import LuxuryBanner from './components/LuxuryBanner';
import SubscriptionBanner from './components/SubscriptionBanner';
import Testimonials from './components/Testimonials';
import AirlinePartners from './components/AirlinePartners';
import TravelGptChat from './components/TravelGptChat';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      {/* Discount Promo Code Alert Banner */}
      <PromoAlert />

      {/* Premium Header */}
      <Header />

      {/* Hero Section with original flyez.ai background slider */}
      <section 
        style={{ 
          backgroundImage: 'radial-gradient(circle at top right, rgba(37, 99, 235, 0.15), transparent 60%), linear-gradient(to bottom, rgba(7, 14, 27, 0.4) 0%, rgba(7, 14, 27, 0.65) 100%), url("https://flyez.ai/assets/img/slider-bg-img.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#ffffff',
          padding: '120px 0 160px 0',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center'
        }}
      >
        {/* Subtle decorative background mesh */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
        
        <div className="premium-container" style={{ position: 'relative', zIndex: 2 }}>
          <span 
            style={{ 
              fontSize: '13px', 
              fontWeight: 800, 
              color: 'var(--color-orange)', 
              textTransform: 'uppercase', 
              letterSpacing: '3px',
              display: 'inline-block',
              marginBottom: '16px',
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 92, 0, 0.1)',
              border: '1px solid rgba(255, 92, 0, 0.25)',
              backdropFilter: 'blur(4px)',
              textShadow: '0 1px 2px rgba(7, 14, 27, 0.3)',
            }}
          >
            Unpublished Private Fares
          </span>
          <h1 
            style={{ 
              fontSize: '60px', 
              fontWeight: 800, 
              color: '#ffffff', 
              fontFamily: 'var(--font-display)', 
              marginBottom: '20px',
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              textShadow: '0 4px 20px rgba(7, 14, 27, 0.75), 0 2px 4px rgba(7, 14, 27, 0.5)',
            }}
            className="hero-heading"
          >
            Unbeatable Flight Deals & <br/>Secret Agent Rates
          </h1>
          <p 
            style={{ 
              fontSize: '18px', 
              color: 'rgba(255, 255, 255, 0.95)', 
              maxWidth: '700px', 
              margin: '0 auto 40px auto',
              lineHeight: '1.6',
              fontWeight: 500,
              textShadow: '0 2px 10px rgba(7, 14, 27, 0.8), 0 1px 2px rgba(7, 14, 27, 0.5)',
            }}
          >
            Access exclusive offline discounts, private consolidator rates, and group airfare deals not available online. Speak to a travel desk agent for instant discounts.
          </p>

          {/* Dialing CTA box */}
          <div style={{ display: 'inline-block', margin: '0 auto' }}>
            <a 
              href="tel:1800-521-4263"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 36px',
                background: 'linear-gradient(135deg, var(--color-orange) 0%, #e04a00 100%)',
                color: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-glow)',
                border: '1.5px solid rgba(255, 255, 255, 0.15)',
                transition: 'var(--transition-normal)',
                textDecoration: 'none'
              }}
              className="hero-cta-btn"
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(255, 92, 0, 0.55)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
              }}
            >
              <div 
                style={{ 
                  width: '38px', 
                  height: '38px', 
                  borderRadius: '50%', 
                  background: 'rgba(255, 255, 255, 0.2)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                }}
                className="telepulse-icon"
              >
                <Phone size={18} fill="currentColor" color="#ffffff" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 700 }}>Call 24/7 Toll-Free</span>
                <span style={{ fontSize: '24px', fontWeight: 800, lineHeight: 1.1, marginTop: '2px', letterSpacing: '-0.5px', fontFamily: 'var(--font-display)' }}>1800-521-4263</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main style={{ flex: 1, paddingBottom: '40px' }}>
        {/* Overlapping Flight Search Form */}
        <div className="premium-container">
          <FlightSearchForm />
        </div>

        {/* Special Offers Grid & Call Banner */}
        <SpecialOffers />

        {/* Why Book With Us Grid */}
        <WhyBookWithUs />

        {/* Trending Cheap Flight Deals Grid (Popular Routes) */}
        <TrendingDeals />

        {/* Popular Holiday Packages */}
        <Packages />

        {/* Luxury Business Class Callout */}
        <LuxuryBanner />


        {/* Subscription Newsletter panel */}
        <SubscriptionBanner />

        {/* Testimonials Review panel */}
        <Testimonials />

        {/* Partner Carrier Badges + Trustpilot review */}
        <AirlinePartners />
      </main>

      {/* Floating Travel GPT Chat Assistant */}
      <TravelGptChat />

      {/* Footer Details */}
      <Footer />

      {/* Hero Responsive Styling */}
      <style>{`
        @keyframes telepulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }
        .telepulse-icon {
          animation: telepulse 2s infinite;
        }
        @media (max-width: 640px) {
          .hero-heading {
            font-size: 34px !important;
            letter-spacing: -0.5px !important;
          }
          .hero-cta-btn {
            padding: 12px 24px !important;
            font-size: 18px !important;
          }
          .hero-cta-btn span:last-child {
            font-size: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
