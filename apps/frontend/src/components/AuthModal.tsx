import React, { useState } from 'react';
import { Bot, Mail, Lock, User, ArrowRight, X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any, token: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/api/v1/auth/login' : '/api/v1/auth/signup';
    const payload = isLogin ? { email, password } : { email, password, name };

    try {
      const res = await fetch(`http://localhost:5001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Authentication failed');
      }

      localStorage.setItem('swastiai_token', data.token);
      onSuccess(data.user, data.token);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '440px',
        padding: '36px',
        position: 'relative',
        boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
        border: '1px solid #cbd5e1',
        background: '#ffffff'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
          }}>
            <Bot size={28} color="#ffffff" />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>
            {isLogin ? 'Welcome Back to Swastiai' : 'Create Swastiai Account'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px' }}>
            {isLogin ? 'Log in to manage your AI WhatsApp agents' : 'Deploy your automated AI agent in seconds'}
          </p>
        </div>

        {error && (
          <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#dc2626', fontSize: '0.85rem', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!isLogin && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                <input
                  type="text"
                  className="input-field"
                  style={{ paddingLeft: '38px' }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Harsh Agnihotri"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '14px' }} />
              <input
                type="email"
                className="input-field"
                style={{ paddingLeft: '38px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '14px' }} />
              <input
                type="password"
                className="input-field"
                style={{ paddingLeft: '38px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Free Account')} <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            type="button"
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 700, cursor: 'pointer' }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};
