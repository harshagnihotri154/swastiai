import React from 'react';
import { Bot, Send, Heart } from 'lucide-react';

interface PublicFooterProps {
  setActivePage: (page: 'home' | 'services' | 'guide' | 'about' | 'pricing' | 'contact') => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ setActivePage }) => {
  return (
    <footer style={{
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      padding: '64px 48px 32px',
      color: '#475569'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1.4fr', gap: '48px', marginBottom: '48px' }}>
        {/* Company Bio */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bot size={22} color="#ffffff" />
            </div>
            <span style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>SWASTIAI</span>
          </div>

          <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#64748b', marginBottom: '20px' }}>
            Swastiai is the leading multi-tenant AI WhatsApp Agent SaaS platform. Deploy automated 24/7 AI assistants powered by Groq Llama 3.3 70B & Google Gemini AI in seconds.
          </p>

          <div style={{ display: 'flex', gap: '12px', color: '#2563eb', fontSize: '0.85rem', fontWeight: 700 }}>
            <span style={{ padding: '6px 12px', borderRadius: '20px', background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.2)' }}>⚡ 0.12s Latency</span>
            <span style={{ padding: '6px 12px', borderRadius: '20px', background: 'rgba(124, 58, 237, 0.08)', border: '1px solid rgba(124, 58, 237, 0.2)' }}>🛡️ BYOK Model</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: '#0f172a', fontWeight: 800, fontSize: '0.95rem', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Platform</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            <li><button onClick={() => setActivePage('home')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, fontWeight: 600 }}>Home</button></li>
            <li><button onClick={() => setActivePage('services')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, fontWeight: 600 }}>Services & Capabilities</button></li>
            <li><button onClick={() => setActivePage('guide')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, fontWeight: 600 }}>How It Works Guide</button></li>
            <li><button onClick={() => setActivePage('pricing')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, fontWeight: 600 }}>Pricing Plans</button></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 style={{ color: '#0f172a', fontWeight: 800, fontSize: '0.95rem', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            <li><button onClick={() => setActivePage('about')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, fontWeight: 600 }}>About Us</button></li>
            <li><button onClick={() => setActivePage('contact')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, fontWeight: 600 }}>Contact Team</button></li>
            <li><a href="http://localhost:5001/privacy" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</a></li>
            <li><span style={{ color: '#94a3b8', fontWeight: 600 }}>Terms of Service</span></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 style={{ color: '#0f172a', fontWeight: 800, fontSize: '0.95rem', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Stay Updated</h4>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '12px' }}>
            Subscribe to our newsletter for new WhatsApp AI features & MCP tool updates.
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="email"
              placeholder="you@company.com"
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                background: '#f8fafc',
                color: '#0f172a',
                fontSize: '0.85rem'
              }}
            />
            <button className="btn-primary" style={{ padding: '8px 14px' }}>
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '24px', textAlign: 'center', fontSize: '0.85rem', color: '#64748b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <div>© 2026 Swastiai Platform. All rights reserved.</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          Crafted with <Heart size={14} color="#ec4899" fill="#ec4899" /> for AI Businesses Worldwide
        </div>
      </div>
    </footer>
  );
};
