import React from 'react';
import { User, LogOut } from 'lucide-react';

interface NavbarProps {
  user: any;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onOpenAuth, onLogout }) => {
  return (
    <header style={{
      height: '70px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'fixed',
      top: 0,
      right: 0,
      left: '260px',
      zIndex: 40
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span className="badge badge-live">🟢 WhatsApp Engine Active</span>
        <span className="badge badge-groq">⚡ Groq Llama 3.3 (0.12s)</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0f172a' }}>{user.name || user.email}</div>
              <div style={{ fontSize: '0.725rem', color: '#059669', fontWeight: 700 }}>Pro Business Subscriber</div>
            </div>
            <button
              onClick={onLogout}
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.825rem' }}
              title="Sign Out"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        ) : (
          <button onClick={onOpenAuth} className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
            <User size={15} /> Account Login
          </button>
        )}
      </div>
    </header>
  );
};
