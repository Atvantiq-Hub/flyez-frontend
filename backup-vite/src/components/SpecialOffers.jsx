import React from 'react';
import { Percent, Plane, Headphones, ArrowRight } from 'lucide-react';

export default function SpecialOffers() {
  const offers = [
    {
      title: "Choose any Airline, Book Your Ticket",
      subtitle: "Worldwide coverage & custom airline booking plans",
      icon: <Plane size={24} color="#ffffff" />,
      image: "https://flyez.ai/assets/img/backgrounds/1.jpg",
      badge: "Flexible Fares",
      action: "Search Airlines"
    },
    {
      title: "Grab Amazing Flight Deals",
      subtitle: "Unpublished airfares direct from offline ticketing desks",
      icon: <Headphones size={24} color="#ffffff" />,
      image: "https://flyez.ai/assets/img/backgrounds/3.jpg",
      badge: "Exclusive Deals",
      action: "Talk to Specialist"
    },
    {
      title: "Up to 70% Discount Fares!",
      subtitle: "Call our agents for special business and group rates",
      icon: <Percent size={24} color="#ffffff" />,
      image: "https://flyez.ai/assets/img/backgrounds/2.jpg",
      badge: "Limited Time",
      action: "Call for Discount"
    }
  ];

  return (
    <section style={{ padding: '100px 0', backgroundColor: '#ffffff', borderBottom: '1px solid var(--color-border)' }}>
      <div className="premium-container">
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '38px', fontFamily: 'var(--font-display)', marginBottom: '12px', color: 'var(--color-primary)', fontWeight: 800 }}>Special Offers</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>These popular flight selections have a lot to offer. Search and book now!</p>
        </div>

        {/* Offers Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '60px' }}>
          {offers.map((offer, idx) => (
            <div
              key={idx}
              className="offer-card-premium"
              onClick={() => {
                window.location.href = "tel:1800-521-4263";
              }}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '16px', // Modern clean edge
                minHeight: '290px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 15px rgba(7, 14, 27, 0.03)',
                transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                cursor: 'pointer',
                border: '1px solid var(--color-border)',
                background: '#09101d'
              }}
            >
              {/* Zoom-on-hover background image */}
              <div 
                className="offer-card-bg-premium"
                style={{ backgroundImage: `url("${offer.image}")` }}
              />
              {/* Premium dark gradient overlay */}
              <div 
                className="offer-card-overlay-premium"
                style={{ background: 'linear-gradient(to bottom, rgba(7, 14, 27, 0.15) 0%, rgba(7, 14, 27, 0.88) 100%)' }}
              />
              
              {/* Content Panel */}
              <div className="offer-card-content-premium">
                {/* Top Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', zIndex: 3 }}>
                  <div 
                    className="offer-icon-wrapper"
                    style={{ 
                      padding: '12px', 
                      background: 'rgba(255, 255, 255, 0.12)', 
                      borderRadius: '10px', 
                      backdropFilter: 'blur(8px)', 
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#ffffff',
                      transition: 'transform 0.4s ease'
                    }}
                  >
                    {offer.icon}
                  </div>
                  
                  <span 
                    style={{ 
                      fontSize: '11px', 
                      fontWeight: '800', 
                      textTransform: 'uppercase', 
                      background: 'rgba(255, 255, 255, 0.15)', 
                      color: '#ffffff',
                      padding: '6px 12px', 
                      borderRadius: 'var(--radius-full)', 
                      backdropFilter: 'blur(8px)', 
                      border: '1px solid rgba(255,255,255,0.15)', 
                      letterSpacing: '0.5px' 
                    }}
                  >
                    {offer.badge}
                  </span>
                </div>

                {/* Bottom Info */}
                <div style={{ width: '100%', zIndex: 3 }}>
                  <h4 style={{ color: '#ffffff', fontSize: '22px', fontWeight: '800', marginBottom: '6px', lineHeight: '1.25', fontFamily: 'var(--font-display)', letterSpacing: '-0.3px' }}>
                    {offer.title}
                  </h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '13.5px', lineHeight: '1.45' }}>
                    {offer.subtitle}
                  </p>

                  {/* Interactive slide-up button */}
                  <div className="offer-card-cta-premium" style={{ overflow: 'hidden', maxHeight: 0, opacity: 0, transition: 'all 0.4s ease', marginTop: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-orange)', fontSize: '13px', fontWeight: 700 }}>
                      {offer.action} <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Help Banner call to action */}
        <div 
          style={{
            background: 'linear-gradient(135deg, #070e1b 0%, #0c1c3a 100%)',
            borderRadius: 'var(--radius-lg)',
            padding: '36px 40px',
            boxShadow: '0 20px 40px rgba(7, 14, 27, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            position: 'relative',
            overflow: 'hidden'
          }}
          className="promo-call-banner"
        >
          {/* Subtle glowing radial overlay */}
          <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255, 92, 0, 0.08) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', zIndex: 1 }}>
            <div 
              style={{ 
                width: '68px', 
                height: '68px', 
                borderRadius: 'var(--radius-full)', 
                overflow: 'hidden', 
                border: '3px solid var(--color-orange)',
                boxShadow: '0 0 15px rgba(255, 92, 0, 0.3)',
                flexShrink: 0,
                position: 'relative'
              }}
            >
              <img src="https://flyez.ai/assets/img/grouptraveltelecaller.webp" alt="telecaller" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', marginBottom: '6px', fontFamily: 'var(--font-display)', letterSpacing: '-0.3px' }}>Let Us Help You Book!</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '14.5px', fontWeight: 500, maxWidth: '620px', lineHeight: '1.5' }}>Speak with a travel desk expert and secure unpublished rates, cancellation adjustments, or custom travel dates 24/7.</p>
            </div>
          </div>

          <a 
            href="tel:1800-521-4263"
            style={{
              background: 'linear-gradient(135deg, var(--color-orange) 0%, #e04a00 100%)',
              color: '#ffffff',
              padding: '16px 36px',
              borderRadius: 'var(--radius-md)',
              fontWeight: '800',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: 'var(--shadow-glow)',
              transition: 'var(--transition-normal)',
              animation: 'pulse-glow 2s infinite',
              zIndex: 1
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 92, 0, 0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
            }}
          >
            <Headphones size={18} fill="currentColor" /> Call 1800-521-4263
          </a>
        </div>

      </div>

      <style>{`
        .offer-card-premium {
          position: relative;
        }

        .offer-card-premium::after {
          content: '';
          position: absolute;
          top: 0;
          left: -150%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.12) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          transition: 0.75s ease;
          z-index: 2;
          pointer-events: none;
        }

        .offer-card-premium:hover::after {
          left: 150%;
        }

        .offer-card-premium:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(7, 14, 27, 0.12);
          border-color: rgba(255, 92, 0, 0.25) !important;
        }

        .offer-card-bg-premium {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
          z-index: 0;
        }

        .offer-card-premium:hover .offer-card-bg-premium {
          transform: scale(1.1) rotate(0.5deg);
        }

        .offer-card-overlay-premium {
          position: absolute;
          inset: 0;
          z-index: 1;
          transition: var(--transition-normal);
        }

        .offer-card-premium:hover .offer-card-overlay-premium {
          background: linear-gradient(to bottom, rgba(7, 14, 27, 0.05) 0%, rgba(7, 14, 27, 0.92) 100%) !important;
        }

        .offer-card-content-premium {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          flex: 1;
          padding: 26px;
        }

        .offer-card-premium:hover .offer-icon-wrapper {
          transform: scale(1.1) rotate(10deg);
          background-color: var(--color-orange) !important;
          border-color: var(--color-orange) !important;
        }

        .offer-card-premium:hover .offer-card-cta-premium {
          max-height: 40px;
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
