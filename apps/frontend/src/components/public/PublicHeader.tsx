import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface PublicHeaderProps {
  activePage: 'home' | 'services' | 'guide' | 'about' | 'pricing' | 'contact';
  setActivePage: (page: 'home' | 'services' | 'guide' | 'about' | 'pricing' | 'contact') => void;
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
  return (
    <header style={{
      height: '80px',
      padding: '0 48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #f1f5f9',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Brand Logo matching SS */}
      <div
        onClick={() => setActivePage('home')}
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

      {/* Navigation items matching SS */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <button onClick={() => setActivePage('home')} style={{ background: 'none', border: 'none', color: activePage === 'home' ? '#000000' : '#475569', fontWeight: activePage === 'home' ? 800 : 600, fontSize: '0.925rem', cursor: 'pointer' }}>
          Product
        </button>
        <button onClick={() => setActivePage('services')} style={{ background: 'none', border: 'none', color: activePage === 'services' ? '#000000' : '#475569', fontWeight: activePage === 'services' ? 800 : 600, fontSize: '0.925rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          Solutions <ChevronDown size={14} />
        </button>
        <button onClick={() => setActivePage('pricing')} style={{ background: 'none', border: 'none', color: activePage === 'pricing' ? '#000000' : '#475569', fontWeight: activePage === 'pricing' ? 800 : 600, fontSize: '0.925rem', cursor: 'pointer' }}>
          Pricing
        </button>
        <button onClick={() => setActivePage('guide')} style={{ background: 'none', border: 'none', color: activePage === 'guide' ? '#000000' : '#475569', fontWeight: activePage === 'guide' ? 800 : 600, fontSize: '0.925rem', cursor: 'pointer' }}>
          Docs
        </button>
        <button onClick={() => setActivePage('about')} style={{ background: 'none', border: 'none', color: activePage === 'about' ? '#000000' : '#475569', fontWeight: activePage === 'about' ? 800 : 600, fontSize: '0.925rem', cursor: 'pointer' }}>
          About Us
        </button>
      </nav>

      {/* Right Action Buttons matching SS */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {isLoggedIn ? (
          <button
            onClick={onGoToDashboard}
            style={{
              padding: '11px 24px',
              borderRadius: '30px',
              border: 'none',
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Go to Dashboard <ArrowRight size={16} />
          </button>
        ) : (
          <>
            <button
              onClick={onOpenAuth}
              style={{
                padding: '10px 22px',
                borderRadius: '30px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#0f172a',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              Sign in
            </button>
            <button
              onClick={onOpenAuth}
              style={{
                padding: '11px 24px',
                borderRadius: '30px',
                border: 'none',
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Get Started Free <ArrowRight size={16} />
            </button>
          </>
        )}
      </div>
    </header>
  );
};
