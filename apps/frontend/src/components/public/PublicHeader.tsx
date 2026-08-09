import React from 'react';
import { Bot, ArrowRight, Sparkles } from 'lucide-react';

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
  const navItems: { id: 'home' | 'services' | 'guide' | 'about' | 'pricing' | 'contact'; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'guide', label: 'How It Works' },
    { id: 'about', label: 'About Us' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header style={{
      height: '76px',
      padding: '0 48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #e2e8f0',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Logo */}
      <div
        onClick={() => setActivePage('home')}
        style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
      >
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
        }}>
          <Bot size={26} color="#ffffff" />
        </div>
        <div>
          <span style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', display: 'block', lineHeight: 1 }}>SWASTIAI</span>
          <span style={{ fontSize: '0.65rem', color: '#2563eb', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>AI WhatsApp SaaS</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#f1f5f9', padding: '5px', borderRadius: '30px', border: '1px solid #e2e8f0' }}>
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              style={{
                padding: '8px 18px',
                borderRadius: '20px',
                background: isActive ? '#ffffff' : 'transparent',
                color: isActive ? '#2563eb' : '#64748b',
                fontWeight: isActive ? 800 : 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                border: isActive ? '1px solid #cbd5e1' : '1px solid transparent',
                boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
              }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* CTA / User Status Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {isLoggedIn ? (
          <button onClick={onGoToDashboard} className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.9rem' }}>
            Go to Dashboard <ArrowRight size={16} />
          </button>
        ) : (
          <>
            <button
              onClick={onOpenAuth}
              style={{ background: 'none', border: 'none', color: '#0f172a', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}
            >
              Sign In
            </button>
            <button onClick={onOpenAuth} className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.9rem' }}>
              <Sparkles size={16} /> Get Started Free
            </button>
          </>
        )}
      </div>
    </header>
  );
};
