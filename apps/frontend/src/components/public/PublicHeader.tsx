import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';

interface PublicHeaderProps {
  activePage: 'home' | 'services' | 'guide' | 'about' | 'pricing' | 'contact' | 'privacy';
  setActivePage: (page: 'home' | 'services' | 'guide' | 'about' | 'pricing' | 'contact' | 'privacy') => void;
  onOpenAuth: () => void;
  onGoToDashboard: () => void;
  isLoggedIn: boolean;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({
  activePage,
  setActivePage,
  onOpenAuth,
  onGoToDashboard,
  isLoggedIn
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: 'home' | 'services' | 'guide' | 'about' | 'pricing' | 'contact' | 'privacy') => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="public-header" style={{
      height: '76px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #f1f5f9',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        height: '100%',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 50%, #a855f7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 900,
            fontSize: '1.25rem',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)'
          }}>
            S
          </div>
          <div>
            <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#000000', letterSpacing: '-0.03em', display: 'block', lineHeight: 1 }}>SWASTIAI</span>
            <span style={{ fontSize: '0.625rem', color: '#6366f1', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>AI WORKSPACE</span>
          </div>
        </div>

        {/* Desktop Navigation items */}
        <nav className="desktop-nav" style={{ alignItems: 'center', gap: '28px' }}>
          <button onClick={() => handleNavClick('home')} style={{ background: 'none', border: 'none', color: activePage === 'home' ? '#000000' : '#475569', fontWeight: activePage === 'home' ? 800 : 600, fontSize: '0.925rem', cursor: 'pointer' }}>
            Product
          </button>
          <button onClick={() => handleNavClick('services')} style={{ background: 'none', border: 'none', color: activePage === 'services' ? '#000000' : '#475569', fontWeight: activePage === 'services' ? 800 : 600, fontSize: '0.925rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Solutions <ChevronDown size={14} />
          </button>
          <button onClick={() => handleNavClick('pricing')} style={{ background: 'none', border: 'none', color: activePage === 'pricing' ? '#000000' : '#475569', fontWeight: activePage === 'pricing' ? 800 : 600, fontSize: '0.925rem', cursor: 'pointer' }}>
            Pricing
          </button>
          <button onClick={() => handleNavClick('guide')} style={{ background: 'none', border: 'none', color: activePage === 'guide' ? '#000000' : '#475569', fontWeight: activePage === 'guide' ? 800 : 600, fontSize: '0.925rem', cursor: 'pointer' }}>
            Docs
          </button>
          <button onClick={() => handleNavClick('about')} style={{ background: 'none', border: 'none', color: activePage === 'about' ? '#000000' : '#475569', fontWeight: activePage === 'about' ? 800 : 600, fontSize: '0.925rem', cursor: 'pointer' }}>
            About Us
          </button>
          <button onClick={() => handleNavClick('contact')} style={{ background: 'none', border: 'none', color: activePage === 'contact' ? '#000000' : '#475569', fontWeight: activePage === 'contact' ? 800 : 600, fontSize: '0.925rem', cursor: 'pointer' }}>
            Contact
          </button>
        </nav>

        {/* Right Desktop Action Buttons */}
        <div className="desktop-actions" style={{ alignItems: 'center', gap: '12px' }}>
          {isLoggedIn ? (
            <button
              onClick={onGoToDashboard}
              style={{
                padding: '10px 22px',
                borderRadius: '30px',
                border: 'none',
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.875rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Go to Dashboard <ArrowRight size={15} />
            </button>
          ) : (
            <>
              <button
                onClick={onOpenAuth}
                style={{
                  padding: '9px 18px',
                  borderRadius: '30px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#0f172a',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                Sign in
              </button>
              <button
                onClick={onOpenAuth}
                style={{
                  padding: '10px 22px',
                  borderRadius: '30px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Get Started Free <ArrowRight size={15} />
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Icon Button */}
        <button
          className="mobile-hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          style={{
            background: 'none',
            border: 'none',
            color: '#0f172a',
            padding: '8px',
            cursor: 'pointer',
            borderRadius: '8px'
          }}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Slide-Down Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-dropdown" style={{
          position: 'absolute',
          top: '76px',
          left: 0,
          right: 0,
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '24px 20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 999
        }}>
          <button onClick={() => handleNavClick('home')} style={{ textAlign: 'left', background: 'none', border: 'none', color: '#0f172a', fontWeight: 800, fontSize: '1rem', padding: '8px 0' }}>
            Product
          </button>
          <button onClick={() => handleNavClick('services')} style={{ textAlign: 'left', background: 'none', border: 'none', color: '#0f172a', fontWeight: 800, fontSize: '1rem', padding: '8px 0' }}>
            Solutions
          </button>
          <button onClick={() => handleNavClick('pricing')} style={{ textAlign: 'left', background: 'none', border: 'none', color: '#0f172a', fontWeight: 800, fontSize: '1rem', padding: '8px 0' }}>
            Pricing
          </button>
          <button onClick={() => handleNavClick('guide')} style={{ textAlign: 'left', background: 'none', border: 'none', color: '#0f172a', fontWeight: 800, fontSize: '1rem', padding: '8px 0' }}>
            Docs & Guide
          </button>
          <button onClick={() => handleNavClick('about')} style={{ textAlign: 'left', background: 'none', border: 'none', color: '#0f172a', fontWeight: 800, fontSize: '1rem', padding: '8px 0' }}>
            About Us
          </button>
          <button onClick={() => handleNavClick('contact')} style={{ textAlign: 'left', background: 'none', border: 'none', color: '#0f172a', fontWeight: 800, fontSize: '1rem', padding: '8px 0' }}>
            Contact
          </button>

          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {isLoggedIn ? (
              <button
                onClick={() => { setMobileMenuOpen(false); onGoToDashboard(); }}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '1rem',
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Go to Dashboard <ArrowRight size={18} />
              </button>
            ) : (
              <>
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#0f172a',
                    fontWeight: 700,
                    fontSize: '1rem'
                  }}
                >
                  Sign in
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '1rem',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  Get Started Free <ArrowRight size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
