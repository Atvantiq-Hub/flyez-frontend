import React from 'react';
import { Plane, ArrowRight, DollarSign } from 'lucide-react';

export default function Packages() {
  const cities = [
    { name: "New York", routes: "240+ Weekly Flights", price: 149, image: "https://flyez.ai/assets/img/1.jpg", text: "Stunning skylines & nonstop schedules" },
    { name: "Los Angeles", routes: "185+ Weekly Flights", price: 189, image: "https://flyez.ai/assets/img/2.jpg", text: "West coast hubs & sunny terminals" },
    { name: "San Francisco", routes: "130+ Weekly Flights", price: 159, image: "https://flyez.ai/assets/img/3.jpg", text: "Transpacific routes & bay views" },
    { name: "Las Vegas", routes: "210+ Weekly Flights", price: 99, image: "https://flyez.ai/assets/img/4.jpg", text: "Direct desert links & night flights" },
    { name: "San Diego", routes: "90+ Weekly Flights", price: 129, image: "https://flyez.ai/assets/img/5.jpg", text: "Southern border routes & calm skies" },
    { name: "Chicago", routes: "175+ Weekly Flights", price: 119, image: "https://flyez.ai/assets/img/6.jpg", text: "Midwest connection hubs & dining" }
  ];

  const handleCityClick = (cityName) => {
    const params = new URLSearchParams({
      tp: 'round',
      couch: 'E',
      d1: 'JFK', // Default origin
      ar1: cityName.toUpperCase().substring(0, 3), // Stylized code
      adult: '1',
      children: '0',
      infant: '0'
    });
    window.location.href = `https://flyez.ai/flight-listing?${params.toString()}`;
  };

  return (
    <section style={{ padding: '100px 0', backgroundColor: '#f8fafc', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="premium-container">
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '38px', fontFamily: 'var(--font-display)', color: 'var(--color-primary)', fontWeight: 800 }}>Popular Holiday Packages</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>Explore exclusive flight options and consolidator rates to our most requested cities.</p>
        </div>

        {/* Modern Bento Grid Layout */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px'
          }}
          className="packages-grid"
        >
          {cities.map((city, idx) => (
            <div
              key={idx}
              onClick={() => handleCityClick(city.name)}
              className="city-card-premium"
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '16px', // Modern clean edge
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 15px rgba(7, 14, 27, 0.03)',
                transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                cursor: 'pointer',
                border: '1px solid var(--color-border)',
                background: '#ffffff'
              }}
            >
              {/* Zoom-on-hover background image */}
              <div 
                className="city-card-bg-premium"
                style={{ backgroundImage: `url("${city.image}")` }}
              />
              {/* Premium dark gradient overlay */}
              <div 
                className="city-card-overlay-premium"
                style={{ background: 'linear-gradient(to bottom, rgba(7, 14, 27, 0.1) 0%, rgba(7, 14, 27, 0.88) 100%)' }}
              />

              {/* Content Panel */}
              <div className="city-card-content-premium">
                {/* Top Section: Flight Route Capacity Badge & Plane Icon */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', zIndex: 3 }}>
                  <span 
                    style={{ 
                      fontSize: '11px', 
                      fontWeight: '800', 
                      textTransform: 'uppercase', 
                      background: 'rgba(255, 255, 255, 0.15)', 
                      color: '#ffffff',
                      padding: '6px 12px', 
                      borderRadius: '8px', 
                      backdropFilter: 'blur(10px)', 
                      border: '1px solid rgba(255,255,255,0.15)', 
                      letterSpacing: '0.5px' 
                    }}
                  >
                    {city.routes}
                  </span>
                  
                  <div 
                    className="city-plane-icon"
                    style={{ 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      background: 'rgba(255, 255, 255, 0.15)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      backdropFilter: 'blur(10px)', 
                      border: '1px solid rgba(255,255,255,0.15)',
                      transition: 'transform 0.4s ease',
                      color: '#ffffff'
                    }}
                  >
                    <Plane size={14} fill="currentColor" />
                  </div>
                </div>

                {/* Bottom Section: Name, Desc, Price tag, and Slide-up CTA */}
                <div style={{ width: '100%', zIndex: 3 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6px' }}>
                    <div>
                      <h4 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '800', fontFamily: 'var(--font-display)', lineHeight: '1.1' }}>
                        {city.name}
                      </h4>
                    </div>
                    {/* Price Badge */}
                    <div 
                      style={{
                        background: 'linear-gradient(135deg, var(--color-orange) 0%, #e04a00 100%)',
                        color: '#ffffff',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: 800,
                        boxShadow: '0 4px 10px rgba(255, 92, 0, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px'
                      }}
                    >
                      <span>from</span>
                      <span style={{ fontSize: '15px' }}>${city.price}</span>
                    </div>
                  </div>

                  <p className="city-card-text-premium" style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '13px', lineHeight: '1.4', transition: 'var(--transition-normal)' }}>
                    {city.text}
                  </p>

                  {/* Modern Slide-Up CTA */}
                  <div className="city-card-cta-premium" style={{ overflow: 'hidden', maxHeight: 0, opacity: 0, transition: 'all 0.4s ease', marginTop: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-orange)', fontSize: '13px', fontWeight: 700 }}>
                      Book Private Rates Now <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtle background text representation */}
              <div 
                style={{ 
                  position: 'absolute', 
                  right: '15px', 
                  bottom: '-20px', 
                  fontSize: '90px', 
                  fontWeight: '900', 
                  color: 'rgba(255, 255, 255, 0.03)',
                  fontFamily: 'var(--font-display)',
                  userSelect: 'none',
                  zIndex: 2,
                  pointerEvents: 'none'
                }}
              >
                {city.name.substring(0, 3).toUpperCase()}
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .city-card-premium {
          position: relative;
        }
        
        .city-card-premium::after {
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

        .city-card-premium:hover::after {
          left: 150%;
        }

        .city-card-premium:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(7, 14, 27, 0.12);
          border-color: rgba(255, 92, 0, 0.25) !important;
        }

        .city-card-bg-premium {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
          z-index: 0;
        }

        .city-card-premium:hover .city-card-bg-premium {
          transform: scale(1.1) rotate(0.5deg);
        }

        .city-card-overlay-premium {
          position: absolute;
          inset: 0;
          z-index: 1;
          transition: var(--transition-normal);
        }

        .city-card-premium:hover .city-card-overlay-premium {
          background: linear-gradient(to bottom, rgba(7, 14, 27, 0.05) 0%, rgba(7, 14, 27, 0.92) 100%) !important;
        }

        .city-card-content-premium {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          flex: 1;
          padding: 26px;
        }

        .city-card-premium:hover .city-plane-icon {
          transform: translateY(-2px) rotate(15deg);
          background-color: var(--color-orange) !important;
          border-color: var(--color-orange) !important;
        }

        .city-card-premium:hover .city-card-text-premium {
          color: #ffffff !important;
        }

        .city-card-premium:hover .city-card-cta-premium {
          max-height: 40px;
          opacity: 1;
        }

        @media (min-width: 1024px) {
          .packages-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
          /* Grid spanning updates */
          .packages-grid > div:nth-child(2),
          .packages-grid > div:nth-child(4) {
            grid-column: span 2 !important;
          }
        }
      `}</style>
    </section>
  );
}
